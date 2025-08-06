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
exports.CreateExamDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateExamDto {
    title;
    examinationCategoryId;
    timeLimit;
    passingScore;
    responseCount;
    questionsPerBatch;
    selectedLessons;
    selectedActivities;
    selectedQuestions;
    questionPoints;
    timeSpent;
    averagePoint;
    status;
}
exports.CreateExamDto = CreateExamDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Title of exam' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExamDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Examination category ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateExamDto.prototype, "examinationCategoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Time limit in minutes' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateExamDto.prototype, "timeLimit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Passing score percentage (0-100)' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CreateExamDto.prototype, "passingScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of questions to be shown to students' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateExamDto.prototype, "responseCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of questions per batch (1-10, 20, or "all")',
        required: false,
        example: '5'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateExamDto.prototype, "questionsPerBatch", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of lesson IDs included in the exam',
        type: [String],
        example: ['33', '34'],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateExamDto.prototype, "selectedLessons", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Object mapping lesson IDs to arrays of activity IDs',
        example: { '33': ['151', '152'], '34': ['153'] },
    }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateExamDto.prototype, "selectedActivities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Object mapping activity IDs to arrays of question IDs',
        example: { '151': ['297', '298'], '152': ['299'] },
    }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateExamDto.prototype, "selectedQuestions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Object mapping question instances to their point values (must total 100)',
        example: { '151-297': 50, '151-298': 30, '152-299': 20 },
    }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateExamDto.prototype, "questionPoints", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Time spent on exam', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateExamDto.prototype, "timeSpent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Average point', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateExamDto.prototype, "averagePoint", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Exam status',
        default: 'ACTIVE',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExamDto.prototype, "status", void 0);
//# sourceMappingURL=create-exam.dto.js.map