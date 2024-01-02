import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().max(256).optional(),
  username: z.string().min(3).max(32).optional(),
});
