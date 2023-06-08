"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionDTO = void 0;
class SessionDTO {
    constructor(sessionId, userId, refreshToken, expiresIn) {
        this.sessionId = sessionId;
        this.userId = userId;
        this.refreshToken = refreshToken;
        this.expiresIn = expiresIn;
    }
}
exports.SessionDTO = SessionDTO;
