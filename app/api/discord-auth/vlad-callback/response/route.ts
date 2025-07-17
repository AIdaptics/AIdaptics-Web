import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const isSuccess = searchParams.has("success");
  const errorMsg = searchParams.get("error");

  let title = "";
  let message = "";
  let color = "";
  let emoji = "";

  if (isSuccess) {
    title = "Success!";
    message = "You have been given the BOOKED role. Enjoy your access!";
    color = "#22c55e";
    emoji = "✅";
  } else if (errorMsg) {
    title = "Error";
    message = decodeURIComponent(errorMsg) || "There was a problem processing your request. Please try again or contact support.";
    color = "#ef4444";
    emoji = "❌";
  } else {
    title = "Status";
    message = "No status provided.";
    color = "#64748b";
    emoji = "ℹ️";
  }

  // Pretty-print JSON error messages if possible
  let formattedMessage = message;
  const jsonMatch = message.match(/\{[\s\S]*\}$/);
  if (jsonMatch) {
    try {
      const json = JSON.parse(jsonMatch[0]);
      formattedMessage = message.replace(jsonMatch[0], '') + '\n' + JSON.stringify(json, null, 2);
    } catch {}
  }

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
      <style>
        body {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0f172a;
          color: #fff;
          font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
          margin: 0;
        }
        .card {
          background: #18181b;
          border-radius: 1.5rem;
          box-shadow: 0 8px 32px 0 rgba(80,80,255,0.15);
          padding: 2.5rem 2rem;
          max-width: 350px;
          text-align: center;
          border: 2px solid ${color};
        }
        .emoji {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        h1 {
          color: ${color};
          margin-bottom: 0.5rem;
        }
        p {
          color: #cbd5e1;
          font-size: 1.1rem;
          word-break: break-word;
          white-space: pre-wrap;
          text-align: left;
          margin: 0 auto;
          max-width: 90vw;
        }
        a {
          display: inline-block;
          margin-top: 1.5rem;
          color: #fff;
          background: ${color};
          padding: 0.5rem 1.5rem;
          border-radius: 0.5rem;
          text-decoration: none;
          font-weight: 500;
          transition: background 0.2s;
        }
        a:hover {
          background: #fff;
          color: ${color};
        }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="emoji">${emoji}</div>
        <h1>${title}</h1>
        <p>${formattedMessage}</p>
        <a href="/">Go Home</a>
      </div>
    </body>
    </html>
  `;

  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
} 