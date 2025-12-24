import type { Express } from "express";
import type { Server } from "http";
import { api } from "@shared/routes";
import { z } from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "./db";
import { newsletterSubscribers } from "@shared/schema";
import { sendSubscriptionEmail } from "./email";




import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
// Initialize Gemini client
const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_API_KEY || "mock-key"
);
// console.log("Gemini API Key:", process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post(api.chat.send.path, async (req, res) => {
    try {
      const { message, history } = api.chat.send.input.parse(req.body);

      // System prompt (same intent as before)
      const systemPrompt = `
                          You are a helpful and knowledgeable financial literacy tutor.
                          Your goal is to explain financial concepts (Traditional Finance vs Blockchain) simply and clearly.
                          Use analogies. Keep answers concise. Do not give investment advice.
                          The user is interacting with a simulation app that compares traditional land purchases with blockchain smart contracts.

                          Context:
                          - Traditional: involves banks, escrow, government registries, taxes. Slow, centralized.
                          - Blockchain: involves smart contracts, crypto signing, network validation, immutable records. Fast, decentralized, trustless.
                          `.trim();

      let aiResponseContent = "";

      // Fallback if key missing
      if (!process.env.GOOGLE_API_KEY) {
        // console.log("Gemini API Key:", process.env.GOOGLE_API_KEY);
        aiResponseContent =
          "I'm a simulated AI tutor (Gemini key missing). In a real deployment, I would explain: " +
          message;
      } else {
        // Convert history to Gemini format
        const contents = [
          {
            role: "user",
            parts: [{ text: systemPrompt }],
          },
          ...(history || []).map((msg) => ({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }],
          })),
          {
            role: "user",
            parts: [{ text: message }],
          },
        ];

        const result = await model.generateContent({
          contents,
          generationConfig: {
            maxOutputTokens: 1024,
          },
        });

        aiResponseContent =
          result.response.text() || "I couldn't generate a response.";
      }

      // SAME RESPONSE SHAPE AS BEFORE
      res.json({ message: aiResponseContent });

    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: "Invalid input",
        });
      }
      console.error("AI Error:", err);
      res.status(500).json({ message: "Failed to get AI response" });
    }
  });





  app.post("/api/subscribe", async (req, res) => {
    try {
      const { email } = req.body;
      // console.log("SUBSCRIBE ROUTE HIT with emai as :", email);

      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      await db.insert(newsletterSubscribers).values({ email });

      await sendSubscriptionEmail(email);

      return res.status(201).json({ message: "Subscribed" });
    } catch (err: any) {
      if (err.code === "23505") {

        return res.status(409).json({ message: "Already subscribed" });
      }

      console.error(err);
      res.status(500).json({ message: "Failed to subscribe" });
    }
  });


  return httpServer;
}
