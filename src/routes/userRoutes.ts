import { Router } from "express";

import { authenticate } from "../middlewares/authenticationMiddleware";
import { isSelf } from "../middlewares/authorizationMiddleware";

import { getCurrentUser } from "../controllers/userController";

const router = Router();

router.get("/me", authenticate, getCurrentUser);

router.get("/:userId", authenticate, isSelf, getCurrentUser);

router.patch("/:userId", authenticate, isSelf, getCurrentUser);

router.delete("/:userId", authenticate, isSelf, getCurrentUser);

export default router;
