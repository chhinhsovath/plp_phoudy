import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_DATABASE || 'plp_edtech_db',
    entities: [join(__dirname, '../entities/**/*.entity{.ts,.js}')],
    synchronize: false, // Enable for development to auto-create tables
    logging: process.env.NODE_ENV === 'development',
    // Add these options for better stability
    migrationsRun: false,
    connectTimeoutMS: 10000,
    retryAttempts: 3,
    retryDelay: 3000,
    // Character encoding settings for Unicode support
    extra: {
      charset: 'utf8',
      connectionLimit: 10,
    },
  }),
);
