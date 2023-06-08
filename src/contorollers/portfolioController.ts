import { forbidden, unauthorized } from "@hapi/boom";
import { RequestHandler } from "express";
import { v4 as uuid } from "uuid";
import { PortfolioDTO } from "../dtos/portfolio";
import { getUserIdFromToken } from "../libs/getUserIdFromToken";
import { PhotoRepository } from "../repositories/photo";
import { PortfolioRepository } from "../repositories/portfolio";
import { SessionRepository } from "../repositories/session";
import {
  BaseResponse,
  CreatePortfolioRequest,
  CreatePortfolioResponse,
  DeletePortfolioRequest,
  TypedResponse,
} from "../types";

export class PortfolioController {
  static createPortfolio: RequestHandler = async (
    req: CreatePortfolioRequest,
    res: TypedResponse<CreatePortfolioResponse>,
    next
  ) => {
    const userId = getUserIdFromToken(
      req.header("Authorization")?.replace("Bearer ", "")!
    );

    const { name, description } = req.body;

    try {
      const session = await SessionRepository.find(userId);
      if (!session?.length) throw unauthorized();

      const newPortfolio = new PortfolioDTO(uuid(), name, description, userId);

      await PortfolioRepository.create(newPortfolio);

      res.json({ message: "Portfolio created", portfolio: newPortfolio });
    } catch (err) {
      next(err);
    }
  };

  static delete: RequestHandler = async (
    req: DeletePortfolioRequest,
    res: TypedResponse<BaseResponse>,
    next
  ) => {
    const userId = getUserIdFromToken(
      req.header("Authorization")?.replace("Bearer ", "")!
    );

    const { portfolioId } = req.body;

    try {
      const session = await SessionRepository.find(userId);
      if (!session?.length) throw unauthorized();

      const usersPortfolio =
        await PortfolioRepository.findByUserIdAndPortfolioId(
          portfolioId,
          userId
        );

      if (!usersPortfolio?.length) throw forbidden("Its not your portfolio!");

      await PhotoRepository.deleteByUserIdAndPortfolioName(
        userId,
        usersPortfolio[0].name
      );

      await PortfolioRepository.delete(userId, portfolioId);

      res.status(200).json({ message: "Portfolio deleted!" });
    } catch (err) {
      next(err);
    }
  };
}
