import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get port(): number {
    return Number(this.configService.get<number>('PORT', 8080));
  }

  get host(): string {
    return this.configService.get<string>('HOST', '0.0.0.0');
  }

  get geminiApiKey(): string {
    const key = this.configService.get<string>('GEMINI_API_KEY');
    if (!key) {
      throw new Error('GEMINI_API_KEY is not set in environment');
    }
    return key;
  }
}
