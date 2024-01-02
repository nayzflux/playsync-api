import { RequestHandler } from "express";

import prisma, { CHANNEL_SELECT } from "../lib/prisma";

import { createChannelSchema } from "../schemas/channelSchema";

export const createGuildChannel: RequestHandler = async (req, res) => {
  const body = createChannelSchema.safeParse(req.body);

  if (!body.success) return res.status(400).json(body.error);

  const { name, type } = body.data;

  const { guildId } = res.locals;

  console.log({guildId});

  const user = res.locals.user;

  const channel = await prisma.channel.create({
    data: {
      name,
      type,
      guildId,
    },
    select: CHANNEL_SELECT
  });

  res.status(201).json({ channel });
};

export const getGuildChannel: RequestHandler = async (req, res) => {};

export const updateGuildChannel: RequestHandler = async (req, res) => {};

export const deleteGuildChannel: RequestHandler = async (req, res) => {};
