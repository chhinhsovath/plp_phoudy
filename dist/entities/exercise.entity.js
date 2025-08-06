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
exports.Exercise = void 0;
const typeorm_1 = require("typeorm");
const lesson_entity_1 = require("./lesson.entity");
let Exercise = class Exercise {
    id;
    lessonId;
    lesson;
    title;
    grade_level;
    created_at;
    studentExercises;
};
exports.Exercise = Exercise;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Exercise.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lesson_id' }),
    __metadata("design:type", Number)
], Exercise.prototype, "lessonId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lesson_entity_1.Lesson, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'lesson_id' }),
    __metadata("design:type", lesson_entity_1.Lesson)
], Exercise.prototype, "lesson", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Exercise.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], Exercise.prototype, "grade_level", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Exercise.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('StudentExercise', 'exercise'),
    __metadata("design:type", Array)
], Exercise.prototype, "studentExercises", void 0);
exports.Exercise = Exercise = __decorate([
    (0, typeorm_1.Entity)('exercises')
], Exercise);
//# sourceMappingURL=exercise.entity.js.map