"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UserResponsesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponsesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_response_entity_1 = require("../../entities/user-response.entity");
let UserResponsesService = UserResponsesService_1 = class UserResponsesService {
    userResponseRepository;
    logger = new common_1.Logger(UserResponsesService_1.name);
    constructor(userResponseRepository) {
        this.userResponseRepository = userResponseRepository;
    }
    async findAll() {
        this.logger.log('Finding all user responses');
        const responses = await this.userResponseRepository.find({
            relations: ['user', 'question'],
        });
        return responses.map((response) => this.mapToDto(response));
    }
    async findById(id) {
        this.logger.log(`Finding user response with ID: ${id}`);
        const response = await this.userResponseRepository.findOne({
            where: { id },
            relations: ['user', 'question'],
        });
        if (!response) {
            throw new common_1.NotFoundException(`User response with ID ${id} not found`);
        }
        return this.mapToDto(response);
    }
    async findByQuestionId(questionId) {
        this.logger.log(`Finding user responses for question ID: ${questionId}`);
        const responses = await this.userResponseRepository.find({
            where: { questionId },
            relations: ['user', 'question'],
        });
        return responses.map((response) => this.mapToDto(response));
    }
    async findByQuestionIdAndIsCorrect(questionId, isCorrect) {
        this.logger.log(`Finding ${isCorrect ? 'correct' : 'incorrect'} user responses for question ID: ${questionId}`);
        const responses = await this.userResponseRepository.find({
            where: { questionId, isCorrect },
            relations: ['user', 'question'],
        });
        return responses.map((response) => this.mapToDto(response));
    }
    async findByQuestionIdOrderByTimeSpentAsc(questionId) {
        this.logger.log(`Finding fastest user responses for question ID: ${questionId}`);
        const responses = await this.userResponseRepository.find({
            where: { questionId },
            relations: ['user', 'question'],
            order: { timeSpent: 'ASC' },
        });
        return responses.map((response) => this.mapToDto(response));
    }
    async findByQuestionIdOrderByScoreImpactDesc(questionId) {
        this.logger.log(`Finding highest impact user responses for question ID: ${questionId}`);
        const responses = await this.userResponseRepository.find({
            where: { questionId },
            relations: ['user', 'question'],
            order: { scoreImpact: 'DESC' },
        });
        return responses.map((response) => this.mapToDto(response));
    }
    async findByUserId(userId) {
        this.logger.log(`Finding user responses for user ID: ${userId}`);
        const responses = await this.userResponseRepository.find({
            where: { userId },
            relations: ['user', 'question'],
            order: { createdAt: 'DESC' },
        });
        return responses.map((response) => this.mapToDto(response));
    }
    async create(createUserResponseDto) {
        this.logger.log('Creating new user response');
        const newResponse = this.userResponseRepository.create(createUserResponseDto);
        const savedResponse = await this.userResponseRepository.save(newResponse);
        return this.mapToDto(savedResponse);
    }
    async update(id, updateUserResponseDto) {
        this.logger.log(`Updating user response with ID: ${id}`);
        const response = await this.userResponseRepository.findOne({
            where: { id },
        });
        if (!response) {
            throw new common_1.NotFoundException(`User response with ID ${id} not found`);
        }
        const updatedResponse = await this.userResponseRepository.save({
            ...response,
            ...updateUserResponseDto,
        });
        return this.mapToDto(updatedResponse);
    }
    async remove(id) {
        this.logger.log(`Removing user response with ID: ${id}`);
        const response = await this.userResponseRepository.findOne({
            where: { id },
        });
        if (!response) {
            throw new common_1.NotFoundException(`User response with ID ${id} not found`);
        }
        await this.userResponseRepository.remove(response);
    }
    async bulkRemove(ids) {
        this.logger.log(`Removing user responses with IDs: ${ids.join(', ')}`);
        await this.userResponseRepository.delete(ids);
    }
    mapToDto(response) {
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
};
exports.UserResponsesService = UserResponsesService;
exports.UserResponsesService = UserResponsesService = UserResponsesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_response_entity_1.UserResponse)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserResponsesService);
//# sourceMappingURL=user-responses.service.js.map