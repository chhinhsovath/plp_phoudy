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
exports.GemmaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const gemma_service_1 = require("./gemma.service");
const chat_dto_1 = require("./dto/chat.dto");
let GemmaController = class GemmaController {
    gemmaService;
    constructor(gemmaService) {
        this.gemmaService = gemmaService;
    }
    async chat(request) {
        const response = await this.gemmaService.sendMessageToGemma(request.message, request.teacherTitle, request.isFirstInteraction);
        return {
            content: response,
            model: 'google/gemma-3-27b-it',
            metadata: {
                source: 'gemma',
                provider: 'openrouter',
            },
        };
    }
};
exports.GemmaController = GemmaController;
__decorate([
    (0, common_1.Post)('chat'),
    (0, swagger_1.ApiOperation)({ summary: 'Send a message to Gemma 3 AI' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns the AI response' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_dto_1.ChatDTOGemma]),
    __metadata("design:returntype", Promise)
], GemmaController.prototype, "chat", null);
exports.GemmaController = GemmaController = __decorate([
    (0, swagger_1.ApiTags)('gemma'),
    (0, common_1.Controller)('gemma'),
    __metadata("design:paramtypes", [gemma_service_1.GemmaService])
], GemmaController);
//# sourceMappingURL=gemma.controller.js.map