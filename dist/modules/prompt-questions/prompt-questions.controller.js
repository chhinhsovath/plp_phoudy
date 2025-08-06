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
var PromptQuestionsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptQuestionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const prompt_questions_service_1 = require("./prompt-questions.service");
const prompt_question_dto_1 = require("./dto/prompt-question.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let PromptQuestionsController = PromptQuestionsController_1 = class PromptQuestionsController {
    promptQuestionsService;
    logger = new common_1.Logger(PromptQuestionsController_1.name);
    constructor(promptQuestionsService) {
        this.promptQuestionsService = promptQuestionsService;
    }
    async searchQuestions(content, limit) {
        this.logger.log(`Searching prompt questions with content: ${content}`);
        const questions = await this.promptQuestionsService.searchQuestions(content);
        const maxResults = limit || 10;
        if (questions.length > 0) {
            const results = questions.slice(0, maxResults).map((q) => ({
                id: q.id,
                grade: q.grade,
                domain: q.domain,
                topic: q.topic,
                bloom_level: q.bloom_level,
                difficulty: q.difficulty,
                question_title: q.question_title,
                question_content: q.question_content,
                response: q.response,
                tags: q.tags,
                created_at: q.created_at,
                is_suggestion: q.is_suggestion,
                relevanceScore: this.calculateRelevanceScore(content, q.question_content),
                questionType: this.categorizeQuestion(q.question_content),
            }));
            return {
                success: true,
                searchQuery: content,
                totalFound: questions.length,
                returned: results.length,
                questions: results,
                metadata: {
                    source: 'database-direct',
                    timestamp: new Date().toISOString(),
                    processingType: 'no-ai-processing',
                },
            };
        }
        return {
            success: false,
            searchQuery: content,
            totalFound: 0,
            returned: 0,
            questions: [],
            message: 'រកមិនឃើញសំណួរដែលត្រូវគ្នាទេ។ សូមព្យាយាមប្រើពាក្យគន្លឹះផ្សេងទៀត។',
            metadata: {
                source: 'database-direct',
                timestamp: new Date().toISOString(),
                processingType: 'no-ai-processing',
            },
        };
    }
    calculateRelevanceScore(query, content) {
        const queryWords = query.toLowerCase().split(/\s+/);
        const contentWords = content.toLowerCase().split(/\s+/);
        const matches = queryWords.filter((word) => contentWords.some((cWord) => cWord.includes(word)));
        return Math.round((matches.length / queryWords.length) * 100);
    }
    categorizeQuestion(content) {
        const lowerContent = content.toLowerCase();
        if (lowerContent.includes('គណិតវិទ្យា') || lowerContent.includes('math'))
            return 'គណិតវិទ្យា';
        if (lowerContent.includes('រូបវិទ្យា') || lowerContent.includes('physics'))
            return 'រូបវិទ្យា';
        if (lowerContent.includes('គីមីវិទ្យា') ||
            lowerContent.includes('chemistry'))
            return 'គីមីវិទ្យា';
        if (lowerContent.includes('ជីវវិទ្យា') || lowerContent.includes('biology'))
            return 'ជីវវិទ្យា';
        if (lowerContent.includes('ភាសាខ្មែរ') || lowerContent.includes('khmer'))
            return 'ភាសាខ្មែរ';
        if (lowerContent.includes('ភាសាអង់គ្លេស') ||
            lowerContent.includes('english'))
            return 'ភាសាអង់គ្លេស';
        if (lowerContent.includes('ប្រវត្តិសាស្ត្រ') ||
            lowerContent.includes('history'))
            return 'ប្រវត្តិសាស្ត្រ';
        if (lowerContent.includes('ភូមិសាស្ត្រ') ||
            lowerContent.includes('geography'))
            return 'ភូមិសាស្ត្រ';
        return 'ការអប់រំទូទៅ';
    }
    calculateConfidenceScore(questions) {
        if (questions.length === 0)
            return 0;
        if (questions.length >= 5)
            return 95;
        if (questions.length >= 3)
            return 85;
        if (questions.length >= 2)
            return 75;
        return 60;
    }
    async getSuggestedPrompts(limit) {
        this.logger.log(`Getting suggested prompts with limit: ${limit || 10}`);
        const suggestions = await this.promptQuestionsService.getSuggestedPrompts(limit);
        return { suggestions };
    }
    async markAsSuggestion(id, markAsSuggestionDto) {
        this.logger.log(`Marking prompt question ${id} as suggestion: ${markAsSuggestionDto.is_suggestion}`);
        return await this.promptQuestionsService.markAsSuggestion(id, markAsSuggestionDto.is_suggestion);
    }
    async getAllQuestions() {
        this.logger.log('Getting all prompt questions');
        return await this.promptQuestionsService.getAllQuestions();
    }
    async deleteQuestion(id) {
        this.logger.log(`Deleting prompt question with ID: ${id}`);
        await this.promptQuestionsService.deleteQuestion(id);
    }
};
exports.PromptQuestionsController = PromptQuestionsController;
__decorate([
    (0, common_1.Get)('search'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Search prompt questions directly from database' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return prompt questions from database',
        type: [prompt_question_dto_1.PromptQuestionDto],
    }),
    (0, swagger_1.ApiQuery)({
        name: 'content',
        required: true,
        type: String,
        description: 'Search content for matching questions',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Maximum number of results (default: 10)',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)('content')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], PromptQuestionsController.prototype, "searchQuestions", null);
__decorate([
    (0, common_1.Get)('suggestions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get suggested prompts for users' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return suggested prompts',
        type: [prompt_question_dto_1.SuggestedPromptResponseDto],
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Maximum number of suggestions to return',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PromptQuestionsController.prototype, "getSuggestedPrompts", null);
__decorate([
    (0, common_1.Patch)('admin/:id/suggestion'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({
        summary: 'Mark a prompt question as a suggestion (admin only)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Prompt question updated successfully',
        type: prompt_question_dto_1.PromptQuestionDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Prompt question not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Prompt question ID' }),
    (0, swagger_1.ApiBody)({ type: prompt_question_dto_1.MarkAsSuggestionDto }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, prompt_question_dto_1.MarkAsSuggestionDto]),
    __metadata("design:returntype", Promise)
], PromptQuestionsController.prototype, "markAsSuggestion", null);
__decorate([
    (0, common_1.Get)('admin'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all prompt questions (admin only)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return all prompt questions',
        type: [prompt_question_dto_1.PromptQuestionDto],
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PromptQuestionsController.prototype, "getAllQuestions", null);
__decorate([
    (0, common_1.Delete)('admin/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a prompt question (admin only)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Prompt question deleted successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Prompt question not found' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PromptQuestionsController.prototype, "deleteQuestion", null);
exports.PromptQuestionsController = PromptQuestionsController = PromptQuestionsController_1 = __decorate([
    (0, swagger_1.ApiTags)('Prompt Questions'),
    (0, common_1.Controller)('prompt-questions'),
    __metadata("design:paramtypes", [prompt_questions_service_1.PromptQuestionsService])
], PromptQuestionsController);
//# sourceMappingURL=prompt-questions.controller.js.map