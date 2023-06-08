import Joi from "joi";
import { badData } from "@hapi/boom";
import { RequestHandler } from "express";

export class DeleteValidator {
  static checkPhotoBody: RequestHandler = (req, _res, next) => {
    const schema = Joi.object({
      photoUrl: Joi.string().required(),
    });

    try {
      const value = schema.validate(req.body);
      if (value.error?.message) throw badData(value.error.message);
      next();
    } catch (err) {
      next(err);
    }
  };

  static checkPortfolioBody: RequestHandler = (req, _res, next) => {
    const schema = Joi.object({
      portfolioId: Joi.string().required(),
    });

    try {
      const value = schema.validate(req.body);
      if (value.error?.message) throw badData(value.error.message);
      next();
    } catch (err) {
      next(err);
    }
  };
}
