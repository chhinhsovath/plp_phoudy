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
var UserResponsesController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponsesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_responses_service_1 = require("./user-responses.service");
const user_response_dto_1 = require("./dto/user-response.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
let UserResponsesController = UserResponsesController_1 = class UserResponsesController {
    userResponsesService;
    logger = new common_1.Logger(UserResponsesController_1.name);
    constructor(userResponsesService) {
        this.userResponsesService = userResponsesService;
    }
    async findAll() {
        this.logger.log('Handling GET /user-responses request');
        return this.userResponsesService.findAll();
    }
    async findOne(id) {
        this.logger.log(`Handling GET /user-responses/${id} request`);
        return this.userResponsesService.findById(id);
    }
    async findByQuestionId(questionId) {
        this.logger.log(`Handling GET /user-responses/question/${questionId} request`);
        return this.userResponsesService.findByQuestionId(questionId);
    }
    async findCorrectByQuestionId(questionId) {
        this.logger.log(`Handling GET /user-responses/question/${questionId}/correct request`);
        return this.userResponsesService.findByQuestionIdAndIsCorrect(questionId, true);
    }
    async findFastestByQuestionId(questionId) {
        this.logger.log(`Handling GET /user-responses/question/${questionId}/fastest request`);
        return this.userResponsesService.findByQuestionIdOrderByTimeSpentAsc(questionId);
    }
    async findHighestImpactByQuestionId(questionId) {
        this.logger.log(`Handling GET /user-responses/question/${questionId}/highest-impact request`);
        return this.userResponsesService.findByQuestionIdOrderByScoreImpactDesc(questionId);
    }
    async findByUserId(userId) {
        this.logger.log(`Handling GET /user-responses/user/${userId} request`);
        return this.userResponsesService.findByUserId(userId);
    }
    async create(createUserResponseDto) {
        this.logger.log('Handling POST /user-responses request');
        return this.userResponsesService.create(createUserResponseDto);
    }
    async update(id, updateUserResponseDto) {
        this.logger.log(`Handling PUT /user-responses/${id} request`);
        return this.userResponsesService.update(id, updateUserResponseDto);
    }
    async remove(id) {
        this.logger.log(`Handling DELETE /user-responses/${id} request`);
        return this.userResponsesService.remove(id);
    }
    async bulkDelete(bulkDeleteDto) {
        this.logger.log(`Handling DELETE /user-responses/bulk request for IDs: ${bulkDeleteDto.ids.join(', ')}`);
        return this.userResponsesService.bulkRemove(bulkDeleteDto.ids);
    }
};
exports.UserResponsesController = UserResponsesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all user responses' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns a list of all user responses',
        type: [user_response_dto_1.UserResponseDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResponsesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a user response by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User response ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns the user response',
        type: user_response_dto_1.UserResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'User response not found',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResponsesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('question/:questionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all user responses for a specific question' }),
    (0, swagger_1.ApiParam)({ name: 'questionId', description: 'Question ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns user responses for the given question',
        type: [user_response_dto_1.UserResponseDto],
    }),
    __param(0, (0, common_1.Param)('questionId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResponsesController.prototype, "findByQuestionId", null);
__decorate([
    (0, common_1.Get)('question/:questionId/correct'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get correct user responses for a specific question',
    }),
    (0, swagger_1.ApiParam)({ name: 'questionId', description: 'Question ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns correct user responses for the given question',
        type: [user_response_dto_1.UserResponseDto],
    }),
    __param(0, (0, common_1.Param)('questionId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResponsesController.prototype, "findCorrectByQuestionId", null);
__decorate([
    (0, common_1.Get)('question/:questionId/fastest'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get fastest user responses for a specific question',
    }),
    (0, swagger_1.ApiParam)({ name: 'questionId', description: 'Question ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns user responses ordered by fastest time',
        type: [user_response_dto_1.UserResponseDto],
    }),
    __param(0, (0, common_1.Param)('questionId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResponsesController.prototype, "findFastestByQuestionId", null);
__decorate([
    (0, common_1.Get)('question/:questionId/highest-impact'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get highest impact user responses for a specific question',
    }),
    (0, swagger_1.ApiParam)({ name: 'questionId', description: 'Question ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns user responses ordered by highest score impact',
        type: [user_response_dto_1.UserResponseDto],
    }),
    __param(0, (0, common_1.Param)('questionId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResponsesController.prototype, "findHighestImpactByQuestionId", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all user responses for a specific user',
        description: 'Retrieve all responses submitted by a specific user, ordered by creation date (newest first)',
    }),
    (0, swagger_1.ApiParam)({
        name: 'userId',
        description: 'User ID',
        example: 1,
        type: 'number',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns all user responses for the specified user',
        type: [user_response_dto_1.UserResponseDto],
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number', example: 1 },
                    userId: { type: 'number', example: 1 },
                    questionId: { type: 'number', example: 5 },
                    userAnswer: { type: 'string', example: 'A' },
                    userAnswerFile: { type: 'string', example: null },
                    isCorrect: { type: 'boolean', example: true },
                    timeSpent: { type: 'number', example: 45 },
                    scoreImpact: { type: 'number', example: 10 },
                    streakCount: { type: 'number', example: 3 },
                    hintsUsed: { type: 'number', example: 0 },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                    user: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            name: { type: 'string' },
                        },
                    },
                    question: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            title: { type: 'string' },
                        },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'User not found or no responses found',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 404 },
                message: { type: 'string', example: 'No responses found for user' },
                error: { type: 'string', example: 'Not Found' },
            },
        },
    }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResponsesController.prototype, "findByUserId", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user response' }),
    (0, swagger_1.ApiBody)({ type: user_response_dto_1.CreateUserResponseDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The user response has been successfully created',
        type: user_response_dto_1.UserResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_response_dto_1.CreateUserResponseDto]),
    __metadata("design:returntype", Promise)
], UserResponsesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a user response' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User response ID' }),
    (0, swagger_1.ApiBody)({ type: user_response_dto_1.UpdateUserResponseDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The user response has been successfully updated',
        type: user_response_dto_1.UserResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User response not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_response_dto_1.UpdateUserResponseDto]),
    __metadata("design:returntype", Promise)
], UserResponsesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a user response' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User response ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The user response has been successfully deleted',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User response not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResponsesController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)('bulk'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk delete user responses' }),
    (0, swagger_1.ApiBody)({ type: user_response_dto_1.BulkDeleteDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The user responses have been successfully deleted',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_response_dto_1.BulkDeleteDto]),
    __metadata("design:returntype", Promise)
], UserResponsesController.prototype, "bulkDelete", null);
exports.UserResponsesController = UserResponsesController = UserResponsesController_1 = __decorate([
    (0, swagger_1.ApiTags)('User Responses'),
    (0, common_1.Controller)('user-responses'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [user_responses_service_1.UserResponsesService])
], UserResponsesController);
//# sourceMappingURL=user-responses.controller.js.map