import Joi from "joi";
import { badData } from "@hapi/boom";
import { RequestHandler } from "express";

export class AuthValidator {
  static checkLoginBody: RequestHandler = (req, _res, next) => {
    const schema = Joi.object({
      login: Joi.string()
        .pattern(/^[a-zA-Z_`]/)
        .required(),
      password: Joi.string().alphanum().required(),
    });

    try {
      const value = schema.validate(req.body);
      if (value.error?.message) throw badData(value.error.message);
      next();
    } catch (err) {
      next(err);
    }
  };

  static checkSignUpBody: RequestHandler = (req, _res, next) => {
    const schema = Joi.object({
      login: Joi.string()
        .pattern(/^[a-zA-Z_]+$/, { name: "letters and underscore" })
        .required(),
      password: Joi.string().alphanum().required(),
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
