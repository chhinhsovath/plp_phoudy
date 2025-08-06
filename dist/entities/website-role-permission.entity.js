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
exports.WebsiteRolePermission = void 0;
const typeorm_1 = require("typeorm");
const website_entity_1 = require("./website.entity");
const role_entity_1 = require("./role.entity");
let WebsiteRolePermission = class WebsiteRolePermission {
    website_id;
    role_id;
    website;
    role;
};
exports.WebsiteRolePermission = WebsiteRolePermission;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], WebsiteRolePermission.prototype, "website_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], WebsiteRolePermission.prototype, "role_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => website_entity_1.Website, (website) => website.websiteRolePermissions, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'website_id' }),
    __metadata("design:type", website_entity_1.Website)
], WebsiteRolePermission.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_entity_1.Role, (role) => role.websiteRolePermissions, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'role_id' }),
    __metadata("design:type", role_entity_1.Role)
], WebsiteRolePermission.prototype, "role", void 0);
exports.WebsiteRolePermission = WebsiteRolePermission = __decorate([
    (0, typeorm_1.Entity)('website_role_permissions')
], WebsiteRolePermission);
//# sourceMappingURL=website-role-permission.entity.js.map