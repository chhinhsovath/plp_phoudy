"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const path_1 = require("path");
(0, dotenv_1.config)();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_DATABASE || 'plp_edtech_db',
    synchronize: false,
    logging: false,
    entities: [(0, path_1.join)(__dirname, './entities/**/*.entity{.ts,.js}')],
    migrations: [(0, path_1.join)(__dirname, './migrations/**/*{.ts,.js}')],
    subscribers: [(0, path_1.join)(__dirname, './subscribers/**/*{.ts,.js}')],
});
//# sourceMappingURL=data-source.js.map