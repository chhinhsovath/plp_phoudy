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
exports.WebsitesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const website_entity_1 = require("../../entities/website.entity");
const website_role_permission_entity_1 = require("../../entities/website-role-permission.entity");
let WebsitesService = class WebsitesService {
    websiteRepository;
    websiteRolePermissionRepository;
    constructor(websiteRepository, websiteRolePermissionRepository) {
        this.websiteRepository = websiteRepository;
        this.websiteRolePermissionRepository = websiteRolePermissionRepository;
    }
    async create(createWebsiteDto) {
        const existingWebsite = await this.websiteRepository.findOne({
            where: [
                { name: createWebsiteDto.name },
                { domain: createWebsiteDto.domain },
            ],
        });
        if (existingWebsite) {
            throw new common_1.ConflictException('Website name or domain already exists');
        }
        const website = this.websiteRepository.create(createWebsiteDto);
        return this.websiteRepository.save(website);
    }
    async findAll(limit, offset) {
        const take = limit || 10;
        const skip = offset || 0;
        const [websites, total] = await this.websiteRepository.findAndCount({
            take,
            skip,
            order: { created_at: 'DESC' },
        });
        return {
            data: websites,
            total,
            limit: take,
            page: Math.floor(skip / take) + 1,
            totalPages: Math.ceil(total / take),
        };
    }
    async findOne(id) {
        const website = await this.websiteRepository.findOne({ where: { id } });
        if (!website) {
            throw new common_1.NotFoundException(`Website with ID ${id} not found`);
        }
        return website;
    }
    async update(id, updateWebsiteDto) {
        const website = await this.findOne(id);
        if (updateWebsiteDto.name && updateWebsiteDto.name !== website.name) {
            const existingName = await this.websiteRepository.findOne({
                where: { name: updateWebsiteDto.name },
            });
            if (existingName) {
                throw new common_1.ConflictException('Website name already exists');
            }
        }
        if (updateWebsiteDto.domain && updateWebsiteDto.domain !== website.domain) {
            const existingDomain = await this.websiteRepository.findOne({
                where: { domain: updateWebsiteDto.domain },
            });
            if (existingDomain) {
                throw new common_1.ConflictException('Website domain already exists');
            }
        }
        Object.assign(website, updateWebsiteDto);
        return this.websiteRepository.save(website);
    }
    async remove(id) {
        const website = await this.findOne(id);
        await this.websiteRepository.remove(website);
    }
    async activate(id) {
        const website = await this.findOne(id);
        website.is_active = true;
        return this.websiteRepository.save(website);
    }
    async deactivate(id) {
        const website = await this.findOne(id);
        website.is_active = false;
        return this.websiteRepository.save(website);
    }
    async assignRolePermission(websiteId, roleId) {
        const existing = await this.websiteRolePermissionRepository.findOne({
            where: { website_id: websiteId, role_id: roleId },
        });
        if (existing) {
            throw new common_1.ConflictException('Role permission already exists for this website');
        }
        const permission = this.websiteRolePermissionRepository.create({
            website_id: websiteId,
            role_id: roleId,
        });
        await this.websiteRolePermissionRepository.save(permission);
    }
    async removeRolePermission(websiteId, roleId) {
        const permission = await this.websiteRolePermissionRepository.findOne({
            where: { website_id: websiteId, role_id: roleId },
        });
        if (!permission) {
            throw new common_1.NotFoundException('Role permission not found');
        }
        await this.websiteRolePermissionRepository.remove(permission);
    }
    async getWebsitePermissions(websiteId) {
        return this.websiteRolePermissionRepository.find({
            where: { website_id: websiteId },
            relations: ['role'],
        });
    }
};
exports.WebsitesService = WebsitesService;
exports.WebsitesService = WebsitesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(website_entity_1.Website)),
    __param(1, (0, typeorm_1.InjectRepository)(website_role_permission_entity_1.WebsiteRolePermission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], WebsitesService);
//# sourceMappingURL=websites.service.js.map