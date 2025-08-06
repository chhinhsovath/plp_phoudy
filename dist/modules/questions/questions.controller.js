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
exports.QuestionsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const questions_service_1 = require("./questions.service");
const create_question_dto_1 = require("./dto/create-question.dto");
const update_question_dto_1 = require("./dto/update-question.dto");
const question_explanation_dto_1 = require("./dto/question-explanation.dto");
const question_entity_1 = require("../../entities/question.entity");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const status_enum_1 = require("../../entities/enums/status.enum");
let QuestionsController = class QuestionsController {
    questionsService;
    constructor(questionsService) {
        this.questionsService = questionsService;
    }
    async getLatestQuestions() {
        return this.questionsService.findAllByOrderByCreatedAtDesc();
    }
    async getOrderedQuestions() {
        return this.questionsService.findAllByOrderByQuestionOrderAsc();
    }
    async getQuestions(questionTypeId, difficultyLevel, usageType) {
        if (questionTypeId) {
            const typeId = parseInt(questionTypeId);
            if (!isNaN(typeId)) {
                return this.questionsService.findByQuestionTypeId(typeId);
            }
        }
        if (difficultyLevel) {
            return this.questionsService.findByDifficultyLevel(difficultyLevel);
        }
        if (usageType &&
            Object.values(question_entity_1.QuestionUsage).includes(usageType)) {
            return this.questionsService.findByUsageType(usageType);
        }
        return this.questionsService.findAll();
    }
    async getQuestionById(id) {
        return this.questionsService.findOne(id);
    }
    async getQuestionWithAnswers(id) {
        return this.questionsService.findOneWithAnswers(id);
    }
    async create(createQuestionDto, file) {
        if (file) {
            createQuestionDto.questionImage = file.filename;
        }
        return this.questionsService.create(createQuestionDto);
    }
    async update(id, updateQuestionDto, file) {
        if (file) {
            updateQuestionDto.questionImage = file.filename;
        }
        return this.questionsService.update(id, updateQuestionDto);
    }
    async updatePatch(id, updateQuestionDto) {
        return this.questionsService.update(id, updateQuestionDto);
    }
    async updateQuestionStatus(id, status) {
        return this.questionsService.updateStatus(id, status);
    }
    async remove(id) {
        return this.questionsService.remove(id);
    }
    async removeQuestions(ids) {
        return this.questionsService.removeAll(ids);
    }
    async updateQuestionOrder(id, order) {
        return this.questionsService.updateQuestionOrder(id, order);
    }
    async updateQuestionOrders(questionOrders) {
        const ordersMap = new Map();
        for (const [key, value] of Object.entries(questionOrders)) {
            ordersMap.set(Number(key), value);
        }
        return this.questionsService.updateQuestionOrders(ordersMap);
    }
    async getQuestionsByLessonActivity(lessonActivityId) {
        return this.questionsService.findByLessonActivityId(lessonActivityId);
    }
    async getQuestionsByLessonActivityAndUsageType(lessonActivityId, usageType) {
        return this.questionsService.findByLessonActivityIdAndUsageType(lessonActivityId, usageType);
    }
    async getQuestionExplanation(id) {
        return this.questionsService.findExplanation(id);
    }
    async createOrUpdateExplanation(id, explanationDto) {
        return this.questionsService.createOrUpdateExplanation(id, explanationDto.explanation);
    }
    async deleteExplanation(id) {
        return this.questionsService.removeExplanation(id);
    }
    async fixSequence() {
        await this.questionsService.fixSequenceIssue();
        return { message: 'Database sequence fixed successfully' };
    }
};
exports.QuestionsController = QuestionsController;
__decorate([
    (0, common_1.Get)('latest'),
    (0, swagger_1.ApiOperation)({ summary: 'Get latest questions' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return latest questions' }),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "getLatestQuestions", null);
__decorate([
    (0, common_1.Get)('ordered'),
    (0, swagger_1.ApiOperation)({ summary: 'Get ordered questions' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return ordered questions' }),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "getOrderedQuestions", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get questions with filters' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return filtered questions' }),
    (0, swagger_1.ApiQuery)({ name: 'questionTypeId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'difficultyLevel', required: false }),
    (0, swagger_1.ApiQuery)({
        name: 'usageType',
        required: false,
        enum: ['exam', 'learn', 'both'],
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)('questionTypeId')),
    __param(1, (0, common_1.Query)('difficultyLevel')),
    __param(2, (0, common_1.Query)('usageType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "getQuestions", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a question by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the question' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Question not found' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "getQuestionById", null);
__decorate([
    (0, common_1.Get)(':id/answers'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a question with answers by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the question with answers' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Question not found' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "getQuestionWithAnswers", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('questionImage')),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new question' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Question successfully created' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_question_dto_1.CreateQuestionDto, Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('questionImage')),
    (0, swagger_1.ApiOperation)({ summary: 'Update a question' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Question successfully updated' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Question not found' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_question_dto_1.UpdateQuestionDto, Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a question (PATCH method)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Question successfully updated' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Question not found' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_question_dto_1.UpdateQuestionDto]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "updatePatch", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    (0, swagger_1.ApiOperation)({ summary: 'Update question status' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Question status successfully updated',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Question not found' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "updateQuestionStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a question' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Question successfully deleted' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Question not found' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)(),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete multiple questions' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Questions successfully deleted' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "removeQuestions", null);
__decorate([
    (0, common_1.Patch)(':id/order'),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    (0, swagger_1.ApiOperation)({ summary: 'Update question order' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Question order successfully updated',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Question not found' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "updateQuestionOrder", null);
__decorate([
    (0, common_1.Patch)('orders'),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    (0, swagger_1.ApiOperation)({ summary: 'Update multiple question orders' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Question orders successfully updated',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "updateQuestionOrders", null);
__decorate([
    (0, common_1.Get)('by-lesson-activity/:lessonActivityId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get questions by lesson activity' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return questions for lesson activity',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('lessonActivityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "getQuestionsByLessonActivity", null);
__decorate([
    (0, common_1.Get)('by-lesson-activity/:lessonActivityId/usage-type/:usageType'),
    (0, swagger_1.ApiOperation)({ summary: 'Get questions by lesson activity and usage type' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return questions for lesson activity filtered by usage type',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('lessonActivityId')),
    __param(1, (0, common_1.Param)('usageType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "getQuestionsByLessonActivityAndUsageType", null);
__decorate([
    (0, common_1.Get)(':id/explanation'),
    (0, swagger_1.ApiOperation)({ summary: 'Get explanation for a question' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return the question explanation',
        type: question_explanation_dto_1.QuestionExplanationResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Question or explanation not found',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "getQuestionExplanation", null);
__decorate([
    (0, common_1.Post)(':id/explanation'),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    (0, swagger_1.ApiOperation)({ summary: 'Create or update explanation for a question' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Explanation successfully created/updated',
        type: question_explanation_dto_1.QuestionExplanationResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Question not found' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, question_explanation_dto_1.CreateQuestionExplanationDto]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "createOrUpdateExplanation", null);
__decorate([
    (0, common_1.Delete)(':id/explanation'),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete explanation for a question' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Explanation successfully deleted' }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Question or explanation not found',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "deleteExplanation", null);
__decorate([
    (0, common_1.Post)('fix-sequence'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Fix database sequence issue' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Sequence fixed successfully' }),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "fixSequence", null);
exports.QuestionsController = QuestionsController = __decorate([
    (0, swagger_1.ApiTags)('Questions'),
    (0, common_1.Controller)('questions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [questions_service_1.QuestionsService])
], QuestionsController);
//# sourceMappingURL=questions.controller.js.map