import { NextResponse } from "next/server";
import { LRUCache } from "lru-cache";
import crypto from "crypto";

// Typeform webhook data types
interface TypeformField {
  id: string;
  type: string;
  ref: string;
  required?: boolean;
  title?: string;
}

interface TypeformAnswer {
  type: string;
  field: TypeformField;
  text?: string;
  email?: string;
  phone_number?: string;
  url?: string;
  file_url?: string;
  choice?: {
    id: string;
    label: string;
    ref: string;
    other?: string;
  };
  choices?: {
    labels: string[];
    other?: string;
  };
  number?: number;
  boolean?: boolean;
  date?: string;
  payment?: {
    amount: string;
    currency: string;
    status: string;
  };
  answers?: TypeformAnswer[]; // For group fields
  [key: string]: unknown;
}

interface TypeformFormResponse {
  form_id: string;
  token: string;
  submitted_at: string;
  landed_at?: string;
  calculated?: Record<string, unknown>;
  variables?: Array<{ key: string; value: string }>;
  answers?: TypeformAnswer[];
  definition?: {
    id: string;
    title: string;
    fields: Array<{
      id: string;
      ref: string;
      type: string;
      title: string;
      properties: Record<string, unknown>;
      choices?: Array<{
        id: string;
        ref: string;
        label: string;
      }>;
    }>;
    endings: Array<{
      id: string;
      ref: string;
      title: string;
      type: string;
      properties: Record<string, unknown>;
    }>;
    settings: Record<string, unknown>;
  };
  ending?: {
    id: string;
    ref: string;
  };
}

interface TypeformWebhookData {
  form_response: TypeformFormResponse;
  event_id?: string;
  event_type?: string;
}

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

// Extract and validate client IP address
const extractClientIP = (request: Request): string => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const remoteAddr = request.headers.get("remote-addr");
  
  // Get the first IP from x-forwarded-for (in case of multiple proxies)
  const ip = forwardedFor?.split(',')[0]?.trim() || realIP || remoteAddr || "unknown";
  
  // Basic IP validation (IPv4/IPv6)
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  
  return ipRegex.test(ip) ? ip : "unknown";
};

