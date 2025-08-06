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
exports.ExamQuestionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const exam_question_entity_1 = require("../../entities/exam-question.entity");
let ExamQuestionsService = class ExamQuestionsService {
    examQuestionRepository;
    constructor(examQuestionRepository) {
        this.examQuestionRepository = examQuestionRepository;
    }
    async findAll() {
        const examQuestions = await this.examQuestionRepository.find({
            relations: ['exam'],
        });
        return examQuestions.map((examQuestion) => this.formatExamQuestionResponse(examQuestion));
    }
    async findByExam(examId) {
        const examQuestions = await this.examQuestionRepository.find({
            where: { examId },
            relations: ['exam'],
        });
        return examQuestions.map((examQuestion) => this.formatExamQuestionResponse(examQuestion));
    }
    async findOne(id) {
        if (isNaN(id) || id <= 0) {
            throw new common_1.NotFoundException(`Invalid exam question ID: ${id}`);
        }
        const examQuestion = await this.examQuestionRepository.findOne({
            where: { id },
            relations: ['exam'],
        });
        if (!examQuestion) {
            throw new common_1.NotFoundException(`Exam question with ID ${id} not found`);
        }
        return this.formatExamQuestionResponse(examQuestion);
    }
    async create(createExamQuestionDto) {
        const examQuestion = new exam_question_entity_1.ExamQuestion();
        examQuestion.examId = createExamQuestionDto.examId;
        examQuestion.questionId = createExamQuestionDto.questionId;
        examQuestion.points = createExamQuestionDto.points;
        const savedExamQuestion = await this.examQuestionRepository.save(examQuestion);
        const examQuestionWithExam = await this.examQuestionRepository.findOne({
            where: { id: savedExamQuestion.id },
            relations: ['exam'],
        });
        if (!examQuestionWithExam) {
            throw new common_1.NotFoundException(`Exam question with ID ${savedExamQuestion.id} not found`);
        }
        return this.formatExamQuestionResponse(examQuestionWithExam);
    }
    async update(id, updateExamQuestionDto) {
        const examQuestion = await this.examQuestionRepository.findOne({
            where: { id },
            relations: ['exam'],
        });
        if (!examQuestion) {
            throw new common_1.NotFoundException(`Exam question with ID ${id} not found`);
        }
        if (updateExamQuestionDto.examId !== undefined) {
            examQuestion.examId = updateExamQuestionDto.examId;
        }
        if (updateExamQuestionDto.questionId !== undefined) {
            examQuestion.questionId = updateExamQuestionDto.questionId;
        }
        const savedExamQuestion = await this.examQuestionRepository.save(examQuestion);
        const examQuestionWithExam = await this.examQuestionRepository.findOne({
            where: { id: savedExamQuestion.id },
            relations: ['exam'],
        });
        if (!examQuestionWithExam) {
            throw new common_1.NotFoundException(`Exam question with ID ${savedExamQuestion.id} not found`);
        }
        return this.formatExamQuestionResponse(examQuestionWithExam);
    }
    async remove(id) {
        const result = await this.examQuestionRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Exam question with ID ${id} not found`);
        }
    }
    async createMultiple(examQuestions) {
        const createdQuestions = await this.examQuestionRepository.save(examQuestions.map((dto) => ({
            examId: dto.examId,
            questionId: dto.questionId,
            points: dto.points,
        })));
        return createdQuestions.map((question) => this.formatExamQuestionResponse(question));
    }
    formatExamQuestionResponse(examQuestion) {
        return {
            id: examQuestion.id,
            examId: examQuestion.examId,
            questionId: examQuestion.questionId,
            points: examQuestion.points,
            examTitle: examQuestion.exam?.title || null,
            createdAt: examQuestion.createdAt,
        };
    }
};
exports.ExamQuestionsService = ExamQuestionsService;
exports.ExamQuestionsService = ExamQuestionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(exam_question_entity_1.ExamQuestion)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ExamQuestionsService);
//# sourceMappingURL=exam-questions.service.js.map