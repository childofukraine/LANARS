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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const boom_1 = require("@hapi/boom");
const bcryptjs_1 = require("bcryptjs");
const uuid_1 = require("uuid");
const user_1 = require("../repositories/user");
const user_2 = __importDefault(require("../dtos/user"));
const jwtTokens_1 = require("../libs/jwtTokens");
const session_1 = require("../dtos/session");
const session_2 = require("../repositories/session");
const getUserIdFromToken_1 = require("../libs/getUserIdFromToken");
const photo_1 = require("../repositories/photo");
const portfolio_1 = require("../repositories/portfolio");
class UserController {
}
exports.UserController = UserController;
_a = UserController;
UserController.signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const login = req.body.login.toLowerCase();
    const { password } = req.body;
    try {
        const userExist = yield user_1.UsersRepository.exist(login);
        if (userExist)
            throw (0, boom_1.badRequest)(`User with login - ${login} is exist.`);
        const hashedPassword = yield (0, bcryptjs_1.hash)(password, 7);
        const newUser = new user_2.default((0, uuid_1.v4)(), login, hashedPassword);
        yield user_1.UsersRepository.create(newUser);
        res.status(200).json({ message: "User is registered.", login, password });
    }
    catch (err) {
        next(err);
    }
});
UserController.login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const login = req.body.login.toLowerCase();
    const { password } = req.body;
    try {
        const user = yield user_1.UsersRepository.exist(login);
        if (!user)
            throw (0, boom_1.notFound)(`User with login - ${login} isn't exist.`);
        const { userId } = user;
        const hashedPassword = user.password;
        yield (0, bcryptjs_1.compare)(password, hashedPassword).then((same) => {
            if (!same)
                throw (0, boom_1.badRequest)("Password is incorrect.");
        });
        const tokens = (0, jwtTokens_1.createTokens)(userId);
        // session expire in - 5 days
        const refreshTokenExpTime = Math.floor(Date.now() + 432000000);
        const sessionExpireTimestamp = new Date(refreshTokenExpTime);
        const newSession = new session_1.SessionDTO((0, uuid_1.v4)(), userId, tokens.refreshToken, sessionExpireTimestamp);
        yield session_2.SessionRepository.create(newSession);
        res
            .cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            sameSite: "strict",
        })
            .json({ accessToken: tokens.accessToken });
    }
    catch (err) {
        next(err);
    }
});
UserController.logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (0, getUserIdFromToken_1.getUserIdFromToken)((_b = req.header("Authorization")) === null || _b === void 0 ? void 0 : _b.replace("Bearer ", ""));
    try {
        yield session_2.SessionRepository.delete(userId);
        res.clearCookie("refreshToken");
        res.status(200).json({ message: "You`ve been logout" });
    }
    catch (err) {
        next(err);
    }
});
UserController.delete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const userId = (0, getUserIdFromToken_1.getUserIdFromToken)((_c = req.header("Authorization")) === null || _c === void 0 ? void 0 : _c.replace("Bearer ", ""));
    try {
        const session = yield session_2.SessionRepository.find(userId);
        if (!(session === null || session === void 0 ? void 0 : session.length))
            throw (0, boom_1.unauthorized)();
        yield photo_1.PhotoRepository.deleteAll(userId);
        yield portfolio_1.PortfolioRepository.deleteAll(userId);
        yield session_2.SessionRepository.delete(userId);
        yield user_1.UsersRepository.delete(userId);
        res.status(200).json({ message: "User deleted!" });
    }
    catch (err) {
        next(err);
    }
});
