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
exports.Exam = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const examination_category_entity_1 = require("./examination-category.entity");
let Exam = class Exam extends base_entity_1.BaseEntity {
    title;
    timeSpent;
    timeLimit;
    averagePoint;
    passingScore;
    responseCount;
    questionsPerBatch;
    examinationCategoryId;
    status;
    examinationCategory;
};
exports.Exam = Exam;
__decorate([
    (0, typeorm_1.Column)({ name: 'title' }),
    __metadata("design:type", String)
], Exam.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'time_spent', nullable: true }),
    __metadata("design:type", Number)
], Exam.prototype, "timeSpent", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'time_limit' }),
    __metadata("design:type", Number)
], Exam.prototype, "timeLimit", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'average_point',
        type: 'decimal',
        precision: 5,
        scale: 2,
        nullable: true,
    }),
    __metadata("design:type", Number)
], Exam.prototype, "averagePoint", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'passing_score', type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], Exam.prototype, "passingScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'response_count', nullable: true }),
    __metadata("design:type", Number)
], Exam.prototype, "responseCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'questions_per_batch', type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], Exam.prototype, "questionsPerBatch", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'examination_category_id' }),
    __metadata("design:type", Number)
], Exam.prototype, "examinationCategoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', default: 'ACTIVE' }),
    __metadata("design:type", String)
], Exam.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => examination_category_entity_1.ExaminationCategory),
    (0, typeorm_1.JoinColumn)({ name: 'examination_category_id' }),
    __metadata("design:type", examination_category_entity_1.ExaminationCategory)
], Exam.prototype, "examinationCategory", void 0);
exports.Exam = Exam = __decorate([
    (0, typeorm_1.Entity)('examinations')
], Exam);
//# sourceMappingURL=exam.entity.js.map