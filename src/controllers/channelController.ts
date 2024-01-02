import { RequestHandler } from "express";

import prisma, { CHANNEL_SELECT } from "../lib/prisma";

import { createChannelSchema } from "../schemas/channelSchema";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const createGuildChannel: RequestHandler = async (req, res) => {
  const body = createChannelSchema.safeParse(req.body);

  if (!body.success) return res.status(400).json(body.error);

  const { name, type } = body.data;

  const { guildId } = res.locals;

  console.log({ guildId });

  const user = res.locals.user;

  try {
    const channel = await prisma.channel.create({
      data: {
        name,
        type,
        guildId,
      },
      select: CHANNEL_SELECT,
    });

    res.status(201).json({ channel });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2003") {
        return res.status(404).json({ message: "Guild not found" });
      }
    }

    res.status(500).json({ message: "Unknown error" });
  }
};

export const getGuildChannel: RequestHandler = async (req, res) => {
  const { channelId } = req.params;

  const channel = await prisma.channel.findFirst({
    where: {
      id: channelId,
    },
    select: CHANNEL_SELECT,
  });

  if (!channel) return res.status(404).json({ message: "Channel not found" });

  res.status(200).json({ channel });
};

export const updateGuildChannel: RequestHandler = async (req, res) => {};

export const deleteGuildChannel: RequestHandler = async (req, res) => {};
