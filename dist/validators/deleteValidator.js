"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const boom_1 = require("@hapi/boom");
class DeleteValidator {
}
exports.DeleteValidator = DeleteValidator;
DeleteValidator.checkPhotoBody = (req, _res, next) => {
    var _a;
    const schema = joi_1.default.object({
        photoUrl: joi_1.default.string().required(),
    });
    try {
        const value = schema.validate(req.body);
        if ((_a = value.error) === null || _a === void 0 ? void 0 : _a.message)
            throw (0, boom_1.badData)(value.error.message);
        next();
    }
    catch (err) {
        next(err);
    }
};
DeleteValidator.checkPortfolioBody = (req, _res, next) => {
    var _a;
    const schema = joi_1.default.object({
        portfolioId: joi_1.default.string().required(),
    });
    try {
        const value = schema.validate(req.body);
        if ((_a = value.error) === null || _a === void 0 ? void 0 : _a.message)
            throw (0, boom_1.badData)(value.error.message);
        next();
    }
    catch (err) {
        next(err);
    }
};
