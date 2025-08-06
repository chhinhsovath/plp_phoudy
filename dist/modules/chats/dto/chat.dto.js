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
exports.ChatResponseDto = exports.UpdateChatDto = exports.CreateChatDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const message_dto_1 = require("./message.dto");
class CreateChatDto {
    id;
    username;
    timestamp;
    preview;
    messages;
    message_count;
    user_message_count;
    ai_message_count;
    isTrainingCandidate;
    training_status;
    trainingNotes;
    language_detected;
    topicCategory;
}
exports.CreateChatDto = CreateChatDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Chat ID (for updates)', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return value && typeof value === 'string' && uuidPattern.test(value)
            ? value
            : null;
    }),
    __metadata("design:type", Object)
], CreateChatDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Username of the chat owner',
        example: 'john_doe',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateChatDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Chat timestamp', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateChatDto.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Preview text of the chat',
        example: 'How can I improve my math skills?',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateChatDto.prototype, "preview", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Initial messages to create with this chat',
        required: false,
        type: [message_dto_1.CreateMessageDto],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Object)
], CreateChatDto.prototype, "messages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total message count',
        required: false,
        example: 2,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Object)
], CreateChatDto.prototype, "message_count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User message count',
        required: false,
        example: 1,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Object)
], CreateChatDto.prototype, "user_message_count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'AI message count',
        required: false,
        example: 1,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Object)
], CreateChatDto.prototype, "ai_message_count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether this chat is a training candidate',
        required: false,
        default: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === true || value === 'true'),
    __metadata("design:type", Boolean)
], CreateChatDto.prototype, "isTrainingCandidate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Training status',
        required: false,
        default: 'UNPROCESSED',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateChatDto.prototype, "training_status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Training notes',
        required: false,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateChatDto.prototype, "trainingNotes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Detected language',
        required: false,
        default: 'km',
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateChatDto.prototype, "language_detected", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Topic category',
        required: false,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateChatDto.prototype, "topicCategory", void 0);
class UpdateChatDto extends CreateChatDto {
}
exports.UpdateChatDto = UpdateChatDto;
class ChatResponseDto {
    id;
    username;
    timestamp;
    preview;
    messages;
    message_count;
    user_message_count;
    ai_message_count;
    is_training_candidate;
    training_status;
    training_notes;
    language_detected;
    topic_category;
    created_at;
    updated_at;
}
exports.ChatResponseDto = ChatResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ChatResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ChatResponseDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], ChatResponseDto.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ChatResponseDto.prototype, "preview", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [message_dto_1.MessageResponseDto] }),
    __metadata("design:type", Object)
], ChatResponseDto.prototype, "messages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true }),
    __metadata("design:type", Object)
], ChatResponseDto.prototype, "message_count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true }),
    __metadata("design:type", Object)
], ChatResponseDto.prototype, "user_message_count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true }),
    __metadata("design:type", Object)
], ChatResponseDto.prototype, "ai_message_count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Boolean)
], ChatResponseDto.prototype, "is_training_candidate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ChatResponseDto.prototype, "training_status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true }),
    __metadata("design:type", Object)
], ChatResponseDto.prototype, "training_notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true }),
    __metadata("design:type", Object)
], ChatResponseDto.prototype, "language_detected", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true }),
    __metadata("design:type", Object)
], ChatResponseDto.prototype, "topic_category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], ChatResponseDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], ChatResponseDto.prototype, "updated_at", void 0);
//# sourceMappingURL=chat.dto.js.map