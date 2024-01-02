import { Router } from "express";

import messageRoutes from "./messageRoutes";

import {
  createGuildChannel,
  getGuildChannel,
  updateGuildChannel,
  deleteGuildChannel,
} from "../controllers/channelController";

const router = Router();

router.post("/", createGuildChannel);

router.get("/:channelId", getGuildChannel);

router.patch("/:channelId", updateGuildChannel);

router.delete("/:channelId", deleteGuildChannel);

router.use(
  "/:channelId/messages",
  (req, res, next) => {
    res.locals.channelId = req.params.channelId;

    next();
  },
  messageRoutes
);

export default router;
