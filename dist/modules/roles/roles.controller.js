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
exports.RolesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_service_1 = require("./roles.service");
const create_role_dto_1 = require("./dto/create-role.dto");
const update_role_dto_1 = require("./dto/update-role.dto");
const role_response_dto_1 = require("./dto/role-response.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let RolesController = class RolesController {
    rolesService;
    constructor(rolesService) {
        this.rolesService = rolesService;
    }
    async create(createRoleDto) {
        return await this.rolesService.create(createRoleDto);
    }
    async findAll(page = 1, limit = 10) {
        return await this.rolesService.findAll(page, limit);
    }
    async getStats() {
        return await this.rolesService.getRoleStats();
    }
    async findOne(id) {
        return await this.rolesService.findOne(id);
    }
    async update(id, updateRoleDto) {
        return await this.rolesService.update(id, updateRoleDto);
    }
    async remove(id) {
        await this.rolesService.remove(id);
        return { message: 'Role deleted successfully' };
    }
};
exports.RolesController = RolesController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new role' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Role created successfully',
        type: role_response_dto_1.RoleResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Role with this name already exists',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_role_dto_1.CreateRoleDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all roles with pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 10 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of roles with pagination',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/RoleResponseDto' },
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
], RolesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get role statistics' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Role statistics including user distribution',
        schema: {
            type: 'object',
            properties: {
                totalRoles: { type: 'number', example: 5 },
                totalUsers: { type: 'number', example: 150 },
                roleDistribution: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 1 },
                            nameEn: { type: 'string', example: 'ADMIN' },
                            nameKh: { type: 'string', example: 'អ្នកគ្រប់គ្រង' },
                            userCount: { type: 'number', example: 5 },
                        },
                    },
                },
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a role by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'Role ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Role details with associated users',
        type: role_response_dto_1.RoleResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Role not found',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a role' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'Role ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Role updated successfully',
        type: role_response_dto_1.RoleResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Role not found',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Role with this name already exists',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_role_dto_1.UpdateRoleDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a role' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'Role ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Role deleted successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Role not found',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Cannot delete role - it is assigned to users',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "remove", null);
exports.RolesController = RolesController = __decorate([
    (0, swagger_1.ApiTags)('Roles'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('roles'),
    __metadata("design:paramtypes", [roles_service_1.RolesService])
], RolesController);
//# sourceMappingURL=roles.controller.js.map