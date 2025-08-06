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
var PromptQuestionsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptQuestionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const prompt_question_entity_1 = require("../../entities/prompt-question.entity");
let PromptQuestionsService = PromptQuestionsService_1 = class PromptQuestionsService {
    promptQuestionRepository;
    logger = new common_1.Logger(PromptQuestionsService_1.name);
    constructor(promptQuestionRepository) {
        this.promptQuestionRepository = promptQuestionRepository;
    }
    async searchQuestions(content) {
        this.logger.log(`Searching for prompt questions with content: ${content}`);
        const query = `
      SELECT * FROM prompt_questions
      WHERE to_tsvector('simple', coalesce(question_title,'') || ' ' || coalesce(question_content,''))
      @@ plainto_tsquery('simple', $1)
      ORDER BY created_at DESC
    `;
        return await this.promptQuestionRepository.query(query, [content]);
    }
    async getSuggestedPrompts(limit = 10) {
        this.logger.log(`Getting suggested prompts with limit: ${limit}`);
        const suggestions = await this.promptQuestionRepository.find({
            where: { is_suggestion: true },
            order: { created_at: 'DESC' },
            take: limit,
            select: [
                'id',
                'question_title',
                'question_content',
                'response',
                'source_file',
                'tags',
                'is_suggestion',
            ],
        });
        return suggestions.map((suggestion) => ({
            id: suggestion.id,
            question_title: suggestion.question_title,
            question_content: suggestion.question_content,
            response: suggestion.response,
            source_file: suggestion.source_file,
            tags: suggestion.tags,
            is_suggestion: suggestion.is_suggestion,
        }));
    }
    async markAsSuggestion(id, isSuggestion) {
        this.logger.log(`Marking prompt question ${id} as suggestion: ${isSuggestion}`);
        const question = await this.promptQuestionRepository.findOne({
            where: { id },
        });
        if (!question) {
            this.logger.warn(`Prompt question with ID ${id} not found`);
            throw new common_1.NotFoundException(`Prompt question with ID ${id} not found`);
        }
        question.is_suggestion = isSuggestion;
        return await this.promptQuestionRepository.save(question);
    }
    async getAllQuestions() {
        this.logger.log('Getting all prompt questions');
        return await this.promptQuestionRepository.find({
            order: { created_at: 'DESC' },
        });
    }
    async deleteQuestion(id) {
        this.logger.log(`Deleting prompt question with ID: ${id}`);
        const question = await this.promptQuestionRepository.findOne({
            where: { id },
        });
        if (!question) {
            this.logger.warn(`Prompt question with ID ${id} not found`);
            throw new common_1.NotFoundException(`Prompt question with ID ${id} not found`);
        }
        await this.promptQuestionRepository.remove(question);
    }
};
exports.PromptQuestionsService = PromptQuestionsService;
exports.PromptQuestionsService = PromptQuestionsService = PromptQuestionsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(prompt_question_entity_1.PromptQuestion)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PromptQuestionsService);
//# sourceMappingURL=prompt-questions.service.js.map