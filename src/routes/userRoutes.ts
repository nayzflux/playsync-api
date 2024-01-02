import { Router } from "express";

import { authenticate } from "../middlewares/authenticationMiddleware";
import { isSelf } from "../middlewares/authorizationMiddleware";

import { getCurrentUser } from "../controllers/userController";

const router = Router();

router.get("/me", getCurrentUser);

router.get("/:userId", isSelf, getCurrentUser);

router.patch("/:userId", isSelf, getCurrentUser);

router.delete("/:userId", isSelf, getCurrentUser);

export default router;
