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
exports.ExaminationCategory = exports.ExaminationType = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const subject_entity_1 = require("./subject.entity");
const sub_subject_entity_1 = require("./sub-subject.entity");
const class_entity_1 = require("./class.entity");
var ExaminationType;
(function (ExaminationType) {
    ExaminationType["TEST"] = "test";
    ExaminationType["EXAM"] = "exam";
})(ExaminationType || (exports.ExaminationType = ExaminationType = {}));
let ExaminationCategory = class ExaminationCategory extends base_entity_1.BaseEntity {
    title;
    subjectId;
    subject;
    subSubjectId;
    subSubject;
    grade;
    type;
    status;
    certificateFile;
};
exports.ExaminationCategory = ExaminationCategory;
__decorate([
    (0, typeorm_1.Column)({ name: 'title' }),
    __metadata("design:type", String)
], ExaminationCategory.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'subject_id', nullable: true }),
    __metadata("design:type", Number)
], ExaminationCategory.prototype, "subjectId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subject_entity_1.Subject),
    (0, typeorm_1.JoinColumn)({ name: 'subject_id' }),
    __metadata("design:type", subject_entity_1.Subject)
], ExaminationCategory.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sub_subject_id', nullable: true }),
    __metadata("design:type", Number)
], ExaminationCategory.prototype, "subSubjectId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sub_subject_entity_1.SubSubject),
    (0, typeorm_1.JoinColumn)({ name: 'sub_subject_id' }),
    __metadata("design:type", sub_subject_entity_1.SubSubject)
], ExaminationCategory.prototype, "subSubject", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: class_entity_1.GradeLevelType,
        name: 'grade',
        nullable: true,
    }),
    __metadata("design:type", String)
], ExaminationCategory.prototype, "grade", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ExaminationType,
        name: 'type',
        default: ExaminationType.TEST,
    }),
    __metadata("design:type", String)
], ExaminationCategory.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', default: 'active' }),
    __metadata("design:type", String)
], ExaminationCategory.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'certificate_file', nullable: true }),
    __metadata("design:type", String)
], ExaminationCategory.prototype, "certificateFile", void 0);
exports.ExaminationCategory = ExaminationCategory = __decorate([
    (0, typeorm_1.Entity)('examination_categories')
], ExaminationCategory);
//# sourceMappingURL=examination-category.entity.js.map