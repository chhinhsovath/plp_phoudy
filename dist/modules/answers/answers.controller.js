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
exports.AnswersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const answers_service_1 = require("./answers.service");
const create_answer_dto_1 = require("./dto/create-answer.dto");
const update_answer_dto_1 = require("./dto/update-answer.dto");
const answer_entity_1 = require("../../entities/answer.entity");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let AnswersController = class AnswersController {
    answersService;
    constructor(answersService) {
        this.answersService = answersService;
    }
    create(createAnswerDto) {
        return this.answersService.create(createAnswerDto);
    }
    createAll(createAnswerDtos) {
        return this.answersService.createAll(createAnswerDtos);
    }
    findAll() {
        return this.answersService.findAll();
    }
    findOne(id) {
        return this.answersService.findOne(id);
    }
    async findByQuestionId(questionId) {
        return this.answersService.findQuestionWithAnswers(questionId);
    }
    findAnswersByQuestionId(questionId) {
        return this.answersService.findByQuestionId(questionId);
    }
    findByQuestionIdOrdered(questionId) {
        return this.answersService.findByQuestionIdOrderByOrderIndex(questionId);
    }
    findByQuestionIdDisplayOrdered(questionId) {
        return this.answersService.findByQuestionIdOrderByDisplayOrder(questionId);
    }
    update(id, updateAnswerDto) {
        return this.answersService.update(id, updateAnswerDto);
    }
    updateAnswerOrders(questionId, answerIds, displayOrder) {
        return this.answersService.updateAnswerOrders(questionId, answerIds, displayOrder);
    }
    remove(id) {
        return this.answersService.remove(id);
    }
    removeByQuestionId(questionId) {
        return this.answersService.removeByQuestionId(questionId);
    }
    removeAll(ids) {
        return this.answersService.removeAll(ids);
    }
    checkMultipleChoiceAnswer(questionId, submittedAnswerIds) {
        return this.answersService.checkMultipleChoiceAnswer(questionId, submittedAnswerIds);
    }
    checkMultipleSelectAnswer(questionId, submittedAnswerIds) {
        return this.answersService.checkMultipleSelectAnswer(questionId, submittedAnswerIds);
    }
    checkTrueFalseAnswer(questionId, submittedAnswerId) {
        return this.answersService.checkTrueFalseAnswer(questionId, submittedAnswerId);
    }
    checkMatchingAnswer(questionId, submittedMatches) {
        return this.answersService.checkMatchingAnswer(questionId, submittedMatches);
    }
    checkOrderingAnswer(questionId, submittedAnswerIds) {
        return this.answersService.checkOrderingAnswer(questionId, submittedAnswerIds);
    }
    checkDragAndDropAnswer(questionId, submittedAnswerIds) {
        return this.answersService.checkDragAndDropAnswer(questionId, submittedAnswerIds);
    }
};
exports.AnswersController = AnswersController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new answer' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The answer has been successfully created.',
        type: answer_entity_1.Answer,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_answer_dto_1.CreateAnswerDto]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('bulk'),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    (0, swagger_1.ApiOperation)({ summary: 'Create multiple answers' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The answers have been successfully created.',
        type: [answer_entity_1.Answer],
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "createAll", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all answers' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return all answers.',
        type: [answer_entity_1.Answer],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get an answer by id' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return the answer.',
        type: answer_entity_1.Answer,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('question/:questionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get answers by question id' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return question with answers.',
    }),
    __param(0, (0, common_1.Param)('questionId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "findByQuestionId", null);
__decorate([
    (0, common_1.Get)('question/:questionId/list'),
    (0, swagger_1.ApiOperation)({ summary: 'Get answers array by question id' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return answers array for the question.',
        type: [answer_entity_1.Answer],
    }),
    __param(0, (0, common_1.Param)('questionId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "findAnswersByQuestionId", null);
__decorate([
    (0, common_1.Get)('question/:questionId/ordered'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get answers by question id ordered by order index',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return ordered answers for the question.',
        type: [answer_entity_1.Answer],
    }),
    __param(0, (0, common_1.Param)('questionId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "findByQuestionIdOrdered", null);
__decorate([
    (0, common_1.Get)('question/:questionId/display-ordered'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get answers by question id ordered by display order',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return display ordered answers for the question.',
        type: [answer_entity_1.Answer],
    }),
    __param(0, (0, common_1.Param)('questionId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "findByQuestionIdDisplayOrdered", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an answer' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The answer has been successfully updated.',
        type: answer_entity_1.Answer,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_answer_dto_1.UpdateAnswerDto]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('question/:questionId/order'),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    (0, swagger_1.ApiOperation)({ summary: 'Update answer orders for a question' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The answer orders have been successfully updated.',
    }),
    __param(0, (0, common_1.Param)('questionId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('answerIds', new common_1.ParseArrayPipe({ items: Number }))),
    __param(2, (0, common_1.Body)('displayOrder', common_1.ParseBoolPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array, Boolean]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "updateAnswerOrders", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an answer' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The answer has been successfully deleted.',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)('question/:questionId'),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete all answers for a question' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The answers have been successfully deleted.',
    }),
    __param(0, (0, common_1.Param)('questionId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "removeByQuestionId", null);
__decorate([
    (0, common_1.Delete)(),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete multiple answers' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The answers have been successfully deleted.',
    }),
    __param(0, (0, common_1.Body)('ids', new common_1.ParseArrayPipe({ items: Number }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "removeAll", null);
__decorate([
    (0, common_1.Post)('check/multiple-choice/:questionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Check multiple choice answer' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return whether the answer is correct.',
        type: Boolean,
    }),
    __param(0, (0, common_1.Param)('questionId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('submittedAnswerIds', new common_1.ParseArrayPipe({ items: Number }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "checkMultipleChoiceAnswer", null);
__decorate([
    (0, common_1.Post)('check/multiple-select/:questionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Check multiple select answer' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return whether the answer is correct.',
        type: Boolean,
    }),
    __param(0, (0, common_1.Param)('questionId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('submittedAnswerIds', new common_1.ParseArrayPipe({ items: Number }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "checkMultipleSelectAnswer", null);
__decorate([
    (0, common_1.Post)('check/true-false/:questionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Check true/false answer' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return whether the answer is correct.',
        type: Boolean,
    }),
    __param(0, (0, common_1.Param)('questionId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('submittedAnswerId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "checkTrueFalseAnswer", null);
__decorate([
    (0, common_1.Post)('check/matching/:questionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Check matching answer' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return whether the answer is correct.',
        type: Boolean,
    }),
    __param(0, (0, common_1.Param)('questionId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('submittedMatches')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "checkMatchingAnswer", null);
__decorate([
    (0, common_1.Post)('check/ordering/:questionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Check ordering answer' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return whether the answer is correct.',
        type: Boolean,
    }),
    __param(0, (0, common_1.Param)('questionId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('submittedAnswerIds', new common_1.ParseArrayPipe({ items: Number }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "checkOrderingAnswer", null);
__decorate([
    (0, common_1.Post)('check/drag-and-drop/:questionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Check drag and drop answer' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return whether the answer is correct.',
        type: Boolean,
    }),
    __param(0, (0, common_1.Param)('questionId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('submittedAnswerIds', new common_1.ParseArrayPipe({ items: Number }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "checkDragAndDropAnswer", null);
exports.AnswersController = AnswersController = __decorate([
    (0, swagger_1.ApiTags)('answers'),
    (0, common_1.Controller)('answers'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [answers_service_1.AnswersService])
], AnswersController);
//# sourceMappingURL=answers.controller.js.map