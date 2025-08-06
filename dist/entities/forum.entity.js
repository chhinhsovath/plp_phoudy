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
exports.Forum = exports.Status = exports.Audience = void 0;
const typeorm_1 = require("typeorm");
const subject_entity_1 = require("./subject.entity");
const user_entity_1 = require("./user.entity");
const forum_save_entity_1 = require("./forum-save.entity");
const forum_like_entity_1 = require("./forum-like.entity");
const forum_comment_entity_1 = require("./forum-comment.entity");
var Audience;
(function (Audience) {
    Audience["DRAFT"] = "DRAFT";
    Audience["PRIVATE"] = "PRIVATE";
    Audience["PUBLIC"] = "PUBLIC";
    Audience["CLASS"] = "CLASS";
    Audience["SAVE"] = "SAVE";
})(Audience || (exports.Audience = Audience = {}));
var Status;
(function (Status) {
    Status["ACTIVE"] = "ACTIVE";
    Status["INACTIVE"] = "INACTIVE";
})(Status || (exports.Status = Status = {}));
let Forum = class Forum {
    id;
    title;
    content;
    audience;
    subjectId;
    subject;
    grade;
    status;
    usersId;
    user;
    viewCount;
    commentCount;
    userLike;
    saves;
    likes;
    comments;
    createdAt;
    updatedAt;
    setCreatedAt() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
    setUpdatedAt() {
        this.updatedAt = new Date();
    }
};
exports.Forum = Forum;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], Forum.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Forum.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Forum.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: Audience,
    }),
    __metadata("design:type", String)
], Forum.prototype, "audience", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'subjects_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Number)
], Forum.prototype, "subjectId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subject_entity_1.Subject, { onDelete: 'CASCADE', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'subjects_id' }),
    __metadata("design:type", subject_entity_1.Subject)
], Forum.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10 }),
    __metadata("design:type", String)
], Forum.prototype, "grade", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 20,
        default: Status.ACTIVE,
    }),
    __metadata("design:type", String)
], Forum.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'users_id', type: 'bigint' }),
    __metadata("design:type", Number)
], Forum.prototype, "usersId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'users_id' }),
    __metadata("design:type", user_entity_1.User)
], Forum.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'view_count', default: 0 }),
    __metadata("design:type", Number)
], Forum.prototype, "viewCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'comment_count', default: 0 }),
    __metadata("design:type", Number)
], Forum.prototype, "commentCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_like', default: 0 }),
    __metadata("design:type", Number)
], Forum.prototype, "userLike", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => forum_save_entity_1.ForumSave, (save) => save.forum),
    __metadata("design:type", Array)
], Forum.prototype, "saves", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => forum_like_entity_1.ForumLike, (save) => save.forum),
    __metadata("design:type", Array)
], Forum.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => forum_comment_entity_1.ForumComment, (save) => save.forum),
    __metadata("design:type", Array)
], Forum.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Forum.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Forum.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Forum.prototype, "setCreatedAt", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Forum.prototype, "setUpdatedAt", null);
exports.Forum = Forum = __decorate([
    (0, typeorm_1.Entity)('forums')
], Forum);
//# sourceMappingURL=forum.entity.js.map