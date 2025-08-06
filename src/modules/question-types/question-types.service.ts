import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionType } from '../../entities/question-type.entity';
import { CreateQuestionTypeDto } from './dto/create-question-type.dto';
import { UpdateQuestionTypeDto } from './dto/update-question-type.dto';

@Injectable()
export class QuestionTypesService {
  constructor(
    @InjectRepository(QuestionType)
    private questionTypeRepository: Repository<QuestionType>,
  ) {}

  async create(
    createQuestionTypeDto: CreateQuestionTypeDto,
  ): Promise<QuestionType> {
    const existingQuestionType = await this.questionTypeRepository.findOne({
      where: { typeKey: createQuestionTypeDto.typeKey },
    });

    if (existingQuestionType) {
      throw new ConflictException(
        `Question type with key '${createQuestionTypeDto.typeKey}' already exists`,
      );
    }

    const questionType = this.questionTypeRepository.create(
      createQuestionTypeDto,
    );
    return await this.questionTypeRepository.save(questionType);
  }

  async findAll(page: number = 1, limit: number = 10): Promise<any> {
    const skip = (page - 1) * limit;

    const [questionTypes, total] =
      await this.questionTypeRepository.findAndCount({
        skip,
        take: limit,
        order: { createdAt: 'DESC' },
      });

    return {
      data: questionTypes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number): Promise<QuestionType> {
    const questionType = await this.questionTypeRepository.findOne({
      where: { id },
    });

    if (!questionType) {
      throw new NotFoundException(`Question type with ID ${id} not found`);
    }

    return questionType;
  }

  async findByTypeKey(typeKey: string): Promise<QuestionType | null> {
    return await this.questionTypeRepository.findOne({
      where: { typeKey },
    });
  }

  async update(
    id: number,
    updateQuestionTypeDto: UpdateQuestionTypeDto,
  ): Promise<QuestionType> {
    const questionType = await this.findOne(id);

    if (
      updateQuestionTypeDto.typeKey &&
      updateQuestionTypeDto.typeKey !== questionType.typeKey
    ) {
      const existingQuestionType = await this.questionTypeRepository.findOne({
        where: { typeKey: updateQuestionTypeDto.typeKey },
      });

      if (existingQuestionType) {
        throw new ConflictException(
          `Question type with key '${updateQuestionTypeDto.typeKey}' already exists`,
        );
      }
    }

    Object.assign(questionType, updateQuestionTypeDto);
    return await this.questionTypeRepository.save(questionType);
  }

  async remove(id: number): Promise<void> {
    const questionType = await this.findOne(id);
    await this.questionTypeRepository.remove(questionType);
  }

  async findActive(): Promise<QuestionType[]> {
    return await this.questionTypeRepository.find({
      where: { isActive: true },
      order: { label: 'ASC' },
    });
  }
}
