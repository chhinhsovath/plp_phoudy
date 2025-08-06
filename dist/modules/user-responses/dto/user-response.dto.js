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
exports.BulkDeleteDto = exports.UpdateUserResponseDto = exports.CreateUserResponseDto = exports.UserResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserResponseDto {
    id;
    userId;
    questionId;
    userAnswer;
    userAnswerFile;
    isCorrect;
    timeSpent;
    scoreImpact;
    streakCount;
    hintsUsed;
    createdAt;
    updatedAt;
}
exports.UserResponseDto = UserResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier', example: 1 }),
    __metadata("design:type", Number)
], UserResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User ID', example: 1 }),
    __metadata("design:type", Number)
], UserResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question ID', example: 1 }),
    __metadata("design:type", Number)
], UserResponseDto.prototype, "questionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User's answer text",
        required: false,
        example: 'Paris',
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "userAnswer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Path to user's answer file",
        required: false,
        example: 'uploads/answer123.jpg',
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "userAnswerFile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the answer is correct', example: true }),
    __metadata("design:type", Boolean)
], UserResponseDto.prototype, "isCorrect", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Time spent answering in seconds', example: 45 }),
    __metadata("design:type", Number)
], UserResponseDto.prototype, "timeSpent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Score impact of this response', example: 10 }),
    __metadata("design:type", Number)
], UserResponseDto.prototype, "scoreImpact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Current streak count', example: 3 }),
    __metadata("design:type", Number)
], UserResponseDto.prototype, "streakCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of hints used', example: 1 }),
    __metadata("design:type", Number)
], UserResponseDto.prototype, "hintsUsed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Creation timestamp',
        example: '2023-05-15T09:00:00Z',
    }),
    __metadata("design:type", Date)
], UserResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last update timestamp',
        example: '2023-05-15T09:00:00Z',
    }),
    __metadata("design:type", Date)
], UserResponseDto.prototype, "updatedAt", void 0);
class CreateUserResponseDto {
    userId;
    questionId;
    userAnswer;
    userAnswerFile;
    isCorrect;
    timeSpent;
    scoreImpact;
    streakCount;
    hintsUsed;
}
exports.CreateUserResponseDto = CreateUserResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User ID', example: 1 }),
    __metadata("design:type", Number)
], CreateUserResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question ID', example: 1 }),
    __metadata("design:type", Number)
], CreateUserResponseDto.prototype, "questionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User's answer text",
        required: false,
        example: 'Paris',
    }),
    __metadata("design:type", String)
], CreateUserResponseDto.prototype, "userAnswer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Path to user's answer file",
        required: false,
        example: 'uploads/answer123.jpg',
    }),
    __metadata("design:type", String)
], CreateUserResponseDto.prototype, "userAnswerFile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the answer is correct', example: true }),
    __metadata("design:type", Boolean)
], CreateUserResponseDto.prototype, "isCorrect", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Time spent answering in seconds', example: 45 }),
    __metadata("design:type", Number)
], CreateUserResponseDto.prototype, "timeSpent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Score impact of this response', example: 10 }),
    __metadata("design:type", Number)
], CreateUserResponseDto.prototype, "scoreImpact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Current streak count', example: 3 }),
    __metadata("design:type", Number)
], CreateUserResponseDto.prototype, "streakCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of hints used', example: 1 }),
    __metadata("design:type", Number)
], CreateUserResponseDto.prototype, "hintsUsed", void 0);
class UpdateUserResponseDto extends CreateUserResponseDto {
}
exports.UpdateUserResponseDto = UpdateUserResponseDto;
class BulkDeleteDto {
    ids;
}
exports.BulkDeleteDto = BulkDeleteDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of user response IDs to delete',
        example: [1, 2, 3],
    }),
    __metadata("design:type", Array)
], BulkDeleteDto.prototype, "ids", void 0);
//# sourceMappingURL=user-response.dto.js.map