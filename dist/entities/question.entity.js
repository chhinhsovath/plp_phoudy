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
exports.Question = exports.QuestionUsage = void 0;
const typeorm_1 = require("typeorm");
const status_enum_1 = require("./enums/status.enum");
const lesson_activity_entity_1 = require("./lesson-activity.entity");
const question_type_entity_1 = require("./question-type.entity");
const question_explanation_entity_1 = require("./question-explanation.entity");
var QuestionUsage;
(function (QuestionUsage) {
    QuestionUsage["EXAM"] = "exam";
    QuestionUsage["LEARN"] = "learn";
    QuestionUsage["BOTH"] = "both";
})(QuestionUsage || (exports.QuestionUsage = QuestionUsage = {}));
let Question = class Question {
    id;
    introduction;
    questionText;
    difficultyLevel;
    questionTypeId;
    questionType;
    lessonActivitiesId;
    lessonActivity;
    questionImage;
    questionAudio;
    explanation;
    status;
    usageType;
    randomAnswers;
    answers;
    createdAt;
    updatedAt;
};
exports.Question = Question;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { type: 'bigint' }),
    __metadata("design:type", Number)
], Question.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Question.prototype, "introduction", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'question_text' }),
    __metadata("design:type", String)
], Question.prototype, "questionText", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'difficulty_level' }),
    __metadata("design:type", String)
], Question.prototype, "difficultyLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'question_type_id' }),
    __metadata("design:type", Number)
], Question.prototype, "questionTypeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => question_type_entity_1.QuestionType, (questionType) => questionType.questions),
    (0, typeorm_1.JoinColumn)({ name: 'question_type_id' }),
    __metadata("design:type", question_type_entity_1.QuestionType)
], Question.prototype, "questionType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', nullable: true, name: 'lesson_activities_id' }),
    __metadata("design:type", Object)
], Question.prototype, "lessonActivitiesId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lesson_activity_entity_1.LessonActivity, (activity) => activity.questions, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'lesson_activities_id' }),
    __metadata("design:type", Object)
], Question.prototype, "lessonActivity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'question_image' }),
    __metadata("design:type", String)
], Question.prototype, "questionImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'question_audio' }),
    __metadata("design:type", String)
], Question.prototype, "questionAudio", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => question_explanation_entity_1.QuestionExplanation, (explanation) => explanation.question),
    __metadata("design:type", question_explanation_entity_1.QuestionExplanation)
], Question.prototype, "explanation", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: status_enum_1.Status,
        default: status_enum_1.Status.ACTIVE,
    }),
    __metadata("design:type", String)
], Question.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: QuestionUsage,
        default: QuestionUsage.LEARN,
        name: 'usage_type',
    }),
    __metadata("design:type", String)
], Question.prototype, "usageType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: false,
        name: 'random_answers',
    }),
    __metadata("design:type", Boolean)
], Question.prototype, "randomAnswers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('Answer', 'question'),
    __metadata("design:type", Array)
], Question.prototype, "answers", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Question.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Question.prototype, "updatedAt", void 0);
exports.Question = Question = __decorate([
    (0, typeorm_1.Entity)('questions')
], Question);
//# sourceMappingURL=question.entity.js.map