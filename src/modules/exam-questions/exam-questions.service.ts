import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExamQuestion } from '../../entities/exam-question.entity';
import { CreateExamQuestionDto } from './dto/create-exam-question.dto';
import { UpdateExamQuestionDto } from './dto/update-exam-question.dto';

@Injectable()
export class ExamQuestionsService {
  constructor(
    @InjectRepository(ExamQuestion)
    private examQuestionRepository: Repository<ExamQuestion>,
  ) {}

  async findAll(): Promise<any[]> {
    const examQuestions = await this.examQuestionRepository.find({
      relations: ['exam'],
    });

    return examQuestions.map((examQuestion) =>
      this.formatExamQuestionResponse(examQuestion),
    );
  }

  async findByExam(examId: number): Promise<any[]> {
    const examQuestions = await this.examQuestionRepository.find({
      where: { examId },
      relations: ['exam'],
    });

    return examQuestions.map((examQuestion) =>
      this.formatExamQuestionResponse(examQuestion),
    );
  }

  async findOne(id: number): Promise<any> {
    if (isNaN(id) || id <= 0) {
      throw new NotFoundException(`Invalid exam question ID: ${id}`);
    }
    const examQuestion = await this.examQuestionRepository.findOne({
      where: { id },
      relations: ['exam'],
    });
    if (!examQuestion) {
      throw new NotFoundException(`Exam question with ID ${id} not found`);
    }
    return this.formatExamQuestionResponse(examQuestion);
  }

  async create(createExamQuestionDto: CreateExamQuestionDto): Promise<any> {
    const examQuestion = new ExamQuestion();
    examQuestion.examId = createExamQuestionDto.examId;
    examQuestion.questionId = createExamQuestionDto.questionId;
    examQuestion.points = createExamQuestionDto.points;

    const savedExamQuestion =
      await this.examQuestionRepository.save(examQuestion);

    const examQuestionWithExam = await this.examQuestionRepository.findOne({
      where: { id: savedExamQuestion.id },
      relations: ['exam'],
    });

    if (!examQuestionWithExam) {
      throw new NotFoundException(
        `Exam question with ID ${savedExamQuestion.id} not found`,
      );
    }

    return this.formatExamQuestionResponse(examQuestionWithExam);
  }

  async update(
    id: number,
    updateExamQuestionDto: UpdateExamQuestionDto,
  ): Promise<any> {
    const examQuestion = await this.examQuestionRepository.findOne({
      where: { id },
      relations: ['exam'],
    });
    if (!examQuestion) {
      throw new NotFoundException(`Exam question with ID ${id} not found`);
    }

    if (updateExamQuestionDto.examId !== undefined) {
      examQuestion.examId = updateExamQuestionDto.examId;
    }
    if (updateExamQuestionDto.questionId !== undefined) {
      examQuestion.questionId = updateExamQuestionDto.questionId;
    }

    const savedExamQuestion =
      await this.examQuestionRepository.save(examQuestion);

    const examQuestionWithExam = await this.examQuestionRepository.findOne({
      where: { id: savedExamQuestion.id },
      relations: ['exam'],
    });

    if (!examQuestionWithExam) {
      throw new NotFoundException(
        `Exam question with ID ${savedExamQuestion.id} not found`,
      );
    }

    return this.formatExamQuestionResponse(examQuestionWithExam);
  }

  async remove(id: number): Promise<void> {
    const result = await this.examQuestionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Exam question with ID ${id} not found`);
    }
  }

  async createMultiple(examQuestions: CreateExamQuestionDto[]): Promise<any[]> {
    const createdQuestions = await this.examQuestionRepository.save(
      examQuestions.map((dto) => ({
        examId: dto.examId,
        questionId: dto.questionId,
        points: dto.points,
      })),
    );

    return createdQuestions.map((question) =>
      this.formatExamQuestionResponse(question),
    );
  }

  private formatExamQuestionResponse(examQuestion: ExamQuestion): any {
    return {
      id: examQuestion.id,
      examId: examQuestion.examId,
      questionId: examQuestion.questionId,
      points: examQuestion.points,
      examTitle: examQuestion.exam?.title || null,
      createdAt: examQuestion.createdAt,
    };
  }
}
