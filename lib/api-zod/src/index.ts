// API validation schemas using Zod
import { z } from 'zod';

export const TestRequestSchema = z.object({
  message: z.string().min(1, 'Message is required'),
});

export type TestRequest = z.infer<typeof TestRequestSchema>;

export const HealthResponseSchema = z.object({
  status: z.string(),
  timestamp: z.string(),
  environment: z.string(),
});

export type HealthResponse = z.infer<typeof HealthResponseSchema>;
