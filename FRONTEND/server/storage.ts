import { db } from "./db";
import {
  messages,
  type Message,
  type InsertMessage
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Chat history (optional storage, mostly for demo if we wanted to persist)
  createMessage(message: InsertMessage): Promise<Message>;
}

export class DatabaseStorage implements IStorage {
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db.insert(messages).values(insertMessage).returning();
    return message;
  }
}

export const storage = new DatabaseStorage();
