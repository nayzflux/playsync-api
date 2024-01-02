import { RequestHandler } from "express";

import prisma, { MESSAGE_SELECT } from "../lib/prisma";

import { createMessageSchema } from "../schemas/messageSchema";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const createGuildChannelMessage: RequestHandler = async (req, res) => {
  const body = createMessageSchema.safeParse(req.body);

  if (!body.success) return res.status(400).json(body.error);

  const { content } = body.data;

  const { user, guildId, channelId } = res.locals;

  try {
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
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2003") {
        return res.status(404).json({ message: "Guild or channel not found" });
      }
    }

    res.status(500).json({ message: "Unknown error" });
  }
};

export const getAllGuildChannelMessages: RequestHandler = async (req, res) => {
  const { limit: limitStr = "10", page: pageStr = "1" } = req.query;

  const limit = parseInt(limitStr.toString()) || 10;
  const page = parseInt(pageStr.toString()) || 1;

  const { guildId, channelId } = res.locals;

  const messages = await prisma.message.findMany({
    where: {
      channelId: channelId,
      guildId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: MESSAGE_SELECT,
    skip: (page - 1) * limit,
    take: limit,
  });

  res.status(200).json({ messages });
};

export const getGuildChannelMessage: RequestHandler = async (req, res) => {};

export const updateGuildChannelMessage: RequestHandler = async (req, res) => {};

export const deleteGuildChannelMessage: RequestHandler = async (req, res) => {};
