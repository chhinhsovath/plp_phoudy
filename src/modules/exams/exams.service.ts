import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exam } from '../../entities/exam.entity';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { GradeLevelType } from '../../entities/class.entity';
import { ExamQuestionsService } from '../exam-questions/exam-questions.service';
import { CreateExamQuestionDto } from '../exam-questions/dto/create-exam-question.dto';

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
    private examQuestionsService: ExamQuestionsService,
  ) {}

  async findAll(includeQuestions = false): Promise<any[]> {
    const exams = await this.examRepository.find({
      relations: [
        'examinationCategory',
        'examinationCategory.subject',
        'examinationCategory.subSubject',
        'examinationCategory.subSubject.subject',
      ],
    });

    if (includeQuestions) {
      const examsWithQuestions = await Promise.all(
        exams.map(async (exam) => {
          const examQuestions = await this.examQuestionsService.findByExam(
            exam.id,
          );
          return {
            ...this.formatExamResponse(exam),
            questions: examQuestions,
            totalQuestions: examQuestions.length,
            totalPoints: examQuestions.reduce(
              (sum, q) => sum + (q.points || 0),
              0,
            ),
          };
        }),
      );
      return examsWithQuestions;
    }

    return exams.map((exam) => this.formatExamResponse(exam));
  }

  async findBySubject(
    subjectId: number,
    includeQuestions = false,
  ): Promise<any[]> {
    const exams = await this.examRepository.find({
      where: [
        { examinationCategory: { subjectId } },
        { examinationCategory: { subSubject: { subjectId } } },
      ],
      relations: [
        'examinationCategory',
        'examinationCategory.subject',
        'examinationCategory.subSubject',
        'examinationCategory.subSubject.subject',
      ],
    });

    if (includeQuestions) {
      const examsWithQuestions = await Promise.all(
        exams.map(async (exam) => {
          const examQuestions = await this.examQuestionsService.findByExam(
            exam.id,
          );
          return {
            ...this.formatExamResponse(exam),
            questions: examQuestions,
            totalQuestions: examQuestions.length,
            totalPoints: examQuestions.reduce(
              (sum, q) => sum + (q.points || 0),
              0,
            ),
          };
        }),
      );
      return examsWithQuestions;
    }

    return exams.map((exam) => this.formatExamResponse(exam));
  }

  async findByGradeLevel(
    gradeLevel: GradeLevelType,
    includeQuestions = false,
  ): Promise<any[]> {
    const exams = await this.examRepository.find({
      where: { examinationCategory: { grade: gradeLevel } },
      relations: [
        'examinationCategory',
        'examinationCategory.subject',
        'examinationCategory.subSubject',
        'examinationCategory.subSubject.subject',
      ],
    });

    if (includeQuestions) {
      const examsWithQuestions = await Promise.all(
        exams.map(async (exam) => {
          const examQuestions = await this.examQuestionsService.findByExam(
            exam.id,
          );
          return {
            ...this.formatExamResponse(exam),
            questions: examQuestions,
            totalQuestions: examQuestions.length,
            totalPoints: examQuestions.reduce(
              (sum, q) => sum + (q.points || 0),
              0,
            ),
          };
        }),
      );
      return examsWithQuestions;
    }

    return exams.map((exam) => this.formatExamResponse(exam));
  }

  async findOne(id: number): Promise<any> {
    if (isNaN(id) || id <= 0) {
      throw new NotFoundException(`Invalid exam ID: ${id}`);
    }
    const exam = await this.examRepository.findOne({
      where: { id },
      relations: [
        'examinationCategory',
        'examinationCategory.subject',
        'examinationCategory.subSubject',
        'examinationCategory.subSubject.subject',
      ],
    });
    if (!exam) {
      throw new NotFoundException(`Exam with ID ${id} not found`);
    }

    // Get exam questions with points
    const examQuestions = await this.examQuestionsService.findByExam(id);

    return {
      ...this.formatExamResponse(exam),
      questions: examQuestions,
      totalQuestions: examQuestions.length,
      totalPoints: examQuestions.reduce((sum, q) => sum + (q.points || 0), 0),
    };
  }

  async create(createExamDto: CreateExamDto): Promise<any> {
    // Validate question points total to 100
    const totalPoints = Object.values(createExamDto.questionPoints).reduce(
      (sum, points) => sum + points,
      0,
    );
    if (totalPoints !== 100) {
      throw new BadRequestException(
        `Total question points must equal 100, but got ${totalPoints}`,
      );
    }

    // Extract question IDs from questionPoints (supports both formats)
    const selectedQuestionIds =
      this.extractQuestionIdsFromPoints(createExamDto);
    if (selectedQuestionIds.length === 0) {
      throw new BadRequestException(
        'At least one question must be selected for the exam',
      );
    }

    // Validate responseCount doesn't exceed total questions
    if (createExamDto.responseCount > selectedQuestionIds.length) {
      throw new BadRequestException(
        `Response count (${createExamDto.responseCount}) cannot exceed total selected questions (${selectedQuestionIds.length})`,
      );
    }

    // Create the exam
    const exam = new Exam();
    exam.title = createExamDto.title;
    exam.timeLimit = createExamDto.timeLimit;
    exam.passingScore = createExamDto.passingScore;
    exam.responseCount = createExamDto.responseCount;
    exam.questionsPerBatch = createExamDto.questionsPerBatch || null;
    exam.examinationCategoryId = createExamDto.examinationCategoryId;
    exam.status = createExamDto.status || 'ACTIVE';

    if (createExamDto.timeSpent !== undefined) {
      exam.timeSpent = createExamDto.timeSpent;
    }
    if (createExamDto.averagePoint !== undefined) {
      exam.averagePoint = createExamDto.averagePoint;
    }

    const savedExam = await this.examRepository.save(exam);

    // Create exam questions with points
    const examQuestions: CreateExamQuestionDto[] = selectedQuestionIds.map(
      (questionId) => {
        const pointsKey = this.findPointsKey(createExamDto, questionId);
        const points = createExamDto.questionPoints[pointsKey];

        return {
          examId: savedExam.id,
          questionId: parseInt(questionId),
          points: points,
        };
      },
    );

    await this.examQuestionsService.createMultiple(examQuestions);

    // Return the exam with category details
    const examWithCategory = await this.examRepository.findOne({
      where: { id: savedExam.id },
      relations: [
        'examinationCategory',
        'examinationCategory.subject',
        'examinationCategory.subSubject',
        'examinationCategory.subSubject.subject',
      ],
    });

    if (!examWithCategory) {
      throw new NotFoundException(`Exam with ID ${savedExam.id} not found`);
    }

    return this.formatExamResponse(examWithCategory);
  }

  private extractQuestionIds(createExamDto: CreateExamDto): string[] {
    const questionIds: string[] = [];

    for (const [activityId, questionIdArray] of Object.entries(
      createExamDto.selectedQuestions,
    )) {
      questionIds.push(...questionIdArray);
    }

    return questionIds;
  }

  private extractQuestionIdsFromPoints(createExamDto: CreateExamDto): string[] {
    const questionIds: string[] = [];

    // First try to extract from selectedQuestions (normal flow)
    for (const [activityId, questionIdArray] of Object.entries(
      createExamDto.selectedQuestions,
    )) {
      questionIds.push(...questionIdArray);
    }

    // If no questions from selectedQuestions, extract from questionPoints keys
    if (questionIds.length === 0) {
      for (const key of Object.keys(createExamDto.questionPoints)) {
        if (key.startsWith('existing-')) {
          // Extract question ID from "existing-289" format
          const questionId = key.replace('existing-', '');
          questionIds.push(questionId);
        } else if (key.includes('-')) {
          // Extract question ID from "activityId-questionId" format
          const parts = key.split('-');
          const questionId = parts[parts.length - 1];
          questionIds.push(questionId);
        }
      }
    }

    return questionIds;
  }

  private findActivityQuestionKey(
    createExamDto: CreateExamDto,
    questionId: string,
  ): string {
    for (const [activityId, questionIdArray] of Object.entries(
      createExamDto.selectedQuestions,
    )) {
      if (questionIdArray.includes(questionId)) {
        return `${activityId}-${questionId}`;
      }
    }
    throw new BadRequestException(
      `Question ID ${questionId} not found in selectedQuestions`,
    );
  }

  private findPointsKey(
    createExamDto: CreateExamDto,
    questionId: string,
  ): string {
    // First try to find in existing format
    const existingKey = `existing-${questionId}`;
    if (createExamDto.questionPoints[existingKey] !== undefined) {
      return existingKey;
    }

    // Then try the activity-question format
    try {
      return this.findActivityQuestionKey(createExamDto, questionId);
    } catch {
      // If not found in selectedQuestions, look for any key that ends with this questionId
      for (const key of Object.keys(createExamDto.questionPoints)) {
        if (key.endsWith(`-${questionId}`)) {
          return key;
        }
      }
      throw new BadRequestException(
        `Question ID ${questionId} not found in questionPoints`,
      );
    }
  }

  async update(id: number, updateExamDto: UpdateExamDto): Promise<any> {
    const exam = await this.examRepository.findOne({
      where: { id },
      relations: [
        'examinationCategory',
        'examinationCategory.subject',
        'examinationCategory.subSubject',
        'examinationCategory.subSubject.subject',
      ],
    });
    if (!exam) {
      throw new NotFoundException(`Exam with ID ${id} not found`);
    }

    if (updateExamDto.title !== undefined) {
      exam.title = updateExamDto.title;
    }
    if (updateExamDto.timeLimit !== undefined) {
      exam.timeLimit = updateExamDto.timeLimit;
    }
    if (updateExamDto.passingScore !== undefined) {
      exam.passingScore = updateExamDto.passingScore;
    }
    if (updateExamDto.responseCount !== undefined) {
      exam.responseCount = updateExamDto.responseCount;
    }
    if (updateExamDto.questionsPerBatch !== undefined) {
      exam.questionsPerBatch = updateExamDto.questionsPerBatch;
    }
    if (updateExamDto.timeSpent !== undefined) {
      exam.timeSpent = updateExamDto.timeSpent;
    }
    if (updateExamDto.averagePoint !== undefined) {
      exam.averagePoint = updateExamDto.averagePoint;
    }
    if (updateExamDto.examinationCategoryId !== undefined) {
      exam.examinationCategoryId = updateExamDto.examinationCategoryId;
    }

    const savedExam = await this.examRepository.save(exam);

    const examWithCategory = await this.examRepository.findOne({
      where: { id: savedExam.id },
      relations: [
        'examinationCategory',
        'examinationCategory.subject',
        'examinationCategory.subSubject',
        'examinationCategory.subSubject.subject',
      ],
    });

    if (!examWithCategory) {
      throw new NotFoundException(`Exam with ID ${savedExam.id} not found`);
    }

    return this.formatExamResponse(examWithCategory);
  }

  async remove(id: number): Promise<void> {
    const result = await this.examRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Exam with ID ${id} not found`);
    }
  }

  private formatExamResponse(exam: Exam): any {
    return {
      id: exam.id,
      title: exam.title,
      timeSpent: exam.timeSpent,
      timeLimit: exam.timeLimit,
      averagePoint: exam.averagePoint,
      passingScore: exam.passingScore,
      responseCount: exam.responseCount,
      questionsPerBatch: exam.questionsPerBatch,
      status: exam.status,
      examinationCategoryId: exam.examinationCategoryId,
      examinationCategoryTitle: exam.examinationCategory?.title || null,
      subjectId: exam.examinationCategory?.subjectId || null,
      subjectNameEn: exam.examinationCategory?.subject?.name || null,
      subjectNameKh: exam.examinationCategory?.subject?.khmer_name || null,
      subSubjectId: exam.examinationCategory?.subSubjectId || null,
      subSubjectName: exam.examinationCategory?.subSubject?.name || null,
      subSubjectKhmerName:
        exam.examinationCategory?.subSubject?.khmerName || null,
      subSubjectParentSubjectId:
        exam.examinationCategory?.subSubject?.subjectId || null,
      subSubjectParentNameEn:
        exam.examinationCategory?.subSubject?.subject?.name || null,
      subSubjectParentNameKh:
        exam.examinationCategory?.subSubject?.subject?.khmer_name || null,
      grade: exam.examinationCategory?.grade || null,
      type: exam.examinationCategory?.type || null,
      createdAt: exam.created_at,
    };
  }
}
