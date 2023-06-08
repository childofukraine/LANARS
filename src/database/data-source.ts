import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from "dotenv";
import { Photo } from "./entity/Photo"
import { Portfolio } from "./entity/Portfolio"
import { Session } from "./entity/Session"
import { User } from "./entity/User"

dotenv.config()


export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    synchronize: true,
    logging: false,
    entities: [Photo, Portfolio, Session, User],
    migrations: ["src/migration/**/*.ts"],
    subscribers: [],
    ssl: true,
})


