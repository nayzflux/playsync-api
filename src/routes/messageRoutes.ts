import { Router } from "express";

import {
  createGuildChannelMessage,
  getGuildChannelMessage,
  updateGuildChannelMessage,
  deleteGuildChannelMessage,
  getAllGuildChannelMessages,
} from "../controllers/messageController";

const router = Router();

router.post("/", createGuildChannelMessage);

router.get("/", getAllGuildChannelMessages);

router.get("/:channelId", getGuildChannelMessage);

router.patch("/:channelId", updateGuildChannelMessage);

router.delete("/:channelId", deleteGuildChannelMessage);

export default router;
