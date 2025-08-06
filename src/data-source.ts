import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_DATABASE || 'plp_edtech_db',
  synchronize: false,
  logging: false,
  entities: [join(__dirname, './entities/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, './migrations/**/*{.ts,.js}')],
  subscribers: [join(__dirname, './subscribers/**/*{.ts,.js}')],
});
