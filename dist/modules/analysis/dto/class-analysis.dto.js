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
exports.ClassAnalysisDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ClassAnalysisDto {
    class_id;
    class_grade_level;
    teacher_id;
    teacher_username;
    teacher_first_name;
    teacher_last_name;
    student_id;
    student_user_id;
    student_username;
    student_first_name;
    student_last_name;
    question_id;
    introduction;
    question_text;
    difficulty_level;
    question_grade_level;
    lesson_id;
    lesson_title;
    lesson_number;
    lesson_activities_id;
    activity_title;
    subject_id;
    is_correct;
    time_spent;
    streak_count;
}
exports.ClassAnalysisDto = ClassAnalysisDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Class ID', example: 1 }),
    __metadata("design:type", Number)
], ClassAnalysisDto.prototype, "class_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Class grade level', example: '1' }),
    __metadata("design:type", String)
], ClassAnalysisDto.prototype, "class_grade_level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Teacher ID', example: 1 }),
    __metadata("design:type", Number)
], ClassAnalysisDto.prototype, "teacher_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Teacher username', example: 'teacher1' }),
    __metadata("design:type", String)
], ClassAnalysisDto.prototype, "teacher_username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Teacher first name', example: 'ហេង' }),
    __metadata("design:type", String)
], ClassAnalysisDto.prototype, "teacher_first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Teacher last name', example: 'សុខា' }),
    __metadata("design:type", String)
], ClassAnalysisDto.prototype, "teacher_last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Student ID', example: 1 }),
    __metadata("design:type", Number)
], ClassAnalysisDto.prototype, "student_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Student user ID', example: 9 }),
    __metadata("design:type", Number)
], ClassAnalysisDto.prototype, "student_user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Student username', example: 'student1' }),
    __metadata("design:type", String)
], ClassAnalysisDto.prototype, "student_username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Student first name', example: 'លឹម' }),
    __metadata("design:type", String)
], ClassAnalysisDto.prototype, "student_first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Student last name', example: 'សុខខេង' }),
    __metadata("design:type", String)
], ClassAnalysisDto.prototype, "student_last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question ID', example: 2 }),
    __metadata("design:type", Number)
], ClassAnalysisDto.prototype, "question_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question introduction', example: 'សូមរាប់:' }),
    __metadata("design:type", String)
], ClassAnalysisDto.prototype, "introduction", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Question text',
        example: 'រាប់ចំនួនខ្មៅដៃនៅលើតុរបស់អ្នក។',
    }),
    __metadata("design:type", String)
], ClassAnalysisDto.prototype, "question_text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question difficulty level', example: 'EASY' }),
    __metadata("design:type", String)
], ClassAnalysisDto.prototype, "difficulty_level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question grade level', example: '1' }),
    __metadata("design:type", String)
], ClassAnalysisDto.prototype, "question_grade_level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lesson ID', example: '1' }),
    __metadata("design:type", String)
], ClassAnalysisDto.prototype, "lesson_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lesson title', example: 'ការរាប់ដល់លេខ១០' }),
    __metadata("design:type", String)
], ClassAnalysisDto.prototype, "lesson_title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lesson number', example: 1 }),
    __metadata("design:type", Number)
], ClassAnalysisDto.prototype, "lesson_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lesson activities ID', example: 1 }),
    __metadata("design:type", Number)
], ClassAnalysisDto.prototype, "lesson_activities_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Activity title',
        example: 'ការរាប់វត្ថុជុំវិញខ្លួន',
    }),
    __metadata("design:type", String)
], ClassAnalysisDto.prototype, "activity_title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Subject ID', example: 15 }),
    __metadata("design:type", Number)
], ClassAnalysisDto.prototype, "subject_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the answer is correct', example: true }),
    __metadata("design:type", Boolean)
], ClassAnalysisDto.prototype, "is_correct", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Time spent answering in seconds', example: 5 }),
    __metadata("design:type", Number)
], ClassAnalysisDto.prototype, "time_spent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Current streak count', example: 1 }),
    __metadata("design:type", Number)
], ClassAnalysisDto.prototype, "streak_count", void 0);
//# sourceMappingURL=class-analysis.dto.js.map