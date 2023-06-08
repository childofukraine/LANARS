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
exports.UsersRepository = void 0;
const data_source_1 = require("../database/data-source");
const User_1 = require("../database/entity/User");
class UsersRepository {
    static create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.insert(user);
        });
    }
    static exist(login) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repository.findOne({ where: { login } });
            return user;
        });
    }
    static findById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.findOne({ where: { userId } });
        });
    }
    static delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.delete({ userId });
        });
    }
}
exports.UsersRepository = UsersRepository;
UsersRepository.repository = data_source_1.AppDataSource.getRepository(User_1.User);
