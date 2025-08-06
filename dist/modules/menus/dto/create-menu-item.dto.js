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
exports.CreateMenuItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateMenuItemDto {
    name;
    url;
    icon;
    parentId;
    orderIndex;
    menuType;
    websiteId;
    isActive;
    roleIds;
}
exports.CreateMenuItemDto = CreateMenuItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Dashboard',
        description: 'Menu item name',
        maxLength: 255,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateMenuItemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '/dashboard',
        description: 'Menu item URL',
        maxLength: 255,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateMenuItemDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'dashboard',
        description: 'Menu item icon',
        maxLength: 100,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateMenuItemDto.prototype, "icon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Parent menu item ID',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateMenuItemDto.prototype, "parentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Order index for sorting',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateMenuItemDto.prototype, "orderIndex", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'NAVBAR',
        description: 'Menu type (NAVBAR, SIDEBAR, etc)',
        maxLength: 50,
        default: 'NAVBAR',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateMenuItemDto.prototype, "menuType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Website ID',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateMenuItemDto.prototype, "websiteId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Is menu item active',
        default: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateMenuItemDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [1, 2],
        description: 'Role IDs that can access this menu item',
        type: [Number],
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], CreateMenuItemDto.prototype, "roleIds", void 0);
//# sourceMappingURL=create-menu-item.dto.js.map