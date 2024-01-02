import { RequestHandler } from "express";

export const isSelf: RequestHandler = async (req, res, next) => {
  const { userId } = req.params;
  const user = res.locals.user;

  if (userId !== user.id)
    return res
      .status(403)
      .json({ message: "You are not allowed to access this ressource" });

  next();
};
