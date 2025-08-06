import { GemmaService } from './gemma.service';
import { ChatDTOGemma } from './dto/chat.dto';
export declare class GemmaController {
    private readonly gemmaService;
    constructor(gemmaService: GemmaService);
    chat(request: ChatDTOGemma): Promise<any>;
}
