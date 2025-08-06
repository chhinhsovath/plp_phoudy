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
exports.StudentHistoryDto = exports.ClassAnalysisResponseDto = exports.StudentInfoDto = exports.QuestionResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class QuestionResponseDto {
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
exports.QuestionResponseDto = QuestionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question ID', example: 2 }),
    __metadata("design:type", Number)
], QuestionResponseDto.prototype, "question_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question introduction', example: 'សូមរាប់:' }),
    __metadata("design:type", String)
], QuestionResponseDto.prototype, "introduction", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Question text',
        example: 'រាប់ចំនួនខ្មៅដៃនៅលើតុរបស់អ្នក។',
    }),
    __metadata("design:type", String)
], QuestionResponseDto.prototype, "question_text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question difficulty level', example: 'EASY' }),
    __metadata("design:type", String)
], QuestionResponseDto.prototype, "difficulty_level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question grade level', example: '1' }),
    __metadata("design:type", String)
], QuestionResponseDto.prototype, "question_grade_level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lesson ID', example: '1' }),
    __metadata("design:type", String)
], QuestionResponseDto.prototype, "lesson_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lesson title', example: 'ការរាប់ដល់លេខ១០' }),
    __metadata("design:type", String)
], QuestionResponseDto.prototype, "lesson_title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lesson number', example: 1 }),
    __metadata("design:type", Number)
], QuestionResponseDto.prototype, "lesson_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lesson activities ID', example: 1 }),
    __metadata("design:type", Number)
], QuestionResponseDto.prototype, "lesson_activities_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Activity title',
        example: 'ការរាប់វត្ថុជុំវិញខ្លួន',
    }),
    __metadata("design:type", String)
], QuestionResponseDto.prototype, "activity_title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Subject ID', example: 15 }),
    __metadata("design:type", Number)
], QuestionResponseDto.prototype, "subject_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the answer is correct', example: true }),
    __metadata("design:type", Boolean)
], QuestionResponseDto.prototype, "is_correct", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Time spent answering in seconds', example: 5 }),
    __metadata("design:type", Number)
], QuestionResponseDto.prototype, "time_spent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Current streak count', example: 1 }),
    __metadata("design:type", Number)
], QuestionResponseDto.prototype, "streak_count", void 0);
class StudentInfoDto {
    student_id;
    student_user_id;
    student_username;
    student_first_name;
    student_last_name;
    total_average_score;
    total_time_spent;
    responses;
}
exports.StudentInfoDto = StudentInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Student ID', example: 1 }),
    __metadata("design:type", Number)
], StudentInfoDto.prototype, "student_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Student user ID', example: 9 }),
    __metadata("design:type", Number)
], StudentInfoDto.prototype, "student_user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Student username', example: 'student1' }),
    __metadata("design:type", String)
], StudentInfoDto.prototype, "student_username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Student first name', example: 'លឹម' }),
    __metadata("design:type", String)
], StudentInfoDto.prototype, "student_first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Student last name', example: 'សុខខេង' }),
    __metadata("design:type", String)
], StudentInfoDto.prototype, "student_last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total average score (percentage of correct answers)',
        example: 100,
    }),
    __metadata("design:type", Number)
], StudentInfoDto.prototype, "total_average_score", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total time spent answering questions in seconds',
        example: 14,
    }),
    __metadata("design:type", Number)
], StudentInfoDto.prototype, "total_time_spent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Question responses',
        type: [QuestionResponseDto],
    }),
    __metadata("design:type", Array)
], StudentInfoDto.prototype, "responses", void 0);
class ClassAnalysisResponseDto {
    class_id;
    class_grade_level;
    teacher_id;
    teacher_username;
    teacher_first_name;
    teacher_last_name;
    grade_level;
    subject_id;
    lesson_numbers;
    students;
}
exports.ClassAnalysisResponseDto = ClassAnalysisResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Class ID', example: 1 }),
    __metadata("design:type", Number)
], ClassAnalysisResponseDto.prototype, "class_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Class grade level', example: '1' }),
    __metadata("design:type", String)
], ClassAnalysisResponseDto.prototype, "class_grade_level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Teacher ID', example: 1 }),
    __metadata("design:type", Number)
], ClassAnalysisResponseDto.prototype, "teacher_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Teacher username', example: 'teacher1' }),
    __metadata("design:type", String)
], ClassAnalysisResponseDto.prototype, "teacher_username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Teacher first name', example: 'ហេង' }),
    __metadata("design:type", String)
], ClassAnalysisResponseDto.prototype, "teacher_first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Teacher last name', example: 'សុខា' }),
    __metadata("design:type", String)
], ClassAnalysisResponseDto.prototype, "teacher_last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Grade level filter applied',
        example: '1',
        required: false,
    }),
    __metadata("design:type", String)
], ClassAnalysisResponseDto.prototype, "grade_level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Subject ID filter applied',
        example: 15,
        required: false,
    }),
    __metadata("design:type", Number)
], ClassAnalysisResponseDto.prototype, "subject_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lesson numbers filter applied',
        type: [Number],
        example: [1, 2, 3],
        required: false,
    }),
    __metadata("design:type", Array)
], ClassAnalysisResponseDto.prototype, "lesson_numbers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Students', type: [StudentInfoDto] }),
    __metadata("design:type", Array)
], ClassAnalysisResponseDto.prototype, "students", void 0);
class StudentHistoryDto {
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
exports.StudentHistoryDto = StudentHistoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Student ID', example: 1 }),
    __metadata("design:type", Number)
], StudentHistoryDto.prototype, "student_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Student user ID', example: 9 }),
    __metadata("design:type", Number)
], StudentHistoryDto.prototype, "student_user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Student username', example: 'student1' }),
    __metadata("design:type", String)
], StudentHistoryDto.prototype, "student_username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Student first name', example: 'លឹម' }),
    __metadata("design:type", String)
], StudentHistoryDto.prototype, "student_first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Student last name', example: 'សុខខេង' }),
    __metadata("design:type", String)
], StudentHistoryDto.prototype, "student_last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question ID', example: 2 }),
    __metadata("design:type", Number)
], StudentHistoryDto.prototype, "question_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question introduction', example: 'សូមរាប់:' }),
    __metadata("design:type", String)
], StudentHistoryDto.prototype, "introduction", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Question text',
        example: 'រាប់ចំនួនខ្មៅដៃនៅលើតុរបស់អ្នក។',
    }),
    __metadata("design:type", String)
], StudentHistoryDto.prototype, "question_text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question difficulty level', example: 'EASY' }),
    __metadata("design:type", String)
], StudentHistoryDto.prototype, "difficulty_level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question grade level', example: '1' }),
    __metadata("design:type", String)
], StudentHistoryDto.prototype, "question_grade_level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lesson ID', example: '1' }),
    __metadata("design:type", String)
], StudentHistoryDto.prototype, "lesson_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lesson title', example: 'ការរាប់ដល់លេខ១០' }),
    __metadata("design:type", String)
], StudentHistoryDto.prototype, "lesson_title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lesson number', example: 1 }),
    __metadata("design:type", Number)
], StudentHistoryDto.prototype, "lesson_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lesson activities ID', example: 1 }),
    __metadata("design:type", Number)
], StudentHistoryDto.prototype, "lesson_activities_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Activity title',
        example: 'ការរាប់វត្ថុជុំវិញខ្លួន',
    }),
    __metadata("design:type", String)
], StudentHistoryDto.prototype, "activity_title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Subject ID', example: 15 }),
    __metadata("design:type", Number)
], StudentHistoryDto.prototype, "subject_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the answer is correct', example: true }),
    __metadata("design:type", Boolean)
], StudentHistoryDto.prototype, "is_correct", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Time spent answering in seconds', example: 5 }),
    __metadata("design:type", Number)
], StudentHistoryDto.prototype, "time_spent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Current streak count', example: 1 }),
    __metadata("design:type", Number)
], StudentHistoryDto.prototype, "streak_count", void 0);
//# sourceMappingURL=class-analysis-response.dto.js.map