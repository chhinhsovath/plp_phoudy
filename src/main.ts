import './crypto-polyfill';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as os from 'os';

// Load environment variables from .env file
dotenv.config();

// Helper to get local LAN IP address
function getLocalExternalIp(): string {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    const iface = interfaces[name];
    if (!iface) continue;

    for (const net of iface) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost'; // fallback
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS
  app.enableCors();

  // Serve static files from uploads directory
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // Set global prefix
  app.setGlobalPrefix('api/v1');

  // Set up validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Set up Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('PLP EdTech API')
    .setDescription('API for PLP Platform')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  // Start the server
  const port = process.env.PORT || 8080;
  const host = process.env.HOST || '0.0.0.0'; // Listen on all network interfaces
  await app.listen(port, host);

  const localIp = getLocalExternalIp();

  console.log(
    `🚀 Application is running on: http://${host === '0.0.0.0' ? 'localhost' : host}:${port}/api/v1`,
  );
  console.log(`🌐 Access from local network: http://${localIp}:${port}/api/v1`);
  console.log(
    `🔐 Environment: GEMINI_API_KEY is ${
      Object.keys(process.env).includes('GEMINI_API_KEY') ? 'set' : 'not set'
    }`,
  );
}
bootstrap();
