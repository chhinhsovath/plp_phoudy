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
exports.Chat = void 0;
const typeorm_1 = require("typeorm");
const message_entity_1 = require("./message.entity");
let Chat = class Chat {
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
};
exports.Chat = Chat;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Chat.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Chat.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Chat.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Chat.prototype, "preview", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.Message, (message) => message.chat, {
        cascade: true,
        eager: false,
    }),
    __metadata("design:type", Array)
], Chat.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true }),
    __metadata("design:type", Object)
], Chat.prototype, "message_count", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true }),
    __metadata("design:type", Object)
], Chat.prototype, "user_message_count", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true }),
    __metadata("design:type", Object)
], Chat.prototype, "ai_message_count", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Chat.prototype, "is_training_candidate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'UNPROCESSED' }),
    __metadata("design:type", String)
], Chat.prototype, "training_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], Chat.prototype, "training_notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'km', nullable: true }),
    __metadata("design:type", Object)
], Chat.prototype, "language_detected", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], Chat.prototype, "topic_category", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Chat.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Chat.prototype, "updated_at", void 0);
exports.Chat = Chat = __decorate([
    (0, typeorm_1.Entity)('chats')
], Chat);
//# sourceMappingURL=chat.entity.js.map