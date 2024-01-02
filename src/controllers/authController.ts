import { RequestHandler } from "express";
import bcrypt from "bcrypt";

import { signInSchema, signUpSchema } from "../schemas/authSchema";

import prisma, { SELF_USER_INCLUDE, SELF_USER_SELECT } from "../lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const signUp: RequestHandler = async (req, res) => {
  const body = signUpSchema.safeParse(req.body);

  if (!body.success) return res.status(400).json(body.error);

  const { name, username, email, password } = body.data;

  // Hash password
  const hash = await bcrypt.hash(password, 10);

  try {
    // Store user in DB
    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hash,
      },
      select: SELF_USER_SELECT,
    });

    // Set userId in session
    req.session.userId = user.id;

    res.status(201).json({ user });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      // If unique there is constraint
      if (err.code === "P2002") {
        return res
          .status(409)
          .json({ message: "Username or email already exists" });
      }

      return res.status(500).json({ message: "Unknown error" });
    }
  }
};

export const signIn: RequestHandler = async (req, res) => {
  const body = signInSchema.safeParse(req.body);

  if (!body.success) {
    return res.status(400).json(body.error);
  }

  const { email, password } = body.data;

  // Find user from DB
  const user = await prisma.user.findFirst({
    where: { email },
    include: SELF_USER_INCLUDE,
  });

  // If user is not find
  if (!user) return res.status(404).json({ message: "User not found" });

  // Check if password match
  const isMatching = await bcrypt.compare(password, user.password);

  if (!isMatching)
    return res.status(403).json({ message: "Incorrect password" });

  // Set userId in session
  req.session.userId = user.id;

  res.status(200).json({
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      guilds: user.guilds,
    },
  });
};

export const logout: RequestHandler = async (req, res) => {};
