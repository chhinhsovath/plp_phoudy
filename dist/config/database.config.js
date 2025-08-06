"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const path_1 = require("path");
exports.default = (0, config_1.registerAs)('database', () => ({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_DATABASE || 'plp_edtech_db',
    entities: [(0, path_1.join)(__dirname, '../entities/**/*.entity{.ts,.js}')],
    synchronize: false,
    logging: process.env.NODE_ENV === 'development',
    migrationsRun: false,
    connectTimeoutMS: 10000,
    retryAttempts: 3,
    retryDelay: 3000,
    extra: {
        charset: 'utf8',
        connectionLimit: 10,
    },
}));
//# sourceMappingURL=database.config.js.map