// Verify Typeform webhook signature
const verifySignature = (payload: string, signature: string, secret: string): boolean => {
  try {
    if (!secret || !signature) {
      console.log("Missing secret or signature:", { hasSecret: !!secret, hasSignature: !!signature });
      return false;
    }

    // Extract the hash from the signature (format: "sha256=<hash>")
    const signatureHash = signature.startsWith('sha256=') 
      ? signature.substring(7) 
      : signature;

    console.log("Signature verification details:", {
      originalSignature: signature,
      extractedHash: signatureHash,
      payloadLength: payload.length,
      secretLength: secret.length
    });

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload, 'utf8')
      .digest('hex');

    // Detect if signature is base64 or hex encoded
    const isBase64 = signatureHash.includes('=') || /^[A-Za-z0-9+/=]+$/.test(signatureHash);
    const isHex = /^[0-9a-fA-F]+$/.test(signatureHash);

    console.log("Signature format analysis:", {
      original: signature,
      extracted: signatureHash,
      isBase64: isBase64,
      isHex: isHex,
      length: signatureHash.length
    });

    // Convert received signature to hex if it's base64
    let receivedHex: string;
    if (isBase64) {
      try {
        // Convert base64 to hex
        const decoded = Buffer.from(signatureHash, 'base64');
        receivedHex = decoded.toString('hex');
        console.log("Converted base64 to hex:", { base64: signatureHash, hex: receivedHex });
      } catch (error) {
        console.error("Failed to decode base64 signature:", error);
        return false;
      }
    } else {
      receivedHex = signatureHash.toLowerCase();
    }

    console.log("Final signature comparison:", {
      expected: expectedSignature,
      receivedHex: receivedHex,
      match: expectedSignature === receivedHex
    });

    try {
      return crypto.timingSafeEqual(
        Buffer.from(expectedSignature, 'hex'),
        Buffer.from(receivedHex, 'hex')
      );
    } catch (timingError) {
      console.log("Timing-safe comparison failed, using string comparison:", timingError);
      // Fallback to string comparison if timing-safe comparison fails
      return expectedSignature === receivedHex;
    }
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

  // Validate user agent for security
  const userAgent = request.headers.get('user-agent');
  if (!userAgent) {
    return { isValid: false, error: "Missing user agent" };
  }
  
  // Allow Typeform user agents and common webhook patterns
  const allowedUserAgents = ['typeform', 'webhook', 'bot', 'api'];
  const userAgentLower = userAgent.toLowerCase();
  const isValidUserAgent = allowedUserAgents.some(allowed => 
    userAgentLower.includes(allowed)
  );
  
  if (!isValidUserAgent) {
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
    // Rate limiting with IP extraction and validation
    const ip = extractClientIP(request);
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

    // Get raw body for signature verification with size validation
    const rawBody = await request.text();
    
    // Validate payload size (max 1MB)
    const maxPayloadSize = 1024 * 1024; // 1MB
    if (rawBody.length > maxPayloadSize) {
      console.warn("Payload too large", { 
        size: rawBody.length, 
        maxSize: maxPayloadSize,
        ip: ip.substring(0, 8) + '...'
      });
      return NextResponse.json(
        { message: "Payload too large" },
        { status: 413 }
      );
    }
    
    // Verify webhook signature - Typeform uses 'Typeform-Signature' header
    const signature = request.headers.get('Typeform-Signature') || 
                     request.headers.get('typeform-signature') ||
                     request.headers.get('x-typeform-signature') || 
                     request.headers.get('x-signature') ||
                     request.headers.get('x-hub-signature-256');
    
    // Only log signature verification in development
    if (process.env.NODE_ENV === 'development') {
      console.log("Signature verification debug:", {
        hasSignature: !!signature,
        signatureLength: signature?.length || 0
      });
    }
    
    // SECURITY: Only allow signature bypass in development mode OR with explicit bypass flag
    const skipSignatureCheck = (process.env.NODE_ENV === 'development' && 
                               process.env.SKIP_SIGNATURE_VERIFICATION === 'true') ||
                              process.env.FORCE_SKIP_SIGNATURE === 'true';
    
    if (!skipSignatureCheck && (!signature || !verifySignature(rawBody, signature, webhookSecret))) {
      // Enhanced debugging for signature verification failure
      const debugInfo = {
        ip: ip.substring(0, 8) + '...',
        hasSignature: !!signature,
        signatureLength: signature?.length || 0,
        rawBodyLength: rawBody.length,
        signaturePreview: signature?.substring(0, 20) + '...',
        secretConfigured: !!webhookSecret,
        secretLength: webhookSecret?.length || 0
      };
      
      console.warn("Invalid webhook signature - Debug Info:", debugInfo);
      
      // Log the actual signature verification attempt for debugging
      if (process.env.NODE_ENV === 'development') {
        console.log("Signature verification debug:", {
          receivedSignature: signature,
          payloadPreview: rawBody.substring(0, 100) + '...',
          payloadEnd: '...' + rawBody.substring(rawBody.length - 50)
        });
      }
      
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    if (skipSignatureCheck) {
      console.warn("⚠️  SIGNATURE VERIFICATION SKIPPED - DEVELOPMENT MODE ONLY");
    }

    // Parse JSON data
    let typeformData: TypeformWebhookData;
    try {
      typeformData = JSON.parse(rawBody) as TypeformWebhookData;
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      return NextResponse.json(
        { message: "Invalid JSON payload" },
        { status: 400 }
      );
    }
    
    // Log the received Typeform data for debugging (sanitized)
    const answerCount = typeformData.form_response?.answers?.length || 0;
    console.log("Received Typeform webhook:", {
      formId: typeformData.form_response?.form_id,
      submissionId: typeformData.form_response?.token,
      answerCount: answerCount,
      timestamp: new Date().toISOString(),
      ip: ip.substring(0, 8) + '...'
    });

    // Validate Typeform data structure
    if (!typeformData.form_response) {
      console.warn("Invalid Typeform data structure: missing form_response", { ip: ip.substring(0, 8) + '...' });
      return NextResponse.json(
        { message: "Invalid Typeform data format" },
        { status: 400 }
      );
    }

    // Validate answers array exists and is reasonable size
    if (!typeformData.form_response.answers || !Array.isArray(typeformData.form_response.answers)) {
      console.warn("Invalid answers structure", { 
        formId: typeformData.form_response.form_id,
        ip: ip.substring(0, 8) + '...'
      });
      return NextResponse.json(
        { message: "Invalid answers format" },
        { status: 400 }
      );
    }

    // Log form complexity for monitoring
    if (answerCount > 10) {
      console.log("Large form submission detected:", {
        formId: typeformData.form_response.form_id,
        answerCount: answerCount,
        ip: ip.substring(0, 8) + '...'
      });
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
        variables: typeformData.form_response.variables || [],
        totalAnswers: answerCount,
        formDefinition: typeformData.form_response.definition ? {
          id: typeformData.form_response.definition.id,
          title: typeformData.form_response.definition.title,
          totalFields: typeformData.form_response.definition.fields?.length || 0
        } : null
      },
      answers: typeformData.form_response.answers?.map((answer: TypeformAnswer) => {
        const fieldType = answer.field?.type;
        let answerValue: unknown;
        
        // Extract answer value based on field type - supports all Typeform field types
        switch (fieldType) {
          case 'text':
          case 'short_text':
          case 'long_text':
            answerValue = answer.text;
            break;
          case 'email':
            answerValue = answer.email;
            break;
          case 'choice':
          case 'single_choice':
            answerValue = answer.choice;
            break;
          case 'choices':
          case 'multiple_choice':
            answerValue = answer.choices;
            break;
          case 'number':
          case 'rating':
          case 'opinion_scale':
          case 'nps':
            answerValue = answer.number;
            break;
          case 'boolean':
          case 'yes_no':
            answerValue = answer.boolean;
            break;
          case 'date':
            answerValue = answer.date;
            break;
          case 'phone_number':
            answerValue = answer.phone_number;
            break;
          case 'url':
            answerValue = answer.url;
            break;
          case 'file_upload':
            answerValue = answer.file_url;
            break;
          case 'dropdown':
            answerValue = answer.choice;
            break;
          case 'legal':
            answerValue = answer.boolean;
            break;
          case 'statement':
            answerValue = null; // Statements don't have answers
            break;
          case 'group':
            answerValue = answer.answers; // Group fields contain nested answers
            break;
          case 'payment':
            answerValue = {
              amount: answer.payment?.amount,
              currency: answer.payment?.currency,
              status: answer.payment?.status
            };
            break;
          default:
            // Fallback for any other field types
            answerValue = answer[fieldType] || answer.text || answer.choice || answer.choices || answer.number || answer.boolean || answer.date;
        }
        
        return {
          fieldId: answer.field?.id,
          fieldType: fieldType,
          fieldRef: answer.field?.ref,
          answer: answerValue,
          answerLabel: answer.choice?.label || answer.choices?.labels?.join(', ') || null,
          // Additional metadata for complex forms
          hasAnswer: answerValue !== null && answerValue !== undefined,
          answerLength: typeof answerValue === 'string' ? answerValue.length : null,
          isMultipleChoice: ['choices', 'multiple_choice'].includes(fieldType || ''),
          isRequired: answer.field?.required || false
        };
      }) || [],
      originalData: typeformData // Keep original for reference
    };

    // Forward the data to the target webhook with timeout and retry logic
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    // Log what we're sending to the target webhook
    console.log("Forwarding to target webhook:", {
      targetUrl: targetWebhookUrl,
      payloadSize: JSON.stringify(transformedData).length,
      answerCount: transformedData.answers.length,
      formId: transformedData.form.id
    });

    // Create Discord-compatible payload if target is Discord webhook
    const isDiscordWebhook = targetWebhookUrl.includes('discord.com') || targetWebhookUrl.includes('discordapp.com');
    let payloadToSend;
    
    if (isDiscordWebhook) {
      // Format for Discord webhook
      const answerText = transformedData.answers.map((answer, index) => {
        const answerLabel = answer.answerLabel || answer.answer || 'No answer';
        return `**Question ${index + 1}:** ${answerLabel}`;
      }).join('\n');
      
      payloadToSend = {
        content: `🎯 **New Typeform Submission**\n\n**Form:** ${transformedData.form.formDefinition?.title || 'Unknown'}\n**Submission ID:** ${transformedData.form.token}\n\n**Answers:**\n${answerText}`,
        embeds: [{
          title: "Typeform Submission Details",
          color: 0x00ff00,
          fields: [
            {
              name: "Form ID",
              value: transformedData.form.id,
              inline: true
            },
            {
              name: "Total Answers",
              value: transformedData.answers.length.toString(),
              inline: true
            },
            {
              name: "Submitted At",
              value: new Date(transformedData.form.submittedAt).toLocaleString(),
              inline: true
            }
          ],
          timestamp: transformedData.form.submittedAt
        }]
      };
    } else {
      // Send full transformed data for other webhooks
      payloadToSend = transformedData;
    }

    try {
      const response = await fetch(targetWebhookUrl, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "User-Agent": "Typeform-Webhook-Forwarder/1.0",
          "X-Webhook-Source": "typeform",
          "X-Webhook-ID": "r9r0dfsf"
        },
        body: JSON.stringify(payloadToSend),
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
