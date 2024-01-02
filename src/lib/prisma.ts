import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export const SELF_USER_SELECT = {
  password: false,

  id: true,
  name: true,
  username: true,
  email: true,
  guilds: true,
};

export const SELF_USER_INCLUDE = {
  guilds: true,
};

export const OTHER_USER_SELECT = {
  password: false,

  id: true,
  username: true,
};

export const MEMBER_SELECT = {
  include: {
    user: {
      select: OTHER_USER_SELECT,
    },
  },
};

export const MESSAGE_SELECT = {
  id: true,
  content: true,
  channel: true,
  author: {
    select: OTHER_USER_SELECT,
  },
  member: MEMBER_SELECT,
};

export const CHANNEL_SELECT = {
  id: true,
  name: true,
  type: true,
  messages: { select: MESSAGE_SELECT },
};

export const GUILD_SELECT = {
  id: true,
  name: true,
  channels: { select: CHANNEL_SELECT },
  members: MEMBER_SELECT,
};
