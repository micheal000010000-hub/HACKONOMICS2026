import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { z } from "zod";

type ChatInput = z.infer<typeof api.chat.send.input>;
type ChatResponse = z.infer<typeof api.chat.send.responses[200]>;

export function useChat() {
  return useMutation({
    mutationFn: async (data: ChatInput) => {
      const res = await fetch(api.chat.send.path, {
        method: api.chat.send.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      return await res.json() as ChatResponse;
    },
  });
}
