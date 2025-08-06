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
exports.VideoResponseDto = exports.UpdateVideoDto = exports.CreateVideoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const video_entity_1 = require("../../../entities/video.entity");
const mapped_types_1 = require("@nestjs/mapped-types");
class CreateVideoDto {
    lessonTitle;
    url;
    teacherName;
    subject;
    grade;
    uploader;
    duration;
    durationString;
    uploadDate;
    thumbnailUrl;
    status;
}
exports.CreateVideoDto = CreateVideoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lesson title' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVideoDto.prototype, "lessonTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Video URL' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVideoDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Teacher name' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVideoDto.prototype, "teacherName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Subject' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVideoDto.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Grade' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVideoDto.prototype, "grade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Uploader' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVideoDto.prototype, "uploader", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Duration in seconds', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateVideoDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Duration as a string (e.g., "5:30")',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVideoDto.prototype, "durationString", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Upload date', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVideoDto.prototype, "uploadDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thumbnail URL', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVideoDto.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Status', enum: video_entity_1.Status, default: video_entity_1.Status.ACTIVE }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(video_entity_1.Status),
    __metadata("design:type", String)
], CreateVideoDto.prototype, "status", void 0);
class UpdateVideoDto extends (0, mapped_types_1.PartialType)(CreateVideoDto) {
}
exports.UpdateVideoDto = UpdateVideoDto;
class VideoResponseDto {
    id;
    lessonTitle;
    url;
    teacherName;
    subject;
    grade;
    uploader;
    duration;
    durationString;
    uploadDate;
    thumbnailUrl;
    status;
    createdAt;
    updatedAt;
}
exports.VideoResponseDto = VideoResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], VideoResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VideoResponseDto.prototype, "lessonTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VideoResponseDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VideoResponseDto.prototype, "teacherName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VideoResponseDto.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VideoResponseDto.prototype, "grade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VideoResponseDto.prototype, "uploader", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], VideoResponseDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], VideoResponseDto.prototype, "durationString", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], VideoResponseDto.prototype, "uploadDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], VideoResponseDto.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: video_entity_1.Status }),
    __metadata("design:type", String)
], VideoResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], VideoResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], VideoResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=video.dto.js.map