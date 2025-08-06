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
exports.CreateClassDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_entity_1 = require("../../../entities/class.entity");
class CreateClassDto {
    name;
    gradeLevel;
    section;
    schoolId;
    teacherId;
    academicYear;
    maxStudents;
}
exports.CreateClassDto = CreateClassDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The name of the class' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateClassDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The grade level',
        enum: class_entity_1.GradeLevelType,
        example: class_entity_1.GradeLevelType.GRADE_1,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(class_entity_1.GradeLevelType),
    __metadata("design:type", String)
], CreateClassDto.prototype, "gradeLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The section (e.g., A, B, C)', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateClassDto.prototype, "section", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The school ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateClassDto.prototype, "schoolId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The teacher ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateClassDto.prototype, "teacherId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The academic year (e.g., 2024-2025)' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateClassDto.prototype, "academicYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Maximum number of students',
        minimum: 1,
        default: 200,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateClassDto.prototype, "maxStudents", void 0);
//# sourceMappingURL=create-class.dto.js.map