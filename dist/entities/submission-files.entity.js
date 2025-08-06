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
exports.SubmissionFile = void 0;
const typeorm_1 = require("typeorm");
const homework_submission_entity_1 = require("./homework-submission.entity");
const homework_entity_1 = require("./homework.entity");
let SubmissionFile = class SubmissionFile {
    id;
    name;
    size;
    type;
    url;
    submission;
    homework;
};
exports.SubmissionFile = SubmissionFile;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SubmissionFile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], SubmissionFile.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', nullable: false }),
    __metadata("design:type", Number)
], SubmissionFile.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], SubmissionFile.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], SubmissionFile.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => homework_submission_entity_1.HomeworkSubmission, (submission) => submission.submissionFiles, {
        onDelete: 'CASCADE',
        eager: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'submission_id' }),
    __metadata("design:type", homework_submission_entity_1.HomeworkSubmission)
], SubmissionFile.prototype, "submission", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => homework_entity_1.Homework, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'homework_id' }),
    __metadata("design:type", homework_entity_1.Homework)
], SubmissionFile.prototype, "homework", void 0);
exports.SubmissionFile = SubmissionFile = __decorate([
    (0, typeorm_1.Entity)('submission_files')
], SubmissionFile);
//# sourceMappingURL=submission-files.entity.js.map