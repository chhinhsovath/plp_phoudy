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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenusController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const menus_service_1 = require("./menus.service");
const user_menu_permission_dto_1 = require("./dto/user-menu-permission.dto");
const create_menu_item_dto_1 = require("./dto/create-menu-item.dto");
const update_menu_item_dto_1 = require("./dto/update-menu-item.dto");
const menu_item_response_dto_1 = require("./dto/menu-item-response.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const public_decorator_1 = require("../../decorators/public.decorator");
let MenusController = class MenusController {
    menusService;
    constructor(menusService) {
        this.menusService = menusService;
    }
    async createMenuItem(createMenuItemDto) {
        return await this.menusService.createMenuItem(createMenuItemDto);
    }
    async findAllMenuItems(page = 1, limit = 10) {
        return await this.menusService.findAllMenuItems(page, limit);
    }
    async getMyMenu(userId, websiteId, menuType) {
        return this.menusService.getMenuItemsByUserId(userId, websiteId, menuType);
    }
    async getMenuByRole(role, websiteId, menuType) {
        return this.menusService.getMenuItemsByRole(role.toUpperCase(), websiteId, menuType);
    }
    async getCommonMenuItems(role, websiteId, menuType) {
        return this.menusService.getCommonMenuItems(role.toUpperCase(), websiteId, menuType);
    }
    async getAllMenuItems(websiteId, menuType) {
        return this.menusService.getMenuItemsByUserId(1, websiteId, menuType);
    }
    async getPublicMenu(websiteId, menuType) {
        return this.menusService.getPublicMenuItems(websiteId, menuType);
    }
    async getMenuItemsByType(menuType, websiteId) {
        return this.menusService.getMenuItemsByType(menuType, websiteId);
    }
    async getMenuItemById(id) {
        return this.menusService.findMenuItemById(id);
    }
    async updateMenuItem(id, updateMenuItemDto) {
        return await this.menusService.updateMenuItem(id, updateMenuItemDto);
    }
    async removeMenuItem(id) {
        await this.menusService.removeMenuItem(id);
        return { message: 'Menu item deleted successfully' };
    }
    async updateUserMenuPermissions(permissionDto) {
        return this.menusService.updateUserMenuPermissions(permissionDto);
    }
    async getUserMenuPermissions(userId) {
        return this.menusService.getUserMenuPermissions(userId);
    }
    async getMenuItemsByWebsite(websiteId, menuType) {
        return this.menusService.getMenuItemsByWebsite(websiteId, menuType);
    }
};
exports.MenusController = MenusController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new menu item' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Menu item created successfully',
        type: menu_item_response_dto_1.MenuItemResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Parent menu item or role not found',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_menu_item_dto_1.CreateMenuItemDto]),
    __metadata("design:returntype", Promise)
], MenusController.prototype, "createMenuItem", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all menu items with pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 10 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of menu items with pagination',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/MenuItemResponseDto' },
                },
                pagination: {
                    type: 'object',
                    properties: {
                        page: { type: 'number', example: 1 },
                        limit: { type: 'number', example: 10 },
                        total: { type: 'number', example: 50 },
                        pages: { type: 'number', example: 5 },
                    },
                },
            },
        },
    }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], MenusController.prototype, "findAllMenuItems", null);
__decorate([
    (0, common_1.Get)('my-menu'),
    (0, swagger_1.ApiOperation)({ summary: 'Get menu items for a specific user' }),
    (0, swagger_1.ApiQuery)({ name: 'userId', required: true, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'websiteId', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'menuType', required: false, type: String }),
    __param(0, (0, common_1.Query)('userId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('websiteId')),
    __param(2, (0, common_1.Query)('menuType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], MenusController.prototype, "getMyMenu", null);
__decorate([
    (0, common_1.Get)('role/:role'),
    (0, swagger_1.ApiOperation)({ summary: 'Get menu items by role' }),
    (0, swagger_1.ApiQuery)({ name: 'websiteId', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'menuType', required: false, type: String }),
    __param(0, (0, common_1.Param)('role')),
    __param(1, (0, common_1.Query)('websiteId')),
    __param(2, (0, common_1.Query)('menuType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", Promise)
], MenusController.prototype, "getMenuByRole", null);
__decorate([
    (0, common_1.Get)('common/:role'),
    (0, swagger_1.ApiOperation)({ summary: 'Get common menu items for a role' }),
    (0, swagger_1.ApiQuery)({ name: 'websiteId', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'menuType', required: false, type: String }),
    __param(0, (0, common_1.Param)('role')),
    __param(1, (0, common_1.Query)('websiteId')),
    __param(2, (0, common_1.Query)('menuType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", Promise)
], MenusController.prototype, "getCommonMenuItems", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all menu items' }),
    (0, swagger_1.ApiQuery)({ name: 'websiteId', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'menuType', required: false, type: String }),
    __param(0, (0, common_1.Query)('websiteId')),
    __param(1, (0, common_1.Query)('menuType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], MenusController.prototype, "getAllMenuItems", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('public'),
    (0, swagger_1.ApiOperation)({ summary: 'Get public menu items' }),
    (0, swagger_1.ApiQuery)({ name: 'websiteId', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'menuType', required: false, type: String }),
    __param(0, (0, common_1.Query)('websiteId')),
    __param(1, (0, common_1.Query)('menuType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], MenusController.prototype, "getPublicMenu", null);
__decorate([
    (0, common_1.Get)('type/:menuType'),
    (0, swagger_1.ApiOperation)({ summary: 'Get menu items by menu type' }),
    (0, swagger_1.ApiQuery)({ name: 'websiteId', required: false, type: Number }),
    __param(0, (0, common_1.Param)('menuType')),
    __param(1, (0, common_1.Query)('websiteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], MenusController.prototype, "getMenuItemsByType", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get menu item by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'Menu item ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Menu item details',
        type: menu_item_response_dto_1.MenuItemResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Menu item not found',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MenusController.prototype, "getMenuItemById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a menu item' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'Menu item ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Menu item updated successfully',
        type: menu_item_response_dto_1.MenuItemResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Menu item not found',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Menu item cannot be its own parent',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_menu_item_dto_1.UpdateMenuItemDto]),
    __metadata("design:returntype", Promise)
], MenusController.prototype, "updateMenuItem", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a menu item' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'Menu item ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Menu item deleted successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Menu item not found',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Cannot delete menu item with child items',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MenusController.prototype, "removeMenuItem", null);
__decorate([
    (0, common_1.Post)('permissions'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user menu permissions' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_menu_permission_dto_1.UserMenuPermissionDto]),
    __metadata("design:returntype", Promise)
], MenusController.prototype, "updateUserMenuPermissions", null);
__decorate([
    (0, common_1.Get)('permissions/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user menu permissions' }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MenusController.prototype, "getUserMenuPermissions", null);
__decorate([
    (0, common_1.Get)('website/:websiteId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get menu items by website ID' }),
    (0, swagger_1.ApiQuery)({ name: 'menuType', required: false, type: String }),
    __param(0, (0, common_1.Param)('websiteId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('menuType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], MenusController.prototype, "getMenuItemsByWebsite", null);
exports.MenusController = MenusController = __decorate([
    (0, swagger_1.ApiTags)('Menus'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('menu'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [menus_service_1.MenusService])
], MenusController);
//# sourceMappingURL=menus.controller.js.map