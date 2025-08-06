import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from '../../entities/answer.entity';
import { Question } from '../../entities/question.entity';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async findAll(): Promise<Answer[]> {
    return this.answerRepository.find({ relations: ['question'] });
  }

  async findOne(id: number): Promise<Answer> {
    const answer = await this.answerRepository.findOne({
      where: { id },
      relations: ['question'],
    });

    if (!answer) {
      throw new NotFoundException(`Answer with ID ${id} not found`);
    }

    return answer;
  }

  async findByQuestionId(questionId: number): Promise<Answer[]> {
    return this.answerRepository.find({
      where: { questionId },
      relations: ['question'],
    });
  }

  async findQuestionWithAnswers(questionId: number): Promise<any> {
    const answers = await this.answerRepository.find({
      where: { questionId },
      relations: [
        'question',
        'question.questionType',
        'question.lessonActivity',
        'question.lessonActivity.lesson',
        'question.lessonActivity.lesson.subject',
      ],
      order: { orderIndex: 'ASC' },
    });

    if (answers.length === 0) {
      throw new NotFoundException(
        `No answers found for question ID ${questionId}`,
      );
    }

    const question = answers[0].question;

    // Get lesson info if available
    let lessonId: number | null = null;
    let lessonTitle: string | null = null;
    let lessonNumber: number | null = null;
    let subjectId: number | null = null;
    let subjectKhmerName: string | null = null;
    if (question.lessonActivity && question.lessonActivity.lesson) {
      lessonId = question.lessonActivity.lesson.id;
      lessonTitle = question.lessonActivity.lesson.title;
      lessonNumber = question.lessonActivity.lesson.lesson_number;
      if (question.lessonActivity.lesson.subject) {
        subjectId = question.lessonActivity.lesson.subject.id;
        subjectKhmerName = question.lessonActivity.lesson.subject.khmer_name;
      }
    }
    // Format the response according to your requirements
    return {
      question: {
        id: question.id,
        introduction: question.introduction,
        questionText: question.questionText,
        difficultyLevel: question.difficultyLevel,
        questionTypeId: question.questionTypeId,
        questionTypeKey: question.questionType?.typeKey || null,
        questionTypeLabel: question.questionType?.label || null,
        lessonActivitiesId: question.lessonActivitiesId,
        lessonActivities: question.lessonActivity?.title || null,
        lessonId,
        lessonTitle,
        lessonNumber,
        subjectId,
        subjectKhmerName,
        questionImage: question.questionImage,
        questionAudio: question.questionAudio,
        status: question.status,
        usageType: question.usageType,
        answers: answers.map((answer) => ({
          id: answer.id,
          answerText: answer.answerText,
          answerFile: answer.answerFile,
          isCorrect: answer.isCorrect,
          matchKey: answer.matchKey,
          matchValue: answer.matchValue,
          orderIndex: answer.orderIndex,
          displayOrder: answer.displayOrder,
          metadata: answer.metadata,
        })),
      },
    };
  }

  async findByQuestionIdAndIsCorrect(
    questionId: number,
    isCorrect: boolean,
  ): Promise<Answer[]> {
    return this.answerRepository.find({
      where: { questionId, isCorrect: isCorrect },
      relations: ['question'],
    });
  }

  async findByQuestionIdOrderByOrderIndex(
    questionId: number,
  ): Promise<Answer[]> {
    return this.answerRepository.find({
      where: { questionId },
      relations: ['question'],
      order: { orderIndex: 'ASC' },
    });
  }

  async findByQuestionIdOrderByDisplayOrder(
    questionId: number,
  ): Promise<Answer[]> {
    return this.answerRepository.find({
      where: { questionId },
      relations: ['question'],
      order: { displayOrder: 'ASC' },
    });
  }

  async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    const question = await this.questionRepository.findOne({
      where: { id: createAnswerDto.questionId },
    });

    if (!question) {
      throw new NotFoundException(
        `Question with ID ${createAnswerDto.questionId} not found`,
      );
    }

    const answer = new Answer();
    answer.answerText = createAnswerDto.answerText || null;
    answer.answerFile = createAnswerDto.answerFile || null;
    answer.isCorrect = createAnswerDto.isCorrect;
    answer.matchKey = createAnswerDto.matchKey || null;
    answer.matchValue = createAnswerDto.matchValue || null;
    answer.orderIndex = createAnswerDto.orderIndex;
    answer.displayOrder = createAnswerDto.displayOrder;
    answer.metadata = this.cleanMetadata(createAnswerDto.metadata);
    answer.questionId = createAnswerDto.questionId;
    answer.question = question;

    return this.answerRepository.save(answer);
  }

  async createAll(createAnswerDtos: CreateAnswerDto[]): Promise<Answer[]> {
    const answers: Answer[] = [];

    for (const dto of createAnswerDtos) {
      const answer = await this.create(dto);
      answers.push(answer);
    }

    return answers;
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto): Promise<Answer> {
    const answer = await this.answerRepository.findOne({ where: { id } });

    if (!answer) {
      throw new NotFoundException(`Answer with ID ${id} not found`);
    }

    if (updateAnswerDto.answerText !== undefined) {
      answer.answerText = updateAnswerDto.answerText;
    }
    if (updateAnswerDto.answerFile !== undefined) {
      answer.answerFile = updateAnswerDto.answerFile;
    }
    if (updateAnswerDto.isCorrect !== undefined) {
      answer.isCorrect = updateAnswerDto.isCorrect;
    }
    if (updateAnswerDto.matchKey !== undefined) {
      answer.matchKey = updateAnswerDto.matchKey;
    }
    if (updateAnswerDto.matchValue !== undefined) {
      answer.matchValue = updateAnswerDto.matchValue;
    }
    if (updateAnswerDto.orderIndex !== undefined) {
      answer.orderIndex = updateAnswerDto.orderIndex;
    }
    if (updateAnswerDto.displayOrder !== undefined) {
      answer.displayOrder = updateAnswerDto.displayOrder;
    }
    if (updateAnswerDto.metadata !== undefined) {
      answer.metadata = this.cleanMetadata(updateAnswerDto.metadata);
    }

    return this.answerRepository.save(answer);
  }

  async updateAnswerOrders(
    questionId: number,
    answerIds: number[],
    displayOrder: boolean,
  ): Promise<void> {
    const answers = await this.findByQuestionId(questionId);

    for (let i = 0; i < answerIds.length; i++) {
      const answerId = answerIds[i];
      const answer = answers.find((a) => a.id === answerId);

      if (answer) {
        if (displayOrder) {
          answer.displayOrder = i + 1;
        } else {
          answer.orderIndex = i + 1;
        }

        await this.answerRepository.save(answer);
      }
    }
  }

  async remove(id: number): Promise<void> {
    await this.answerRepository.delete(id);
  }

  async removeByQuestionId(questionId: number): Promise<void> {
    await this.answerRepository.delete({ questionId });
  }

  async removeAll(ids: number[]): Promise<void> {
    await this.answerRepository.delete(ids);
  }

  async checkMultipleChoiceAnswer(
    questionId: number,
    submittedAnswerIds: number[],
  ): Promise<boolean> {
    const answers = await this.answerRepository.find({
      where: { questionId, isCorrect: true },
    });

    if (answers.length !== submittedAnswerIds.length) {
      return false;
    }

    const correctAnswerIds = answers.map((answer) => answer.id);
    return submittedAnswerIds.every((id) => correctAnswerIds.includes(id));
  }

  async checkMultipleSelectAnswer(
    questionId: number,
    submittedAnswerIds: number[],
  ): Promise<boolean> {
    const answers = await this.answerRepository.find({
      where: { questionId, isCorrect: true },
    });

    const correctAnswerIds = answers.map((answer) => answer.id);
    return (
      submittedAnswerIds.length === correctAnswerIds.length &&
      submittedAnswerIds.every((id) => correctAnswerIds.includes(id))
    );
  }

  async checkTrueFalseAnswer(
    questionId: number,
    submittedAnswerId: number,
  ): Promise<boolean> {
    const answer = await this.answerRepository.findOne({
      where: { id: submittedAnswerId, questionId },
    });

    return answer?.isCorrect || false;
  }

  async checkMatchingAnswer(
    questionId: number,
    submittedMatches: { key: string; value: string }[],
  ): Promise<boolean> {
    const answers = await this.findByQuestionId(questionId);

    if (answers.length !== submittedMatches.length) {
      return false;
    }

    return submittedMatches.every((match) =>
      answers.some(
        (answer) =>
          answer.matchKey === match.key && answer.matchValue === match.value,
      ),
    );
  }

  async checkOrderingAnswer(
    questionId: number,
    submittedAnswerIds: number[],
  ): Promise<boolean> {
    const answers = await this.findByQuestionIdOrderByOrderIndex(questionId);
    const correctOrder = answers.map((answer) => answer.id);

    return (
      submittedAnswerIds.length === correctOrder.length &&
      submittedAnswerIds.every((id, index) => id === correctOrder[index])
    );
  }

  async checkDragAndDropAnswer(
    questionId: number,
    submittedAnswerIds: number[],
  ): Promise<boolean> {
    const answers = await this.answerRepository.find({
      where: { questionId },
      order: { orderIndex: 'ASC' },
    });

    if (answers.length !== submittedAnswerIds.length) {
      return false;
    }

    return answers.every(
      (answer, index) => answer.id === submittedAnswerIds[index],
    );
  }

  /**
   * Clean metadata to remove explanation-related fields
   * Explanations should be handled via the dedicated question explanation API
   */
  private cleanMetadata(metadata: any): any {
    if (!metadata || typeof metadata !== 'object') {
      return metadata;
    }

    // Create a copy of metadata without explanation fields
    const cleanedMetadata = { ...metadata };

    // Remove common explanation field names
    delete cleanedMetadata.explanation;
    delete cleanedMetadata.explanationText;
    delete cleanedMetadata.answerExplanation;
    delete cleanedMetadata.reason;
    delete cleanedMetadata.rationale;

    return Object.keys(cleanedMetadata).length > 0 ? cleanedMetadata : null;
  }
}
