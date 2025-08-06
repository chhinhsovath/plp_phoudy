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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuggestedPromptResponseDto = exports.MarkAsSuggestionDto = exports.SearchPromptQuestionDto = exports.PromptQuestionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class PromptQuestionDto {
    id;
    grade;
    domain;
    topic;
    bloom_level;
    skills_knowledge;
    tarl_level;
    difficulty;
    question_title;
    question_content;
    response;
    tags;
    source_file;
    is_suggestion;
    created_at;
}
exports.PromptQuestionDto = PromptQuestionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question ID', required: false }),
    __metadata("design:type", Number)
], PromptQuestionDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Grade level', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PromptQuestionDto.prototype, "grade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Domain', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PromptQuestionDto.prototype, "domain", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Topic', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PromptQuestionDto.prototype, "topic", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Bloom taxonomy level', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PromptQuestionDto.prototype, "bloom_level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Skills and knowledge', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PromptQuestionDto.prototype, "skills_knowledge", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'TARL level', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PromptQuestionDto.prototype, "tarl_level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Difficulty level', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PromptQuestionDto.prototype, "difficulty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question title' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PromptQuestionDto.prototype, "question_title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question content' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PromptQuestionDto.prototype, "question_content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Response', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PromptQuestionDto.prototype, "response", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tags', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PromptQuestionDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Source file', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PromptQuestionDto.prototype, "source_file", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether this prompt is a suggestion',
        default: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PromptQuestionDto.prototype, "is_suggestion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Created date', required: false }),
    __metadata("design:type", Date)
], PromptQuestionDto.prototype, "created_at", void 0);
class SearchPromptQuestionDto {
    content;
}
exports.SearchPromptQuestionDto = SearchPromptQuestionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Search content' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchPromptQuestionDto.prototype, "content", void 0);
class MarkAsSuggestionDto {
    is_suggestion;
}
exports.MarkAsSuggestionDto = MarkAsSuggestionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether this prompt should be marked as a suggestion',
        default: false,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], MarkAsSuggestionDto.prototype, "is_suggestion", void 0);
class SuggestedPromptResponseDto {
    id;
    question_title;
    question_content;
    response;
    source_file;
    tags;
    is_suggestion;
}
exports.SuggestedPromptResponseDto = SuggestedPromptResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question ID' }),
    __metadata("design:type", Number)
], SuggestedPromptResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question title' }),
    __metadata("design:type", String)
], SuggestedPromptResponseDto.prototype, "question_title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question content' }),
    __metadata("design:type", String)
], SuggestedPromptResponseDto.prototype, "question_content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Response', required: false }),
    __metadata("design:type", String)
], SuggestedPromptResponseDto.prototype, "response", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Source file', required: false }),
    __metadata("design:type", String)
], SuggestedPromptResponseDto.prototype, "source_file", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tags', required: false }),
    __metadata("design:type", String)
], SuggestedPromptResponseDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether this prompt is a suggestion',
        default: false,
    }),
    __metadata("design:type", Boolean)
], SuggestedPromptResponseDto.prototype, "is_suggestion", void 0);
//# sourceMappingURL=prompt-question.dto.js.map