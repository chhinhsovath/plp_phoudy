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
exports.LessonResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class SubjectDto {
    name;
    khmer_name;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MATHEMATICS' }),
    __metadata("design:type", String)
], SubjectDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'គណិតវិទ្យា' }),
    __metadata("design:type", String)
], SubjectDto.prototype, "khmer_name", void 0);
class LessonResponseDto {
    id;
    title;
    grade_level;
    lesson_number;
    subject;
    status;
}
exports.LessonResponseDto = LessonResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 101 }),
    __metadata("design:type", Number)
], LessonResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ដំណើរផ្សងព្រេងក្នុងព្រៃ' }),
    __metadata("design:type", String)
], LessonResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], LessonResponseDto.prototype, "grade_level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 105 }),
    __metadata("design:type", Number)
], LessonResponseDto.prototype, "lesson_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: SubjectDto }),
    __metadata("design:type", SubjectDto)
], LessonResponseDto.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ACTIVE' }),
    __metadata("design:type", String)
], LessonResponseDto.prototype, "status", void 0);
//# sourceMappingURL=lesson-response.dto.js.map