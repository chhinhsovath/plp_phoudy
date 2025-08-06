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
exports.QuestionTypeResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class QuestionTypeResponseDto {
    id;
    typeKey;
    label;
    isActive;
    createdAt;
}
exports.QuestionTypeResponseDto = QuestionTypeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Question type ID' }),
    __metadata("design:type", Number)
], QuestionTypeResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'multiple_choice', description: 'Question type key' }),
    __metadata("design:type", String)
], QuestionTypeResponseDto.prototype, "typeKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Multiple Choice',
        description: 'Question type label',
    }),
    __metadata("design:type", String)
], QuestionTypeResponseDto.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Whether the question type is active',
    }),
    __metadata("design:type", Boolean)
], QuestionTypeResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-12-12T10:00:00.000Z',
        description: 'Creation timestamp',
    }),
    __metadata("design:type", Date)
], QuestionTypeResponseDto.prototype, "createdAt", void 0);
//# sourceMappingURL=question-type-response.dto.js.map