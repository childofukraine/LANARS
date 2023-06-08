import { Request, Response } from "express";
import { Send } from "express-serve-static-core";
import { Portfolio } from "./database/entity/Portfolio";

export interface BaseResponse {
  message: string;
}

export interface SignUpRequest extends Request {
  body: {
    login: string;
    password: string;
  };
}

export interface SignUpResponse {
  message: string;
  login: string;
  password: string;
}

export interface LogInRequest extends Request {
  body: {
    login: string;
    password: string;
  };
}

export interface AccessTokenInResponse {
  accessToken: string;
}

export interface CreatePortfolioRequest extends Request {
  body: {
    name: string;
    description: string;
  };
}

export interface CreatePortfolioResponse {
  message: string;
  portfolio: Portfolio;
}

export interface UploadPhotosRequest extends Request {
  body: {
    portfolioName: string;
    name: string;
    description: string;
    comment: string;
  };
}

export interface UploadPhotosResponse extends BaseResponse {}

export interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

export interface DeletePhotoRequest extends Request {
  body: {
    photoUrl: string;
  };
}

export interface DeletePortfolioRequest extends Request {
  body: {
    portfolioId: string;
  };
}

export interface TypedResponse<ResBody> extends Response {
  json: Send<ResBody, this>;
}
