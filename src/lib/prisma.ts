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

export const CHANNEL_SELECT = {};

export const GUILD_SELECT = {};
