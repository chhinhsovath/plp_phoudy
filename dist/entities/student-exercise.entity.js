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
exports.StudentExercise = void 0;
const typeorm_1 = require("typeorm");
let StudentExercise = class StudentExercise {
    id;
    studentId;
    student;
    exerciseId;
    exercise;
    assigned_date;
    completed_at;
    total_questions;
    correct_answers;
    total_time_spent_seconds;
    status;
    created_at;
    updated_at;
};
exports.StudentExercise = StudentExercise;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StudentExercise.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'student_id' }),
    __metadata("design:type", Number)
], StudentExercise.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('Student', { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'student_id' }),
    __metadata("design:type", Object)
], StudentExercise.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'exercise_id' }),
    __metadata("design:type", String)
], StudentExercise.prototype, "exerciseId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('Exercise', 'studentExercises', { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'exercise_id' }),
    __metadata("design:type", Object)
], StudentExercise.prototype, "exercise", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], StudentExercise.prototype, "assigned_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], StudentExercise.prototype, "completed_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], StudentExercise.prototype, "total_questions", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], StudentExercise.prototype, "correct_answers", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], StudentExercise.prototype, "total_time_spent_seconds", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'assigned', length: 20 }),
    __metadata("design:type", String)
], StudentExercise.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], StudentExercise.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], StudentExercise.prototype, "updated_at", void 0);
exports.StudentExercise = StudentExercise = __decorate([
    (0, typeorm_1.Entity)('student_exercise')
], StudentExercise);
//# sourceMappingURL=student-exercise.entity.js.map