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
exports.UpdateTeacherFeedbackDto = exports.CheckedStatus = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var CheckedStatus;
(function (CheckedStatus) {
    CheckedStatus["UNCHECKED"] = "UNCHECKED";
    CheckedStatus["CHECKED"] = "CHECKED";
})(CheckedStatus || (exports.CheckedStatus = CheckedStatus = {}));
class UpdateTeacherFeedbackDto {
    score;
    feedback;
    checkedStatus;
    checkedDate;
    checkedByTeacherId;
}
exports.UpdateTeacherFeedbackDto = UpdateTeacherFeedbackDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: Number, example: 85 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateTeacherFeedbackDto.prototype, "score", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, example: 'Good job!' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTeacherFeedbackDto.prototype, "feedback", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: CheckedStatus, example: CheckedStatus.CHECKED }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(CheckedStatus),
    __metadata("design:type", String)
], UpdateTeacherFeedbackDto.prototype, "checkedStatus", void 0);
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
], UpdateTeacherFeedbackDto.prototype, "checkedDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: Number, example: 2 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateTeacherFeedbackDto.prototype, "checkedByTeacherId", void 0);
//# sourceMappingURL=homework-submission-teacher.dto.js.map