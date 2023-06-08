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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoRepository = void 0;
const data_source_1 = require("../database/data-source");
const Photo_1 = require("../database/entity/Photo");
class PhotoRepository {
    static create(photo) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.insert(photo);
        });
    }
    static getPhotos() {
        return __awaiter(this, void 0, void 0, function* () {
            const photos = yield this.repository.find({
                select: {
                    photoUrl: true,
                    description: true,
                    portfolioName: true,
                },
                order: {
                    createdAt: "DESC",
                },
            });
            return photos;
        });
    }
    static findByIdAndUrl(photoUrl, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const photo = yield this.repository
                .createQueryBuilder("photo")
                .where("photo.photoUrl = :photoUrl", { photoUrl })
                .andWhere("photo.userId = :userId", { userId })
                .getMany();
            return photo;
        });
    }
    static delete(photoUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.delete({ photoUrl });
        });
    }
    static deleteAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.delete({ userId });
        });
    }
    static deleteByUserIdAndPortfolioName(userId, portfolioName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository
                .createQueryBuilder("photo")
                .delete()
                .where("portfolioName = :portfolioName", { portfolioName })
                .andWhere("userId = :userId", { userId })
                .execute();
        });
    }
}
exports.PhotoRepository = PhotoRepository;
PhotoRepository.repository = data_source_1.AppDataSource.getRepository(Photo_1.Photo);
