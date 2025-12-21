import type { Express, Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { chatStorage } from "./storage";
import dotenv from "dotenv";
require('dotenv').config({ path: "../../.env" });


// Gemini client
const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);
console.log("Gemini API Key:", process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export function registerChatRoutes(app: Express): void {
  // Get all conversations
  app.get("/api/conversations", async (_req: Request, res: Response) => {
    try {
      const conversations = await chatStorage.getAllConversations();
      res.json(conversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({ error: "Failed to fetch conversations" });
    }
  });

  // Get single conversation with messages
  app.get("/api/conversations/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const conversation = await chatStorage.getConversation(id);

      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }

      const messages = await chatStorage.getMessagesByConversation(id);
      res.json({ ...conversation, messages });
    } catch (error) {
      console.error("Error fetching conversation:", error);
      res.status(500).json({ error: "Failed to fetch conversation" });
    }
  });

  // Create new conversation
  app.post("/api/conversations", async (req: Request, res: Response) => {
    try {
      const { title } = req.body;
      const conversation = await chatStorage.createConversation(
        title || "New Chat"
      );
      res.status(201).json(conversation);
    } catch (error) {
      console.error("Error creating conversation:", error);
      res.status(500).json({ error: "Failed to create conversation" });
    }
  });

  // Delete conversation
  app.delete("/api/conversations/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await chatStorage.deleteConversation(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting conversation:", error);
      res.status(500).json({ error: "Failed to delete conversation" });
    }
  });

  // Send message and get AI response (streaming)
  app.post(
    "/api/conversations/:id/messages",
    async (req: Request, res: Response) => {
      try {
        const conversationId = parseInt(req.params.id);
        const { content } = req.body;

        // Save user message
        await chatStorage.createMessage(conversationId, "user", content);

        // Get conversation history
        const messages = await chatStorage.getMessagesByConversation(
          conversationId
        );

        // Convert messages to Gemini format
        const contents = messages.map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        }));

        // SSE headers
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        // Gemini streaming call
        const stream = await model.generateContentStream({
          contents,
          generationConfig: {
            maxOutputTokens: 2048,
          },
        });

        let fullResponse = "";

        for await (const chunk of stream.stream) {
          const text = chunk.text();
          if (text) {
            fullResponse += text;

            // SAME SHAPE AS OPENAI STREAM
            res.write(
              `data: ${JSON.stringify({ content: text })}\n\n`
            );
          }
        }

        // Save assistant message
        await chatStorage.createMessage(
          conversationId,
          "assistant",
          fullResponse
        );

        res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
        res.end();
      } catch (error) {
        console.error("Error sending message:", error);

        if (res.headersSent) {
          res.write(
            `data: ${JSON.stringify({
              error: "Failed to send message",
            })}\n\n`
          );
          res.end();
        } else {
          res.status(500).json({ error: "Failed to send message" });
        }
      }
    }
  );
}
