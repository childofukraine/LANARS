"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorHandler_1 = require("./utils/errorHandler");
const router_1 = require("./router/router");
const data_source_1 = require("./database/data-source");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/", router_1.router);
app.use(errorHandler_1.errorHandler);
data_source_1.AppDataSource.initialize()
    .then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server has been started on port ${process.env.PORT || 5000}...`);
    });
})
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
});
