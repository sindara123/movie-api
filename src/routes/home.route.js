import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Express Demo API</title>
        <style>
          body {
            font-family: Arial, Helvetica, sans-serif;
            background: #0f172a;
            color: #e5e7eb;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
          .card {
            background: #020617;
            padding: 2rem 2.5rem;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
            max-width: 420px;
            text-align: center;
          }
          h1 {
            color: #38bdf8;
            margin-bottom: 0.5rem;
          }
          p {
            opacity: 0.85;
            line-height: 1.6;
          }
          .badge {
            display: inline-block;
            margin-top: 1rem;
            padding: 0.4rem 0.8rem;
            background: #1e293b;
            border-radius: 999px;
            font-size: 0.85rem;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>🚀 Express Demo API</h1>
          <p>
            Welcome! Your API is up and running successfully.
          </p>
          <p>
            Use the endpoints to interact with the service.
          </p>
          <div class="badge">Status: Online ✅</div>
        </div>
      </body>
    </html>
  `);
});

export default router;
