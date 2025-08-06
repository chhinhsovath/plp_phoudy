import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from '../../entities/menu-item.entity';
import { UserMenuPermission } from '../../entities/user-menu-permission.entity';
import { User } from '../../entities/user.entity';
import { Role } from '../../entities/role.entity';
import { MenuItemDto } from './dto/menu-item.dto';
import { UserMenuPermissionDto } from './dto/user-menu-permission.dto';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { MenuItemResponseDto } from './dto/menu-item-response.dto';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
    @InjectRepository(UserMenuPermission)
    private userMenuPermissionRepository: Repository<UserMenuPermission>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async createMenuItem(
    createMenuItemDto: CreateMenuItemDto,
  ): Promise<MenuItemResponseDto> {
    if (createMenuItemDto.parentId) {
      const parentMenuItem = await this.menuItemRepository.findOne({
        where: { id: createMenuItemDto.parentId },
      });
      if (!parentMenuItem) {
        throw new NotFoundException(
          `Parent menu item with ID ${createMenuItemDto.parentId} not found`,
        );
      }
    }

    const menuItem = this.menuItemRepository.create({
      ...createMenuItemDto,
      menuType: createMenuItemDto.menuType || 'NAVBAR',
      isActive:
        createMenuItemDto.isActive !== undefined
          ? createMenuItemDto.isActive
          : true,
    });

    if (createMenuItemDto.roleIds && createMenuItemDto.roleIds.length > 0) {
      const roles = await this.roleRepository.findByIds(
        createMenuItemDto.roleIds,
      );
      if (roles.length !== createMenuItemDto.roleIds.length) {
        throw new NotFoundException('One or more roles not found');
      }
      menuItem.roles = roles;
    }

    const savedMenuItem = await this.menuItemRepository.save(menuItem);
    return this.convertToResponseDto(savedMenuItem);
  }

  async findAllMenuItems(page: number = 1, limit: number = 10): Promise<any> {
    const skip = (page - 1) * limit;

    const [menuItems, total] = await this.menuItemRepository.findAndCount({
      relations: ['roles', 'parent', 'children'],
      skip,
      take: limit,
      order: { orderIndex: 'ASC', createdAt: 'DESC' },
    });

    const responseData = menuItems.map((item) =>
      this.convertToResponseDto(item),
    );

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

  async findMenuItemById(id: number): Promise<MenuItemResponseDto> {
    const menuItem = await this.menuItemRepository.findOne({
      where: { id },
      relations: ['roles', 'parent', 'children'],
    });

    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }

    return this.convertToResponseDto(menuItem);
  }

  async updateMenuItem(
    id: number,
    updateMenuItemDto: UpdateMenuItemDto,
  ): Promise<MenuItemResponseDto> {
    const menuItem = await this.menuItemRepository.findOne({
      where: { id },
      relations: ['roles'],
    });

    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }

    if (updateMenuItemDto.parentId) {
      if (updateMenuItemDto.parentId === id) {
        throw new ConflictException('Menu item cannot be its own parent');
      }
      const parentMenuItem = await this.menuItemRepository.findOne({
        where: { id: updateMenuItemDto.parentId },
      });
      if (!parentMenuItem) {
        throw new NotFoundException(
          `Parent menu item with ID ${updateMenuItemDto.parentId} not found`,
        );
      }
    }

    Object.assign(menuItem, updateMenuItemDto);

    if (updateMenuItemDto.roleIds !== undefined) {
      if (updateMenuItemDto.roleIds.length > 0) {
        const roles = await this.roleRepository.findByIds(
          updateMenuItemDto.roleIds,
        );
        if (roles.length !== updateMenuItemDto.roleIds.length) {
          throw new NotFoundException('One or more roles not found');
        }
        menuItem.roles = roles;
      } else {
        menuItem.roles = [];
      }
    }

    const updatedMenuItem = await this.menuItemRepository.save(menuItem);
    return this.convertToResponseDto(updatedMenuItem);
  }

  async removeMenuItem(id: number): Promise<void> {
    const menuItem = await this.menuItemRepository.findOne({
      where: { id },
      relations: ['children'],
    });

    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }

    if (menuItem.children && menuItem.children.length > 0) {
      throw new ConflictException(
        'Cannot delete menu item with child items. Please delete child items first.',
      );
    }

    await this.menuItemRepository.remove(menuItem);
  }

  private convertToResponseDto(menuItem: MenuItem): MenuItemResponseDto {
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

  async getMenuItemsByUserId(
    userId: number,
    websiteId?: number,
    menuType?: string,
  ): Promise<MenuItemDto[]> {
    // Get user
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Build query for menu items
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

    // Get all menu items with their children
    const allMenuItems = await query.getMany();

    // Build menu hierarchy
    const parentChildMap = new Map<number, MenuItem[]>();
    const rootItems: MenuItem[] = [];
    const itemMap = new Map<number, MenuItem>();

    // Create a map of all items and group by parent
    for (const item of allMenuItems) {
      itemMap.set(item.id, item);
      if (!item.parentId) {
        rootItems.push(item);
      } else {
        if (!parentChildMap.has(item.parentId)) {
          parentChildMap.set(item.parentId, []);
        }
        const children = parentChildMap.get(item.parentId);
        if (children) {
          children.push(item);
        }
      }
    }

    // If user is admin, return all menu items
    if (user.role?.nameEn === 'ADMIN') {
      return rootItems
        .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
        .map((item) => this.convertToDto(item, parentChildMap))
        .filter((item): item is MenuItemDto => item !== null);
    }

    // For non-admin users, get direct permissions
    const userPermissions = await this.userMenuPermissionRepository.find({
      where: { userId },
      relations: ['menuItem'],
    });

    const directPermittedMenuIds = new Set(
      userPermissions.map((permission) => permission.menuId),
    );

    // Add parent menu IDs for permitted children
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
      .map((item) =>
        this.convertToDto(item, parentChildMap, allPermittedMenuIds),
      )
      .filter((item): item is MenuItemDto => item !== null);
  }

  async getPublicMenuItems(
    websiteId?: number,
    menuType?: string,
  ): Promise<MenuItemDto[]> {
    // Build query for menu items
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

    // Get all menu items with their children
    const allMenuItems = await query.getMany();

    // Build menu hierarchy
    const parentChildMap = new Map<number, MenuItem[]>();
    const rootItems: MenuItem[] = [];
    const itemMap = new Map<number, MenuItem>();

    // Create a map of all items and group by parent
    for (const item of allMenuItems) {
      itemMap.set(item.id, item);
      if (!item.parentId) {
        rootItems.push(item);
      } else {
        if (!parentChildMap.has(item.parentId)) {
          parentChildMap.set(item.parentId, []);
        }
        const children = parentChildMap.get(item.parentId);
        if (children) {
          children.push(item);
        }
      }
    }

    // Filter for menu items with role 'PUBLIC'
    const publicMenuIds = new Set<number>();
    allMenuItems
      .filter((item) => item.roles?.some((r) => r.nameEn === 'PUBLIC'))
      .forEach((item) => {
        publicMenuIds.add(item.id);

        // Add parent IDs
        let parentId = item.parentId;
        while (parentId) {
          publicMenuIds.add(parentId);
          const parentItem = itemMap.get(parentId);
          if (parentItem?.parentId) {
            parentId = parentItem.parentId;
          } else {
            break;
          }
        }
      });

    return rootItems
      .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
      .map((item) => this.convertToDto(item, parentChildMap, publicMenuIds))
      .filter((item): item is MenuItemDto => item !== null);
  }

  async getMenuItemsByRole(
    role: string,
    websiteId?: number,
    menuType?: string,
  ): Promise<MenuItemDto[]> {
    // Build query for menu items
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

    // Get all menu items with their children
    const allMenuItems = await query.getMany();

    // Build menu hierarchy
    const parentChildMap = new Map<number, MenuItem[]>();
    const rootItems: MenuItem[] = [];
    const itemMap = new Map<number, MenuItem>();

    // Create a map of all items and group by parent
    for (const item of allMenuItems) {
      itemMap.set(item.id, item);
      if (!item.parentId) {
        rootItems.push(item);
      } else {
        if (!parentChildMap.has(item.parentId)) {
          parentChildMap.set(item.parentId, []);
        }
        const children = parentChildMap.get(item.parentId);
        if (children) {
          children.push(item);
        }
      }
    }

    // If role is ADMIN, return all menu items
    if (role === 'ADMIN') {
      return rootItems
        .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
        .map((item) => this.convertToDto(item, parentChildMap))
        .filter((item): item is MenuItemDto => item !== null);
    }

    // For non-admin roles, get menu items for this role only
    const roleMenuIds = new Set<number>();
    allMenuItems
      .filter((item) => item.roles?.some((r) => r.nameEn === role))
      .forEach((item) => {
        roleMenuIds.add(item.id);

        // Add parent IDs
        let parentId = item.parentId;
        while (parentId) {
          roleMenuIds.add(parentId);
          const parentItem = itemMap.get(parentId);
          if (parentItem?.parentId) {
            parentId = parentItem.parentId;
          } else {
            break;
          }
        }
      });

    return rootItems
      .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
      .map((item) => this.convertToDto(item, parentChildMap, roleMenuIds))
      .filter((item): item is MenuItemDto => item !== null);
  }

  async getCommonMenuItems(
    userRole: string,
    websiteId?: number,
    menuType?: string,
  ): Promise<MenuItemDto[]> {
    // Build query for menu items
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

    // Get all menu items with their children
    const allMenuItems = await query.getMany();

    // Build menu hierarchy
    const parentChildMap = new Map<number, MenuItem[]>();
    const rootItems: MenuItem[] = [];
    const itemMap = new Map<number, MenuItem>();

    // Create a map of all items and group by parent
    for (const item of allMenuItems) {
      itemMap.set(item.id, item);
      if (!item.parentId) {
        rootItems.push(item);
      } else {
        if (!parentChildMap.has(item.parentId)) {
          parentChildMap.set(item.parentId, []);
        }
        const children = parentChildMap.get(item.parentId);
        if (children) {
          children.push(item);
        }
      }
    }

    // Get common menu items (with NULL role) and their parent IDs
    const commonMenuIds = new Set<number>();
    allMenuItems
      .filter((item) => {
        // Basic filter for common menu items
        const isCommonItem = !item.roles || item.roles.length === 0;

        // Additional filter for STUDENT role
        if (userRole === 'STUDENT') {
          // Exclude student-management and lesson-permission for students
          return (
            isCommonItem &&
            item.url !== '/student-management' &&
            item.url !== '/lesson-permission'
          );
        }

        return isCommonItem;
      })
      .forEach((item) => {
        commonMenuIds.add(item.id);

        // Add parent IDs
        let parent = item.parent;
        while (parent) {
          commonMenuIds.add(parent.id);
          parent = parent.parent;
        }
      });

    return rootItems
      .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
      .map((item) => this.convertToDto(item, parentChildMap, commonMenuIds))
      .filter((item): item is MenuItemDto => item !== null);
  }

  async getMenuItemsByType(
    menuType: string,
    websiteId?: number,
  ): Promise<MenuItemDto[]> {
    // Build query for menu items
    let query = this.menuItemRepository
      .createQueryBuilder('menuItem')
      .leftJoinAndSelect('menuItem.children', 'children')
      .leftJoinAndSelect('menuItem.parent', 'parent')
      .leftJoinAndSelect('menuItem.roles', 'roles')
      .where('menuItem.menuType = :menuType', { menuType });

    if (websiteId) {
      query = query.andWhere('menuItem.websiteId = :websiteId', { websiteId });
    }

    // Get all menu items with their children
    const allMenuItems = await query.getMany();

    // Build menu hierarchy
    const parentChildMap = new Map<number, MenuItem[]>();
    const rootItems: MenuItem[] = [];
    const itemMap = new Map<number, MenuItem>();

    // Create a map of all items and group by parent
    for (const item of allMenuItems) {
      itemMap.set(item.id, item);
      if (!item.parentId) {
        rootItems.push(item);
      } else {
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
      .filter((item): item is MenuItemDto => item !== null);
  }

  async getMenuItemById(id: number): Promise<MenuItemDto> {
    const menuItem = await this.menuItemRepository.findOne({
      where: { id },
      relations: ['children', 'parent'],
    });

    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }

    return this.convertToSimpleDto(menuItem);
  }

  async getMenuItemsByWebsite(
    websiteId: number,
    menuType?: string,
  ): Promise<MenuItemDto[]> {
    // Build query for menu items
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

    // Build menu hierarchy
    const parentChildMap = new Map<number, MenuItem[]>();
    const itemMap = new Map<number, MenuItem>();

    // Create a map of all items and group by parent
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
      .filter((item): item is MenuItemDto => item !== null);
  }

  async updateUserMenuPermissions(
    permissionDto: UserMenuPermissionDto,
  ): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: permissionDto.userId },
    });

    if (!user) {
      throw new NotFoundException(
        `User with ID ${permissionDto.userId} not found`,
      );
    }

    // Delete existing permissions
    await this.userMenuPermissionRepository.delete({
      userId: permissionDto.userId,
    });

    // For ADMIN, give all menu permissions if none specified
    if (
      user.role?.nameEn === 'ADMIN' &&
      (!permissionDto.menuIds || permissionDto.menuIds.length === 0)
    ) {
      const allMenuItems = await this.menuItemRepository.find();
      permissionDto.menuIds = allMenuItems.map((item) => item.id);
    }

    // Add new permissions
    const newPermissions = await Promise.all(
      permissionDto.menuIds.map(async (menuId) => {
        const menuItem = await this.menuItemRepository.findOne({
          where: { id: menuId },
        });

        if (!menuItem) {
          throw new NotFoundException(`Menu item with ID ${menuId} not found`);
        }

        const permission = new UserMenuPermission();
        permission.userId = user.id;
        permission.user = user;
        permission.menuId = menuItem.id;
        permission.menuItem = menuItem;
        return permission;
      }),
    );

    await this.userMenuPermissionRepository.save(newPermissions);
  }

  async getUserMenuPermissions(userId: number): Promise<number[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if (user.role?.nameEn === 'ADMIN') {
      // Admin has access to all menu items
      const allMenuItems = await this.menuItemRepository.find();
      return allMenuItems.map((item) => item.id);
    }

    const permissions = await this.userMenuPermissionRepository.find({
      where: { userId },
      relations: ['menuItem'],
    });

    return permissions.map((permission) => permission.menuId);
  }

  private convertToDto(
    menuItem: MenuItem,
    parentChildMap: Map<number, MenuItem[]>,
    permittedMenuIds?: Set<number>,
  ): MenuItemDto | null {
    // If permittedMenuIds is provided and this item is not in the set, return null
    if (permittedMenuIds && !permittedMenuIds.has(menuItem.id)) {
      return null;
    }

    const dto = new MenuItemDto();
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

    // Process children if any
    if (parentChildMap.has(menuItem.id)) {
      const children = parentChildMap.get(menuItem.id);
      if (children) {
        dto.children = children
          .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
          .map((child) =>
            this.convertToDto(child, parentChildMap, permittedMenuIds),
          )
          .filter((child): child is MenuItemDto => child !== null);

        // If this item has no visible children and is not directly permitted, return null
        if (
          dto.children.length === 0 &&
          permittedMenuIds &&
          !permittedMenuIds.has(menuItem.id)
        ) {
          return null;
        }
      } else {
        dto.children = [];
      }
    } else {
      dto.children = [];
    }

    return dto;
  }

  private convertToSimpleDto(menuItem: MenuItem): MenuItemDto {
    const dto = new MenuItemDto();
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
    } else {
      dto.children = [];
    }

    return dto;
  }
}
