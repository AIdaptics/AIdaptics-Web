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
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { message: "Webhook URL is not configured" },
      { status: 500 }
    );
  }

  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("remote-addr") || "";
    checkRateLimit(ip);

    const body = await request.json();

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { message: `Discord API Error: ${error}` },
        { status: response.status }
      );
    }

    return NextResponse.json({ message: "Webhook sent successfully" });
  } catch (error) {
    console.error("Error sending webhook:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}