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
exports.QuestionWithAnswers = exports.AnswerDto = exports.QuestionDto = void 0;
const status_enum_1 = require("../../../entities/enums/status.enum");
const swagger_1 = require("@nestjs/swagger");
class QuestionDto {
    id;
    introduction;
    question_text;
    question_type;
    question_type_id;
    question_type_name;
    sound_id;
    sound_file_location;
    difficulty_level;
    question_order;
    grade_level;
    lessonId;
    lesson_number;
    lessonActivitiesId;
    question_image;
    originalQuestionImage;
    solution_explanation;
    subjectId;
    status;
    created_at;
    updated_at;
}
exports.QuestionDto = QuestionDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], QuestionDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Object)
], QuestionDto.prototype, "introduction", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], QuestionDto.prototype, "question_text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], QuestionDto.prototype, "question_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Object)
], QuestionDto.prototype, "question_type_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Object)
], QuestionDto.prototype, "question_type_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Object)
], QuestionDto.prototype, "sound_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Object)
], QuestionDto.prototype, "sound_file_location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], QuestionDto.prototype, "difficulty_level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Object)
], QuestionDto.prototype, "question_order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], QuestionDto.prototype, "grade_level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Object)
], QuestionDto.prototype, "lessonId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Object)
], QuestionDto.prototype, "lesson_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Object)
], QuestionDto.prototype, "lessonActivitiesId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Object)
], QuestionDto.prototype, "question_image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Object)
], QuestionDto.prototype, "originalQuestionImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Object)
], QuestionDto.prototype, "solution_explanation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], QuestionDto.prototype, "subjectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], QuestionDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], QuestionDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], QuestionDto.prototype, "updated_at", void 0);
class AnswerDto {
    id;
    answerText;
    isCorrect;
    orderIndex;
    displayOrder;
    answerImageUrl;
    answerAudioUrl;
    answerVideoUrl;
    matchKey;
    matchValue;
    questionId;
    createdAt;
    updatedAt;
    answer_image_url;
    originalAnswerImageUrl;
}
exports.AnswerDto = AnswerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Answer ID' }),
    __metadata("design:type", Number)
], AnswerDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Answer text' }),
    __metadata("design:type", String)
], AnswerDto.prototype, "answerText", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the answer is correct' }),
    __metadata("design:type", Boolean)
], AnswerDto.prototype, "isCorrect", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Order index for sorting', required: false }),
    __metadata("design:type", Number)
], AnswerDto.prototype, "orderIndex", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Display order for UI', required: false }),
    __metadata("design:type", Number)
], AnswerDto.prototype, "displayOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Image URL', required: false }),
    __metadata("design:type", String)
], AnswerDto.prototype, "answerImageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Audio URL', required: false }),
    __metadata("design:type", String)
], AnswerDto.prototype, "answerAudioUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Video URL', required: false }),
    __metadata("design:type", String)
], AnswerDto.prototype, "answerVideoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Match key for matching questions',
        required: false,
    }),
    __metadata("design:type", String)
], AnswerDto.prototype, "matchKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Match value for matching questions',
        required: false,
    }),
    __metadata("design:type", String)
], AnswerDto.prototype, "matchValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question ID' }),
    __metadata("design:type", Number)
], AnswerDto.prototype, "questionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Created at timestamp' }),
    __metadata("design:type", Date)
], AnswerDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Updated at timestamp' }),
    __metadata("design:type", Date)
], AnswerDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Full URL for answer image', required: false }),
    __metadata("design:type", String)
], AnswerDto.prototype, "answer_image_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Original answer image filename',
        required: false,
    }),
    __metadata("design:type", String)
], AnswerDto.prototype, "originalAnswerImageUrl", void 0);
class QuestionWithAnswers {
    id;
    introduction;
    questionText;
    questionType;
    questionTypeId;
    questionTypeName;
    soundId;
    soundFileLocation;
    difficultyLevel;
    questionOrder;
    gradeLevel;
    lessonId;
    lessonNumber;
    lessonActivitiesId;
    questionImage;
    solutionExplanation;
    subjectId;
    status;
    answers;
    createdAt;
    updatedAt;
}
exports.QuestionWithAnswers = QuestionWithAnswers;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question ID' }),
    __metadata("design:type", Number)
], QuestionWithAnswers.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Introduction text', required: false }),
    __metadata("design:type", Object)
], QuestionWithAnswers.prototype, "introduction", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question text' }),
    __metadata("design:type", String)
], QuestionWithAnswers.prototype, "questionText", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question type' }),
    __metadata("design:type", String)
], QuestionWithAnswers.prototype, "questionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question type ID', required: false }),
    __metadata("design:type", Object)
], QuestionWithAnswers.prototype, "questionTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question type name', required: false }),
    __metadata("design:type", Object)
], QuestionWithAnswers.prototype, "questionTypeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sound ID', required: false }),
    __metadata("design:type", Object)
], QuestionWithAnswers.prototype, "soundId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sound file location', required: false }),
    __metadata("design:type", String)
], QuestionWithAnswers.prototype, "soundFileLocation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Difficulty level', required: false }),
    __metadata("design:type", String)
], QuestionWithAnswers.prototype, "difficultyLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question order', required: false }),
    __metadata("design:type", Number)
], QuestionWithAnswers.prototype, "questionOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Grade level', required: false }),
    __metadata("design:type", Number)
], QuestionWithAnswers.prototype, "gradeLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lesson ID', required: false }),
    __metadata("design:type", Number)
], QuestionWithAnswers.prototype, "lessonId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lesson number', required: false }),
    __metadata("design:type", Number)
], QuestionWithAnswers.prototype, "lessonNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lesson activities ID', required: false }),
    __metadata("design:type", Number)
], QuestionWithAnswers.prototype, "lessonActivitiesId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question image', required: false }),
    __metadata("design:type", String)
], QuestionWithAnswers.prototype, "questionImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Solution explanation', required: false }),
    __metadata("design:type", String)
], QuestionWithAnswers.prototype, "solutionExplanation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Subject ID', required: false }),
    __metadata("design:type", Number)
], QuestionWithAnswers.prototype, "subjectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question status', enum: status_enum_1.Status }),
    __metadata("design:type", String)
], QuestionWithAnswers.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Answers', type: [AnswerDto] }),
    __metadata("design:type", Array)
], QuestionWithAnswers.prototype, "answers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Created at timestamp' }),
    __metadata("design:type", Date)
], QuestionWithAnswers.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Updated at timestamp' }),
    __metadata("design:type", Date)
], QuestionWithAnswers.prototype, "updatedAt", void 0);
//# sourceMappingURL=question-with-answers.interface.js.map