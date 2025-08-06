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
exports.ForumComment = void 0;
const typeorm_1 = require("typeorm");
const forum_entity_1 = require("./forum.entity");
const user_entity_1 = require("./user.entity");
let ForumComment = class ForumComment {
    id;
    content;
    forumId;
    forum;
    userId;
    user;
    createdAt;
    updatedAt;
    setCreatedAt() {
        const now = new Date();
        this.createdAt = now;
        this.updatedAt = now;
    }
    setUpdatedAt() {
        this.updatedAt = new Date();
    }
};
exports.ForumComment = ForumComment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], ForumComment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ForumComment.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'forum_id', type: 'bigint' }),
    __metadata("design:type", Number)
], ForumComment.prototype, "forumId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => forum_entity_1.Forum, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'forum_id' }),
    __metadata("design:type", forum_entity_1.Forum)
], ForumComment.prototype, "forum", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'bigint' }),
    __metadata("design:type", Number)
], ForumComment.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], ForumComment.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ForumComment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], ForumComment.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ForumComment.prototype, "setCreatedAt", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ForumComment.prototype, "setUpdatedAt", null);
exports.ForumComment = ForumComment = __decorate([
    (0, typeorm_1.Entity)('forum_comments')
], ForumComment);
//# sourceMappingURL=forum-comment.entity.js.map