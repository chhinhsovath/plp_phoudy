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
exports.Answer = void 0;
const typeorm_1 = require("typeorm");
const question_entity_1 = require("./question.entity");
let Answer = class Answer {
    id;
    questionId;
    answerText;
    answerFile;
    isCorrect;
    matchKey;
    matchValue;
    orderIndex;
    displayOrder;
    metadata;
    createdAt;
    updatedAt;
    question;
};
exports.Answer = Answer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Answer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'question_id', type: 'bigint' }),
    __metadata("design:type", Number)
], Answer.prototype, "questionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'answer_text', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Answer.prototype, "answerText", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'answer_file', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Answer.prototype, "answerFile", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_correct', type: 'boolean' }),
    __metadata("design:type", Boolean)
], Answer.prototype, "isCorrect", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'match_key', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Answer.prototype, "matchKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'match_value', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Answer.prototype, "matchValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'order_index', type: 'int' }),
    __metadata("design:type", Number)
], Answer.prototype, "orderIndex", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'display_order', type: 'int' }),
    __metadata("design:type", Number)
], Answer.prototype, "displayOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'metadata', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Answer.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Answer.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Answer.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => question_entity_1.Question, (question) => question.answers),
    (0, typeorm_1.JoinColumn)({ name: 'question_id' }),
    __metadata("design:type", question_entity_1.Question)
], Answer.prototype, "question", void 0);
exports.Answer = Answer = __decorate([
    (0, typeorm_1.Entity)('answers')
], Answer);
//# sourceMappingURL=answer.entity.js.map