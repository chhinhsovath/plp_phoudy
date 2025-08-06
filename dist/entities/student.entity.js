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
exports.Student = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const class_entity_1 = require("./class.entity");
const status_enum_1 = require("./enums/status.enum");
const homework_submission_entity_1 = require("./homework-submission.entity");
let Student = class Student {
    studentId;
    userId;
    user;
    classId;
    class;
    studentNumber;
    status;
    createdAt;
    updatedAt;
    homeworkSubmissions;
};
exports.Student = Student;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'student_id' }),
    __metadata("design:type", Number)
], Student.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], Student.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Student.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'class_id', nullable: true }),
    __metadata("design:type", Number)
], Student.prototype, "classId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => class_entity_1.Class, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'class_id' }),
    __metadata("design:type", class_entity_1.Class)
], Student.prototype, "class", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'student_number', unique: true, nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "studentNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: status_enum_1.Status,
        default: status_enum_1.Status.ACTIVE,
    }),
    __metadata("design:type", String)
], Student.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Student.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Student.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => homework_submission_entity_1.HomeworkSubmission, (submission) => submission.student),
    __metadata("design:type", Array)
], Student.prototype, "homeworkSubmissions", void 0);
exports.Student = Student = __decorate([
    (0, typeorm_1.Entity)('students')
], Student);
//# sourceMappingURL=student.entity.js.map