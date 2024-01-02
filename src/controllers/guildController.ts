import { RequestHandler } from "express";

import prisma, { GUILD_SELECT } from "../lib/prisma";

import { createGuildSchema } from "../schemas/guildSchema";
import { MemberRole } from "@prisma/client";

export const createGuild: RequestHandler = async (req, res) => {
  const body = createGuildSchema.safeParse(req.body);

  if (!body.success) return res.status(400).json(body.error);

  const { name } = body.data;

  const user = res.locals.user;

  const guild = await prisma.guild.create({
    data: {
      name,
      users: {
        connect: {
          id: user.id,
        },
      },
      members: {
        create: {
          isOwner: true,
          role: MemberRole.ADMIN,
          userId: user.id
        }
      },
    },
    select: GUILD_SELECT,
  });

  res.status(201).json({ guild });
};

export const getGuild: RequestHandler = async (req, res) => {};

export const updateGuild: RequestHandler = async (req, res) => {};

export const deleteGuild: RequestHandler = async (req, res) => {};
