import { ConfigService } from '@nestjs/config';
export declare class AppConfigService {
    private readonly configService;
    constructor(configService: ConfigService);
    get port(): number;
    get host(): string;
    get geminiApiKey(): string;
}
