import { NextResponse } from "next/server";
import { LRUCache } from "lru-cache";
import crypto from "crypto";

const rateLimitOptions = {
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500, // Max 500 unique IPs per minute
};

const tokenCache = new LRUCache<string, number>({
  max: rateLimitOptions.uniqueTokenPerInterval,
  ttl: rateLimitOptions.interval,
});

const checkRateLimit = (token: string) => {
  const tokenCount = tokenCache.get(token) || 0;

  if (tokenCount >= rateLimitOptions.uniqueTokenPerInterval) {
    throw new Error("Rate limit exceeded");
  }

  tokenCache.set(token, tokenCount + 1);
};

// Verify Typeform webhook signature
const verifySignature = (payload: string, signature: string, secret: string): boolean => {
  try {
    if (!secret || !signature) {
      return false;
    }

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload, 'utf8')
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  } catch (error) {
    console.error("Signature verification error:", error);
    return false;
  }
};

// Validate request headers and content type
const validateRequest = (request: Request): { isValid: boolean; error?: string } => {
  const contentType = request.headers.get('content-type');
  
  if (!contentType || !contentType.includes('application/json')) {
    return { isValid: false, error: "Invalid content type" };
  }

  const userAgent = request.headers.get('user-agent');
  if (!userAgent || (!userAgent.includes('Typeform') && !userAgent.includes('webhook'))) {
    return { isValid: false, error: "Invalid user agent" };
  }

  return { isValid: true };
};

