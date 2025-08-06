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
exports.Website = void 0;
const typeorm_1 = require("typeorm");
const website_role_permission_entity_1 = require("./website-role-permission.entity");
let Website = class Website {
    id;
    name;
    domain;
    description;
    is_active;
    created_at;
    updated_at;
    websiteRolePermissions;
};
exports.Website = Website;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Website.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: true }),
    __metadata("design:type", String)
], Website.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: true, nullable: true }),
    __metadata("design:type", String)
], Website.prototype, "domain", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Website.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Website.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Website.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Website.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => website_role_permission_entity_1.WebsiteRolePermission, (websiteRolePermission) => websiteRolePermission.website),
    __metadata("design:type", Array)
], Website.prototype, "websiteRolePermissions", void 0);
exports.Website = Website = __decorate([
    (0, typeorm_1.Entity)('websites')
], Website);
//# sourceMappingURL=website.entity.js.map