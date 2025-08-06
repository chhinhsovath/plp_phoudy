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
exports.MenusService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const menu_item_entity_1 = require("../../entities/menu-item.entity");
const user_menu_permission_entity_1 = require("../../entities/user-menu-permission.entity");
const user_entity_1 = require("../../entities/user.entity");
const role_entity_1 = require("../../entities/role.entity");
const menu_item_dto_1 = require("./dto/menu-item.dto");
let MenusService = class MenusService {
    menuItemRepository;
    userMenuPermissionRepository;
    userRepository;
    roleRepository;
    constructor(menuItemRepository, userMenuPermissionRepository, userRepository, roleRepository) {
        this.menuItemRepository = menuItemRepository;
        this.userMenuPermissionRepository = userMenuPermissionRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }
    async createMenuItem(createMenuItemDto) {
        if (createMenuItemDto.parentId) {
            const parentMenuItem = await this.menuItemRepository.findOne({
                where: { id: createMenuItemDto.parentId },
            });
            if (!parentMenuItem) {
                throw new common_1.NotFoundException(`Parent menu item with ID ${createMenuItemDto.parentId} not found`);
            }
        }
        const menuItem = this.menuItemRepository.create({
            ...createMenuItemDto,
            menuType: createMenuItemDto.menuType || 'NAVBAR',
            isActive: createMenuItemDto.isActive !== undefined
                ? createMenuItemDto.isActive
                : true,
        });
        if (createMenuItemDto.roleIds && createMenuItemDto.roleIds.length > 0) {
            const roles = await this.roleRepository.findByIds(createMenuItemDto.roleIds);
            if (roles.length !== createMenuItemDto.roleIds.length) {
                throw new common_1.NotFoundException('One or more roles not found');
            }
            menuItem.roles = roles;
        }
        const savedMenuItem = await this.menuItemRepository.save(menuItem);
        return this.convertToResponseDto(savedMenuItem);
    }
    async findAllMenuItems(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [menuItems, total] = await this.menuItemRepository.findAndCount({
            relations: ['roles', 'parent', 'children'],
            skip,
            take: limit,
            order: { orderIndex: 'ASC', createdAt: 'DESC' },
        });
        const responseData = menuItems.map((item) => this.convertToResponseDto(item));
        return {
            data: responseData,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async findMenuItemById(id) {
        const menuItem = await this.menuItemRepository.findOne({
            where: { id },
            relations: ['roles', 'parent', 'children'],
        });
        if (!menuItem) {
            throw new common_1.NotFoundException(`Menu item with ID ${id} not found`);
        }
        return this.convertToResponseDto(menuItem);
    }
    async updateMenuItem(id, updateMenuItemDto) {
        const menuItem = await this.menuItemRepository.findOne({
            where: { id },
            relations: ['roles'],
        });
        if (!menuItem) {
            throw new common_1.NotFoundException(`Menu item with ID ${id} not found`);
        }
        if (updateMenuItemDto.parentId) {
            if (updateMenuItemDto.parentId === id) {
                throw new common_1.ConflictException('Menu item cannot be its own parent');
            }
            const parentMenuItem = await this.menuItemRepository.findOne({
                where: { id: updateMenuItemDto.parentId },
            });
            if (!parentMenuItem) {
                throw new common_1.NotFoundException(`Parent menu item with ID ${updateMenuItemDto.parentId} not found`);
            }
        }
        Object.assign(menuItem, updateMenuItemDto);
        if (updateMenuItemDto.roleIds !== undefined) {
            if (updateMenuItemDto.roleIds.length > 0) {
                const roles = await this.roleRepository.findByIds(updateMenuItemDto.roleIds);
                if (roles.length !== updateMenuItemDto.roleIds.length) {
                    throw new common_1.NotFoundException('One or more roles not found');
                }
                menuItem.roles = roles;
            }
            else {
                menuItem.roles = [];
            }
        }
        const updatedMenuItem = await this.menuItemRepository.save(menuItem);
        return this.convertToResponseDto(updatedMenuItem);
    }
    async removeMenuItem(id) {
        const menuItem = await this.menuItemRepository.findOne({
            where: { id },
            relations: ['children'],
        });
        if (!menuItem) {
            throw new common_1.NotFoundException(`Menu item with ID ${id} not found`);
        }
        if (menuItem.children && menuItem.children.length > 0) {
            throw new common_1.ConflictException('Cannot delete menu item with child items. Please delete child items first.');
        }
        await this.menuItemRepository.remove(menuItem);
    }
    convertToResponseDto(menuItem) {
        return {
            id: menuItem.id,
            name: menuItem.name,
            url: menuItem.url,
            icon: menuItem.icon,
            parentId: menuItem.parentId,
            orderIndex: menuItem.orderIndex,
            menuType: menuItem.menuType,
            websiteId: menuItem.websiteId,
            isActive: menuItem.isActive,
            roles: menuItem.roles ? menuItem.roles.map((role) => role.nameEn) : [],
            createdAt: menuItem.createdAt,
            updatedAt: menuItem.updatedAt,
            children: menuItem.children
                ? menuItem.children.map((child) => this.convertToResponseDto(child))
                : [],
        };
    }
    async getMenuItemsByUserId(userId, websiteId, menuType) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        let query = this.menuItemRepository
            .createQueryBuilder('menuItem')
            .leftJoinAndSelect('menuItem.children', 'children')
            .leftJoinAndSelect('menuItem.parent', 'parent')
            .leftJoinAndSelect('menuItem.roles', 'roles');
        if (websiteId) {
            query = query.where('menuItem.websiteId = :websiteId', { websiteId });
        }
        if (menuType) {
            query = query.andWhere('menuItem.menuType = :menuType', { menuType });
        }
        const allMenuItems = await query.getMany();
        const parentChildMap = new Map();
        const rootItems = [];
        const itemMap = new Map();
        for (const item of allMenuItems) {
            itemMap.set(item.id, item);
            if (!item.parentId) {
                rootItems.push(item);
            }
            else {
                if (!parentChildMap.has(item.parentId)) {
                    parentChildMap.set(item.parentId, []);
                }
                const children = parentChildMap.get(item.parentId);
                if (children) {
                    children.push(item);
                }
            }
        }
        if (user.role?.nameEn === 'ADMIN') {
            return rootItems
                .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
                .map((item) => this.convertToDto(item, parentChildMap))
                .filter((item) => item !== null);
        }
        const userPermissions = await this.userMenuPermissionRepository.find({
            where: { userId },
            relations: ['menuItem'],
        });
        const directPermittedMenuIds = new Set(userPermissions.map((permission) => permission.menuId));
        const allPermittedMenuIds = new Set(directPermittedMenuIds);
        for (const menuId of directPermittedMenuIds) {
            let menuItem = itemMap.get(menuId);
            while (menuItem && menuItem.parentId) {
                allPermittedMenuIds.add(menuItem.parentId);
                menuItem = itemMap.get(menuItem.parentId);
            }
        }
        return rootItems
            .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
            .map((item) => this.convertToDto(item, parentChildMap, allPermittedMenuIds))
            .filter((item) => item !== null);
    }
    async getPublicMenuItems(websiteId, menuType) {
        let query = this.menuItemRepository
            .createQueryBuilder('menuItem')
            .leftJoinAndSelect('menuItem.children', 'children')
            .leftJoinAndSelect('menuItem.parent', 'parent')
            .leftJoinAndSelect('menuItem.roles', 'roles');
        if (websiteId) {
            query = query.where('menuItem.websiteId = :websiteId', { websiteId });
        }
        if (menuType) {
            query = query.andWhere('menuItem.menuType = :menuType', { menuType });
        }
        const allMenuItems = await query.getMany();
        const parentChildMap = new Map();
        const rootItems = [];
        const itemMap = new Map();
        for (const item of allMenuItems) {
            itemMap.set(item.id, item);
            if (!item.parentId) {
                rootItems.push(item);
            }
            else {
                if (!parentChildMap.has(item.parentId)) {
                    parentChildMap.set(item.parentId, []);
                }
                const children = parentChildMap.get(item.parentId);
                if (children) {
                    children.push(item);
                }
            }
        }
        const publicMenuIds = new Set();
        allMenuItems
            .filter((item) => item.roles?.some((r) => r.nameEn === 'PUBLIC'))
            .forEach((item) => {
            publicMenuIds.add(item.id);
            let parentId = item.parentId;
            while (parentId) {
                publicMenuIds.add(parentId);
                const parentItem = itemMap.get(parentId);
                if (parentItem?.parentId) {
                    parentId = parentItem.parentId;
                }
                else {
                    break;
                }
            }
        });
        return rootItems
            .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
            .map((item) => this.convertToDto(item, parentChildMap, publicMenuIds))
            .filter((item) => item !== null);
    }
    async getMenuItemsByRole(role, websiteId, menuType) {
        let query = this.menuItemRepository
            .createQueryBuilder('menuItem')
            .leftJoinAndSelect('menuItem.children', 'children')
            .leftJoinAndSelect('menuItem.parent', 'parent')
            .leftJoinAndSelect('menuItem.roles', 'roles');
        if (websiteId) {
            query = query.where('menuItem.websiteId = :websiteId', { websiteId });
        }
        if (menuType) {
            query = query.andWhere('menuItem.menuType = :menuType', { menuType });
        }
        const allMenuItems = await query.getMany();
        const parentChildMap = new Map();
        const rootItems = [];
        const itemMap = new Map();
        for (const item of allMenuItems) {
            itemMap.set(item.id, item);
            if (!item.parentId) {
                rootItems.push(item);
            }
            else {
                if (!parentChildMap.has(item.parentId)) {
                    parentChildMap.set(item.parentId, []);
                }
                const children = parentChildMap.get(item.parentId);
                if (children) {
                    children.push(item);
                }
            }
        }
        if (role === 'ADMIN') {
            return rootItems
                .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
                .map((item) => this.convertToDto(item, parentChildMap))
                .filter((item) => item !== null);
        }
        const roleMenuIds = new Set();
        allMenuItems
            .filter((item) => item.roles?.some((r) => r.nameEn === role))
            .forEach((item) => {
            roleMenuIds.add(item.id);
            let parentId = item.parentId;
            while (parentId) {
                roleMenuIds.add(parentId);
                const parentItem = itemMap.get(parentId);
                if (parentItem?.parentId) {
                    parentId = parentItem.parentId;
                }
                else {
                    break;
                }
            }
        });
        return rootItems
            .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
            .map((item) => this.convertToDto(item, parentChildMap, roleMenuIds))
            .filter((item) => item !== null);
    }
    async getCommonMenuItems(userRole, websiteId, menuType) {
        let query = this.menuItemRepository
            .createQueryBuilder('menuItem')
            .leftJoinAndSelect('menuItem.children', 'children')
            .leftJoinAndSelect('menuItem.parent', 'parent')
            .leftJoinAndSelect('menuItem.roles', 'roles');
        if (websiteId) {
            query = query.where('menuItem.websiteId = :websiteId', { websiteId });
        }
        if (menuType) {
            query = query.andWhere('menuItem.menuType = :menuType', { menuType });
        }
        const allMenuItems = await query.getMany();
        const parentChildMap = new Map();
        const rootItems = [];
        const itemMap = new Map();
        for (const item of allMenuItems) {
            itemMap.set(item.id, item);
            if (!item.parentId) {
                rootItems.push(item);
            }
            else {
                if (!parentChildMap.has(item.parentId)) {
                    parentChildMap.set(item.parentId, []);
                }
                const children = parentChildMap.get(item.parentId);
                if (children) {
                    children.push(item);
                }
            }
        }
        const commonMenuIds = new Set();
        allMenuItems
            .filter((item) => {
            const isCommonItem = !item.roles || item.roles.length === 0;
            if (userRole === 'STUDENT') {
                return (isCommonItem &&
                    item.url !== '/student-management' &&
                    item.url !== '/lesson-permission');
            }
            return isCommonItem;
        })
            .forEach((item) => {
            commonMenuIds.add(item.id);
            let parent = item.parent;
            while (parent) {
                commonMenuIds.add(parent.id);
                parent = parent.parent;
            }
        });
        return rootItems
            .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
            .map((item) => this.convertToDto(item, parentChildMap, commonMenuIds))
            .filter((item) => item !== null);
    }
    async getMenuItemsByType(menuType, websiteId) {
        let query = this.menuItemRepository
            .createQueryBuilder('menuItem')
            .leftJoinAndSelect('menuItem.children', 'children')
            .leftJoinAndSelect('menuItem.parent', 'parent')
            .leftJoinAndSelect('menuItem.roles', 'roles')
            .where('menuItem.menuType = :menuType', { menuType });
        if (websiteId) {
            query = query.andWhere('menuItem.websiteId = :websiteId', { websiteId });
        }
        const allMenuItems = await query.getMany();
        const parentChildMap = new Map();
        const rootItems = [];
        const itemMap = new Map();
        for (const item of allMenuItems) {
            itemMap.set(item.id, item);
            if (!item.parentId) {
                rootItems.push(item);
            }
            else {
                if (!parentChildMap.has(item.parentId)) {
                    parentChildMap.set(item.parentId, []);
                }
                const children = parentChildMap.get(item.parentId);
                if (children) {
                    children.push(item);
                }
            }
        }
        return rootItems
            .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
            .map((item) => this.convertToDto(item, parentChildMap))
            .filter((item) => item !== null);
    }
    async getMenuItemById(id) {
        const menuItem = await this.menuItemRepository.findOne({
            where: { id },
            relations: ['children', 'parent'],
        });
        if (!menuItem) {
            throw new common_1.NotFoundException(`Menu item with ID ${id} not found`);
        }
        return this.convertToSimpleDto(menuItem);
    }
    async getMenuItemsByWebsite(websiteId, menuType) {
        let query = this.menuItemRepository
            .createQueryBuilder('menuItem')
            .leftJoinAndSelect('menuItem.children', 'children')
            .leftJoinAndSelect('menuItem.parent', 'parent')
            .leftJoinAndSelect('menuItem.roles', 'roles')
            .where('menuItem.websiteId = :websiteId', { websiteId });
        if (menuType) {
            query = query.andWhere('menuItem.menuType = :menuType', { menuType });
        }
        const menuItems = await query.getMany();
        const rootItems = menuItems.filter((item) => !item.parentId);
        const parentChildMap = new Map();
        const itemMap = new Map();
        for (const item of menuItems) {
            itemMap.set(item.id, item);
            if (item.parentId) {
                if (!parentChildMap.has(item.parentId)) {
                    parentChildMap.set(item.parentId, []);
                }
                const children = parentChildMap.get(item.parentId);
                if (children) {
                    children.push(item);
                }
            }
        }
        return rootItems
            .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
            .map((item) => this.convertToDto(item, parentChildMap))
            .filter((item) => item !== null);
    }
    async updateUserMenuPermissions(permissionDto) {
        const user = await this.userRepository.findOne({
            where: { id: permissionDto.userId },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${permissionDto.userId} not found`);
        }
        await this.userMenuPermissionRepository.delete({
            userId: permissionDto.userId,
        });
        if (user.role?.nameEn === 'ADMIN' &&
            (!permissionDto.menuIds || permissionDto.menuIds.length === 0)) {
            const allMenuItems = await this.menuItemRepository.find();
            permissionDto.menuIds = allMenuItems.map((item) => item.id);
        }
        const newPermissions = await Promise.all(permissionDto.menuIds.map(async (menuId) => {
            const menuItem = await this.menuItemRepository.findOne({
                where: { id: menuId },
            });
            if (!menuItem) {
                throw new common_1.NotFoundException(`Menu item with ID ${menuId} not found`);
            }
            const permission = new user_menu_permission_entity_1.UserMenuPermission();
            permission.userId = user.id;
            permission.user = user;
            permission.menuId = menuItem.id;
            permission.menuItem = menuItem;
            return permission;
        }));
        await this.userMenuPermissionRepository.save(newPermissions);
    }
    async getUserMenuPermissions(userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        if (user.role?.nameEn === 'ADMIN') {
            const allMenuItems = await this.menuItemRepository.find();
            return allMenuItems.map((item) => item.id);
        }
        const permissions = await this.userMenuPermissionRepository.find({
            where: { userId },
            relations: ['menuItem'],
        });
        return permissions.map((permission) => permission.menuId);
    }
    convertToDto(menuItem, parentChildMap, permittedMenuIds) {
        if (permittedMenuIds && !permittedMenuIds.has(menuItem.id)) {
            return null;
        }
        const dto = new menu_item_dto_1.MenuItemDto();
        dto.id = menuItem.id;
        dto.name = menuItem.name;
        dto.url = menuItem.url;
        dto.icon = menuItem.icon;
        dto.parentId = menuItem.parentId;
        dto.orderIndex = menuItem.orderIndex || 0;
        dto.role = menuItem.roles?.map((role) => role.nameEn) || [];
        dto.menuType = menuItem.menuType;
        dto.websiteId = menuItem.websiteId;
        dto.isActive = menuItem.isActive;
        dto.createdAt = menuItem.createdAt;
        dto.updatedAt = menuItem.updatedAt;
        if (parentChildMap.has(menuItem.id)) {
            const children = parentChildMap.get(menuItem.id);
            if (children) {
                dto.children = children
                    .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
                    .map((child) => this.convertToDto(child, parentChildMap, permittedMenuIds))
                    .filter((child) => child !== null);
                if (dto.children.length === 0 &&
                    permittedMenuIds &&
                    !permittedMenuIds.has(menuItem.id)) {
                    return null;
                }
            }
            else {
                dto.children = [];
            }
        }
        else {
            dto.children = [];
        }
        return dto;
    }
    convertToSimpleDto(menuItem) {
        const dto = new menu_item_dto_1.MenuItemDto();
        dto.id = menuItem.id;
        dto.name = menuItem.name;
        dto.url = menuItem.url;
        dto.icon = menuItem.icon;
        dto.parentId = menuItem.parentId;
        dto.orderIndex = menuItem.orderIndex || 0;
        dto.role = menuItem.roles?.map((role) => role.nameEn) || [];
        dto.menuType = menuItem.menuType;
        dto.websiteId = menuItem.websiteId;
        dto.isActive = menuItem.isActive;
        dto.createdAt = menuItem.createdAt;
        dto.updatedAt = menuItem.updatedAt;
        if (menuItem.children) {
            dto.children = menuItem.children
                .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
                .map((child) => this.convertToSimpleDto(child));
        }
        else {
            dto.children = [];
        }
        return dto;
    }
};
exports.MenusService = MenusService;
exports.MenusService = MenusService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(menu_item_entity_1.MenuItem)),
    __param(1, (0, typeorm_1.InjectRepository)(user_menu_permission_entity_1.UserMenuPermission)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MenusService);
//# sourceMappingURL=menus.service.js.map