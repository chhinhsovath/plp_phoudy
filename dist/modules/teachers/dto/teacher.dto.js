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
exports.TeacherDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const status_enum_1 = require("../../../entities/enums/status.enum");
class TeacherDto {
    teacherId;
    userId;
    schoolId;
    hire_date;
    isDirector;
    status;
    user;
    school;
}
exports.TeacherDto = TeacherDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], TeacherDto.prototype, "teacherId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], TeacherDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], TeacherDto.prototype, "schoolId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-01', required: false }),
    __metadata("design:type", Date)
], TeacherDto.prototype, "hire_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], TeacherDto.prototype, "isDirector", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: status_enum_1.Status, example: status_enum_1.Status.ACTIVE }),
    __metadata("design:type", String)
], TeacherDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            username: 'teacher123',
            first_name: 'John',
            last_name: 'Doe',
        },
    }),
    __metadata("design:type", Object)
], TeacherDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            name: 'ABC School',
        },
    }),
    __metadata("design:type", Object)
], TeacherDto.prototype, "school", void 0);
//# sourceMappingURL=teacher.dto.js.map