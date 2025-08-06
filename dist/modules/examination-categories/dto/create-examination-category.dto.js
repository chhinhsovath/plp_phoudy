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
exports.CreateExaminationCategoryDto = void 0;
const class_validator_1 = require("class-validator");
const examination_category_entity_1 = require("../../../entities/examination-category.entity");
const class_entity_1 = require("../../../entities/class.entity");
class CreateExaminationCategoryDto {
    title;
    subjectId;
    subSubjectId;
    grade;
    type;
    status;
    certificateFile;
}
exports.CreateExaminationCategoryDto = CreateExaminationCategoryDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExaminationCategoryDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateExaminationCategoryDto.prototype, "subjectId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateExaminationCategoryDto.prototype, "subSubjectId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(class_entity_1.GradeLevelType),
    __metadata("design:type", String)
], CreateExaminationCategoryDto.prototype, "grade", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(examination_category_entity_1.ExaminationType),
    __metadata("design:type", String)
], CreateExaminationCategoryDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExaminationCategoryDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExaminationCategoryDto.prototype, "certificateFile", void 0);
//# sourceMappingURL=create-examination-category.dto.js.map