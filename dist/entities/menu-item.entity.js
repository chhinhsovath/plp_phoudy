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
exports.MenuItem = void 0;
const typeorm_1 = require("typeorm");
const role_entity_1 = require("./role.entity");
let MenuItem = class MenuItem {
    id;
    name;
    url;
    icon;
    parentId;
    parent;
    children;
    orderIndex;
    menuType;
    isActive;
    websiteId;
    roles;
    createdAt;
    updatedAt;
};
exports.MenuItem = MenuItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MenuItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MenuItem.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MenuItem.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MenuItem.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'parent_id', nullable: true }),
    __metadata("design:type", Number)
], MenuItem.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => MenuItem, (menuItem) => menuItem.children, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'parent_id' }),
    __metadata("design:type", MenuItem)
], MenuItem.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => MenuItem, (menuItem) => menuItem.parent),
    __metadata("design:type", Array)
], MenuItem.prototype, "children", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'order_index', nullable: true }),
    __metadata("design:type", Number)
], MenuItem.prototype, "orderIndex", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'menu_type', default: 'NAVBAR' }),
    __metadata("design:type", String)
], MenuItem.prototype, "menuType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], MenuItem.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'website_id' }),
    __metadata("design:type", Number)
], MenuItem.prototype, "websiteId", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => role_entity_1.Role),
    (0, typeorm_1.JoinTable)({
        name: 'menu_item_roles',
        joinColumn: { name: 'menu_item_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], MenuItem.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], MenuItem.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], MenuItem.prototype, "updatedAt", void 0);
exports.MenuItem = MenuItem = __decorate([
    (0, typeorm_1.Entity)('menu_items')
], MenuItem);
//# sourceMappingURL=menu-item.entity.js.map