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
exports.ChatsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const chat_entity_1 = require("../../entities/chat.entity");
const message_entity_1 = require("../../entities/message.entity");
const uuid_1 = require("uuid");
let ChatsService = class ChatsService {
    chatRepository;
    messageRepository;
    constructor(chatRepository, messageRepository) {
        this.chatRepository = chatRepository;
        this.messageRepository = messageRepository;
    }
    async findAll() {
        return this.chatRepository.find();
    }
    async findAllForUser(username) {
        return this.chatRepository.find({
            where: { username },
            order: { timestamp: 'DESC' },
        });
    }
    async findAllForUserPaginated(username, page, size) {
        return this.chatRepository.findAndCount({
            where: { username },
            order: { timestamp: 'DESC' },
            skip: page * size,
            take: size,
        });
    }
    async findOne(id) {
        const chat = await this.chatRepository.findOne({ where: { id } });
        if (!chat) {
            throw new common_1.NotFoundException(`Chat with ID ${id} not found`);
        }
        return chat;
    }
    async findOneWithMessages(id) {
        const chat = await this.chatRepository.findOne({
            where: { id },
            relations: ['messages'],
        });
        if (!chat) {
            throw new common_1.NotFoundException(`Chat with ID ${id} not found`);
        }
        if (chat.messages) {
            chat.messages.sort((a, b) => a.created_at.getTime() - b.created_at.getTime());
        }
        return chat;
    }
    async create(createChatDto) {
        const chat = new chat_entity_1.Chat();
        if (createChatDto.id) {
            const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
            chat.id = uuidPattern.test(createChatDto.id)
                ? createChatDto.id
                : (0, uuid_1.v4)();
        }
        else {
            chat.id = (0, uuid_1.v4)();
        }
        chat.username = createChatDto.username;
        chat.preview = createChatDto.preview;
        chat.timestamp = createChatDto.timestamp || new Date();
        chat.message_count = 0;
        chat.user_message_count = 0;
        chat.ai_message_count = 0;
        chat.is_training_candidate = createChatDto.isTrainingCandidate ?? false;
        chat.training_status = createChatDto.training_status || 'UNPROCESSED';
        chat.training_notes = createChatDto.trainingNotes || null;
        chat.language_detected = createChatDto.language_detected || 'km';
        chat.topic_category = createChatDto.topicCategory || null;
        const savedChat = await this.chatRepository.save(chat);
        if (createChatDto.messages?.length) {
            let messageCount = 0;
            let userMessageCount = 0;
            let aiMessageCount = 0;
            const messages = createChatDto.messages.map((msgDto) => {
                const message = new message_entity_1.Message();
                message.id = msgDto.id || (0, uuid_1.v4)();
                message.chat_id = savedChat.id;
                message.role = msgDto.role;
                message.content = msgDto.content;
                message.model = msgDto.model || null;
                message.metadata = msgDto.metadata || null;
                messageCount++;
                if (msgDto.role === 'user')
                    userMessageCount++;
                if (msgDto.role === 'assistant')
                    aiMessageCount++;
                return message;
            });
            await this.messageRepository.save(messages);
            await this.chatRepository.update(savedChat.id, {
                message_count: messageCount,
                user_message_count: userMessageCount,
                ai_message_count: aiMessageCount,
            });
            return this.findOne(savedChat.id);
        }
        return savedChat;
    }
    async update(id, updateChatDto) {
        const chat = await this.findOne(id);
        if (updateChatDto.username !== undefined) {
            chat.username = updateChatDto.username;
        }
        if (updateChatDto.preview !== undefined) {
            chat.preview = updateChatDto.preview;
        }
        chat.timestamp = updateChatDto.timestamp ?? new Date();
        if (updateChatDto.message_count !== undefined) {
            chat.message_count = updateChatDto.message_count;
        }
        if (updateChatDto.user_message_count !== undefined) {
            chat.user_message_count = updateChatDto.user_message_count;
        }
        if (updateChatDto.ai_message_count !== undefined) {
            chat.ai_message_count = updateChatDto.ai_message_count;
        }
        if (updateChatDto.isTrainingCandidate !== undefined) {
            chat.is_training_candidate = updateChatDto.isTrainingCandidate;
        }
        if (updateChatDto.training_status !== undefined) {
            chat.training_status = updateChatDto.training_status;
        }
        if (updateChatDto.trainingNotes !== undefined) {
            chat.training_notes = updateChatDto.trainingNotes;
        }
        if (updateChatDto.language_detected !== undefined) {
            chat.language_detected = updateChatDto.language_detected;
        }
        if (updateChatDto.topicCategory !== undefined) {
            chat.topic_category = updateChatDto.topicCategory;
        }
        const savedChat = await this.chatRepository.save(chat);
        if (updateChatDto.messages?.length) {
            const newMessages = updateChatDto.messages
                .filter((msgDto) => !msgDto.id)
                .map((msgDto) => {
                const message = new message_entity_1.Message();
                message.id = (0, uuid_1.v4)();
                message.chat_id = savedChat.id;
                message.role = msgDto.role;
                message.content = msgDto.content;
                message.model = msgDto.model || null;
                message.metadata = msgDto.metadata || null;
                return message;
            });
            if (newMessages.length > 0) {
                await this.messageRepository.save(newMessages);
                const messages = await this.messageRepository.find({
                    where: { chat_id: savedChat.id },
                });
                const userMessageCount = messages.filter((msg) => msg.role === 'user').length;
                const aiMessageCount = messages.filter((msg) => msg.role === 'assistant').length;
                await this.chatRepository.update(savedChat.id, {
                    message_count: messages.length,
                    user_message_count: userMessageCount,
                    ai_message_count: aiMessageCount,
                });
                return this.findOne(savedChat.id);
            }
        }
        return savedChat;
    }
    async remove(id) {
        const chat = await this.findOne(id);
        await this.messageRepository.delete({ chat_id: chat.id });
        await this.chatRepository.remove(chat);
    }
    async removeAllForUser(username) {
        const chats = await this.findAllForUser(username);
        for (const chat of chats) {
            await this.messageRepository.delete({ chat_id: chat.id });
        }
        await this.chatRepository.remove(chats);
    }
};
exports.ChatsService = ChatsService;
exports.ChatsService = ChatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(chat_entity_1.Chat)),
    __param(1, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ChatsService);
//# sourceMappingURL=chats.service.js.map