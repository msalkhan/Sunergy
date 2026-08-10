import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", business: "Sunergy Solar Energy Systems" });
  });

  // Quote / Callback request store (in-memory for instant feedback)
  const quoteRequests: Array<any> = [];

  app.post("/api/quote", (req, res) => {
    const { name, phone, email, address, monthlyBill, propertyType, notes } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: "Name and Phone are required." });
    }

    const newRequest = {
      id: "SUN-" + Math.floor(100000 + Math.random() * 900000),
      name,
      phone,
      email: email || "Not provided",
      address: address || "Port St. Lucie, FL",
      monthlyBill: monthlyBill || "$150-$250",
      propertyType: propertyType || "Single Family Home",
      notes: notes || "",
      createdAt: new Date().toISOString(),
      status: "Consultant Assigned",
    };

    quoteRequests.unshift(newRequest);
    console.log("New Sunergy Quote Request:", newRequest);

    return res.json({
      success: true,
      requestId: newRequest.id,
      message: "Thank you! A Sunergy solar specialist will reach out within 2 business hours.",
      summary: newRequest,
    });
  });

  app.get("/api/quotes", (_req, res) => {
    res.json({ count: quoteRequests.length, requests: quoteRequests });
  });

  // AI Solar Advisor Endpoint (Gemini API)
  app.post("/api/solar-ai", async (req, res) => {
    try {
      const { prompt, monthlyBill, city } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.json({
          response: "Sunergy AI Advisor is currently running in offline mode. For immediate questions or personalized quotes, please call our Port St. Lucie office directly at +1 727-375-9375!"
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `You are the official AI Solar Advisor for Sunergy, a premier solar energy system service company located at 540 NW University Blvd Ste 108, Port St. Lucie, FL 34986 (Phone: +1 727-375-9375).
Sunergy has a 4.3-star rating on Google across 138+ reviews.
Key selling points:
1. Hurricane-rated solar panels (tested against 160+ MPH Florida winds).
2. $0 down flexible solar financing options.
3. Fast, professional local installation and top-quality post-installation service.
4. Battery storage solutions (Tesla Powerwall / Enphase) for hurricane outage backup.
5. Florida FPL net metering support & 30% Federal Clean Energy Tax Credit guidance.

Answer the user's solar energy query in a warm, knowledgeable, concise, and helpful tone. Keep responses readable with bullet points where appropriate. Always encourage them to schedule a free site audit or call +1 727-375-9375.`;

      const userMessage = `User Location context: ${city || 'Port St. Lucie, FL'}. Electric bill: ${monthlyBill || 'Average'}. Question: ${prompt}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `${systemInstruction}\n\n${userMessage}` }] }
        ]
      });

      const replyText = response.text || "Thank you for reaching out to Sunergy! Our team is available at +1 727-375-9375 to answer all your solar questions.";
      res.json({ response: replyText });
    } catch (err: any) {
      console.error("Gemini AI error:", err);
      res.status(500).json({
        response: "Sunergy AI Advisor encountered a quick bump. Feel free to call us directly at +1 727-375-9375 or submit a quote request form below!"
      });
    }
  });

  // Serve Vite in development, static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Sunergy Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
