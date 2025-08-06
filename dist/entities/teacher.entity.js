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
exports.Teacher = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const school_entity_1 = require("./school.entity");
const status_enum_1 = require("./enums/status.enum");
let Teacher = class Teacher {
    teacherId;
    userId;
    user;
    schoolId;
    school;
    hire_date;
    isDirector;
    teacher_number;
    status;
    created_at;
    updated_at;
};
exports.Teacher = Teacher;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'teacher_id' }),
    __metadata("design:type", Number)
], Teacher.prototype, "teacherId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], Teacher.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.teacher),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Teacher.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'school_id' }),
    __metadata("design:type", Number)
], Teacher.prototype, "schoolId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => school_entity_1.School),
    (0, typeorm_1.JoinColumn)({ name: 'school_id' }),
    __metadata("design:type", school_entity_1.School)
], Teacher.prototype, "school", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Teacher.prototype, "hire_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_director', default: false }),
    __metadata("design:type", Boolean)
], Teacher.prototype, "isDirector", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Teacher.prototype, "teacher_number", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: status_enum_1.Status,
        default: status_enum_1.Status.ACTIVE,
    }),
    __metadata("design:type", String)
], Teacher.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Teacher.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Teacher.prototype, "updated_at", void 0);
exports.Teacher = Teacher = __decorate([
    (0, typeorm_1.Entity)('teachers')
], Teacher);
//# sourceMappingURL=teacher.entity.js.map