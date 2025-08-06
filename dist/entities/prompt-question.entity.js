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
exports.PromptQuestion = void 0;
const typeorm_1 = require("typeorm");
let PromptQuestion = class PromptQuestion {
    id;
    grade;
    domain;
    topic;
    bloom_level;
    skills_knowledge;
    tarl_level;
    difficulty;
    question_title;
    question_content;
    response;
    tags;
    source_file;
    embedding;
    is_suggestion;
    created_at;
};
exports.PromptQuestion = PromptQuestion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PromptQuestion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PromptQuestion.prototype, "grade", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PromptQuestion.prototype, "domain", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PromptQuestion.prototype, "topic", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PromptQuestion.prototype, "bloom_level", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PromptQuestion.prototype, "skills_knowledge", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PromptQuestion.prototype, "tarl_level", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PromptQuestion.prototype, "difficulty", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PromptQuestion.prototype, "question_title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], PromptQuestion.prototype, "question_content", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], PromptQuestion.prototype, "response", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PromptQuestion.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PromptQuestion.prototype, "source_file", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'jsonb' }),
    __metadata("design:type", Object)
], PromptQuestion.prototype, "embedding", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], PromptQuestion.prototype, "is_suggestion", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PromptQuestion.prototype, "created_at", void 0);
exports.PromptQuestion = PromptQuestion = __decorate([
    (0, typeorm_1.Entity)('prompt_questions')
], PromptQuestion);
//# sourceMappingURL=prompt-question.entity.js.map