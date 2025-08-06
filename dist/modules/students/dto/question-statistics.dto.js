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
exports.QuestionStatisticsDTO = exports.LessonInfoDTO = exports.PerformanceHistoryDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class PerformanceHistoryDTO {
    date;
    value;
    correct;
    incorrect;
}
exports.PerformanceHistoryDTO = PerformanceHistoryDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date of responses', example: '2024-05-18' }),
    __metadata("design:type", String)
], PerformanceHistoryDTO.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Average score value', example: 85.5 }),
    __metadata("design:type", Number)
], PerformanceHistoryDTO.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of correct answers', example: 12 }),
    __metadata("design:type", Number)
], PerformanceHistoryDTO.prototype, "correct", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of incorrect answers', example: 5 }),
    __metadata("design:type", Number)
], PerformanceHistoryDTO.prototype, "incorrect", void 0);
class LessonInfoDTO {
    id;
    title;
    lesson_number;
}
exports.LessonInfoDTO = LessonInfoDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lesson ID', example: '123' }),
    __metadata("design:type", String)
], LessonInfoDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lesson title', example: 'មេរៀនទី១' }),
    __metadata("design:type", String)
], LessonInfoDTO.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'lesson_number',
        description: 'Lesson number',
        example: 1,
    }),
    __metadata("design:type", Number)
], LessonInfoDTO.prototype, "lesson_number", void 0);
class QuestionStatisticsDTO {
    id;
    question;
    averageScore;
    studentCompleted;
    lesson;
    subject;
    grade;
    performance;
}
exports.QuestionStatisticsDTO = QuestionStatisticsDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question ID', example: '123' }),
    __metadata("design:type", String)
], QuestionStatisticsDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question text', example: 'រកចម្លើយ 5 + 7 = ?' }),
    __metadata("design:type", String)
], QuestionStatisticsDTO.prototype, "question", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Average score of all responses', example: 85.5 }),
    __metadata("design:type", Number)
], QuestionStatisticsDTO.prototype, "averageScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of students who attempted this question',
        example: 25,
    }),
    __metadata("design:type", Number)
], QuestionStatisticsDTO.prototype, "studentCompleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => LessonInfoDTO, description: 'Lesson information' }),
    __metadata("design:type", LessonInfoDTO)
], QuestionStatisticsDTO.prototype, "lesson", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Subject name', example: 'MATHEMATICS' }),
    __metadata("design:type", String)
], QuestionStatisticsDTO.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Grade level', example: 'ថ្នាក់ទី១' }),
    __metadata("design:type", String)
], QuestionStatisticsDTO.prototype, "grade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [PerformanceHistoryDTO],
        description: 'History of student performances',
    }),
    __metadata("design:type", Array)
], QuestionStatisticsDTO.prototype, "performance", void 0);
//# sourceMappingURL=question-statistics.dto.js.map