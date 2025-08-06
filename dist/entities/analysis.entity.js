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
exports.Analysis = void 0;
const typeorm_1 = require("typeorm");
let Analysis = class Analysis {
    id;
    studentId;
    subjectName;
    totalExercises;
    completedExercises;
    totalQuestions;
    correctAnswers;
    totalTimeSpentMinutes;
    analysisDate;
    createdAt;
    updatedAt;
};
exports.Analysis = Analysis;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Analysis.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'student_id' }),
    __metadata("design:type", String)
], Analysis.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'subject_name' }),
    __metadata("design:type", String)
], Analysis.prototype, "subjectName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_exercises', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Analysis.prototype, "totalExercises", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'completed_exercises', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Analysis.prototype, "completedExercises", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_questions', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Analysis.prototype, "totalQuestions", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'correct_answers', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Analysis.prototype, "correctAnswers", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_time_spent_minutes', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Analysis.prototype, "totalTimeSpentMinutes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'analysis_date', type: 'date' }),
    __metadata("design:type", String)
], Analysis.prototype, "analysisDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Analysis.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Analysis.prototype, "updatedAt", void 0);
exports.Analysis = Analysis = __decorate([
    (0, typeorm_1.Entity)('analysis'),
    (0, typeorm_1.Unique)(['studentId', 'subjectName', 'analysisDate'])
], Analysis);
//# sourceMappingURL=analysis.entity.js.map