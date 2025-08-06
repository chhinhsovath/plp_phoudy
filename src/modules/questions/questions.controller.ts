import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Query,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionWithAnswersDto } from './dto/question-with-answers.dto';
import {
  CreateQuestionExplanationDto,
  QuestionExplanationResponseDto,
} from './dto/question-explanation.dto';
import { Question, QuestionUsage } from '../../entities/question.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Status } from '../../entities/enums/status.enum';

@ApiTags('Questions')
@Controller('questions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get('latest')
  @ApiOperation({ summary: 'Get latest questions' })
  @ApiResponse({ status: 200, description: 'Return latest questions' })
  @ApiBearerAuth()
  async getLatestQuestions(): Promise<any[]> {
    return this.questionsService.findAllByOrderByCreatedAtDesc();
  }

  @Get('ordered')
  @ApiOperation({ summary: 'Get ordered questions' })
  @ApiResponse({ status: 200, description: 'Return ordered questions' })
  @ApiBearerAuth()
  async getOrderedQuestions(): Promise<any[]> {
    return this.questionsService.findAllByOrderByQuestionOrderAsc();
  }

  @Get()
  @ApiOperation({ summary: 'Get questions with filters' })
  @ApiResponse({ status: 200, description: 'Return filtered questions' })
  @ApiQuery({ name: 'questionTypeId', required: false })
  @ApiQuery({ name: 'difficultyLevel', required: false })
  @ApiQuery({
    name: 'usageType',
    required: false,
    enum: ['exam', 'learn', 'both'],
  })
  @ApiBearerAuth()
  async getQuestions(
    @Query('questionTypeId') questionTypeId?: string,
    @Query('difficultyLevel') difficultyLevel?: string,
    @Query('usageType') usageType?: string,
  ): Promise<any[]> {
    if (questionTypeId) {
      // Convert type string to number for questionTypeId
      const typeId = parseInt(questionTypeId);
      if (!isNaN(typeId)) {
        return this.questionsService.findByQuestionTypeId(typeId);
      }
    }

    if (difficultyLevel) {
      return this.questionsService.findByDifficultyLevel(difficultyLevel);
    }

    if (
      usageType &&
      Object.values(QuestionUsage).includes(usageType as QuestionUsage)
    ) {
      return this.questionsService.findByUsageType(usageType as QuestionUsage);
    }

    return this.questionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a question by ID' })
  @ApiResponse({ status: 200, description: 'Return the question' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  @ApiBearerAuth()
  async getQuestionById(@Param('id') id: number): Promise<any> {
    return this.questionsService.findOne(id);
  }

  @Get(':id/answers')
  @ApiOperation({ summary: 'Get a question with answers by ID' })
  @ApiResponse({ status: 200, description: 'Return the question with answers' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  @ApiBearerAuth()
  async getQuestionWithAnswers(
    @Param('id') id: number,
  ): Promise<QuestionWithAnswersDto> {
    return this.questionsService.findOneWithAnswers(id);
  }

  @Post()
  @Roles('ADMIN', 'TEACHER')
  @UseInterceptors(FileInterceptor('questionImage'))
  @ApiOperation({ summary: 'Create a new question' })
  @ApiResponse({ status: 201, description: 'Question successfully created' })
  @ApiBearerAuth()
  async create(
    @Body() createQuestionDto: CreateQuestionDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Question> {
    if (file) {
      createQuestionDto.questionImage = file.filename;
    }
    return this.questionsService.create(createQuestionDto);
  }

  @Put(':id')
  @Roles('ADMIN', 'TEACHER')
  @UseInterceptors(FileInterceptor('questionImage'))
  @ApiOperation({ summary: 'Update a question' })
  @ApiResponse({ status: 200, description: 'Question successfully updated' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  @ApiBearerAuth()
  async update(
    @Param('id') id: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Question> {
    if (file) {
      updateQuestionDto.questionImage = file.filename;
    }
    return this.questionsService.update(id, updateQuestionDto);
  }

  @Patch(':id')
  @Roles('ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Update a question (PATCH method)' })
  @ApiResponse({ status: 200, description: 'Question successfully updated' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  @ApiBearerAuth()
  async updatePatch(
    @Param('id') id: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    return this.questionsService.update(id, updateQuestionDto);
  }

  @Patch(':id/status')
  @Roles('ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Update question status' })
  @ApiResponse({
    status: 200,
    description: 'Question status successfully updated',
  })
  @ApiResponse({ status: 404, description: 'Question not found' })
  @ApiBearerAuth()
  async updateQuestionStatus(
    @Param('id') id: number,
    @Body() status: Status,
  ): Promise<Question> {
    return this.questionsService.updateStatus(id, status);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Delete a question' })
  @ApiResponse({ status: 204, description: 'Question successfully deleted' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  @ApiBearerAuth()
  async remove(@Param('id') id: number): Promise<void> {
    return this.questionsService.remove(id);
  }

  @Delete()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Delete multiple questions' })
  @ApiResponse({ status: 204, description: 'Questions successfully deleted' })
  @ApiBearerAuth()
  async removeQuestions(@Body() ids: number[]): Promise<void> {
    return this.questionsService.removeAll(ids);
  }

  @Patch(':id/order')
  @Roles('ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Update question order' })
  @ApiResponse({
    status: 200,
    description: 'Question order successfully updated',
  })
  @ApiResponse({ status: 404, description: 'Question not found' })
  @ApiBearerAuth()
  async updateQuestionOrder(
    @Param('id') id: number,
    @Body() order: number,
  ): Promise<Question> {
    return this.questionsService.updateQuestionOrder(id, order);
  }

  @Patch('orders')
  @Roles('ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Update multiple question orders' })
  @ApiResponse({
    status: 200,
    description: 'Question orders successfully updated',
  })
  @ApiBearerAuth()
  async updateQuestionOrders(
    @Body() questionOrders: Record<string, number>,
  ): Promise<void> {
    const ordersMap = new Map<number, number>();

    for (const [key, value] of Object.entries(questionOrders)) {
      ordersMap.set(Number(key), value);
    }

    return this.questionsService.updateQuestionOrders(ordersMap);
  }

  @Get('by-lesson-activity/:lessonActivityId')
  @ApiOperation({ summary: 'Get questions by lesson activity' })
  @ApiResponse({
    status: 200,
    description: 'Return questions for lesson activity',
  })
  @ApiBearerAuth()
  async getQuestionsByLessonActivity(
    @Param('lessonActivityId') lessonActivityId: number,
  ): Promise<Question[]> {
    return this.questionsService.findByLessonActivityId(lessonActivityId);
  }

  @Get('by-lesson-activity/:lessonActivityId/usage-type/:usageType')
  @ApiOperation({ summary: 'Get questions by lesson activity and usage type' })
  @ApiResponse({
    status: 200,
    description: 'Return questions for lesson activity filtered by usage type',
  })
  @ApiBearerAuth()
  async getQuestionsByLessonActivityAndUsageType(
    @Param('lessonActivityId') lessonActivityId: number,
    @Param('usageType') usageType: QuestionUsage,
  ): Promise<Question[]> {
    return this.questionsService.findByLessonActivityIdAndUsageType(
      lessonActivityId,
      usageType,
    );
  }

  @Get(':id/explanation')
  @ApiOperation({ summary: 'Get explanation for a question' })
  @ApiResponse({
    status: 200,
    description: 'Return the question explanation',
    type: QuestionExplanationResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Question or explanation not found',
  })
  @ApiBearerAuth()
  async getQuestionExplanation(
    @Param('id') id: number,
  ): Promise<QuestionExplanationResponseDto> {
    return this.questionsService.findExplanation(id);
  }

  @Post(':id/explanation')
  @Roles('ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Create or update explanation for a question' })
  @ApiResponse({
    status: 200,
    description: 'Explanation successfully created/updated',
    type: QuestionExplanationResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Question not found' })
  @ApiBearerAuth()
  async createOrUpdateExplanation(
    @Param('id') id: number,
    @Body() explanationDto: CreateQuestionExplanationDto,
  ): Promise<QuestionExplanationResponseDto> {
    return this.questionsService.createOrUpdateExplanation(
      id,
      explanationDto.explanation,
    );
  }

  @Delete(':id/explanation')
  @Roles('ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Delete explanation for a question' })
  @ApiResponse({ status: 204, description: 'Explanation successfully deleted' })
  @ApiResponse({
    status: 404,
    description: 'Question or explanation not found',
  })
  @ApiBearerAuth()
  async deleteExplanation(@Param('id') id: number): Promise<void> {
    return this.questionsService.removeExplanation(id);
  }

  @Post('fix-sequence')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Fix database sequence issue' })
  @ApiResponse({ status: 200, description: 'Sequence fixed successfully' })
  @ApiBearerAuth()
  async fixSequence(): Promise<{ message: string }> {
    await this.questionsService.fixSequenceIssue();
    return { message: 'Database sequence fixed successfully' };
  }
}