export async function POST(request: Request) {
  const targetWebhookUrl = process.env.TARGET_WEBHOOK_URL;
  const webhookSecret = process.env.WEBHOOK_SECRET_KEY;

  // Validate environment configuration
  if (!targetWebhookUrl) {
    console.error("TARGET_WEBHOOK_URL is not configured");
    return NextResponse.json(
      { message: "Webhook configuration error" },
      { status: 500 }
    );
  }

  if (!webhookSecret) {
    console.error("WEBHOOK_SECRET_KEY is not configured");
    return NextResponse.json(
      { message: "Webhook security configuration error" },
      { status: 500 }
    );
  }

  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || 
               request.headers.get("remote-addr") || 
               request.headers.get("x-real-ip") || 
               "unknown";
    checkRateLimit(ip);

    // Validate request headers and content type
    const validation = validateRequest(request);
    if (!validation.isValid) {
      console.warn(`Request validation failed: ${validation.error}`, {
        ip,
        userAgent: request.headers.get('user-agent'),
        contentType: request.headers.get('content-type')
      });
      return NextResponse.json(
        { message: "Invalid request format" },
        { status: 400 }
      );
    }

    // Get raw body for signature verification
    const rawBody = await request.text();
    
    // Verify webhook signature
    const signature = request.headers.get('x-typeform-signature') || 
                     request.headers.get('x-signature') ||
                     request.headers.get('x-hub-signature-256');
    
    if (!signature || !verifySignature(rawBody, signature, webhookSecret)) {
      console.warn("Invalid webhook signature", {
        ip,
        hasSignature: !!signature,
        signatureHeader: signature
      });
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse JSON data
    let typeformData;
    try {
      typeformData = JSON.parse(rawBody);
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      return NextResponse.json(
        { message: "Invalid JSON payload" },
        { status: 400 }
      );
    }
    
    // Log the received Typeform data for debugging (sanitized)
    console.log("Received Typeform webhook:", {
      formId: typeformData.form_response?.form_id,
      submissionId: typeformData.form_response?.token,
      timestamp: new Date().toISOString(),
      ip
    });

    // Validate Typeform data structure
    if (!typeformData.form_response) {
      console.warn("Invalid Typeform data structure: missing form_response", { ip });
      return NextResponse.json(
        { message: "Invalid Typeform data format" },
        { status: 400 }
      );
    }

    // Transform Typeform data with enhanced structure
    const transformedData = {
      source: "typeform",
      timestamp: new Date().toISOString(),
      webhookId: "r9r0dfsf",
      metadata: {
        receivedAt: new Date().toISOString(),
        ip: ip,
        userAgent: request.headers.get('user-agent')
      },
      form: {
        id: typeformData.form_response.form_id,
        token: typeformData.form_response.token,
        submittedAt: typeformData.form_response.submitted_at,
        landedAt: typeformData.form_response.landed_at,
        calculated: typeformData.form_response.calculated,
        variables: typeformData.form_response.variables || []
      },
      answers: typeformData.form_response.answers?.map((answer: any) => {
        const fieldType = answer.field?.type;
        let answerValue;
        
        // Extract answer value based on field type
        switch (fieldType) {
          case 'text':
            answerValue = answer.text;
            break;
          case 'email':
            answerValue = answer.email;
            break;
          case 'choice':
            answerValue = answer.choice;
            break;
          case 'choices':
            answerValue = answer.choices;
            break;
          case 'number':
            answerValue = answer.number;
            break;
          case 'boolean':
            answerValue = answer.boolean;
            break;
          case 'date':
            answerValue = answer.date;
            break;
          default:
            answerValue = answer[fieldType] || answer.text || answer.choice || answer.choices;
        }
        
        return {
          fieldId: answer.field?.id,
          fieldType: fieldType,
          fieldRef: answer.field?.ref,
          answer: answerValue,
          answerLabel: answer.choice?.label || answer.choices?.labels?.join(', ') || null
        };
      }) || [],
      originalData: typeformData // Keep original for reference
    };

    // Forward the data to the target webhook with timeout and retry logic
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
      const response = await fetch(targetWebhookUrl, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "User-Agent": "Typeform-Webhook-Forwarder/1.0",
          "X-Webhook-Source": "typeform",
          "X-Webhook-ID": "r9r0dfsf"
        },
        body: JSON.stringify(transformedData),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Target webhook error:", {
          status: response.status,
          statusText: response.statusText,
          error: errorText,
          formId: transformedData.form.id
        });
        return NextResponse.json(
          { message: "Failed to forward webhook data" },
          { status: 502 }
        );
      }

      // Log successful forwarding
      console.log("Successfully forwarded webhook data:", {
        formId: transformedData.form.id,
        submissionId: transformedData.form.token,
        targetStatus: response.status
      });

      return NextResponse.json({ 
        message: "Webhook data forwarded successfully",
        status: "success",
        formId: transformedData.form.id,
        timestamp: transformedData.timestamp
      });

    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.error("Webhook forwarding timeout:", { formId: transformedData.form.id });
        return NextResponse.json(
          { message: "Webhook forwarding timeout" },
          { status: 504 }
        );
      }
      
      throw fetchError; // Re-throw to be caught by outer catch block
    }

  } catch (error) {
    console.error("Error processing webhook:", error);
    
    if (error instanceof Error) {
      if (error.message === "Rate limit exceeded") {
        return NextResponse.json(
          { message: "Rate limit exceeded" },
          { status: 429 }
        );
      }
      
      // Handle specific error types
      if (error.name === 'SyntaxError') {
        return NextResponse.json(
          { message: "Invalid JSON payload" },
          { status: 400 }
        );
      }
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        return NextResponse.json(
          { message: "Failed to connect to target webhook" },
          { status: 502 }
        );
      }
    }
    
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Handle GET requests for webhook verification and health checks
export async function GET() {
  const isConfigured = !!(process.env.TARGET_WEBHOOK_URL && process.env.WEBHOOK_SECRET_KEY);
  
  return NextResponse.json({ 
    message: "Typeform webhook endpoint is active",
    endpoint: "/api/webhooks/r9r0dfsf",
    methods: ["POST", "GET"],
    status: "healthy",
    configured: isConfigured,
    features: [
      "Secret key authentication",
      "Rate limiting",
      "Request validation"
    ],
    timestamp: new Date().toISOString()
  });
}

// Handle OPTIONS requests for CORS (if needed)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Typeform-Signature, X-Signature, X-Hub-Signature-256',
    },
  });
}
