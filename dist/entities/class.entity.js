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
exports.Class = exports.GradeLevelType = void 0;
const typeorm_1 = require("typeorm");
const school_entity_1 = require("./school.entity");
const teacher_entity_1 = require("./teacher.entity");
const status_enum_1 = require("./enums/status.enum");
var GradeLevelType;
(function (GradeLevelType) {
    GradeLevelType["GRADE_1"] = "1";
    GradeLevelType["GRADE_2"] = "2";
    GradeLevelType["GRADE_3"] = "3";
    GradeLevelType["GRADE_4"] = "4";
    GradeLevelType["GRADE_5"] = "5";
    GradeLevelType["GRADE_6"] = "6";
})(GradeLevelType || (exports.GradeLevelType = GradeLevelType = {}));
let Class = class Class {
    classId;
    name;
    gradeLevel;
    section;
    schoolId;
    school;
    teacherId;
    teacher;
    academicYear;
    maxStudents;
    status;
    created_at;
    updated_at;
};
exports.Class = Class;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'class_id' }),
    __metadata("design:type", Number)
], Class.prototype, "classId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Class.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: GradeLevelType,
        name: 'grade_level',
    }),
    __metadata("design:type", String)
], Class.prototype, "gradeLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Class.prototype, "section", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'school_id' }),
    __metadata("design:type", Number)
], Class.prototype, "schoolId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => school_entity_1.School),
    (0, typeorm_1.JoinColumn)({ name: 'school_id' }),
    __metadata("design:type", school_entity_1.School)
], Class.prototype, "school", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'teacher_id' }),
    __metadata("design:type", Number)
], Class.prototype, "teacherId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => teacher_entity_1.Teacher),
    (0, typeorm_1.JoinColumn)({ name: 'teacher_id' }),
    __metadata("design:type", teacher_entity_1.Teacher)
], Class.prototype, "teacher", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'academic_year' }),
    __metadata("design:type", String)
], Class.prototype, "academicYear", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_students', default: 200 }),
    __metadata("design:type", Number)
], Class.prototype, "maxStudents", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: status_enum_1.Status,
        default: status_enum_1.Status.ACTIVE,
    }),
    __metadata("design:type", String)
], Class.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Class.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Class.prototype, "updated_at", void 0);
exports.Class = Class = __decorate([
    (0, typeorm_1.Entity)('classes')
], Class);
//# sourceMappingURL=class.entity.js.map