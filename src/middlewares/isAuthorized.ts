import { RequestHandler } from "express";
import Boom, { unauthorized } from "@hapi/boom";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UsersRepository } from "../repositories/user";

dotenv.config();

const tokenSecret = process.env.TOKEN_SECRET;

export const isAuthorized: RequestHandler = async (
  req,
  res,
  next
): Promise<void> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw unauthorized("Invalid token.");
    }

    let userId: string;

    jwt.verify(token, tokenSecret, (err, encoded) => {
      if (err) throw unauthorized("Token expired");
      userId = (encoded as { userId: string; iat: number; exp: number }).userId;
    });

    const user = UsersRepository.findById(userId!);
    if (!user) throw unauthorized("Invalid token.");

    next();
  } catch (err) {
    next(err);
  }
};
