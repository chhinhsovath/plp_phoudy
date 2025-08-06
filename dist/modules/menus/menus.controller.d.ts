import { MenusService } from './menus.service';
import { MenuItemDto } from './dto/menu-item.dto';
import { UserMenuPermissionDto } from './dto/user-menu-permission.dto';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { MenuItemResponseDto } from './dto/menu-item-response.dto';
export declare class MenusController {
    private readonly menusService;
    constructor(menusService: MenusService);
    createMenuItem(createMenuItemDto: CreateMenuItemDto): Promise<MenuItemResponseDto>;
    findAllMenuItems(page?: number, limit?: number): Promise<any>;
    getMyMenu(userId: number, websiteId?: number, menuType?: string): Promise<MenuItemDto[]>;
    getMenuByRole(role: string, websiteId?: number, menuType?: string): Promise<MenuItemDto[]>;
    getCommonMenuItems(role: string, websiteId?: number, menuType?: string): Promise<MenuItemDto[]>;
    getAllMenuItems(websiteId?: number, menuType?: string): Promise<MenuItemDto[]>;
    getPublicMenu(websiteId?: number, menuType?: string): Promise<MenuItemDto[]>;
    getMenuItemsByType(menuType: string, websiteId?: number): Promise<MenuItemDto[]>;
    getMenuItemById(id: number): Promise<MenuItemResponseDto>;
    updateMenuItem(id: number, updateMenuItemDto: UpdateMenuItemDto): Promise<MenuItemResponseDto>;
    removeMenuItem(id: number): Promise<{
        message: string;
    }>;
    updateUserMenuPermissions(permissionDto: UserMenuPermissionDto): Promise<void>;
    getUserMenuPermissions(userId: number): Promise<number[]>;
    getMenuItemsByWebsite(websiteId: number, menuType?: string): Promise<MenuItemDto[]>;
}
