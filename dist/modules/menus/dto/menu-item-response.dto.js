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
exports.MenuItemResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class MenuItemResponseDto {
    id;
    name;
    url;
    icon;
    parentId;
    orderIndex;
    menuType;
    websiteId;
    isActive;
    roles;
    createdAt;
    updatedAt;
    children;
}
exports.MenuItemResponseDto = MenuItemResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Menu item ID' }),
    __metadata("design:type", Number)
], MenuItemResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Dashboard', description: 'Menu item name' }),
    __metadata("design:type", String)
], MenuItemResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '/dashboard', description: 'Menu item URL' }),
    __metadata("design:type", String)
], MenuItemResponseDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'dashboard',
        description: 'Menu item icon',
        required: false,
    }),
    __metadata("design:type", String)
], MenuItemResponseDto.prototype, "icon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Parent menu item ID',
        required: false,
    }),
    __metadata("design:type", Number)
], MenuItemResponseDto.prototype, "parentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Order index for sorting',
        required: false,
    }),
    __metadata("design:type", Number)
], MenuItemResponseDto.prototype, "orderIndex", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'NAVBAR',
        description: 'Menu type (NAVBAR, SIDEBAR, etc)',
    }),
    __metadata("design:type", String)
], MenuItemResponseDto.prototype, "menuType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Website ID' }),
    __metadata("design:type", Number)
], MenuItemResponseDto.prototype, "websiteId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is menu item active' }),
    __metadata("design:type", Boolean)
], MenuItemResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['ADMIN', 'TEACHER'],
        description: 'Role names that can access this menu item',
        type: [String],
    }),
    __metadata("design:type", Array)
], MenuItemResponseDto.prototype, "roles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-01-15T10:00:00.000Z',
        description: 'Creation timestamp',
    }),
    __metadata("design:type", Date)
], MenuItemResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-01-15T10:00:00.000Z',
        description: 'Last update timestamp',
    }),
    __metadata("design:type", Date)
], MenuItemResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Child menu items',
        type: [MenuItemResponseDto],
        required: false,
    }),
    __metadata("design:type", Array)
], MenuItemResponseDto.prototype, "children", void 0);
//# sourceMappingURL=menu-item-response.dto.js.map