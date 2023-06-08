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
exports.SessionRepository = void 0;
const data_source_1 = require("../database/data-source");
const Session_1 = require("../database/entity/Session");
class SessionRepository {
    static create(session) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.insert(session);
        });
    }
    static find(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sessions = yield this.repository.findBy({ userId });
            return sessions;
        });
    }
    static delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.delete({ userId });
        });
    }
}
exports.SessionRepository = SessionRepository;
SessionRepository.repository = data_source_1.AppDataSource.getRepository(Session_1.Session);
