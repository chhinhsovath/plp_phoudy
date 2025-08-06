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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const message_entity_1 = require("../../entities/message.entity");
const uuid_1 = require("uuid");
let MessagesService = class MessagesService {
    messageRepository;
    constructor(messageRepository) {
        this.messageRepository = messageRepository;
    }
    isPromptQuestionResponse(content) {
        const promptQuestionResponses = [
            'ខ្ញុំ​ជា​គំរូ​ភាសា​ដ៏​ធំ​មួយ ដែល​បាន​បង្កើត​ឡើង​ដោយ ថ្នាលបឋម (PLP EdTech)។',
        ];
        return promptQuestionResponses.includes(content);
    }
    async findAllForChat(chatId) {
        return await this.messageRepository.find({
            where: { chat_id: chatId },
            order: { created_at: 'ASC' },
        });
    }
    async findOne(id) {
        const message = await this.messageRepository.findOne({
            where: { id },
        });
        if (!message) {
            throw new common_1.NotFoundException(`Message with ID ${id} not found`);
        }
        return message;
    }
    async create(createMessageDto) {
        const message = new message_entity_1.Message();
        message.id = createMessageDto.id || (0, uuid_1.v4)();
        message.chat_id = createMessageDto.chat_id;
        message.role = createMessageDto.role;
        message.content = createMessageDto.content;
        if (createMessageDto.role === 'user') {
            message.model = 'user';
        }
        else if (createMessageDto.role === 'assistant') {
            if (createMessageDto.model) {
                message.model = createMessageDto.model;
            }
            else if (createMessageDto.metadata) {
                if (createMessageDto.metadata.source === 'prompt-questions') {
                    message.model = 'system';
                }
                else if (createMessageDto.metadata.source === 'gemini') {
                    message.model = 'gemini-2.0-flash';
                }
                else if (this.isPromptQuestionResponse(createMessageDto.content)) {
                    message.model = 'system';
                }
                else {
                    message.model = 'gemini-2.0-flash';
                }
            }
            else if (this.isPromptQuestionResponse(createMessageDto.content)) {
                message.model = 'system';
            }
            else {
                message.model = 'gemini-2.0-flash';
            }
        }
        else if (createMessageDto.role === 'system') {
            message.model = 'system';
        }
        else {
            message.model = createMessageDto.model || null;
        }
        message.metadata = createMessageDto.metadata || null;
        return await this.messageRepository.save(message);
    }
    async createMany(createMessageDtos) {
        const messages = createMessageDtos.map((dto) => {
            const message = new message_entity_1.Message();
            message.id = dto.id || (0, uuid_1.v4)();
            message.chat_id = dto.chat_id;
            message.role = dto.role;
            message.content = dto.content;
            if (dto.role === 'user') {
                message.model = 'user';
            }
            else if (dto.role === 'assistant') {
                if (dto.model) {
                    message.model = dto.model;
                }
                else if (dto.metadata) {
                    if (dto.metadata.source === 'prompt-questions') {
                        message.model = 'system';
                    }
                    else if (dto.metadata.source === 'gemini') {
                        message.model = 'gemini-2.0-flash';
                    }
                    else if (this.isPromptQuestionResponse(dto.content)) {
                        message.model = 'system';
                    }
                    else {
                        message.model = 'gemini-2.0-flash';
                    }
                }
                else if (this.isPromptQuestionResponse(dto.content)) {
                    message.model = 'system';
                }
                else {
                    message.model = 'gemini-2.0-flash';
                }
            }
            else if (dto.role === 'system') {
                message.model = 'system';
            }
            else {
                message.model = dto.model || null;
            }
            message.metadata = dto.metadata || null;
            return message;
        });
        return await this.messageRepository.save(messages);
    }
    async update(id, updateMessageDto) {
        const message = await this.findOne(id);
        if (updateMessageDto.role !== undefined) {
            message.role = updateMessageDto.role;
        }
        if (updateMessageDto.content !== undefined) {
            message.content = updateMessageDto.content;
        }
        if (updateMessageDto.model !== undefined) {
            message.model = updateMessageDto.model;
        }
        if (updateMessageDto.metadata !== undefined) {
            message.metadata = updateMessageDto.metadata;
        }
        return await this.messageRepository.save(message);
    }
    async remove(id) {
        const message = await this.findOne(id);
        await this.messageRepository.remove(message);
    }
    async removeAllForChat(chatId) {
        const messages = await this.findAllForChat(chatId);
        await this.messageRepository.remove(messages);
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MessagesService);
//# sourceMappingURL=messages.service.js.map