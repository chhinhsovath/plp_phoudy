import {
  Controller,
  Get,
  Delete,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
  Patch,
  Body,
  Logger,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { PromptQuestionsService } from './prompt-questions.service';
import { PromptQuestion } from '../../entities/prompt-question.entity';
import {
  PromptQuestionDto,
  MarkAsSuggestionDto,
  SuggestedPromptResponseDto,
} from './dto/prompt-question.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
@ApiTags('Prompt Questions')
@Controller('prompt-questions')
export class PromptQuestionsController {
  private readonly logger = new Logger(PromptQuestionsController.name);

  constructor(
    private readonly promptQuestionsService: PromptQuestionsService,
  ) {}

  @Get('search')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Search prompt questions directly from database' })
  @ApiResponse({
    status: 200,
    description: 'Return prompt questions from database',
    type: [PromptQuestionDto],
  })
  @ApiQuery({
    name: 'content',
    required: true,
    type: String,
    description: 'Search content for matching questions',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Maximum number of results (default: 10)',
  })
  @ApiBearerAuth()
  async searchQuestions(
    @Query('content') content: string,
    @Query('limit') limit?: number,
  ): Promise<any> {
    this.logger.log(`Searching prompt questions with content: ${content}`);
    const questions =
      await this.promptQuestionsService.searchQuestions(content);
    const maxResults = limit || 10;

    if (questions.length > 0) {
      const results = questions.slice(0, maxResults).map((q) => ({
        id: q.id,
        grade: q.grade,
        domain: q.domain,
        topic: q.topic,
        bloom_level: q.bloom_level,
        difficulty: q.difficulty,
        question_title: q.question_title,
        question_content: q.question_content,
        response: q.response,
        tags: q.tags,
        created_at: q.created_at,
        is_suggestion: q.is_suggestion,
        relevanceScore: this.calculateRelevanceScore(
          content,
          q.question_content,
        ),
        questionType: this.categorizeQuestion(q.question_content),
      }));

      return {
        success: true,
        searchQuery: content,
        totalFound: questions.length,
        returned: results.length,
        questions: results,
        metadata: {
          source: 'database-direct',
          timestamp: new Date().toISOString(),
          processingType: 'no-ai-processing',
        },
      };
    }

    return {
      success: false,
      searchQuery: content,
      totalFound: 0,
      returned: 0,
      questions: [],
      message:
        'រកមិនឃើញសំណួរដែលត្រូវគ្នាទេ។ សូមព្យាយាមប្រើពាក្យគន្លឹះផ្សេងទៀត។',
      metadata: {
        source: 'database-direct',
        timestamp: new Date().toISOString(),
        processingType: 'no-ai-processing',
      },
    };
  }

  private calculateRelevanceScore(query: string, content: string): number {
    const queryWords = query.toLowerCase().split(/\s+/);
    const contentWords = content.toLowerCase().split(/\s+/);
    const matches = queryWords.filter((word) =>
      contentWords.some((cWord) => cWord.includes(word)),
    );
    return Math.round((matches.length / queryWords.length) * 100);
  }

  private categorizeQuestion(content: string): string {
    const lowerContent = content.toLowerCase();
    if (lowerContent.includes('គណិតវិទ្យា') || lowerContent.includes('math'))
      return 'គណិតវិទ្យា';
    if (lowerContent.includes('រូបវិទ្យា') || lowerContent.includes('physics'))
      return 'រូបវិទ្យា';
    if (
      lowerContent.includes('គីមីវិទ្យា') ||
      lowerContent.includes('chemistry')
    )
      return 'គីមីវិទ្យា';
    if (lowerContent.includes('ជីវវិទ្យា') || lowerContent.includes('biology'))
      return 'ជីវវិទ្យា';
    if (lowerContent.includes('ភាសាខ្មែរ') || lowerContent.includes('khmer'))
      return 'ភាសាខ្មែរ';
    if (
      lowerContent.includes('ភាសាអង់គ្លេស') ||
      lowerContent.includes('english')
    )
      return 'ភាសាអង់គ្លេស';
    if (
      lowerContent.includes('ប្រវត្តិសាស្ត្រ') ||
      lowerContent.includes('history')
    )
      return 'ប្រវត្តិសាស្ត្រ';
    if (
      lowerContent.includes('ភូមិសាស្ត្រ') ||
      lowerContent.includes('geography')
    )
      return 'ភូមិសាស្ត្រ';
    return 'ការអប់រំទូទៅ';
  }

  private calculateConfidenceScore(questions: any[]): number {
    if (questions.length === 0) return 0;
    if (questions.length >= 5) return 95;
    if (questions.length >= 3) return 85;
    if (questions.length >= 2) return 75;
    return 60;
  }

  @Get('suggestions')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get suggested prompts for users' })
  @ApiResponse({
    status: 200,
    description: 'Return suggested prompts',
    type: [SuggestedPromptResponseDto],
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Maximum number of suggestions to return',
  })
  @ApiBearerAuth()
  async getSuggestedPrompts(
    @Query('limit') limit?: number,
  ): Promise<{ suggestions: SuggestedPromptResponseDto[] }> {
    this.logger.log(`Getting suggested prompts with limit: ${limit || 10}`);
    const suggestions =
      await this.promptQuestionsService.getSuggestedPrompts(limit);

    return { suggestions };
  }

  @Patch('admin/:id/suggestion')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({
    summary: 'Mark a prompt question as a suggestion (admin only)',
  })
  @ApiResponse({
    status: 200,
    description: 'Prompt question updated successfully',
    type: PromptQuestionDto,
  })
  @ApiResponse({ status: 404, description: 'Prompt question not found' })
  @ApiParam({ name: 'id', description: 'Prompt question ID' })
  @ApiBody({ type: MarkAsSuggestionDto })
  @ApiBearerAuth()
  async markAsSuggestion(
    @Param('id', ParseIntPipe) id: number,
    @Body() markAsSuggestionDto: MarkAsSuggestionDto,
  ): Promise<PromptQuestion> {
    this.logger.log(
      `Marking prompt question ${id} as suggestion: ${markAsSuggestionDto.is_suggestion}`,
    );
    return await this.promptQuestionsService.markAsSuggestion(
      id,
      markAsSuggestionDto.is_suggestion,
    );
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Get all prompt questions (admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Return all prompt questions',
    type: [PromptQuestionDto],
  })
  @ApiBearerAuth()
  async getAllQuestions(): Promise<PromptQuestion[]> {
    this.logger.log('Getting all prompt questions');
    return await this.promptQuestionsService.getAllQuestions();
  }

  @Delete('admin/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Delete a prompt question (admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Prompt question deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Prompt question not found' })
  @ApiBearerAuth()
  async deleteQuestion(@Param('id', ParseIntPipe) id: number): Promise<void> {
    this.logger.log(`Deleting prompt question with ID: ${id}`);
    await this.promptQuestionsService.deleteQuestion(id);
  }
}
