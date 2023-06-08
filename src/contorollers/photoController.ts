import { forbidden, notFound, unauthorized } from "@hapi/boom";
import { RequestHandler } from "express";
import { v4 as uuid } from "uuid";
import { PhotoDTO } from "../dtos/photo";
import { convertToPng } from "../libs/convertToPng";
import { getUserIdFromToken } from "../libs/getUserIdFromToken";
import { uploadFileToS3 } from "../libs/s3";
import { PhotoRepository } from "../repositories/photo";
import { PortfolioRepository } from "../repositories/portfolio";
import { SessionRepository } from "../repositories/session";
import {
  TypedResponse,
  UploadPhotosRequest,
  UploadPhotosResponse,
  File,
  DeletePhotoRequest,
  BaseResponse,
} from "../types";

export class PhotoController {
  static uploadPhotos: RequestHandler = async (
    req: UploadPhotosRequest,
    res: TypedResponse<UploadPhotosResponse>,
    next
  ) => {
    const { portfolioName, description, comment, name } = req.body;

    const userId = getUserIdFromToken(
      req.header("Authorization")?.replace("Bearer ", "")!
    );

    const files = req.files as File[];

    try {
      const session = await SessionRepository.find(userId);
      if (!session?.length) throw unauthorized();

      const portfolioExist = await PortfolioRepository.exist(portfolioName);
      if (!portfolioExist)
        throw notFound(`Portfolio with name - ${portfolioName} isn't exist.`);

      const createdAt = new Date(Date.now());

      files.forEach(async (f) => {
        let file = f.buffer;
        let extName = f.originalname.split(".").pop()?.toLowerCase();

        if (f.originalname.split(".").pop()?.toLowerCase() === "heic") {
          file = await convertToPng(file);
          extName = "png";
        }

        const newPhoto = new PhotoDTO(
          uuid(),
          await uploadFileToS3(file, extName!),
          name,
          description,
          comment,
          portfolioName,
          userId,
          createdAt
        );

        await PhotoRepository.create(newPhoto);
      });
      res.json({ message: "Photos are uploading." });
    } catch (err) {
      next(err);
    }
  };

  static photoFeed: RequestHandler = async (_req, res, next) => {
    try {
      const photos = await PhotoRepository.getPhotos();
      res.json({ photos });
    } catch (err) {
      next(err);
    }
  };

  static delete: RequestHandler = async (
    req: DeletePhotoRequest,
    res: TypedResponse<BaseResponse>,
    next
  ) => {
    const userId = getUserIdFromToken(
      req.header("Authorization")?.replace("Bearer ", "")!
    );
    const { photoUrl } = req.body;
    try {
      const session = await SessionRepository.find(userId);
      if (!session?.length) throw unauthorized();

      const userHasPhoto = await PhotoRepository.findByIdAndUrl(
        photoUrl,
        userId
      );

      if (!userHasPhoto?.length) throw forbidden("Its not your photo!");

      await PhotoRepository.delete(photoUrl);

      res.status(200).json({ message: "Photo deleted!" });
    } catch (err) {
      next(err);
    }
  };
}
