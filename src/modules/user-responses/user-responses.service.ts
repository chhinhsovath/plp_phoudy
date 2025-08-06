import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserResponse } from '../../entities/user-response.entity';
import {
  CreateUserResponseDto,
  UpdateUserResponseDto,
  UserResponseDto,
} from './dto/user-response.dto';

@Injectable()
export class UserResponsesService {
  private readonly logger = new Logger(UserResponsesService.name);

  constructor(
    @InjectRepository(UserResponse)
    private userResponseRepository: Repository<UserResponse>,
  ) {}

  async findAll(): Promise<UserResponseDto[]> {
    this.logger.log('Finding all user responses');
    const responses = await this.userResponseRepository.find({
      relations: ['user', 'question'],
    });

    return responses.map((response) => this.mapToDto(response));
  }

  async findById(id: number): Promise<UserResponseDto> {
    this.logger.log(`Finding user response with ID: ${id}`);
    const response = await this.userResponseRepository.findOne({
      where: { id },
      relations: ['user', 'question'],
    });

    if (!response) {
      throw new NotFoundException(`User response with ID ${id} not found`);
    }

    return this.mapToDto(response);
  }

  async findByQuestionId(questionId: number): Promise<UserResponseDto[]> {
    this.logger.log(`Finding user responses for question ID: ${questionId}`);
    const responses = await this.userResponseRepository.find({
      where: { questionId },
      relations: ['user', 'question'],
    });

    return responses.map((response) => this.mapToDto(response));
  }

  async findByQuestionIdAndIsCorrect(
    questionId: number,
    isCorrect: boolean,
  ): Promise<UserResponseDto[]> {
    this.logger.log(
      `Finding ${isCorrect ? 'correct' : 'incorrect'} user responses for question ID: ${questionId}`,
    );
    const responses = await this.userResponseRepository.find({
      where: { questionId, isCorrect },
      relations: ['user', 'question'],
    });

    return responses.map((response) => this.mapToDto(response));
  }

  async findByQuestionIdOrderByTimeSpentAsc(
    questionId: number,
  ): Promise<UserResponseDto[]> {
    this.logger.log(
      `Finding fastest user responses for question ID: ${questionId}`,
    );
    const responses = await this.userResponseRepository.find({
      where: { questionId },
      relations: ['user', 'question'],
      order: { timeSpent: 'ASC' },
    });

    return responses.map((response) => this.mapToDto(response));
  }

  async findByQuestionIdOrderByScoreImpactDesc(
    questionId: number,
  ): Promise<UserResponseDto[]> {
    this.logger.log(
      `Finding highest impact user responses for question ID: ${questionId}`,
    );
    const responses = await this.userResponseRepository.find({
      where: { questionId },
      relations: ['user', 'question'],
      order: { scoreImpact: 'DESC' },
    });

    return responses.map((response) => this.mapToDto(response));
  }

  async findByUserId(userId: number): Promise<UserResponseDto[]> {
    this.logger.log(`Finding user responses for user ID: ${userId}`);
    const responses = await this.userResponseRepository.find({
      where: { userId },
      relations: ['user', 'question'],
      order: { createdAt: 'DESC' },
    });

    return responses.map((response) => this.mapToDto(response));
  }

  async create(
    createUserResponseDto: CreateUserResponseDto,
  ): Promise<UserResponseDto> {
    this.logger.log('Creating new user response');
    const newResponse = this.userResponseRepository.create(
      createUserResponseDto,
    );
    const savedResponse = await this.userResponseRepository.save(newResponse);

    return this.mapToDto(savedResponse);
  }

  async update(
    id: number,
    updateUserResponseDto: UpdateUserResponseDto,
  ): Promise<UserResponseDto> {
    this.logger.log(`Updating user response with ID: ${id}`);
    const response = await this.userResponseRepository.findOne({
      where: { id },
    });

    if (!response) {
      throw new NotFoundException(`User response with ID ${id} not found`);
    }

    const updatedResponse = await this.userResponseRepository.save({
      ...response,
      ...updateUserResponseDto,
    });

    return this.mapToDto(updatedResponse);
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Removing user response with ID: ${id}`);
    const response = await this.userResponseRepository.findOne({
      where: { id },
    });

    if (!response) {
      throw new NotFoundException(`User response with ID ${id} not found`);
    }

    await this.userResponseRepository.remove(response);
  }

  async bulkRemove(ids: number[]): Promise<void> {
    this.logger.log(`Removing user responses with IDs: ${ids.join(', ')}`);
    await this.userResponseRepository.delete(ids);
  }

  private mapToDto(response: UserResponse): UserResponseDto {
    return {
      id: response.id,
      userId: response.userId,
      questionId: response.questionId,
      userAnswer: response.userAnswer,
      userAnswerFile: response.userAnswerFile,
      isCorrect: response.isCorrect,
      timeSpent: response.timeSpent,
      scoreImpact: response.scoreImpact,
      streakCount: response.streakCount,
      hintsUsed: response.hintsUsed,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    };
  }
}
