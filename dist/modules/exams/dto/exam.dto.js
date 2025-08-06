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
exports.ExamDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_entity_1 = require("../../../entities/class.entity");
const examination_category_entity_1 = require("../../../entities/examination-category.entity");
class ExamDto {
    id;
    title;
    timeSpent;
    timeLimit;
    averagePoint;
    passingScore;
    questionsPerBatch;
    examinationCategoryId;
    examinationCategoryTitle;
    subjectId;
    subjectNameEn;
    subjectNameKh;
    grade;
    type;
    createdAt;
}
exports.ExamDto = ExamDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Exam ID' }),
    __metadata("design:type", Number)
], ExamDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Title of exam' }),
    __metadata("design:type", String)
], ExamDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Time spent on exam', required: false }),
    __metadata("design:type", Number)
], ExamDto.prototype, "timeSpent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Time limit in minutes' }),
    __metadata("design:type", Number)
], ExamDto.prototype, "timeLimit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Average point', required: false }),
    __metadata("design:type", Number)
], ExamDto.prototype, "averagePoint", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Passing score' }),
    __metadata("design:type", Number)
], ExamDto.prototype, "passingScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of questions per batch', required: false }),
    __metadata("design:type", Object)
], ExamDto.prototype, "questionsPerBatch", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Examination category ID' }),
    __metadata("design:type", Number)
], ExamDto.prototype, "examinationCategoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Examination category title', required: false }),
    __metadata("design:type", String)
], ExamDto.prototype, "examinationCategoryTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Subject ID', required: false }),
    __metadata("design:type", Number)
], ExamDto.prototype, "subjectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Subject name in English', required: false }),
    __metadata("design:type", String)
], ExamDto.prototype, "subjectNameEn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Subject name in Khmer', required: false }),
    __metadata("design:type", String)
], ExamDto.prototype, "subjectNameKh", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Grade level',
        enum: class_entity_1.GradeLevelType,
        required: false,
    }),
    __metadata("design:type", String)
], ExamDto.prototype, "grade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Examination type',
        enum: examination_category_entity_1.ExaminationType,
        required: false,
    }),
    __metadata("design:type", String)
], ExamDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Creation date' }),
    __metadata("design:type", Date)
], ExamDto.prototype, "createdAt", void 0);
//# sourceMappingURL=exam.dto.js.map