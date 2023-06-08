"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoController = void 0;
const boom_1 = require("@hapi/boom");
const uuid_1 = require("uuid");
const photo_1 = require("../dtos/photo");
const convertToPng_1 = require("../libs/convertToPng");
const getUserIdFromToken_1 = require("../libs/getUserIdFromToken");
const s3_1 = require("../libs/s3");
const photo_2 = require("../repositories/photo");
const portfolio_1 = require("../repositories/portfolio");
const session_1 = require("../repositories/session");
class PhotoController {
}
exports.PhotoController = PhotoController;
_a = PhotoController;
PhotoController.uploadPhotos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { portfolioName, description, comment, name } = req.body;
    const userId = (0, getUserIdFromToken_1.getUserIdFromToken)((_b = req.header("Authorization")) === null || _b === void 0 ? void 0 : _b.replace("Bearer ", ""));
    const files = req.files;
    try {
        const session = yield session_1.SessionRepository.find(userId);
        if (!(session === null || session === void 0 ? void 0 : session.length))
            throw (0, boom_1.unauthorized)();
        const portfolioExist = yield portfolio_1.PortfolioRepository.exist(portfolioName);
        if (!portfolioExist)
            throw (0, boom_1.notFound)(`Portfolio with name - ${portfolioName} isn't exist.`);
        const createdAt = new Date(Date.now());
        files.forEach((f) => __awaiter(void 0, void 0, void 0, function* () {
            var _c, _d;
            let file = f.buffer;
            let extName = (_c = f.originalname.split(".").pop()) === null || _c === void 0 ? void 0 : _c.toLowerCase();
            if (((_d = f.originalname.split(".").pop()) === null || _d === void 0 ? void 0 : _d.toLowerCase()) === "heic") {
                file = yield (0, convertToPng_1.convertToPng)(file);
                extName = "png";
            }
            const newPhoto = new photo_1.PhotoDTO((0, uuid_1.v4)(), yield (0, s3_1.uploadFileToS3)(file, extName), name, description, comment, portfolioName, userId, createdAt);
            yield photo_2.PhotoRepository.create(newPhoto);
        }));
        res.json({ message: "Photos are uploading." });
    }
    catch (err) {
        next(err);
    }
});
PhotoController.photoFeed = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const photos = yield photo_2.PhotoRepository.getPhotos();
        res.json({ photos });
    }
    catch (err) {
        next(err);
    }
});
PhotoController.delete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const userId = (0, getUserIdFromToken_1.getUserIdFromToken)((_e = req.header("Authorization")) === null || _e === void 0 ? void 0 : _e.replace("Bearer ", ""));
    const { photoUrl } = req.body;
    try {
        const session = yield session_1.SessionRepository.find(userId);
        if (!(session === null || session === void 0 ? void 0 : session.length))
            throw (0, boom_1.unauthorized)();
        const userHasPhoto = yield photo_2.PhotoRepository.findByIdAndUrl(photoUrl, userId);
        if (!(userHasPhoto === null || userHasPhoto === void 0 ? void 0 : userHasPhoto.length))
            throw (0, boom_1.forbidden)("Its not your photo!");
        yield photo_2.PhotoRepository.delete(photoUrl);
        res.status(200).json({ message: "Photo deleted!" });
    }
    catch (err) {
        next(err);
    }
});
