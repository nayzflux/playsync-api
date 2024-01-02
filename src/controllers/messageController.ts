import { RequestHandler } from "express";

import prisma, { MESSAGE_SELECT } from "../lib/prisma";

import { createMessageSchema } from "../schemas/messageSchema";

export const createGuildChannelMessage: RequestHandler = async (req, res) => {
  const body = createMessageSchema.safeParse(req.body);

  if (!body.success) return res.status(400).json(body.error);

  const { content } = body.data;

  const { user, guildId, channelId } = res.locals;

  const message = await prisma.message.create({
    data: {
      content,
      authorId: user.id,
      channelId,
      guildId,
    },
    select: MESSAGE_SELECT,
  });

  res.status(201).json({ message });
};

export const getAllGuildChannelMessages: RequestHandler = async (
  req,
  res
) => {};

export const getGuildChannelMessage: RequestHandler = async (req, res) => {};

export const updateGuildChannelMessage: RequestHandler = async (req, res) => {};

export const deleteGuildChannelMessage: RequestHandler = async (req, res) => {};
