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
exports.ClassAnalysisQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class ClassAnalysisQueryDto {
    classId;
    studentId;
    gradeLevel;
    subjectId;
    lessonNumbers;
}
exports.ClassAnalysisQueryDto = ClassAnalysisQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Class ID to filter by',
        required: true,
        example: 1,
    }),
    (0, class_validator_1.IsInt)({ message: 'classId must be an integer' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], ClassAnalysisQueryDto.prototype, "classId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Student ID to filter by (optional)',
        required: false,
        example: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'studentId must be an integer' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], ClassAnalysisQueryDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Grade level to filter by (optional)',
        required: false,
        example: '1',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'gradeLevel must be a string' }),
    __metadata("design:type", String)
], ClassAnalysisQueryDto.prototype, "gradeLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Subject ID to filter by (optional)',
        required: false,
        example: 15,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'subjectId must be an integer' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], ClassAnalysisQueryDto.prototype, "subjectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lesson numbers to filter by (optional)',
        required: false,
        example: [1, 2, 3],
        type: [Number],
        isArray: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: 'lessonNumbers must be an array' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], ClassAnalysisQueryDto.prototype, "lessonNumbers", void 0);
//# sourceMappingURL=class-analysis-query.dto.js.map