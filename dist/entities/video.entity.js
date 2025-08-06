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
exports.Video = exports.Status = void 0;
const typeorm_1 = require("typeorm");
var Status;
(function (Status) {
    Status["ACTIVE"] = "ACTIVE";
    Status["INACTIVE"] = "INACTIVE";
})(Status || (exports.Status = Status = {}));
let Video = class Video {
    id;
    lessonTitle;
    url;
    teacherName;
    subject;
    grade;
    uploader;
    duration;
    durationString;
    uploadDate;
    thumbnailUrl;
    status;
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
exports.Video = Video;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Video.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lesson_title', nullable: false }),
    __metadata("design:type", String)
], Video.prototype, "lessonTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Video.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'teacher_name', nullable: false }),
    __metadata("design:type", String)
], Video.prototype, "teacherName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Video.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Video.prototype, "grade", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Video.prototype, "uploader", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Video.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'duration_string', nullable: true }),
    __metadata("design:type", String)
], Video.prototype, "durationString", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'upload_date', nullable: true }),
    __metadata("design:type", String)
], Video.prototype, "uploadDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'thumbnail_url', nullable: true }),
    __metadata("design:type", String)
], Video.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: Status,
        default: Status.ACTIVE,
    }),
    __metadata("design:type", String)
], Video.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Video.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Video.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Video.prototype, "setCreatedAt", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Video.prototype, "setUpdatedAt", null);
exports.Video = Video = __decorate([
    (0, typeorm_1.Entity)('videos')
], Video);
//# sourceMappingURL=video.entity.js.map