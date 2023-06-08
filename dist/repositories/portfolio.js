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
exports.PortfolioRepository = void 0;
const data_source_1 = require("../database/data-source");
const Portfolio_1 = require("../database/entity/Portfolio");
class PortfolioRepository {
    static create(portfolio) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.insert(portfolio);
        });
    }
    static exist(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const portfolio = yield this.repository.findOne({ where: { name } });
            return portfolio;
        });
    }
    static findByUserIdAndPortfolioId(portfolioId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const portfolio = yield this.repository
                .createQueryBuilder("portfolio")
                .where("portfolio.portfolioId = :portfolioId", { portfolioId })
                .andWhere("portfolio.userId = :userId", { userId })
                .getMany();
            return portfolio;
        });
    }
    static delete(userId, portfolioId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository
                .createQueryBuilder("portfolio")
                .delete()
                .where("portfolioId = :portfolioId", { portfolioId })
                .andWhere("userId = :userId", { userId })
                .execute();
        });
    }
    static deleteAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.delete({ userId });
        });
    }
}
exports.PortfolioRepository = PortfolioRepository;
PortfolioRepository.repository = data_source_1.AppDataSource.getRepository(Portfolio_1.Portfolio);
