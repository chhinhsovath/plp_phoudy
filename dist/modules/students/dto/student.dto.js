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
exports.StudentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserDto {
    username;
    first_name;
    last_name;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'soksocheta' }),
    __metadata("design:type", String)
], UserDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'សុខ' }),
    __metadata("design:type", String)
], UserDto.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'សុជាតា' }),
    __metadata("design:type", String)
], UserDto.prototype, "last_name", void 0);
class ScoreDto {
    date;
    value;
    subject;
    grade;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-03-20T08:00:00Z' }),
    __metadata("design:type", String)
], ScoreDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 85 }),
    __metadata("design:type", Number)
], ScoreDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MATHEMATICS' }),
    __metadata("design:type", String)
], ScoreDto.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ថ្នាក់ទី១' }),
    __metadata("design:type", String)
], ScoreDto.prototype, "grade", void 0);
class ProblemPointDto {
    lesson;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'មេរៀនទី១' }),
    __metadata("design:type", String)
], ProblemPointDto.prototype, "lesson", void 0);
class StudentDto {
    studentId;
    user;
    scores;
    problemPoints;
    averageScore;
    timeSpent;
}
exports.StudentDto = StudentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], StudentDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: UserDto }),
    __metadata("design:type", UserDto)
], StudentDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ScoreDto] }),
    __metadata("design:type", Array)
], StudentDto.prototype, "scores", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ProblemPointDto] }),
    __metadata("design:type", Array)
], StudentDto.prototype, "problemPoints", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 85.5 }),
    __metadata("design:type", Number)
], StudentDto.prototype, "averageScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3600 }),
    __metadata("design:type", Number)
], StudentDto.prototype, "timeSpent", void 0);
//# sourceMappingURL=student.dto.js.map