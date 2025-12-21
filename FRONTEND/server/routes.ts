import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import OpenAI from "openai";

// Initialize OpenAI client - Replit integration sets OPENAI_API_KEY
// Note: We'll check if the key exists before using it to avoid crashes if integration fails
const openai = new OpenAI({ 
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY || "mock-key",
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post(api.chat.send.path, async (req, res) => {
    try {
      const { message, history } = api.chat.send.input.parse(req.body);

      // System prompt for the financial tutor
      const systemMessage = {
        role: "system" as const,
        content: `You are a helpful and knowledgeable financial literacy tutor. 
        Your goal is to explain financial concepts (Traditional Finance vs Blockchain) simply and clearly.
        Use analogies. Keep answers concise. Do not give investment advice.
        The user is interacting with a simulation app that compares traditional land purchases with blockchain smart contracts.
        Context:
        - Traditional: involves banks, escrow, government registries, taxes. Slow, centralized.
        - Blockchain: involves smart contracts, crypto signing, network validation, immutable records. Fast, decentralized, trustless.`
      };

      // Prepare messages for OpenAI
      const apiMessages = [
        systemMessage,
        ...(history || []).map(msg => ({ role: msg.role as "user" | "assistant", content: msg.content })),
        { role: "user" as const, content: message }
      ];

      // Call OpenAI
      // Check if we have a real key or if we need to mock
      let aiResponseContent = "";
      
      if (!process.env.OPENAI_API_KEY) {
        // Mock response if no key (fallback)
        aiResponseContent = "I'm a simulated AI tutor (OpenAI key missing). In a real deployment, I would explain: " + message;
      } else {
        const completion = await openai.chat.completions.create({
          messages: apiMessages,
          model: "gpt-4o-mini",
        });
        aiResponseContent = completion.choices[0].message.content || "I couldn't generate a response.";
      }

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

  return httpServer;
}
