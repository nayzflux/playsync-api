import { Router } from "express";

import channelRoutes from "./channelRoutes";

import {
  createGuild,
  deleteGuild,
  getGuild,
  updateGuild,
} from "../controllers/guildController";

const router = Router();

router.post("/", createGuild);

router.get("/:guildId", getGuild);

router.patch("/:guildId", updateGuild);

router.delete("/:guildId", deleteGuild);

router.use(
  "/:guildId/channels",
  (req, res, next) => {
    res.locals.guildId = req.params.guildId;

    next();
  },
  channelRoutes
);

export default router;
