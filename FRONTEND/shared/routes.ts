import { z } from 'zod';
import { insertMessageSchema, messages } from './schema';

export const api = {
  chat: {
    send: {
      method: 'POST' as const,
      path: '/api/chat',
      input: z.object({
        message: z.string(),
        history: z.array(z.object({
          role: z.enum(['user', 'assistant']),
          content: z.string()
        })).optional()
      }),
      responses: {
        200: z.object({
          message: z.string()
        }),
        500: z.object({
          message: z.string()
        })
      }
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
