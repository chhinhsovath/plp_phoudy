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
exports.Role = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const menu_item_entity_1 = require("./menu-item.entity");
const website_role_permission_entity_1 = require("./website-role-permission.entity");
let Role = class Role {
    id;
    nameEn;
    nameKh;
    description;
    createdAt;
    updatedAt;
    users;
    menuItems;
    websiteRolePermissions;
};
exports.Role = Role;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Role.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name_en', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Role.prototype, "nameEn", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name_kh', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Role.prototype, "nameKh", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Role.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamp with time zone',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Role.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updated_at',
        type: 'timestamp with time zone',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Role.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (user) => user.role),
    __metadata("design:type", Array)
], Role.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => menu_item_entity_1.MenuItem, (menuItem) => menuItem.roles),
    __metadata("design:type", Array)
], Role.prototype, "menuItems", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => website_role_permission_entity_1.WebsiteRolePermission, (websiteRolePermission) => websiteRolePermission.role),
    __metadata("design:type", Array)
], Role.prototype, "websiteRolePermissions", void 0);
exports.Role = Role = __decorate([
    (0, typeorm_1.Entity)('roles')
], Role);
//# sourceMappingURL=role.entity.js.map