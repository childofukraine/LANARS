import Joi from "joi";
import { badData } from "@hapi/boom";
import { RequestHandler } from "express";

export class PortfolioValidator {
  static createPortfolioBody: RequestHandler = (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
    });

    try {
      const value = schema.validate(req.body);
      if (value.error?.message) throw badData(value.error?.message);
      next();
    } catch (err) {
      next(err);
    }
  };

  static uploadPhotosToPortfolioBody: RequestHandler = (req, res, next) => {
    const bodySchema = Joi.object({
      portfolioName: Joi.string().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      comment: Joi.string().required(),
    });

    const fileSchema = Joi.array().required().label("files");

    try {
      const valueBody = bodySchema.validate(req.body);
      if (valueBody.error?.message) throw badData(valueBody.error?.message);

      const valueFile = fileSchema.validate(req.files);
      if (valueFile.error?.message) throw badData(valueFile.error?.message);

      next();
    } catch (err) {
      next(err);
    }
  };
}
