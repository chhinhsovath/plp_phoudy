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
exports.ExamQuestionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const exam_questions_service_1 = require("./exam-questions.service");
const create_exam_question_dto_1 = require("./dto/create-exam-question.dto");
const update_exam_question_dto_1 = require("./dto/update-exam-question.dto");
let ExamQuestionsController = class ExamQuestionsController {
    examQuestionsService;
    constructor(examQuestionsService) {
        this.examQuestionsService = examQuestionsService;
    }
    create(createExamQuestionDto) {
        return this.examQuestionsService.create(createExamQuestionDto);
    }
    findAll() {
        return this.examQuestionsService.findAll();
    }
    findByExam(examId) {
        return this.examQuestionsService.findByExam(examId);
    }
    findOne(id) {
        return this.examQuestionsService.findOne(id);
    }
    update(id, updateExamQuestionDto) {
        return this.examQuestionsService.update(id, updateExamQuestionDto);
    }
    remove(id) {
        return this.examQuestionsService.remove(id);
    }
};
exports.ExamQuestionsController = ExamQuestionsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new exam question' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Exam question created successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_exam_question_dto_1.CreateExamQuestionDto]),
    __metadata("design:returntype", void 0)
], ExamQuestionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all exam questions' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of exam questions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExamQuestionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('exam/:examId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get exam questions by exam ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of exam questions for the exam',
    }),
    __param(0, (0, common_1.Param)('examId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ExamQuestionsController.prototype, "findByExam", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get exam question by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Exam question found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Exam question not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ExamQuestionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update exam question' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Exam question updated successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Exam question not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_exam_question_dto_1.UpdateExamQuestionDto]),
    __metadata("design:returntype", void 0)
], ExamQuestionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete exam question' }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Exam question deleted successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Exam question not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ExamQuestionsController.prototype, "remove", null);
exports.ExamQuestionsController = ExamQuestionsController = __decorate([
    (0, swagger_1.ApiTags)('exam-questions'),
    (0, common_1.Controller)('exam-questions'),
    __metadata("design:paramtypes", [exam_questions_service_1.ExamQuestionsService])
], ExamQuestionsController);
//# sourceMappingURL=exam-questions.controller.js.map