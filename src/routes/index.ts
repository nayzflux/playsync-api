import { Router } from "express";

import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import guildRoutes from "./guildRoutes";

import { authenticate } from "../middlewares/authenticationMiddleware";

const router = Router();

router.use("/auth", authRoutes);

router.use("/users", authenticate, userRoutes);

router.use("/guilds", authenticate, guildRoutes);

export default router;
