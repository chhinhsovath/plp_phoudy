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
exports.CreateQuestionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const question_entity_1 = require("../../../entities/question.entity");
class CreateQuestionDto {
    introduction;
    questionText;
    difficultyLevel;
    lessonActivitiesId;
    questionImage;
    questionAudio;
    status;
    questionTypeId;
    usageType;
    randomAnswers;
}
exports.CreateQuestionDto = CreateQuestionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Introduction text', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "introduction", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question text (HTML content)', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "questionText", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Difficulty level (ស្រួល/មធ្យម/ពិបាក)',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "difficultyLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lesson activities ID', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value ? parseInt(value, 10) : undefined)),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateQuestionDto.prototype, "lessonActivitiesId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question image URL or file', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "questionImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question audio URL or file', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "questionAudio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status',
        default: 'ACTIVE',
        enum: ['ACTIVE', 'INACTIVE'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question type ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10)),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateQuestionDto.prototype, "questionTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Usage type',
        enum: question_entity_1.QuestionUsage,
        default: question_entity_1.QuestionUsage.LEARN,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(question_entity_1.QuestionUsage),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "usageType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether to randomize answer order',
        default: false,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateQuestionDto.prototype, "randomAnswers", void 0);
//# sourceMappingURL=create-question.dto.js.map