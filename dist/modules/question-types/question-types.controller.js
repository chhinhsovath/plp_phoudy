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
exports.QuestionTypesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const question_types_service_1 = require("./question-types.service");
const create_question_type_dto_1 = require("./dto/create-question-type.dto");
const update_question_type_dto_1 = require("./dto/update-question-type.dto");
const question_type_response_dto_1 = require("./dto/question-type-response.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let QuestionTypesController = class QuestionTypesController {
    questionTypesService;
    constructor(questionTypesService) {
        this.questionTypesService = questionTypesService;
    }
    async create(createQuestionTypeDto) {
        return await this.questionTypesService.create(createQuestionTypeDto);
    }
    async findAll(page = 1, limit = 10) {
        return await this.questionTypesService.findAll(page, limit);
    }
    async findActive() {
        return await this.questionTypesService.findActive();
    }
    async findOne(id) {
        return await this.questionTypesService.findOne(id);
    }
    async update(id, updateQuestionTypeDto) {
        return await this.questionTypesService.update(id, updateQuestionTypeDto);
    }
    async remove(id) {
        await this.questionTypesService.remove(id);
        return { message: 'Question type deleted successfully' };
    }
};
exports.QuestionTypesController = QuestionTypesController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new question type' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Question type created successfully',
        type: question_type_response_dto_1.QuestionTypeResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Question type with this key already exists',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_question_type_dto_1.CreateQuestionTypeDto]),
    __metadata("design:returntype", Promise)
], QuestionTypesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all question types with pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 10 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of question types with pagination',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/QuestionTypeResponseDto' },
                },
                pagination: {
                    type: 'object',
                    properties: {
                        page: { type: 'number', example: 1 },
                        limit: { type: 'number', example: 10 },
                        total: { type: 'number', example: 50 },
                        pages: { type: 'number', example: 5 },
                    },
                },
            },
        },
    }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], QuestionTypesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active question types' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of active question types',
        type: [question_type_response_dto_1.QuestionTypeResponseDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuestionTypesController.prototype, "findActive", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a question type by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'Question type ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Question type details',
        type: question_type_response_dto_1.QuestionTypeResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Question type not found',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuestionTypesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a question type' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'Question type ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Question type updated successfully',
        type: question_type_response_dto_1.QuestionTypeResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Question type not found',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Question type with this key already exists',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_question_type_dto_1.UpdateQuestionTypeDto]),
    __metadata("design:returntype", Promise)
], QuestionTypesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a question type' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'Question type ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Question type deleted successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Question type not found',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuestionTypesController.prototype, "remove", null);
exports.QuestionTypesController = QuestionTypesController = __decorate([
    (0, swagger_1.ApiTags)('Question Types'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('question-types'),
    __metadata("design:paramtypes", [question_types_service_1.QuestionTypesService])
], QuestionTypesController);
//# sourceMappingURL=question-types.controller.js.map