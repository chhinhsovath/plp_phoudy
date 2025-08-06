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
exports.UpdateHomeworkSubmissionDto = exports.CreateHomeworkSubmissionDto = exports.CheckedStatus = exports.SubmissionStatus = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var SubmissionStatus;
(function (SubmissionStatus) {
    SubmissionStatus["NOT_SUBMITTED"] = "NOT_SUBMITTED";
    SubmissionStatus["SUBMITTED"] = "SUBMITTED";
})(SubmissionStatus || (exports.SubmissionStatus = SubmissionStatus = {}));
var CheckedStatus;
(function (CheckedStatus) {
    CheckedStatus["UNCHECKED"] = "UNCHECKED";
    CheckedStatus["CHECKED"] = "CHECKED";
})(CheckedStatus || (exports.CheckedStatus = CheckedStatus = {}));
class CreateHomeworkSubmissionDto {
    homeworkId;
    studentId;
    submissionText;
    fileUrl;
    score;
    feedback;
    status;
    checkedStatus;
    submittedAt;
    checkedDate;
    checkedByTeacherId;
    overdue;
    allowResubmit = false;
}
exports.CreateHomeworkSubmissionDto = CreateHomeworkSubmissionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateHomeworkSubmissionDto.prototype, "homeworkId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 1001 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateHomeworkSubmissionDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        example: 'My answer to the homework question.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHomeworkSubmissionDto.prototype, "submissionText", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, example: '/uploads/file.pdf' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHomeworkSubmissionDto.prototype, "fileUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: Number, example: 85 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateHomeworkSubmissionDto.prototype, "score", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, example: 'Good job!' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHomeworkSubmissionDto.prototype, "feedback", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: SubmissionStatus, example: SubmissionStatus.SUBMITTED }),
    (0, class_validator_1.IsEnum)(SubmissionStatus),
    __metadata("design:type", String)
], CreateHomeworkSubmissionDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: CheckedStatus, example: CheckedStatus.CHECKED }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(CheckedStatus),
    __metadata("design:type", String)
], CreateHomeworkSubmissionDto.prototype, "checkedStatus", void 0);
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
], CreateHomeworkSubmissionDto.prototype, "submittedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        format: 'date-time',
        example: '2025-07-10T08:30:00Z',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateHomeworkSubmissionDto.prototype, "checkedDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: Number, example: 2 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateHomeworkSubmissionDto.prototype, "checkedByTeacherId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateHomeworkSubmissionDto.prototype, "overdue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Boolean,
        default: false,
        description: 'Allow resubmission of homework',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateHomeworkSubmissionDto.prototype, "allowResubmit", void 0);
class UpdateHomeworkSubmissionDto extends (0, swagger_1.PartialType)(CreateHomeworkSubmissionDto) {
}
exports.UpdateHomeworkSubmissionDto = UpdateHomeworkSubmissionDto;
//# sourceMappingURL=homework-submission.dto.js.map