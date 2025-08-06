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
exports.QuestionExplanation = void 0;
const typeorm_1 = require("typeorm");
const question_entity_1 = require("./question.entity");
let QuestionExplanation = class QuestionExplanation {
    questionId;
    explanation;
    question;
    createdAt;
};
exports.QuestionExplanation = QuestionExplanation;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'bigint', name: 'question_id' }),
    __metadata("design:type", Number)
], QuestionExplanation.prototype, "questionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], QuestionExplanation.prototype, "explanation", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => question_entity_1.Question),
    (0, typeorm_1.JoinColumn)({ name: 'question_id' }),
    __metadata("design:type", question_entity_1.Question)
], QuestionExplanation.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], QuestionExplanation.prototype, "createdAt", void 0);
exports.QuestionExplanation = QuestionExplanation = __decorate([
    (0, typeorm_1.Entity)('question_explanations')
], QuestionExplanation);
//# sourceMappingURL=question-explanation.entity.js.map