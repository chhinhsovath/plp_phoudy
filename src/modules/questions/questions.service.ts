import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError, In } from 'typeorm';
import { Question, QuestionUsage } from '../../entities/question.entity';
import { QuestionType } from '../../entities/question-type.entity';
import { QuestionExplanation } from '../../entities/question-explanation.entity';
import { LessonActivity } from '../../entities/lesson-activity.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import {
  QuestionWithAnswersDto,
  AnswerDto,
} from './dto/question-with-answers.dto';
import { Status } from '../../entities/enums/status.enum';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(QuestionType)
    private questionTypeRepository: Repository<QuestionType>,
    @InjectRepository(QuestionExplanation)
    private questionExplanationRepository: Repository<QuestionExplanation>,
    @InjectRepository(LessonActivity)
    private lessonActivityRepository: Repository<LessonActivity>,
  ) {}

  async findAll(): Promise<any[]> {
    const questions = await this.questionRepository.find({
      relations: [
        'questionType',
        'lessonActivity',
        'lessonActivity.lesson',
        'lessonActivity.lesson.subject',
        'explanation',
      ],
    });
    return questions.map((question) => this.formatQuestionResponse(question));
  }

  async findAllByOrderByCreatedAtDesc(): Promise<any[]> {
    const questions = await this.questionRepository.find({
      relations: [
        'questionType',
        'lessonActivity',
        'lessonActivity.lesson',
        'lessonActivity.lesson.subject',
        'explanation',
      ],
      order: { createdAt: 'DESC' },
    });
    return questions.map((question) => this.formatQuestionResponse(question));
  }

  async findAllByOrderByQuestionOrderAsc(): Promise<any[]> {
    const questions = await this.questionRepository.find({
      relations: [
        'questionType',
        'lessonActivity',
        'lessonActivity.lesson',
        'lessonActivity.lesson.subject',
        'explanation',
      ],
      order: { createdAt: 'ASC' },
    });
    return questions.map((question) => this.formatQuestionResponse(question));
  }

  async findOne(id: number): Promise<any> {
    const question = await this.questionRepository.findOne({
      where: { id },
      relations: [
        'questionType',
        'lessonActivity',
        'lessonActivity.lesson',
        'lessonActivity.lesson.subject',
        'explanation',
      ],
    });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    return this.formatQuestionResponse(question);
  }

  async findOneWithAnswers(id: number): Promise<QuestionWithAnswersDto> {
    const question = await this.questionRepository.findOne({
      where: { id },
      relations: ['questionType', 'lessonActivity', 'answers'],
    });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    const answers: AnswerDto[] = question.answers.map((answer) => ({
      answer_text: answer.answerText || '',
      answer_image_url: answer.answerFile || '',
      answer_audio_url: '', // Field removed from schema
      answer_video_url: '', // Field removed from schema
      match_key: answer.matchKey || '',
      match_value: answer.matchValue || '',
      is_correct: answer.isCorrect,
      order_index: answer.orderIndex,
      display_order: answer.displayOrder,
    }));

    return {
      id: question.id,
      question_type: question.questionType?.typeKey || '',
      introduction: question.introduction,
      question_text: question.questionText,
      question_audio: question.questionAudio,
      difficulty_level: question.difficultyLevel || '',
      grade_level: 1, // Default value since this field is no longer available
      lesson_number: 1, // Default value since this field is no longer available
      lesson_title: '', // Default value since this field is no longer available
      activity_title: question.lessonActivity?.title || '',
      subject: question.questionType?.label || '',
      subjectId: 1, // Default value since this field is no longer available
      usage_type: question.usageType || QuestionUsage.LEARN,
      random_answers: question.randomAnswers || false,
      answers,
    };
  }

  async findByQuestionTypeId(questionTypeId: number): Promise<any[]> {
    const questions = await this.questionRepository.find({
      where: { questionTypeId },
      relations: [
        'questionType',
        'lessonActivity',
        'lessonActivity.lesson',
        'lessonActivity.lesson.subject',
        'explanation',
      ],
    });
    return questions.map((question) => this.formatQuestionResponse(question));
  }

  async findByDifficultyLevel(level: string): Promise<any[]> {
    const questions = await this.questionRepository.find({
      where: { difficultyLevel: level },
      relations: [
        'questionType',
        'lessonActivity',
        'lessonActivity.lesson',
        'lessonActivity.lesson.subject',
        'explanation',
      ],
    });
    return questions.map((question) => this.formatQuestionResponse(question));
  }

  async findByLessonActivityId(lessonActivitiesId: number): Promise<any[]> {
    const questions = await this.questionRepository.find({
      where: { lessonActivitiesId },
      relations: [
        'questionType',
        'lessonActivity',
        'lessonActivity.lesson',
        'lessonActivity.lesson.subject',
        'explanation',
      ],
      order: { createdAt: 'ASC' },
    });
    return questions.map((question) => this.formatQuestionResponse(question));
  }

  async findByLessonActivityIdAndUsageType(
    lessonActivitiesId: number,
    usageType: QuestionUsage,
  ): Promise<any[]> {
    let usageTypes: QuestionUsage[];

    if (usageType === QuestionUsage.BOTH) {
      // For 'both', include questions with any usage type (exam, learn, or both)
      usageTypes = [
        QuestionUsage.EXAM,
        QuestionUsage.LEARN,
        QuestionUsage.BOTH,
      ];
    } else {
      // For specific usage type, include that type and 'both'
      usageTypes = [usageType, QuestionUsage.BOTH];
    }

    const questions = await this.questionRepository.find({
      where: {
        lessonActivitiesId,
        usageType: In(usageTypes),
      },
      relations: [
        'questionType',
        'lessonActivity',
        'lessonActivity.lesson',
        'lessonActivity.lesson.subject',
        'explanation',
      ],
      order: { createdAt: 'ASC' },
    });
    return questions.map((question) => this.formatQuestionResponse(question));
  }

  async findByUsageType(usageType: QuestionUsage): Promise<any[]> {
    const questions = await this.questionRepository.find({
      where: { usageType },
      relations: [
        'questionType',
        'lessonActivity',
        'lessonActivity.lesson',
        'lessonActivity.lesson.subject',
        'explanation',
      ],
    });
    return questions.map((question) => this.formatQuestionResponse(question));
  }

  async findByStatus(status: Status): Promise<any[]> {
    const questions = await this.questionRepository.find({
      where: { status },
      relations: [
        'questionType',
        'lessonActivity',
        'lessonActivity.lesson',
        'lessonActivity.lesson.subject',
        'explanation',
      ],
    });
    return questions.map((question) => this.formatQuestionResponse(question));
  }

  async findByLessonActivityIdAndStatus(
    lessonActivitiesId: number,
    status: Status,
  ): Promise<any[]> {
    const questions = await this.questionRepository.find({
      where: { lessonActivitiesId, status },
      relations: [
        'questionType',
        'lessonActivity',
        'lessonActivity.lesson',
        'lessonActivity.lesson.subject',
        'explanation',
      ],
      order: { createdAt: 'ASC' },
    });
    return questions.map((question) => this.formatQuestionResponse(question));
  }

  async create(createQuestionDto: CreateQuestionDto): Promise<any> {
    const questionType = await this.questionTypeRepository.findOne({
      where: { id: createQuestionDto.questionTypeId },
    });

    if (!questionType) {
      throw new NotFoundException(
        `Question type with ID ${createQuestionDto.questionTypeId} not found`,
      );
    }

    const question = new Question();
    question.introduction = createQuestionDto.introduction || '';
    question.questionText = createQuestionDto.questionText || '';
    question.questionTypeId = createQuestionDto.questionTypeId;
    question.difficultyLevel = createQuestionDto.difficultyLevel || '';
    question.lessonActivitiesId = createQuestionDto.lessonActivitiesId || null;
    question.questionImage = createQuestionDto.questionImage || '';
    question.questionAudio = createQuestionDto.questionAudio || '';
    question.status =
      createQuestionDto.status === 'INACTIVE' ? Status.INACTIVE : Status.ACTIVE;
    question.usageType = createQuestionDto.usageType || QuestionUsage.LEARN;
    question.randomAnswers = createQuestionDto.randomAnswers || false;
    question.questionType = questionType;

    // Handle lesson activity relationship
    if (createQuestionDto.lessonActivitiesId) {
      const lessonActivity = await this.lessonActivityRepository.findOne({
        where: { id: createQuestionDto.lessonActivitiesId },
      });

      if (!lessonActivity) {
        throw new NotFoundException(
          `Lesson Activity with ID ${createQuestionDto.lessonActivitiesId} not found`,
        );
      }

      question.lessonActivity = lessonActivity;
    }

    let savedQuestion: Question;
    try {
      savedQuestion = await this.questionRepository.save(question);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('duplicate key')
      ) {
        // Fix sequence issue and retry
        await this.fixSequenceIssue();
        savedQuestion = await this.questionRepository.save(question);
      } else {
        throw error;
      }
    }

    // Handle explanation if provided - removed since not in DTO

    // Return the formatted response
    const questionWithRelations = await this.questionRepository.findOne({
      where: { id: savedQuestion.id },
      relations: [
        'questionType',
        'lessonActivity',
        'lessonActivity.lesson',
        'lessonActivity.lesson.subject',
        'explanation',
      ],
    });

    return this.formatQuestionResponse(questionWithRelations!);
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto): Promise<any> {
    const existingQuestion = await this.questionRepository.findOne({
      where: { id },
      relations: ['questionType', 'lessonActivity'],
    });

    if (!existingQuestion) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    if (updateQuestionDto.questionTypeId) {
      const questionType = await this.questionTypeRepository.findOne({
        where: { id: updateQuestionDto.questionTypeId },
      });

      if (!questionType) {
        throw new NotFoundException(
          `Question type with ID ${updateQuestionDto.questionTypeId} not found`,
        );
      }

      existingQuestion.questionType = questionType;
      existingQuestion.questionTypeId = updateQuestionDto.questionTypeId;
    }

    if (updateQuestionDto.lessonActivitiesId) {
      const lessonActivity = await this.lessonActivityRepository.findOne({
        where: { id: updateQuestionDto.lessonActivitiesId },
      });

      if (!lessonActivity) {
        throw new NotFoundException(
          `Lesson Activity with ID ${updateQuestionDto.lessonActivitiesId} not found`,
        );
      }

      existingQuestion.lessonActivity = lessonActivity;
      existingQuestion.lessonActivitiesId =
        updateQuestionDto.lessonActivitiesId;
    } else if (updateQuestionDto.lessonActivitiesId === null) {
      existingQuestion.lessonActivity = null;
      existingQuestion.lessonActivitiesId = null;
    }

    if (updateQuestionDto.introduction !== undefined) {
      existingQuestion.introduction = updateQuestionDto.introduction || '';
    }
    if (updateQuestionDto.questionText !== undefined) {
      existingQuestion.questionText = updateQuestionDto.questionText || '';
    }
    if (updateQuestionDto.difficultyLevel) {
      existingQuestion.difficultyLevel = updateQuestionDto.difficultyLevel;
    }
    if (updateQuestionDto.questionImage !== undefined) {
      existingQuestion.questionImage = updateQuestionDto.questionImage || '';
    }
    if (updateQuestionDto.questionAudio !== undefined) {
      existingQuestion.questionAudio = updateQuestionDto.questionAudio || '';
    }
    if (updateQuestionDto.status) {
      existingQuestion.status =
        updateQuestionDto.status === 'INACTIVE'
          ? Status.INACTIVE
          : Status.ACTIVE;
    }
    if (updateQuestionDto.usageType) {
      existingQuestion.usageType = updateQuestionDto.usageType;
    }
    if (updateQuestionDto.randomAnswers !== undefined) {
      existingQuestion.randomAnswers = updateQuestionDto.randomAnswers;
    }

    const savedQuestion = await this.questionRepository.save(existingQuestion);

    // Handle explanation update - removed since not in DTO

    // Return the formatted response
    const questionWithRelations = await this.questionRepository.findOne({
      where: { id: savedQuestion.id },
      relations: [
        'questionType',
        'lessonActivity',
        'lessonActivity.lesson',
        'lessonActivity.lesson.subject',
        'explanation',
      ],
    });

    return this.formatQuestionResponse(questionWithRelations!);
  }

  async updateStatus(id: number, status: Status): Promise<any> {
    const question = await this.questionRepository.findOne({
      where: { id },
    });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    question.status = status;
    await this.questionRepository.save(question);

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.questionRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
  }

  async removeAll(ids: number[]): Promise<void> {
    await this.questionRepository.delete(ids);
  }

  async updateQuestionOrder(id: number, order: number): Promise<any> {
    // Question order functionality removed since field no longer exists
    return this.findOne(id);
  }

  async updateQuestionOrders(
    questionOrders: Map<number, number>,
  ): Promise<void> {
    // Question order functionality removed since field no longer exists
    return;
  }

  async fixSequenceIssue(): Promise<void> {
    try {
      // Fix the sequence by setting it to the maximum existing ID
      await this.questionRepository.query(
        `SELECT setval('questions_id_seq', (SELECT MAX(id) FROM questions))`,
      );
    } catch (error) {
      console.error('Failed to fix sequence:', error);
      throw new InternalServerErrorException('Database sequence error');
    }
  }

  async findExplanation(questionId: number): Promise<any> {
    const explanation = await this.questionExplanationRepository.findOne({
      where: { questionId },
      relations: ['question'],
    });

    if (!explanation) {
      throw new NotFoundException(
        `Explanation for question with ID ${questionId} not found`,
      );
    }

    return {
      questionId: explanation.questionId,
      explanation: explanation.explanation,
      createdAt: explanation.createdAt,
    };
  }

  async createOrUpdateExplanation(
    questionId: number,
    explanationText: string,
  ): Promise<any> {
    // First verify that the question exists
    const question = await this.questionRepository.findOne({
      where: { id: questionId },
    });

    if (!question) {
      throw new NotFoundException(`Question with ID ${questionId} not found`);
    }

    // Check if explanation already exists
    let explanation = await this.questionExplanationRepository.findOne({
      where: { questionId },
    });

    if (explanation) {
      // Update existing explanation
      explanation.explanation = explanationText;
      await this.questionExplanationRepository.save(explanation);
    } else {
      // Create new explanation
      explanation = this.questionExplanationRepository.create({
        questionId,
        explanation: explanationText,
      });
      await this.questionExplanationRepository.save(explanation);
    }

    return {
      questionId: explanation.questionId,
      explanation: explanation.explanation,
      createdAt: explanation.createdAt,
    };
  }

  async removeExplanation(questionId: number): Promise<void> {
    const result = await this.questionExplanationRepository.delete({
      questionId,
    });

    if (result.affected === 0) {
      throw new NotFoundException(
        `Explanation for question with ID ${questionId} not found`,
      );
    }
  }

  private formatQuestionResponse(question: any): any {
    return {
      id: question.id,
      introduction: question.introduction,
      questionText: question.questionText,
      difficultyLevel: question.difficultyLevel,
      questionTypeId: question.questionTypeId,
      questionTypeKey: question.questionType?.typeKey || '',
      questionTypeLabel: question.questionType?.label || '',
      lessonActivitiesId: question.lessonActivitiesId,
      lessonActivity: question.lessonActivitiesId,
      lessonId: question.lessonActivity?.lessonId || null,
      lessonTitle: question.lessonActivity?.lesson?.title || '',
      gradeLevel: question.lessonActivity?.lesson?.grade_level || null,
      subjectId: question.lessonActivity?.lesson?.subjectId || null,
      subjectNameEn: question.lessonActivity?.lesson?.subject?.name || null,
      subjectNameKh:
        question.lessonActivity?.lesson?.subject?.khmer_name || null,
      questionImage: question.questionImage,
      questionAudio: question.questionAudio,
      explanation: question.explanation?.explanation || null,
      usageType: question.usageType,
      randomAnswers: question.randomAnswers,
      status: question.status,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    };
  }
}
