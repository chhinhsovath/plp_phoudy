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
exports.School = void 0;
const typeorm_1 = require("typeorm");
const teacher_entity_1 = require("./teacher.entity");
const school_place_entity_1 = require("./school-place.entity");
const status_enum_1 = require("./enums/status.enum");
let School = class School {
    schoolId;
    name;
    code;
    profile;
    status;
    createdAt;
    updatedAt;
    teachers;
    place;
};
exports.School = School;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'school_id' }),
    __metadata("design:type", Number)
], School.prototype, "schoolId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], School.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true }),
    __metadata("design:type", String)
], School.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true, name: 'profile\r\n' }),
    __metadata("design:type", String)
], School.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: status_enum_1.Status,
        default: status_enum_1.Status.ACTIVE,
    }),
    __metadata("design:type", String)
], School.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], School.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], School.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => teacher_entity_1.Teacher, (teacher) => teacher.school),
    __metadata("design:type", Array)
], School.prototype, "teachers", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => school_place_entity_1.SchoolPlace, (schoolPlace) => schoolPlace.school),
    __metadata("design:type", school_place_entity_1.SchoolPlace)
], School.prototype, "place", void 0);
exports.School = School = __decorate([
    (0, typeorm_1.Entity)('schools')
], School);
//# sourceMappingURL=school.entity.js.map