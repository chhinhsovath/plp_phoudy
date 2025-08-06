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
exports.CreateStudentSubmissionDto = exports.SubmissionFileDto = exports.SubmissionStatus = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var SubmissionStatus;
(function (SubmissionStatus) {
    SubmissionStatus["NOT_SUBMITTED"] = "NOT_SUBMITTED";
    SubmissionStatus["SUBMITTED"] = "SUBMITTED";
})(SubmissionStatus || (exports.SubmissionStatus = SubmissionStatus = {}));
class SubmissionFileDto {
    name;
    size;
    type;
    url;
}
exports.SubmissionFileDto = SubmissionFileDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, example: 'file.pdf' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmissionFileDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: Number, example: 102400 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SubmissionFileDto.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, example: 'application/pdf' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmissionFileDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, example: '/uploads/file.pdf' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmissionFileDto.prototype, "url", void 0);
class CreateStudentSubmissionDto {
    homeworkId;
    studentId;
    submissionText;
    submissionFiles;
    submittedAt;
    status = SubmissionStatus.SUBMITTED;
}
exports.CreateStudentSubmissionDto = CreateStudentSubmissionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 1 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateStudentSubmissionDto.prototype, "homeworkId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 1001 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateStudentSubmissionDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        example: 'My answer to the homework question.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStudentSubmissionDto.prototype, "submissionText", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [SubmissionFileDto],
        description: 'List of submission files',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SubmissionFileDto),
    __metadata("design:type", Array)
], CreateStudentSubmissionDto.prototype, "submissionFiles", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        format: 'date-time',
        example: '2025-07-09T12:00:00Z',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateStudentSubmissionDto.prototype, "submittedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: SubmissionStatus,
        example: SubmissionStatus.SUBMITTED,
        default: SubmissionStatus.SUBMITTED,
    }),
    (0, class_validator_1.IsEnum)(SubmissionStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentSubmissionDto.prototype, "status", void 0);
//# sourceMappingURL=homework-submission-student.dto.js.map