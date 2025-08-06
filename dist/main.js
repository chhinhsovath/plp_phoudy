"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./crypto-polyfill");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dotenv = require("dotenv");
const path_1 = require("path");
const os = require("os");
dotenv.config();
function getLocalExternalIp() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        const iface = interfaces[name];
        if (!iface)
            continue;
        for (const net of iface) {
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
    return 'localhost';
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'uploads'), {
        prefix: '/uploads/',
    });
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('PLP EdTech API')
        .setDescription('API for PLP Platform')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/v1/docs', app, document);
    const port = process.env.PORT || 8080;
    const host = process.env.HOST || '0.0.0.0';
    await app.listen(port, host);
    const localIp = getLocalExternalIp();
    console.log(`🚀 Application is running on: http://${host === '0.0.0.0' ? 'localhost' : host}:${port}/api/v1`);
    console.log(`🌐 Access from local network: http://${localIp}:${port}/api/v1`);
    console.log(`🔐 Environment: GEMINI_API_KEY is ${Object.keys(process.env).includes('GEMINI_API_KEY') ? 'set' : 'not set'}`);
}
bootstrap();
//# sourceMappingURL=main.js.map