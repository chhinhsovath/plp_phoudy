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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionTypesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const question_type_entity_1 = require("../../entities/question-type.entity");
let QuestionTypesService = class QuestionTypesService {
    questionTypeRepository;
    constructor(questionTypeRepository) {
        this.questionTypeRepository = questionTypeRepository;
    }
    async create(createQuestionTypeDto) {
        const existingQuestionType = await this.questionTypeRepository.findOne({
            where: { typeKey: createQuestionTypeDto.typeKey },
        });
        if (existingQuestionType) {
            throw new common_1.ConflictException(`Question type with key '${createQuestionTypeDto.typeKey}' already exists`);
        }
        const questionType = this.questionTypeRepository.create(createQuestionTypeDto);
        return await this.questionTypeRepository.save(questionType);
    }
    async findAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [questionTypes, total] = await this.questionTypeRepository.findAndCount({
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
    async findOne(id) {
        const questionType = await this.questionTypeRepository.findOne({
            where: { id },
        });
        if (!questionType) {
            throw new common_1.NotFoundException(`Question type with ID ${id} not found`);
        }
        return questionType;
    }
    async findByTypeKey(typeKey) {
        return await this.questionTypeRepository.findOne({
            where: { typeKey },
        });
    }
    async update(id, updateQuestionTypeDto) {
        const questionType = await this.findOne(id);
        if (updateQuestionTypeDto.typeKey &&
            updateQuestionTypeDto.typeKey !== questionType.typeKey) {
            const existingQuestionType = await this.questionTypeRepository.findOne({
                where: { typeKey: updateQuestionTypeDto.typeKey },
            });
            if (existingQuestionType) {
                throw new common_1.ConflictException(`Question type with key '${updateQuestionTypeDto.typeKey}' already exists`);
            }
        }
        Object.assign(questionType, updateQuestionTypeDto);
        return await this.questionTypeRepository.save(questionType);
    }
    async remove(id) {
        const questionType = await this.findOne(id);
        await this.questionTypeRepository.remove(questionType);
    }
    async findActive() {
        return await this.questionTypeRepository.find({
            where: { isActive: true },
            order: { label: 'ASC' },
        });
    }
};
exports.QuestionTypesService = QuestionTypesService;
exports.QuestionTypesService = QuestionTypesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(question_type_entity_1.QuestionType)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], QuestionTypesService);
//# sourceMappingURL=question-types.service.js.map