import { Controller, Get, Post, Body, Query, UseGuards, Patch, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { QuestionsService } from '../questions/questions.service';
import { AnswersService } from '../answers/answers.service';
import { ConfigService } from '@nestjs/config';
import { LessonActivitiesService } from './lesson-activities.service';
import { Logger } from '@nestjs/common';
import {
  QuestionDto,
  AnswerDto,
  QuestionWithAnswers,
} from './interfaces/question-with-answers.interface';
import { Answer } from '../../entities/answer.entity';
import { CreateLessonActivityDto } from './dto/create-lesson-activity.dto';
import { UpdateLessonActivityDto } from './dto/update-lesson-activity.dto';
import { LessonActivity } from '../../entities/lesson-activity.entity';
import { Status } from '../../entities/enums/status.enum';

@ApiTags('Lesson Activities')
@Controller('lesson-activities')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LessonActivitiesController {
  private readonly logger = new Logger(LessonActivitiesController.name);
  private readonly baseUrl: string;

  constructor(
    private readonly questionsService: QuestionsService,
    private readonly answersService: AnswersService,
    private readonly configService: ConfigService,
    private readonly lessonActivitiesService: LessonActivitiesService,
  ) {
    this.baseUrl = this.configService.get<string>(
      'APP_BASE_URL',
      'http://192.168.0.144:8080',
    );
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all lesson activities' })
  @ApiResponse({
    status: 200,
    description: 'Return all lesson activities',
  })
  @ApiBearerAuth()
  async findAllLessonActivities(): Promise<any[]> {
    return this.lessonActivitiesService.findAll();
  }

  @Get()
  @ApiOperation({ summary: 'Get lesson activity with questions and answers' })
  @ApiResponse({
    status: 200,
    description: 'Return questions with answers',
    type: [QuestionWithAnswers],
  })
  @ApiQuery({ name: 'subjectId', required: true, type: Number })
  @ApiQuery({ name: 'gradeLevel', required: true, type: Number })
  @ApiQuery({ name: 'lessonId', required: true, type: Number })
  @ApiQuery({ name: 'activity', required: false, type: String })
  @ApiQuery({ name: 'lessonActivitiesId', required: false, type: Number })
  @ApiQuery({ name: 'lessonActivityId', required: false, type: Number })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: Status,
    description: 'Filter questions by status (ACTIVE, INACTIVE, SUSPENDED)',
  })
  @ApiBearerAuth()
  async getLessonActivityWithQuestionsAndAnswers(
    @Query('subjectId') subjectId: number,
    @Query('gradeLevel') gradeLevel: number,
    @Query('lessonId') lessonId: number,
    @Query('activity') activity?: string,
    @Query('lessonActivitiesId') lessonActivitiesId?: number,
    @Query('lessonActivityId') lessonActivityId?: number,
    @Query('status') status?: Status,
  ): Promise<QuestionWithAnswers[]> {
    // Determine which ID to use (support both parameter names)
    const effectiveActivityId = lessonActivitiesId ?? lessonActivityId;

    this.logger.debug(
      `Fetching questions for subject=${subjectId}, grade=${gradeLevel}, lesson=${lessonId}, activity=${activity}, activityId=${effectiveActivityId}`,
    );

    let rawQuestions: any[];

    // If an activity ID is provided, get questions for that specific activity
    if (effectiveActivityId) {
      if (status) {
        // Filter by both activity ID and status
        rawQuestions =
          await this.questionsService.findByLessonActivityIdAndStatus(
            effectiveActivityId,
            status,
          );
        this.logger.debug(
          `Found ${rawQuestions.length} questions for activity ID ${effectiveActivityId} with status ${status}`,
        );
      } else {
        // Filter by activity ID only
        rawQuestions =
          await this.questionsService.findByLessonActivityId(
            effectiveActivityId,
          );
        this.logger.debug(
          `Found ${rawQuestions.length} questions for activity ID ${effectiveActivityId}`,
        );
      }
    } else {
      if (status) {
        // Filter by status only
        rawQuestions = await this.questionsService.findByStatus(status);
        this.logger.debug(
          `Found ${rawQuestions.length} questions with status ${status}`,
        );
      } else {
        // Fall back to getting all questions (could be filtered further if needed)
        rawQuestions = await this.questionsService.findAll();
        this.logger.debug(
          `Found ${rawQuestions.length} total questions as fallback`,
        );
      }
    }

    // Map raw questions to QuestionDto format
    const questions: QuestionDto[] = rawQuestions.map((q) => ({
      id: q.id,
      introduction: q.introduction,
      question_text: q.questionText,
      question_type: q.questionTypeKey || '',
      question_type_id: q.questionTypeId || null,
      question_type_name: q.questionTypeLabel || '',
      sound_id: null, // Field removed from schema
      difficulty_level: q.difficultyLevel,
      question_order: null, // Field removed from schema
      grade_level: q.gradeLevel || 1,
      lessonActivitiesId: q.lessonActivitiesId,
      question_image: q.questionImage,
      subjectId: q.subjectId || 1,
      status: q.status,
      created_at: q.createdAt,
      updated_at: q.updatedAt,
    }));

    // Create a list of objects containing questions with their respective answers
    const questionsWithAnswers = await Promise.all(
      questions.map(async (question) => {
        // Get answers and add full URLs for answer images
        const answers =
          await this.answersService.findByQuestionIdOrderByOrderIndex(
            question.id,
          );
        const answersWithFullImagePaths = answers.map((answer) =>
          this.convertAnswerToObject(answer),
        );

        const questionWithAnswers = new QuestionWithAnswers();
        questionWithAnswers.id = question.id;
        questionWithAnswers.introduction = question.introduction || undefined;
        questionWithAnswers.questionText = question.question_text;
        questionWithAnswers.questionType = question.question_type;
        questionWithAnswers.questionTypeId =
          question.question_type_id || undefined;
        questionWithAnswers.questionTypeName =
          question.question_type_name || undefined;
        questionWithAnswers.soundId = question.sound_id || undefined;
        questionWithAnswers.soundFileLocation = question.sound_file_location
          ? `${this.baseUrl}/uploads/${question.sound_file_location}`
          : undefined;
        questionWithAnswers.difficultyLevel =
          question.difficulty_level || undefined;
        questionWithAnswers.questionOrder =
          question.question_order || undefined;
        questionWithAnswers.gradeLevel = question.grade_level || undefined;
        questionWithAnswers.lessonId = question.lessonId || undefined;
        questionWithAnswers.lessonNumber = question.lesson_number || undefined;
        questionWithAnswers.lessonActivitiesId =
          question.lessonActivitiesId || undefined;
        questionWithAnswers.questionImage = question.question_image
          ? question.question_image.startsWith('http')
            ? question.question_image
            : `${this.baseUrl}/uploads/${question.question_image}`
          : undefined;
        questionWithAnswers.solutionExplanation =
          question.solution_explanation || undefined;
        questionWithAnswers.subjectId = question.subjectId || undefined;
        questionWithAnswers.status = question.status;
        questionWithAnswers.answers = answersWithFullImagePaths;
        questionWithAnswers.createdAt = question.created_at;
        questionWithAnswers.updatedAt = question.updated_at;

        return questionWithAnswers;
      }),
    );

    this.logger.debug(
      `Returning ${questionsWithAnswers.length} questions with answers`,
    );
    return questionsWithAnswers;
  }

  @Get('by-grade-and-subject')
  @ApiOperation({
    summary: 'Get lesson activities by grade level and subject ID',
  })
  @ApiResponse({
    status: 200,
    description:
      'Return lesson activities filtered by grade level and subject ID',
  })
  @ApiBearerAuth()
  async findByGradeLevelAndSubjectId(
    @Query('grade_level') gradeLevel: number,
    @Query('subjectId') subjectId: number,
  ): Promise<any[]> {
    return this.lessonActivitiesService.findByGradeLevelAndSubjectId(
      gradeLevel,
      subjectId,
    );
  }

  @Post()
  @ApiOperation({ summary: 'Create a new lesson activity' })
  @ApiResponse({
    status: 201,
    description: 'The lesson activity has been successfully created',
    type: LessonActivity,
  })
  @ApiBearerAuth()
  async create(
    @Body() createLessonActivityDto: CreateLessonActivityDto,
  ): Promise<LessonActivity> {
    this.logger.debug(
      `Creating lesson activity: ${JSON.stringify(createLessonActivityDto)}`,
    );
    return this.lessonActivitiesService.create(createLessonActivityDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a lesson activity' })
  @ApiResponse({
    status: 200,
    description: 'The lesson activity has been successfully updated',
    type: LessonActivity,
  })
  @ApiBearerAuth()
  async update(
    @Param('id') id: number,
    @Body() updateLessonActivityDto: UpdateLessonActivityDto,
  ): Promise<LessonActivity> {
    this.logger.debug(
      `Updating lesson activity ${id}: ${JSON.stringify(updateLessonActivityDto)}`,
    );
    return this.lessonActivitiesService.update(id, updateLessonActivityDto);
  }

  private convertAnswerToObject(answer: Answer): AnswerDto {
    const answerDto: AnswerDto = {
      id: answer.id,
      answerText: answer.answerText || '',
      isCorrect: answer.isCorrect,
      orderIndex: answer.orderIndex,
      displayOrder: answer.displayOrder,
      answerImageUrl: answer.answerFile || undefined,
      answerAudioUrl: undefined,
      answerVideoUrl: undefined,
      matchKey: answer.matchKey || undefined,
      matchValue: answer.matchValue || undefined,
      questionId: answer.questionId,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    };

    // Add full URLs for images if they exist
    if (answer.answerFile) {
      answerDto.answer_image_url = `${this.baseUrl}/uploads/${answer.answerFile}`;
      answerDto.originalAnswerImageUrl = answer.answerFile;
    }

    return answerDto;
  }
}
