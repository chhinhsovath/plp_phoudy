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
exports.UserPob = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const province_entity_1 = require("./province.entity");
const district_entity_1 = require("./district.entity");
const commune_entity_1 = require("./commune.entity");
const village_entity_1 = require("./village.entity");
let UserPob = class UserPob {
    id;
    userId;
    user;
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
exports.UserPob = UserPob;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserPob.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'bigint' }),
    __metadata("design:type", Number)
], UserPob.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], UserPob.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'province_id', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], UserPob.prototype, "provinceId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => province_entity_1.Province, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'province_id' }),
    __metadata("design:type", province_entity_1.Province)
], UserPob.prototype, "province", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'district_id', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], UserPob.prototype, "districtId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => district_entity_1.District, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'district_id' }),
    __metadata("design:type", district_entity_1.District)
], UserPob.prototype, "district", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'commune_id', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], UserPob.prototype, "communeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => commune_entity_1.Commune, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'commune_id' }),
    __metadata("design:type", commune_entity_1.Commune)
], UserPob.prototype, "commune", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'village_id', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], UserPob.prototype, "villageId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => village_entity_1.Village, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'village_id' }),
    __metadata("design:type", village_entity_1.Village)
], UserPob.prototype, "village", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], UserPob.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], UserPob.prototype, "updatedAt", void 0);
exports.UserPob = UserPob = __decorate([
    (0, typeorm_1.Entity)('user_pob')
], UserPob);
//# sourceMappingURL=user-pob.entity.js.map