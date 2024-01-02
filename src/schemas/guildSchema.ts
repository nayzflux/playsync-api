import { z } from "zod";

export const createGuildSchema = z.object({
  name: z.string().min(3).max(32),
});

export const updateGuildSchema = z.object({
  name: z.string().min(3).max(32).optional(),
});
