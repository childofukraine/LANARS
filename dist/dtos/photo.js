"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoDTO = void 0;
class PhotoDTO {
    constructor(photoId, photoUrl, name, description, comment, portfolioName, userId, createdAt) {
        this.photoId = photoId;
        this.photoUrl = photoUrl;
        this.name = name;
        this.description = description;
        this.comment = comment;
        this.portfolioName = portfolioName;
        this.userId = userId;
        this.createdAt = createdAt;
    }
}
exports.PhotoDTO = PhotoDTO;
