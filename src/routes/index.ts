import { Router } from "express";

import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import guildRoutes from "./guildRoutes";

const router = Router();

router.use("/auth", authRoutes);

router.use("/users", userRoutes);

router.use("/guilds", guildRoutes);

export default router;
