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
exports.ChatDTO = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class ChatDTO {
    message;
    teacherTitle;
    isFirstInteraction;
    studentData;
    classData;
    teacherUserId;
    classId;
}
exports.ChatDTO = ChatDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The message to send to Gemini',
        example: 'How do I solve 5 + 3?',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChatDTO.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The title of the teacher (used in the prompt)',
        example: 'គ្រូ',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChatDTO.prototype, "teacherTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether this is the first interaction in the conversation',
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ChatDTO.prototype, "isFirstInteraction", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Optional student data for educational analysis',
        example: { grades: { math: 8, khmer: 7, science: 6 } },
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ChatDTO.prototype, "studentData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Optional class data for educational analysis',
        example: { totalStudents: 25, averageGrade: 7.2 },
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ChatDTO.prototype, "classData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Teacher user ID for fetching real educational data',
        example: 1,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ChatDTO.prototype, "teacherUserId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Class ID for fetching real student data directly',
        example: 1,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ChatDTO.prototype, "classId", void 0);
//# sourceMappingURL=chat.dto.js.map