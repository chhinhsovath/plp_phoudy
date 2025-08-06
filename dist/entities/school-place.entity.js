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
exports.SchoolPlace = void 0;
const typeorm_1 = require("typeorm");
const school_entity_1 = require("./school.entity");
const province_entity_1 = require("./province.entity");
const district_entity_1 = require("./district.entity");
const commune_entity_1 = require("./commune.entity");
const village_entity_1 = require("./village.entity");
let SchoolPlace = class SchoolPlace {
    id;
    schoolId;
    school;
    provinceId;
    province;
    districtId;
    district;
    communeId;
    commune;
    villageId;
    village;
    createdAt;
    updatedAt;
};
exports.SchoolPlace = SchoolPlace;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SchoolPlace.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'school_id' }),
    __metadata("design:type", Number)
], SchoolPlace.prototype, "schoolId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => school_entity_1.School, (school) => school.place),
    (0, typeorm_1.JoinColumn)({ name: 'school_id' }),
    __metadata("design:type", school_entity_1.School)
], SchoolPlace.prototype, "school", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'province_id', nullable: true }),
    __metadata("design:type", Number)
], SchoolPlace.prototype, "provinceId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => province_entity_1.Province),
    (0, typeorm_1.JoinColumn)({ name: 'province_id' }),
    __metadata("design:type", province_entity_1.Province)
], SchoolPlace.prototype, "province", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'district_id', nullable: true }),
    __metadata("design:type", Number)
], SchoolPlace.prototype, "districtId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => district_entity_1.District),
    (0, typeorm_1.JoinColumn)({ name: 'district_id' }),
    __metadata("design:type", district_entity_1.District)
], SchoolPlace.prototype, "district", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'commune_id', nullable: true }),
    __metadata("design:type", Number)
], SchoolPlace.prototype, "communeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => commune_entity_1.Commune),
    (0, typeorm_1.JoinColumn)({ name: 'commune_id' }),
    __metadata("design:type", commune_entity_1.Commune)
], SchoolPlace.prototype, "commune", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'village_id', nullable: true }),
    __metadata("design:type", Number)
], SchoolPlace.prototype, "villageId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => village_entity_1.Village),
    (0, typeorm_1.JoinColumn)({ name: 'village_id' }),
    __metadata("design:type", village_entity_1.Village)
], SchoolPlace.prototype, "village", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], SchoolPlace.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], SchoolPlace.prototype, "updatedAt", void 0);
exports.SchoolPlace = SchoolPlace = __decorate([
    (0, typeorm_1.Entity)('school_place')
], SchoolPlace);
//# sourceMappingURL=school-place.entity.js.map