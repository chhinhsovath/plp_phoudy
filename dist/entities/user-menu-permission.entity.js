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
exports.UserMenuPermission = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const menu_item_entity_1 = require("./menu-item.entity");
let UserMenuPermission = class UserMenuPermission {
    id;
    userId;
    user;
    menuId;
    menuItem;
    createdAt;
    updatedAt;
};
exports.UserMenuPermission = UserMenuPermission;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserMenuPermission.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], UserMenuPermission.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], UserMenuPermission.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'menu_id' }),
    __metadata("design:type", Number)
], UserMenuPermission.prototype, "menuId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => menu_item_entity_1.MenuItem),
    (0, typeorm_1.JoinColumn)({ name: 'menu_id' }),
    __metadata("design:type", menu_item_entity_1.MenuItem)
], UserMenuPermission.prototype, "menuItem", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], UserMenuPermission.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], UserMenuPermission.prototype, "updatedAt", void 0);
exports.UserMenuPermission = UserMenuPermission = __decorate([
    (0, typeorm_1.Entity)('user_menu_permissions'),
    (0, typeorm_1.Unique)(['userId', 'menuId'])
], UserMenuPermission);
//# sourceMappingURL=user-menu-permission.entity.js.map