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
exports.QuestionType = void 0;
const typeorm_1 = require("typeorm");
const question_entity_1 = require("./question.entity");
let QuestionType = class QuestionType {
    id;
    typeKey;
    label;
    isActive;
    questions;
    createdAt;
};
exports.QuestionType = QuestionType;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], QuestionType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'type_key', length: 100 }),
    __metadata("design:type", String)
], QuestionType.prototype, "typeKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], QuestionType.prototype, "label", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], QuestionType.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => question_entity_1.Question, (question) => question.questionType),
    __metadata("design:type", Array)
], QuestionType.prototype, "questions", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], QuestionType.prototype, "createdAt", void 0);
exports.QuestionType = QuestionType = __decorate([
    (0, typeorm_1.Entity)('question_types')
], QuestionType);
//# sourceMappingURL=question-type.entity.js.map