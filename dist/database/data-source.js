"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const Photo_1 = require("./entity/Photo");
const Portfolio_1 = require("./entity/Portfolio");
const Session_1 = require("./entity/Session");
const User_1 = require("./entity/User");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    synchronize: true,
    logging: false,
    entities: [Photo_1.Photo, Portfolio_1.Portfolio, Session_1.Session, User_1.User],
    migrations: ["src/migration/**/*.ts"],
    subscribers: [],
    ssl: true,
});
