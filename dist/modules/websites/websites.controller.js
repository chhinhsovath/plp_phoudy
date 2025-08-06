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
exports.WebsitesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const websites_service_1 = require("./websites.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const create_website_dto_1 = require("./dto/create-website.dto");
const update_website_dto_1 = require("./dto/update-website.dto");
const assign_role_permission_dto_1 = require("./dto/assign-role-permission.dto");
let WebsitesController = class WebsitesController {
    websitesService;
    constructor(websitesService) {
        this.websitesService = websitesService;
    }
    async findAll(limit, offset) {
        return this.websitesService.findAll(limit, offset);
    }
    async findOne(id) {
        return this.websitesService.findOne(id);
    }
    async create(createWebsiteDto) {
        return this.websitesService.create(createWebsiteDto);
    }
    async update(id, updateWebsiteDto) {
        return this.websitesService.update(id, updateWebsiteDto);
    }
    async remove(id) {
        return this.websitesService.remove(id);
    }
    async activate(id) {
        return this.websitesService.activate(id);
    }
    async deactivate(id) {
        return this.websitesService.deactivate(id);
    }
    async assignRolePermission(id, assignRolePermissionDto) {
        return this.websitesService.assignRolePermission(id, assignRolePermissionDto.roleId);
    }
    async removeRolePermission(id, roleId) {
        return this.websitesService.removeRolePermission(id, roleId);
    }
    async getWebsitePermissions(id) {
        return this.websitesService.getWebsitePermissions(id);
    }
};
exports.WebsitesController = WebsitesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all websites with pagination' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return paginated websites' }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Number of items per page',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'offset',
        required: false,
        type: Number,
        description: 'Number of items to skip',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], WebsitesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a website by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the website' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Website not found' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WebsitesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new website' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Website successfully created' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_website_dto_1.CreateWebsiteDto]),
    __metadata("design:returntype", Promise)
], WebsitesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a website' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Website successfully updated' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Website not found' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_website_dto_1.UpdateWebsiteDto]),
    __metadata("design:returntype", Promise)
], WebsitesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a website' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Website successfully deleted' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Website not found' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WebsitesController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/activate'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Activate a website' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Website successfully activated' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Website not found' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WebsitesController.prototype, "activate", null);
__decorate([
    (0, common_1.Patch)(':id/deactivate'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Deactivate a website' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Website successfully deactivated' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Website not found' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WebsitesController.prototype, "deactivate", null);
__decorate([
    (0, common_1.Post)(':id/permissions'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Assign role permission to website' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Role permission assigned successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Website not found' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, assign_role_permission_dto_1.AssignRolePermissionDto]),
    __metadata("design:returntype", Promise)
], WebsitesController.prototype, "assignRolePermission", null);
__decorate([
    (0, common_1.Delete)(':id/permissions/:roleId'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove role permission from website' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Role permission removed successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Permission not found' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('roleId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], WebsitesController.prototype, "removeRolePermission", null);
__decorate([
    (0, common_1.Get)(':id/permissions'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Get website permissions' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return website permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Website not found' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WebsitesController.prototype, "getWebsitePermissions", null);
exports.WebsitesController = WebsitesController = __decorate([
    (0, swagger_1.ApiTags)('Websites'),
    (0, common_1.Controller)('websites'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [websites_service_1.WebsitesService])
], WebsitesController);
//# sourceMappingURL=websites.controller.js.map