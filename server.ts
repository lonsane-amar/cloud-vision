import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;

let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      service: "CloudVision Ground Intelligence Platform",
      timestamp: new Date().toISOString(),
    });
  });

  // Server-side Gemini AI Incident Analysis
  app.post("/api/ai/analyze-incident", async (req, res) => {
    try {
      const { title, description, locationName, rainfallMmH, waterDepthInches } = req.body;
      const ai = getAI();
      if (!ai) {
        return res.json({
          summary: `High-priority civic hazard detected at ${locationName || 'location'}. Water depth: ${waterDepthInches || 0} inches. Recommended action: Issue police diversion and dispatch storm-water pumps immediately.`,
          simulated: true,
        });
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are an emergency civic response and disaster management AI for Indian metropolitan corridors.
Analyze this urban hazard report:
- Incident: ${title}
- Location: ${locationName}
- Observed Water Depth: ${waterDepthInches} inches
- Current Rainfall Rate: ${rainfallMmH} mm/h
- Details: ${description}

Provide a concise 2-sentence tactical guidance for emergency responders and commuter traffic management.`,
      });

      return res.json({
        summary: response.text,
        simulated: false,
      });
    } catch (err: any) {
      console.error("AI Analysis error:", err);
      return res.status(500).json({ error: "Failed to generate AI analysis", details: err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
