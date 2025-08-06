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
exports.GeminiController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const gemini_service_1 = require("./gemini.service");
const chat_dto_1 = require("./dto/chat.dto");
let GeminiController = class GeminiController {
    geminiService;
    constructor(geminiService) {
        this.geminiService = geminiService;
    }
    async chat(request) {
        const response = await this.geminiService.sendMessageToGemini(request.message, request.teacherTitle, request.isFirstInteraction, request.studentData, request.classData, request.teacherUserId, request.classId);
        return {
            content: response,
            model: 'gemini-2.0-flash',
            metadata: {
                source: 'gemini',
            },
        };
    }
};
exports.GeminiController = GeminiController;
__decorate([
    (0, common_1.Post)('chat'),
    (0, swagger_1.ApiOperation)({ summary: 'Send a message to Gemini AI' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns the AI response' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_dto_1.ChatDTO]),
    __metadata("design:returntype", Promise)
], GeminiController.prototype, "chat", null);
exports.GeminiController = GeminiController = __decorate([
    (0, swagger_1.ApiTags)('gemini'),
    (0, common_1.Controller)('gemini'),
    __metadata("design:paramtypes", [gemini_service_1.GeminiService])
], GeminiController);
//# sourceMappingURL=gemini.controller.js.map