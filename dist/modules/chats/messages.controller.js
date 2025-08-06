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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const messages_service_1 = require("./messages.service");
const chats_service_1 = require("./chats.service");
const message_dto_1 = require("./dto/message.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const user_decorator_1 = require("../../decorators/user.decorator");
let MessagesController = class MessagesController {
    messagesService;
    chatsService;
    constructor(messagesService, chatsService) {
        this.messagesService = messagesService;
        this.chatsService = chatsService;
    }
    async checkUserAuthorization(chatId, user) {
        const chat = await this.chatsService.findOne(chatId);
        if (!user || (user.username !== chat.username && user.role !== 'ADMIN')) {
            throw new common_1.ForbiddenException('You are not authorized to access this resource');
        }
    }
    testEndpoint() {
        return {
            status: 'ok',
            message: 'Messages API is working',
        };
    }
    async getAdminMessagesForChat(chatId, user) {
        if (user.role !== 'ADMIN') {
            throw new common_1.ForbiddenException('Only admins can access this endpoint');
        }
        return await this.messagesService.findAllForChat(chatId);
    }
    async getAllMessagesForChat(chatId, user) {
        await this.checkUserAuthorization(chatId, user);
        return await this.messagesService.findAllForChat(chatId);
    }
    async getMessageById(id, user) {
        const message = await this.messagesService.findOne(id);
        await this.checkUserAuthorization(message.chat_id, user);
        return message;
    }
    async createMessage(createMessageDto, user) {
        const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!createMessageDto.chat_id ||
            !uuidPattern.test(createMessageDto.chat_id)) {
            throw new common_1.HttpException('Invalid chat_id: must be a valid UUID', common_1.HttpStatus.BAD_REQUEST);
        }
        if (createMessageDto.id && !uuidPattern.test(createMessageDto.id)) {
            createMessageDto.id = undefined;
        }
        await this.checkUserAuthorization(createMessageDto.chat_id, user);
        return await this.messagesService.create(createMessageDto);
    }
    async updateMessage(id, updateMessageDto, user) {
        const message = await this.messagesService.findOne(id);
        await this.checkUserAuthorization(message.chat_id, user);
        return await this.messagesService.update(id, updateMessageDto);
    }
    async deleteMessage(id, user) {
        const message = await this.messagesService.findOne(id);
        await this.checkUserAuthorization(message.chat_id, user);
        await this.messagesService.remove(id);
    }
};
exports.MessagesController = MessagesController;
__decorate([
    (0, common_1.Get)('test'),
    (0, swagger_1.ApiOperation)({ summary: 'Test endpoint for Messages API' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'API is working' }),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], MessagesController.prototype, "testEndpoint", null);
__decorate([
    (0, common_1.Get)('admin/chat/:chatId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all messages for a chat (admin only)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return all messages for the chat',
        type: [message_dto_1.MessageResponseDto],
    }),
    (0, swagger_1.ApiParam)({ name: 'chatId', type: 'string', format: 'uuid' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('chatId', common_1.ParseUUIDPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "getAdminMessagesForChat", null);
__decorate([
    (0, common_1.Get)('chat/:chatId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all messages for a chat' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return all messages for the chat',
        type: [message_dto_1.MessageResponseDto],
    }),
    (0, swagger_1.ApiParam)({ name: 'chatId', type: 'string', format: 'uuid' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('chatId', common_1.ParseUUIDPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "getAllMessagesForChat", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a message by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return the message',
        type: message_dto_1.MessageResponseDto,
    }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', format: 'uuid' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "getMessageById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new message' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Message created successfully',
        type: message_dto_1.MessageResponseDto,
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_dto_1.CreateMessageDto, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "createMessage", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a message' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Message updated successfully',
        type: message_dto_1.MessageResponseDto,
    }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', format: 'uuid' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, message_dto_1.UpdateMessageDto, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "updateMessage", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a message' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Message deleted successfully' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', format: 'uuid' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "deleteMessage", null);
exports.MessagesController = MessagesController = __decorate([
    (0, swagger_1.ApiTags)('Messages'),
    (0, common_1.Controller)('messages'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [messages_service_1.MessagesService,
        chats_service_1.ChatsService])
], MessagesController);
//# sourceMappingURL=messages.controller.js.map