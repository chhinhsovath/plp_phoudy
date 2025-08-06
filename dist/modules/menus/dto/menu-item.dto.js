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
exports.MenuItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class MenuItemDto {
    id;
    name;
    url;
    icon;
    parentId;
    orderIndex;
    role;
    menuType;
    websiteId;
    isActive;
    createdAt;
    updatedAt;
    children;
}
exports.MenuItemDto = MenuItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Menu item ID' }),
    __metadata("design:type", Number)
], MenuItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Menu item name' }),
    __metadata("design:type", String)
], MenuItemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Menu item URL' }),
    __metadata("design:type", String)
], MenuItemDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Menu item icon', required: false }),
    __metadata("design:type", String)
], MenuItemDto.prototype, "icon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Parent menu item ID', required: false }),
    __metadata("design:type", Number)
], MenuItemDto.prototype, "parentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Menu item order index', required: false }),
    __metadata("design:type", Number)
], MenuItemDto.prototype, "orderIndex", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Roles that can access this menu item',
        type: [String],
        isArray: true,
    }),
    __metadata("design:type", Array)
], MenuItemDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of menu (NAVBAR, SIDEBAR, etc)',
        default: 'NAVBAR',
    }),
    __metadata("design:type", String)
], MenuItemDto.prototype, "menuType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Website ID' }),
    __metadata("design:type", Number)
], MenuItemDto.prototype, "websiteId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Is this menu item active' }),
    __metadata("design:type", Boolean)
], MenuItemDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Creation timestamp' }),
    __metadata("design:type", Date)
], MenuItemDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last update timestamp' }),
    __metadata("design:type", Date)
], MenuItemDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Child menu items',
        type: [MenuItemDto],
        required: false,
    }),
    __metadata("design:type", Array)
], MenuItemDto.prototype, "children", void 0);
//# sourceMappingURL=menu-item.dto.js.map