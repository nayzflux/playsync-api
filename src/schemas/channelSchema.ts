import { z } from "zod";

export const createChannelSchema = z.object({
  name: z.string().min(3).max(32),
  type: z.enum(["GUILD_TEXT", "GUILD_VOICE"]),
});
