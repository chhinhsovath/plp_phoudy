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
exports.CreateAnswerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateAnswerDto {
    questionId;
    answerText;
    answerFile;
    isCorrect;
    matchKey;
    matchValue;
    orderIndex;
    displayOrder;
    metadata;
}
exports.CreateAnswerDto = CreateAnswerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateAnswerDto.prototype, "questionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Answer text', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAnswerDto.prototype, "answerText", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Answer file (image file)', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAnswerDto.prototype, "answerFile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the answer is correct' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateAnswerDto.prototype, "isCorrect", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Match key for matching questions',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAnswerDto.prototype, "matchKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Match value for matching questions',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAnswerDto.prototype, "matchValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Order index for sorting' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateAnswerDto.prototype, "orderIndex", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Display order for UI' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateAnswerDto.prototype, "displayOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional metadata as JSON (excluding explanations - use /questions/:id/explanation endpoint for explanations)',
        required: false,
        example: { optionLetter: 'A', category: 'geometry' },
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateAnswerDto.prototype, "metadata", void 0);
//# sourceMappingURL=create-answer.dto.js.map