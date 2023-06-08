import { RequestHandler } from "express";
import { badRequest, notFound, unauthorized } from "@hapi/boom";
import { compare, hash } from "bcryptjs";
import { v4 as uuid } from "uuid";
import {
  AccessTokenInResponse,
  BaseResponse,
  LogInRequest,
  SignUpRequest,
  SignUpResponse,
  TypedResponse,
} from "../types";
import { UsersRepository } from "../repositories/user";
import UserDTO from "../dtos/user";
import { createTokens } from "../libs/jwtTokens";
import { SessionDTO } from "../dtos/session";
import { SessionRepository } from "../repositories/session";
import { getUserIdFromToken } from "../libs/getUserIdFromToken";
import { PhotoRepository } from "../repositories/photo";
import { PortfolioRepository } from "../repositories/portfolio";

export class UserController {
  static signUp: RequestHandler = async (
    req: SignUpRequest,
    res: TypedResponse<SignUpResponse>,
    next
  ) => {
    const login = req.body.login.toLowerCase();
    const { password } = req.body;

    try {
      const userExist = await UsersRepository.exist(login);
      if (userExist) throw badRequest(`User with login - ${login} is exist.`);

      const hashedPassword = await hash(password, 7);

      const newUser = new UserDTO(uuid(), login, hashedPassword);

      await UsersRepository.create(newUser);

      res.status(200).json({ message: "User is registered.", login, password });
    } catch (err) {
      next(err);
    }
  };

  static login: RequestHandler = async (
    req: LogInRequest,
    res: TypedResponse<AccessTokenInResponse>,
    next
  ) => {
    const login = req.body.login.toLowerCase();
    const { password } = req.body;

    try {
      const user = await UsersRepository.exist(login);
      if (!user) throw notFound(`User with login - ${login} isn't exist.`);
      const { userId } = user;
      const hashedPassword = user.password;

      await compare(password, hashedPassword).then((same) => {
        if (!same) throw badRequest("Password is incorrect.");
      });

      const tokens = createTokens(userId);

      // session expire in - 5 days
      const refreshTokenExpTime = Math.floor(Date.now() + 432000000);

      const sessionExpireTimestamp = new Date(refreshTokenExpTime);

      const newSession = new SessionDTO(
        uuid(),
        userId,
        tokens.refreshToken,
        sessionExpireTimestamp as unknown as Date
      );

      await SessionRepository.create(newSession);

      res
        .cookie("refreshToken", tokens.refreshToken, {
          httpOnly: true,
          sameSite: "strict",
        })
        .json({ accessToken: tokens.accessToken });
    } catch (err) {
      next(err);
    }
  };

  static logout: RequestHandler = async (
    req,
    res: TypedResponse<BaseResponse>,
    next
  ) => {
    const userId = getUserIdFromToken(
      req.header("Authorization")?.replace("Bearer ", "")!
    );
    try {
      await SessionRepository.delete(userId);
      res.clearCookie("refreshToken");

      res.status(200).json({ message: "You`ve been logout" });
    } catch (err) {
      next(err);
    }
  };

  static delete: RequestHandler = async (
    req,
    res: TypedResponse<BaseResponse>,
    next
  ) => {
    const userId = getUserIdFromToken(
      req.header("Authorization")?.replace("Bearer ", "")!
    );
    try {
      const session = await SessionRepository.find(userId);
      if (!session?.length) throw unauthorized();

      await PhotoRepository.deleteAll(userId);
      await PortfolioRepository.deleteAll(userId);
      await SessionRepository.delete(userId);
      await UsersRepository.delete(userId);

      res.status(200).json({ message: "User deleted!" });
    } catch (err) {
      next(err);
    }
  };
}
