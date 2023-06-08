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
exports.PortfolioController = void 0;
const boom_1 = require("@hapi/boom");
const uuid_1 = require("uuid");
const portfolio_1 = require("../dtos/portfolio");
const getUserIdFromToken_1 = require("../libs/getUserIdFromToken");
const photo_1 = require("../repositories/photo");
const portfolio_2 = require("../repositories/portfolio");
const session_1 = require("../repositories/session");
class PortfolioController {
}
exports.PortfolioController = PortfolioController;
_a = PortfolioController;
PortfolioController.createPortfolio = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (0, getUserIdFromToken_1.getUserIdFromToken)((_b = req.header("Authorization")) === null || _b === void 0 ? void 0 : _b.replace("Bearer ", ""));
    const { name, description } = req.body;
    try {
        const session = yield session_1.SessionRepository.find(userId);
        if (!(session === null || session === void 0 ? void 0 : session.length))
            throw (0, boom_1.unauthorized)();
        const newPortfolio = new portfolio_1.PortfolioDTO((0, uuid_1.v4)(), name, description, userId);
        yield portfolio_2.PortfolioRepository.create(newPortfolio);
        res.json({ message: "Portfolio created", portfolio: newPortfolio });
    }
    catch (err) {
        next(err);
    }
});
PortfolioController.delete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const userId = (0, getUserIdFromToken_1.getUserIdFromToken)((_c = req.header("Authorization")) === null || _c === void 0 ? void 0 : _c.replace("Bearer ", ""));
    const { portfolioId } = req.body;
    try {
        const session = yield session_1.SessionRepository.find(userId);
        if (!(session === null || session === void 0 ? void 0 : session.length))
            throw (0, boom_1.unauthorized)();
        const usersPortfolio = yield portfolio_2.PortfolioRepository.findByUserIdAndPortfolioId(portfolioId, userId);
        if (!(usersPortfolio === null || usersPortfolio === void 0 ? void 0 : usersPortfolio.length))
            throw (0, boom_1.forbidden)("Its not your portfolio!");
        yield photo_1.PhotoRepository.deleteByUserIdAndPortfolioName(userId, usersPortfolio[0].name);
        yield portfolio_2.PortfolioRepository.delete(userId, portfolioId);
        res.status(200).json({ message: "Portfolio deleted!" });
    }
    catch (err) {
        next(err);
    }
});
