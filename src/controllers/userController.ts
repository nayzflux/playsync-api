import { RequestHandler } from "express";

import { updateUserSchema } from "../schemas/userSchema";
import prisma, { OTHER_USER_SELECT, SELF_USER_SELECT } from "../lib/prisma";

export const getCurrentUser: RequestHandler = async (req, res) => {
  const user = res.locals.user;

  return res.status(200).json({ user });
};

export const getUser: RequestHandler = async (req, res) => {
  const { userId } = req.params;

  const user = await prisma.user.findFirst({
    where: { id: userId },
    select: OTHER_USER_SELECT,
  });

  return res.status(200).json({ user });
};

export const updateUser: RequestHandler = async (req, res) => {
  const { userId } = req.params;

  const body = updateUserSchema.safeParse(req.body);

  if (!body.success) return res.status(400).json(body.error);

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: body.data,
    select: SELF_USER_SELECT,
  });

  return res.status(200).json({ user });
};

export const deleteUser: RequestHandler = async (req, res) => {
  const { userId } = req.params;

  const body = updateUserSchema.safeParse(req.body);

  if (!body.success) return res.status(400).json(body.error);

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: body.data,
    select: SELF_USER_SELECT,
  });

  return res.status(200).json({ user });
};
