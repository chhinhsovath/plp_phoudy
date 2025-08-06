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
exports.LessonActivity = void 0;
const typeorm_1 = require("typeorm");
const status_enum_1 = require("./enums/status.enum");
const lesson_entity_1 = require("./lesson.entity");
let LessonActivity = class LessonActivity {
    id;
    lessonId;
    lesson;
    title;
    order_index;
    status;
    questions;
    created_at;
    updated_at;
};
exports.LessonActivity = LessonActivity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], LessonActivity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lesson_id' }),
    __metadata("design:type", Number)
], LessonActivity.prototype, "lessonId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lesson_entity_1.Lesson),
    (0, typeorm_1.JoinColumn)({ name: 'lesson_id' }),
    __metadata("design:type", lesson_entity_1.Lesson)
], LessonActivity.prototype, "lesson", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LessonActivity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], LessonActivity.prototype, "order_index", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: status_enum_1.Status,
        default: status_enum_1.Status.ACTIVE,
    }),
    __metadata("design:type", String)
], LessonActivity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('Question', 'lessonActivity'),
    __metadata("design:type", Array)
], LessonActivity.prototype, "questions", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], LessonActivity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], LessonActivity.prototype, "updated_at", void 0);
exports.LessonActivity = LessonActivity = __decorate([
    (0, typeorm_1.Entity)('lesson_activities')
], LessonActivity);
//# sourceMappingURL=lesson-activity.entity.js.map