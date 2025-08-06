import { GeminiService } from './gemini.service';
import { ChatDTO } from './dto/chat.dto';
export declare class GeminiController {
    private readonly geminiService;
    constructor(geminiService: GeminiService);
    chat(request: ChatDTO): Promise<any>;
}
