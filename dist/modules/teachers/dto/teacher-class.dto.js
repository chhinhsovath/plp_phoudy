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
exports.TeacherClassDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_entity_1 = require("../../../entities/class.entity");
const status_enum_1 = require("../../../entities/enums/status.enum");
class TeacherClassDto {
    classId;
    name;
    gradeLevel;
    section;
    schoolId;
    teacherId;
    academicYear;
    maxStudents;
    status;
    school;
}
exports.TeacherClassDto = TeacherClassDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], TeacherClassDto.prototype, "classId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Grade 5A' }),
    __metadata("design:type", String)
], TeacherClassDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: class_entity_1.GradeLevelType, example: class_entity_1.GradeLevelType.GRADE_5 }),
    __metadata("design:type", String)
], TeacherClassDto.prototype, "gradeLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'A', required: false }),
    __metadata("design:type", String)
], TeacherClassDto.prototype, "section", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], TeacherClassDto.prototype, "schoolId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], TeacherClassDto.prototype, "teacherId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-2024' }),
    __metadata("design:type", String)
], TeacherClassDto.prototype, "academicYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 30 }),
    __metadata("design:type", Number)
], TeacherClassDto.prototype, "maxStudents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: status_enum_1.Status, example: status_enum_1.Status.ACTIVE }),
    __metadata("design:type", String)
], TeacherClassDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            name: 'ABC School',
        },
    }),
    __metadata("design:type", Object)
], TeacherClassDto.prototype, "school", void 0);
//# sourceMappingURL=teacher-class.dto.js.map