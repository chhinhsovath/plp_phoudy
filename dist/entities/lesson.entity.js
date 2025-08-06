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
exports.Lesson = void 0;
const typeorm_1 = require("typeorm");
const subject_entity_1 = require("./subject.entity");
const user_entity_1 = require("./user.entity");
const status_enum_1 = require("./enums/status.enum");
let Lesson = class Lesson {
    id;
    subjectId;
    subject;
    title;
    description;
    grade_level;
    lesson_number;
    createdBy;
    creator;
    status;
    is_hidden;
    activities;
    questions;
    created_at;
    updated_at;
};
exports.Lesson = Lesson;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Lesson.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'subject_id' }),
    __metadata("design:type", Number)
], Lesson.prototype, "subjectId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subject_entity_1.Subject, (subject) => subject.lessons),
    (0, typeorm_1.JoinColumn)({ name: 'subject_id' }),
    __metadata("design:type", subject_entity_1.Subject)
], Lesson.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Lesson.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Lesson.prototype, "grade_level", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", Number)
], Lesson.prototype, "lesson_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by' }),
    __metadata("design:type", Number)
], Lesson.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.User)
], Lesson.prototype, "creator", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: status_enum_1.Status,
        default: status_enum_1.Status.ACTIVE,
    }),
    __metadata("design:type", String)
], Lesson.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Lesson.prototype, "is_hidden", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('LessonActivity', 'lesson'),
    __metadata("design:type", Array)
], Lesson.prototype, "activities", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('Question', 'lesson'),
    __metadata("design:type", Array)
], Lesson.prototype, "questions", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Lesson.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Lesson.prototype, "updated_at", void 0);
exports.Lesson = Lesson = __decorate([
    (0, typeorm_1.Entity)('lessons')
], Lesson);
//# sourceMappingURL=lesson.entity.js.map