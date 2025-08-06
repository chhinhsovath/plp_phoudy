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
exports.Homework = void 0;
const typeorm_1 = require("typeorm");
const homework_submission_entity_1 = require("./homework-submission.entity");
let Homework = class Homework {
    id;
    title;
    description;
    classId;
    subjectId;
    lessonId;
    teacherId;
    dueDate;
    status;
    allowResubmit;
    createdAt;
    updatedAt;
    submissions;
    setCreateDates() {
        const now = new Date();
        this.createdAt = now;
        this.updatedAt = now;
    }
    updateTimestamp() {
        this.updatedAt = new Date();
    }
};
exports.Homework = Homework;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Homework.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Homework.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Homework.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'class_id', type: 'bigint' }),
    __metadata("design:type", Number)
], Homework.prototype, "classId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'subject_id', type: 'bigint' }),
    __metadata("design:type", Number)
], Homework.prototype, "subjectId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lesson_id', type: 'bigint' }),
    __metadata("design:type", Number)
], Homework.prototype, "lessonId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'teacher_id', type: 'bigint' }),
    __metadata("design:type", Number)
], Homework.prototype, "teacherId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'due_date', type: 'timestamp' }),
    __metadata("design:type", Date)
], Homework.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Homework.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Homework.prototype, "allowResubmit", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Homework.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Homework.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => homework_submission_entity_1.HomeworkSubmission, (submission) => submission.homework),
    __metadata("design:type", Array)
], Homework.prototype, "submissions", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Homework.prototype, "setCreateDates", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Homework.prototype, "updateTimestamp", null);
exports.Homework = Homework = __decorate([
    (0, typeorm_1.Entity)('homework')
], Homework);
//# sourceMappingURL=homework.entity.js.map