export async function GET() {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Invalid Args</title>
      <style>
        body {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #18181b;
          color: #fff;
          font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
          margin: 0;
        }
        .msg {
          background: #22223b;
          border-radius: 1rem;
          padding: 2rem 2.5rem;
          box-shadow: 0 4px 24px 0 rgba(80,80,255,0.10);
          border: 2px solid #ef4444;
          text-align: center;
        }
        h1 {
          color: #ef4444;
          margin-bottom: 0.5rem;
        }
        p {
          color: #cbd5e1;
        }
      </style>
    </head>
    <body>
      <div class="msg">
        <h1>Invalid Args Provided</h1>
        <p>This endpoint requires specific arguments.</p>
      </div>
    </body>
    </html>
  `;
  return new Response(html, {
    status: 400,
    headers: { 'Content-Type': 'text/html' },
  });
} 