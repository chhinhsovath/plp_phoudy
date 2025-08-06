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
exports.CreateLessonActivityDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const status_enum_1 = require("../../../entities/enums/status.enum");
class CreateLessonActivityDto {
    title;
    lessonId;
    order_index;
    status;
}
exports.CreateLessonActivityDto = CreateLessonActivityDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The title of the lesson activity' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLessonActivityDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The ID of the lesson this activity belongs to' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateLessonActivityDto.prototype, "lessonId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The order index of the activity',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateLessonActivityDto.prototype, "order_index", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The status of the lesson activity',
        enum: status_enum_1.Status,
        default: status_enum_1.Status.ACTIVE,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(status_enum_1.Status),
    __metadata("design:type", String)
], CreateLessonActivityDto.prototype, "status", void 0);
//# sourceMappingURL=create-lesson-activity.dto.js.map