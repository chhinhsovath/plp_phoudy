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
exports.ChatsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const chats_service_1 = require("./chats.service");
const chat_dto_1 = require("./dto/chat.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const user_decorator_1 = require("../../decorators/user.decorator");
let ChatsController = class ChatsController {
    chatsService;
    constructor(chatsService) {
        this.chatsService = chatsService;
    }
    checkUserAuthorization(username, user) {
        if (!user || (user.username !== username && user.role !== 'ADMIN')) {
            throw new common_1.ForbiddenException('You are not authorized to access this resource');
        }
    }
    testEndpoint() {
        return {
            status: 'ok',
            message: 'Chat API is working',
        };
    }
    async getAdminChatsForUser(username, user) {
        if (user.role !== 'ADMIN') {
            throw new common_1.ForbiddenException('Only admins can access this endpoint');
        }
        return this.chatsService.findAllForUser(username);
    }
    async getAdminChatsForUserPaginated(username, page = 0, size = 20, user) {
        if (user.role !== 'ADMIN') {
            throw new common_1.ForbiddenException('Only admins can access this endpoint');
        }
        const [chats, total] = await this.chatsService.findAllForUserPaginated(username, page, size);
        return { data: chats, total, page, size };
    }
    async createChat(createChatDto, user) {
        this.checkUserAuthorization(createChatDto.username, user);
        if (!createChatDto.timestamp) {
            createChatDto.timestamp = new Date();
        }
        if (createChatDto.id && typeof createChatDto.id === 'string') {
            const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
            if (!uuidPattern.test(createChatDto.id)) {
                createChatDto.id = null;
            }
        }
        return this.chatsService.create(createChatDto);
    }
    async getAllChatsForUser(username, user) {
        this.checkUserAuthorization(username, user);
        return this.chatsService.findAllForUser(username);
    }
    async getAllChatsForUserPaginated(username, page = 0, size = 20, user) {
        this.checkUserAuthorization(username, user);
        const [chats, total] = await this.chatsService.findAllForUserPaginated(username, page, size);
        return { data: chats, total, page, size };
    }
    async getChatById(id, user) {
        const chat = await this.chatsService.findOne(id);
        this.checkUserAuthorization(chat.username, user);
        return chat;
    }
    async getChatWithMessages(id, user) {
        const chat = await this.chatsService.findOneWithMessages(id);
        this.checkUserAuthorization(chat.username, user);
        return chat;
    }
    async updateChat(id, updateChatDto, user) {
        const chat = await this.chatsService.findOne(id);
        this.checkUserAuthorization(chat.username, user);
        return this.chatsService.update(id, updateChatDto);
    }
    async deleteChat(id, user) {
        const chat = await this.chatsService.findOne(id);
        this.checkUserAuthorization(chat.username, user);
        await this.chatsService.remove(id);
    }
    async deleteAllChatsForUser(username, user) {
        this.checkUserAuthorization(username, user);
        await this.chatsService.removeAllForUser(username);
    }
};
exports.ChatsController = ChatsController;
__decorate([
    (0, common_1.Get)('test'),
    (0, swagger_1.ApiOperation)({ summary: 'Test endpoint for Chat API' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'API is working' }),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], ChatsController.prototype, "testEndpoint", null);
__decorate([
    (0, common_1.Get)('admin/user/:username'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all chats for a user (admin only)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return all chats for the user',
        type: [chat_dto_1.ChatResponseDto],
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "getAdminChatsForUser", null);
__decorate([
    (0, common_1.Get)('admin/user/:username/paginated'),
    (0, swagger_1.ApiOperation)({ summary: 'Get paginated chats for a user (admin only)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return paginated chats for the user',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number (0-indexed)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'size',
        required: false,
        type: Number,
        description: 'Page size',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('size')),
    __param(3, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "getAdminChatsForUserPaginated", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a chat' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Chat created successfully',
        type: chat_dto_1.ChatResponseDto,
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_dto_1.CreateChatDto, Object]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "createChat", null);
__decorate([
    (0, common_1.Get)('user/:username'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all chats for a user' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return all chats for the user',
        type: [chat_dto_1.ChatResponseDto],
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "getAllChatsForUser", null);
__decorate([
    (0, common_1.Get)('user/:username/paginated'),
    (0, swagger_1.ApiOperation)({ summary: 'Get paginated chats for a user' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return paginated chats for the user',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number (0-indexed)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'size',
        required: false,
        type: Number,
        description: 'Page size',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('size')),
    __param(3, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "getAllChatsForUserPaginated", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a chat by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return the chat',
        type: chat_dto_1.ChatResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Chat not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', format: 'uuid' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "getChatById", null);
__decorate([
    (0, common_1.Get)(':id/with-messages'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a chat by ID including messages' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return the chat with messages',
        type: chat_dto_1.ChatResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Chat not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', format: 'uuid' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "getChatWithMessages", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a chat' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Chat updated successfully',
        type: chat_dto_1.ChatResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Chat not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', format: 'uuid' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, chat_dto_1.UpdateChatDto, Object]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "updateChat", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a chat' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Chat deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Chat not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', format: 'uuid' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "deleteChat", null);
__decorate([
    (0, common_1.Delete)('user/:username'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete all chats for a user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'All chats deleted successfully' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "deleteAllChatsForUser", null);
exports.ChatsController = ChatsController = __decorate([
    (0, swagger_1.ApiTags)('Chats'),
    (0, common_1.Controller)('chats'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [chats_service_1.ChatsService])
], ChatsController);
//# sourceMappingURL=chats.controller.js.map