import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GemmaService } from './gemma.service';
import { ChatDTOGemma } from './dto/chat.dto';

@ApiTags('gemma')
@Controller('gemma')
export class GemmaController {
  constructor(private readonly gemmaService: GemmaService) {}

  @Post('chat')
  @ApiOperation({ summary: 'Send a message to Gemma 3 AI' })
  @ApiResponse({ status: 200, description: 'Returns the AI response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async chat(@Body() request: ChatDTOGemma): Promise<any> {
    const response = await this.gemmaService.sendMessageToGemma(
      request.message,
      request.teacherTitle,
      request.isFirstInteraction,
    );

    return {
      content: response,
      model: 'google/gemma-3-27b-it',
      metadata: {
        source: 'gemma',
        provider: 'openrouter',
      },
    };
  }
}
