import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GeminiService } from './gemini.service';
import { ChatDTO } from './dto/chat.dto';

@ApiTags('gemini')
@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('chat')
  @ApiOperation({ summary: 'Send a message to Gemini AI' })
  @ApiResponse({ status: 200, description: 'Returns the AI response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async chat(@Body() request: ChatDTO): Promise<any> {
    const response = await this.geminiService.sendMessageToGemini(
      request.message,
      request.teacherTitle,
      request.isFirstInteraction,
      request.studentData,
      request.classData,
      request.teacherUserId,
      request.classId,
    );

    return {
      content: response,
      model: 'gemini-2.0-flash',
      metadata: {
        source: 'gemini',
      },
    };
  }
}
