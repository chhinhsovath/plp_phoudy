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
exports.HomeworkSubmission = exports.CheckedStatus = exports.SubmissionStatus = void 0;
const typeorm_1 = require("typeorm");
const homework_entity_1 = require("./homework.entity");
const submission_files_entity_1 = require("./submission-files.entity");
const teacher_entity_1 = require("./teacher.entity");
const student_entity_1 = require("./student.entity");
var SubmissionStatus;
(function (SubmissionStatus) {
    SubmissionStatus["NOT_SUBMITTED"] = "NOT_SUBMITTED";
    SubmissionStatus["SUBMITTED"] = "SUBMITTED";
})(SubmissionStatus || (exports.SubmissionStatus = SubmissionStatus = {}));
var CheckedStatus;
(function (CheckedStatus) {
    CheckedStatus["UNCHECKED"] = "UNCHECKED";
    CheckedStatus["CHECKED"] = "CHECKED";
})(CheckedStatus || (exports.CheckedStatus = CheckedStatus = {}));
let HomeworkSubmission = class HomeworkSubmission {
    id;
    submissionText;
    fileUrl;
    studentId;
    student;
    submittedAt;
    score;
    feedback;
    status;
    checkedStatus;
    checkedDate;
    checkedByTeacher;
    createdAt;
    updatedAt;
    homework;
    submissionFiles;
};
exports.HomeworkSubmission = HomeworkSubmission;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], HomeworkSubmission.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'submission_text', nullable: true }),
    __metadata("design:type", String)
], HomeworkSubmission.prototype, "submissionText", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_url', nullable: true }),
    __metadata("design:type", String)
], HomeworkSubmission.prototype, "fileUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'student_id' }),
    __metadata("design:type", Number)
], HomeworkSubmission.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student, (student) => student.homeworkSubmissions),
    (0, typeorm_1.JoinColumn)({ name: 'student_id' }),
    __metadata("design:type", student_entity_1.Student)
], HomeworkSubmission.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'submitted_at',
        type: 'timestamp',
        nullable: true,
    }),
    __metadata("design:type", Date)
], HomeworkSubmission.prototype, "submittedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], HomeworkSubmission.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], HomeworkSubmission.prototype, "feedback", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: SubmissionStatus,
        enumName: 'submission_status',
        default: SubmissionStatus.NOT_SUBMITTED,
    }),
    __metadata("design:type", String)
], HomeworkSubmission.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'checked_status',
        type: 'enum',
        enum: CheckedStatus,
        enumName: 'checked_status',
        default: CheckedStatus.UNCHECKED,
    }),
    __metadata("design:type", String)
], HomeworkSubmission.prototype, "checkedStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'checked_date',
        type: 'timestamp',
        nullable: true,
    }),
    __metadata("design:type", Date)
], HomeworkSubmission.prototype, "checkedDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => teacher_entity_1.Teacher, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'checked_by' }),
    __metadata("design:type", teacher_entity_1.Teacher)
], HomeworkSubmission.prototype, "checkedByTeacher", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], HomeworkSubmission.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], HomeworkSubmission.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => homework_entity_1.Homework, (homework) => homework.submissions, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'homework_id' }),
    __metadata("design:type", homework_entity_1.Homework)
], HomeworkSubmission.prototype, "homework", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => submission_files_entity_1.SubmissionFile, (file) => file.submission, {
        cascade: true,
        eager: false,
    }),
    __metadata("design:type", Array)
], HomeworkSubmission.prototype, "submissionFiles", void 0);
exports.HomeworkSubmission = HomeworkSubmission = __decorate([
    (0, typeorm_1.Entity)('homework_submissions')
], HomeworkSubmission);
//# sourceMappingURL=homework-submission.entity.js.map