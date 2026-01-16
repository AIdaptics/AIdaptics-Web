import { NextResponse } from "next/server";
import { LRUCache } from "lru-cache";

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

export async function POST(request: Request) {
  const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
  const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;

  if (!discordWebhookUrl && !n8nWebhookUrl) {
    return NextResponse.json(
      { message: "No webhook URLs configured" },
      { status: 500 }
    );
  }

  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("remote-addr") || "";
    checkRateLimit(ip);

    const body = await request.json();

    // Send to both webhooks in parallel
    const webhookPromises = [];

    // Send to Discord webhook
    if (discordWebhookUrl) {
      webhookPromises.push(
        fetch(discordWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
      );
    }

    // Send to n8n webhook (Speed to Lead)
    if (n8nWebhookUrl) {
      // Extract form data from Discord embed format for n8n
      const formData = body.embeds?.[0]?.fields?.reduce((acc: Record<string, string>, field: { name: string; value: string }) => {
        const key = field.name.replace(/[^\w\s]/gi, '').trim().toLowerCase();
        acc[key] = field.value;
        return acc;
      }, {}) || body;

      webhookPromises.push(
        fetch(n8nWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            source: "AIdaptics Get-Started Form",
            ...formData,
          }),
        })
      );
    }

    const responses = await Promise.allSettled(webhookPromises);

    // Check if all webhooks succeeded
    const failures = [];
    const successes = [];

    for (let i = 0; i < responses.length; i++) {
      const response = responses[i];
      const webhookName = i === 0 && discordWebhookUrl ? 'Discord' : 'n8n';
      
      if (response.status === 'rejected') {
        failures.push({ webhook: webhookName, error: response.reason });
        console.error(`${webhookName} webhook failed:`, response.reason);
      } else if (!response.value.ok) {
        const errorText = await response.value.text();
        failures.push({ 
          webhook: webhookName, 
          status: response.value.status,
          error: errorText 
        });
        console.error(`${webhookName} webhook failed with status ${response.value.status}:`, errorText);
      } else {
        successes.push(webhookName);
        console.log(`${webhookName} webhook sent successfully`);
      }
    }
    
    if (failures.length === responses.length) {
      // All webhooks failed
      return NextResponse.json(
        { 
          message: "All webhooks failed",
          failures 
        },
        { status: 500 }
      );
    }

    if (failures.length > 0) {
      // Some webhooks failed, but at least one succeeded
      return NextResponse.json({ 
        message: "Partial success - some webhooks failed",
        success: true,
        successes,
        failures
      });
    }

    return NextResponse.json({ 
      message: "All webhooks sent successfully",
      successes 
    });
  } catch (error) {
    console.error("Error sending webhook:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}