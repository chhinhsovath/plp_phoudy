import { ConfigService } from '@nestjs/config';
export declare class GemmaService {
    private configService;
    private readonly openRouterApiKey;
    private readonly openRouterApiUrl;
    private readonly gemmaModel;
    constructor(configService: ConfigService);
    sendMessageToGemma(message: string, teacherTitle: string, isFirstInteraction: boolean): Promise<string>;
    private buildPromptTemplate;
    private replaceVietnameseWords;
}
