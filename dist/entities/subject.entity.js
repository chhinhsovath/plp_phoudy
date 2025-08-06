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
exports.Subject = exports.SubjectType = void 0;
const typeorm_1 = require("typeorm");
const status_enum_1 = require("./enums/status.enum");
var SubjectType;
(function (SubjectType) {
    SubjectType["NORMAL"] = "NORMAL";
    SubjectType["SPECIAL"] = "SPECIAL";
})(SubjectType || (exports.SubjectType = SubjectType = {}));
let Subject = class Subject {
    id;
    name;
    khmer_name;
    description;
    status;
    is_student;
    path;
    subject_type;
    lessons;
    created_at;
    updated_at;
};
exports.Subject = Subject;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Subject.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Subject.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'khmer_name', nullable: true }),
    __metadata("design:type", String)
], Subject.prototype, "khmer_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Subject.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: status_enum_1.Status,
        default: status_enum_1.Status.ACTIVE,
    }),
    __metadata("design:type", String)
], Subject.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_student', default: false }),
    __metadata("design:type", Boolean)
], Subject.prototype, "is_student", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Subject.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'subject_type',
        type: 'enum',
        enum: SubjectType,
        default: SubjectType.NORMAL,
    }),
    __metadata("design:type", String)
], Subject.prototype, "subject_type", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('Lesson', 'subject'),
    __metadata("design:type", Array)
], Subject.prototype, "lessons", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Subject.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Subject.prototype, "updated_at", void 0);
exports.Subject = Subject = __decorate([
    (0, typeorm_1.Entity)('subjects')
], Subject);
//# sourceMappingURL=subject.entity.js.map