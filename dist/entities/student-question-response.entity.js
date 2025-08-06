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
exports.StudentQuestionResponse = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let StudentQuestionResponse = class StudentQuestionResponse {
    id;
    studentId;
    student;
    questionId;
    question;
    answerId;
    answer;
    response_text;
    is_correct;
    score;
    attempts;
    createdBy;
    creator;
    created_at;
    updated_at;
};
exports.StudentQuestionResponse = StudentQuestionResponse;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StudentQuestionResponse.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'student_id' }),
    __metadata("design:type", Number)
], StudentQuestionResponse.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('Student'),
    (0, typeorm_1.JoinColumn)({ name: 'student_id' }),
    __metadata("design:type", Object)
], StudentQuestionResponse.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'question_id' }),
    __metadata("design:type", Number)
], StudentQuestionResponse.prototype, "questionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('Question'),
    (0, typeorm_1.JoinColumn)({ name: 'question_id' }),
    __metadata("design:type", Object)
], StudentQuestionResponse.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'answer_id', nullable: true }),
    __metadata("design:type", Number)
], StudentQuestionResponse.prototype, "answerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('Answer'),
    (0, typeorm_1.JoinColumn)({ name: 'answer_id' }),
    __metadata("design:type", Object)
], StudentQuestionResponse.prototype, "answer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], StudentQuestionResponse.prototype, "response_text", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], StudentQuestionResponse.prototype, "is_correct", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], StudentQuestionResponse.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], StudentQuestionResponse.prototype, "attempts", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', nullable: true }),
    __metadata("design:type", Number)
], StudentQuestionResponse.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.User)
], StudentQuestionResponse.prototype, "creator", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], StudentQuestionResponse.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], StudentQuestionResponse.prototype, "updated_at", void 0);
exports.StudentQuestionResponse = StudentQuestionResponse = __decorate([
    (0, typeorm_1.Entity)('student_question_responses')
], StudentQuestionResponse);
//# sourceMappingURL=student-question-response.entity.js.map