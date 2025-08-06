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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("../../entities/role.entity");
const user_entity_1 = require("../../entities/user.entity");
let RolesService = class RolesService {
    roleRepository;
    userRepository;
    constructor(roleRepository, userRepository) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
    }
    async create(createRoleDto) {
        const existingRole = await this.roleRepository.findOne({
            where: { nameEn: createRoleDto.nameEn },
        });
        if (existingRole) {
            throw new common_1.ConflictException(`Role with name '${createRoleDto.nameEn}' already exists`);
        }
        const role = this.roleRepository.create(createRoleDto);
        return await this.roleRepository.save(role);
    }
    async findAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [roles, total] = await this.roleRepository.findAndCount({
            skip,
            take: limit,
            order: { createdAt: 'DESC' },
        });
        const rolesWithUserCount = await Promise.all(roles.map(async (role) => {
            const userCount = await this.userRepository.count({
                where: { roleId: role.id },
            });
            return {
                ...role,
                userCount,
            };
        }));
        return {
            data: rolesWithUserCount,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const role = await this.roleRepository.findOne({
            where: { id },
            relations: ['users'],
        });
        if (!role) {
            throw new common_1.NotFoundException(`Role with ID ${id} not found`);
        }
        return role;
    }
    async findByName(nameEn) {
        return await this.roleRepository.findOne({
            where: { nameEn },
        });
    }
    async update(id, updateRoleDto) {
        const role = await this.findOne(id);
        if (updateRoleDto.nameEn && updateRoleDto.nameEn !== role.nameEn) {
            const existingRole = await this.roleRepository.findOne({
                where: { nameEn: updateRoleDto.nameEn },
            });
            if (existingRole) {
                throw new common_1.ConflictException(`Role with name '${updateRoleDto.nameEn}' already exists`);
            }
        }
        Object.assign(role, updateRoleDto);
        return await this.roleRepository.save(role);
    }
    async remove(id) {
        const role = await this.findOne(id);
        const userCount = await this.userRepository.count({
            where: { roleId: id },
        });
        if (userCount > 0) {
            throw new common_1.ConflictException(`Cannot delete role. It is assigned to ${userCount} user(s). Please reassign users before deleting.`);
        }
        await this.roleRepository.remove(role);
    }
    async getRoleStats() {
        const roles = await this.roleRepository.find();
        const roleStats = await Promise.all(roles.map(async (role) => {
            const userCount = await this.userRepository.count({
                where: { roleId: role.id },
            });
            return {
                id: role.id,
                nameEn: role.nameEn,
                nameKh: role.nameKh,
                userCount,
            };
        }));
        const totalRoles = roles.length;
        const totalUsers = await this.userRepository.count();
        return {
            totalRoles,
            totalUsers,
            roleDistribution: roleStats,
        };
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RolesService);
//# sourceMappingURL=roles.service.js.map