import { RequestHandler } from "express";

import prisma, { SELF_USER_SELECT } from "../lib/prisma";

export const authenticate: RequestHandler = async (req, res, next) => {
  // If user hasn't a session
  if (!req.session)
    return res.status(401).json({ message: "Authentication is required" });

  if (!req.session.id)
    return res.status(401).json({ message: "Authentication is required" });

  console.log(req.session.userId);

  if (!req.session.userId)
    return res.status(401).json({ message: "Authentication is required" });

  // Find user from DB
  const user = await prisma.user.findFirst({
    where: { id: req.session.userId },
    select: SELF_USER_SELECT,
  });

  // If user has been deleted
  if (!user)
    return res.status(401).json({ message: "Authentication is required" });

  res.locals.user = user;

  next();
};
