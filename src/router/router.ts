import Router from "express";
import { PhotoController } from "../contorollers/photoController";
import { PortfolioController } from "../contorollers/portfolioController";
import { UserController } from "../contorollers/userController";
import { upload } from "../libs/multer";
import { isAuthorized } from "../middlewares/isAuthorized";
import { AuthValidator } from "../validators/authValidator";
import { DeleteValidator } from "../validators/deleteValidator";
import { PortfolioValidator } from "../validators/portfolioValidator";

export const router = Router();

router.post("/sign-up", AuthValidator.checkSignUpBody, UserController.signUp);
router.post("/login", AuthValidator.checkLoginBody, UserController.login);
router.get("/logout", UserController.logout);

router.post(
  "/create-portfolio",
  isAuthorized,
  PortfolioValidator.createPortfolioBody,
  PortfolioController.createPortfolio
);

router.post(
  "/upload-photos",
  isAuthorized,
  upload.array("files"),
  PortfolioValidator.uploadPhotosToPortfolioBody,
  PhotoController.uploadPhotos
);

router.get("/feed", PhotoController.photoFeed);

router.delete(
  "/photo",
  isAuthorized,
  DeleteValidator.checkPhotoBody,
  PhotoController.delete
);
router.delete(
  "/portfolio",
  isAuthorized,
  DeleteValidator.checkPortfolioBody,
  PortfolioController.delete
);
router.delete("/user", isAuthorized, UserController.delete);
