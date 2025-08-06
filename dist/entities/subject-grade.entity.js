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
exports.SubjectGrade = void 0;
const typeorm_1 = require("typeorm");
const subject_entity_1 = require("./subject.entity");
let SubjectGrade = class SubjectGrade {
    id;
    subject_id;
    grade_level;
    subject;
    created_at;
    updated_at;
};
exports.SubjectGrade = SubjectGrade;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SubjectGrade.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'subject_id' }),
    __metadata("design:type", Number)
], SubjectGrade.prototype, "subject_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'grade_level' }),
    __metadata("design:type", Number)
], SubjectGrade.prototype, "grade_level", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subject_entity_1.Subject),
    (0, typeorm_1.JoinColumn)({ name: 'subject_id' }),
    __metadata("design:type", subject_entity_1.Subject)
], SubjectGrade.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], SubjectGrade.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], SubjectGrade.prototype, "updated_at", void 0);
exports.SubjectGrade = SubjectGrade = __decorate([
    (0, typeorm_1.Entity)('subject_grades')
], SubjectGrade);
//# sourceMappingURL=subject-grade.entity.js.map