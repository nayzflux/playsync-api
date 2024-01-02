import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().max(256),
  username: z.string().min(3).max(32),
  email: z.string().email().max(320),
  password: z.string().min(8).max(72),
});

export const signInSchema = z.object({
  email: z.string().email().max(320),
  password: z.string().min(8).max(72),
});
