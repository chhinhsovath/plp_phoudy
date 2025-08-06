import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { MenusService } from './menus.service';
import { MenuItemDto } from './dto/menu-item.dto';
import { UserMenuPermissionDto } from './dto/user-menu-permission.dto';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { MenuItemResponseDto } from './dto/menu-item-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../../decorators/public.decorator';

@ApiTags('Menus')
@ApiBearerAuth()
@Controller('menu')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Create a new menu item' })
  @ApiResponse({
    status: 201,
    description: 'Menu item created successfully',
    type: MenuItemResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Parent menu item or role not found',
  })
  async createMenuItem(
    @Body() createMenuItemDto: CreateMenuItemDto,
  ): Promise<MenuItemResponseDto> {
    return await this.menusService.createMenuItem(createMenuItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all menu items with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({
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
  })
  async findAllMenuItems(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return await this.menusService.findAllMenuItems(page, limit);
  }

  @Get('my-menu')
  @ApiOperation({ summary: 'Get menu items for a specific user' })
  @ApiQuery({ name: 'userId', required: true, type: Number })
  @ApiQuery({ name: 'websiteId', required: false, type: Number })
  @ApiQuery({ name: 'menuType', required: false, type: String })
  async getMyMenu(
    @Query('userId', ParseIntPipe) userId: number,
    @Query('websiteId') websiteId?: number,
    @Query('menuType') menuType?: string,
  ): Promise<MenuItemDto[]> {
    return this.menusService.getMenuItemsByUserId(userId, websiteId, menuType);
  }

  @Get('role/:role')
  @ApiOperation({ summary: 'Get menu items by role' })
  @ApiQuery({ name: 'websiteId', required: false, type: Number })
  @ApiQuery({ name: 'menuType', required: false, type: String })
  async getMenuByRole(
    @Param('role') role: string,
    @Query('websiteId') websiteId?: number,
    @Query('menuType') menuType?: string,
  ): Promise<MenuItemDto[]> {
    return this.menusService.getMenuItemsByRole(
      role.toUpperCase(),
      websiteId,
      menuType,
    );
  }

  @Get('common/:role')
  @ApiOperation({ summary: 'Get common menu items for a role' })
  @ApiQuery({ name: 'websiteId', required: false, type: Number })
  @ApiQuery({ name: 'menuType', required: false, type: String })
  async getCommonMenuItems(
    @Param('role') role: string,
    @Query('websiteId') websiteId?: number,
    @Query('menuType') menuType?: string,
  ): Promise<MenuItemDto[]> {
    return this.menusService.getCommonMenuItems(
      role.toUpperCase(),
      websiteId,
      menuType,
    );
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all menu items' })
  @ApiQuery({ name: 'websiteId', required: false, type: Number })
  @ApiQuery({ name: 'menuType', required: false, type: String })
  async getAllMenuItems(
    @Query('websiteId') websiteId?: number,
    @Query('menuType') menuType?: string,
  ): Promise<MenuItemDto[]> {
    // Use admin's ID (1) to get all menu items since admin has access to everything
    return this.menusService.getMenuItemsByUserId(1, websiteId, menuType);
  }

  @Public()
  @Get('public')
  @ApiOperation({ summary: 'Get public menu items' })
  @ApiQuery({ name: 'websiteId', required: false, type: Number })
  @ApiQuery({ name: 'menuType', required: false, type: String })
  async getPublicMenu(
    @Query('websiteId') websiteId?: number,
    @Query('menuType') menuType?: string,
  ): Promise<MenuItemDto[]> {
    return this.menusService.getPublicMenuItems(websiteId, menuType);
  }

  @Get('type/:menuType')
  @ApiOperation({ summary: 'Get menu items by menu type' })
  @ApiQuery({ name: 'websiteId', required: false, type: Number })
  async getMenuItemsByType(
    @Param('menuType') menuType: string,
    @Query('websiteId') websiteId?: number,
  ): Promise<MenuItemDto[]> {
    return this.menusService.getMenuItemsByType(menuType, websiteId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get menu item by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Menu item ID' })
  @ApiResponse({
    status: 200,
    description: 'Menu item details',
    type: MenuItemResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Menu item not found',
  })
  async getMenuItemById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MenuItemResponseDto> {
    return this.menusService.findMenuItemById(id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update a menu item' })
  @ApiParam({ name: 'id', type: 'number', description: 'Menu item ID' })
  @ApiResponse({
    status: 200,
    description: 'Menu item updated successfully',
    type: MenuItemResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Menu item not found',
  })
  @ApiResponse({
    status: 409,
    description: 'Menu item cannot be its own parent',
  })
  async updateMenuItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
  ): Promise<MenuItemResponseDto> {
    return await this.menusService.updateMenuItem(id, updateMenuItemDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Delete a menu item' })
  @ApiParam({ name: 'id', type: 'number', description: 'Menu item ID' })
  @ApiResponse({
    status: 200,
    description: 'Menu item deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Menu item not found',
  })
  @ApiResponse({
    status: 409,
    description: 'Cannot delete menu item with child items',
  })
  async removeMenuItem(@Param('id', ParseIntPipe) id: number) {
    await this.menusService.removeMenuItem(id);
    return { message: 'Menu item deleted successfully' };
  }

  @Post('permissions')
  @ApiOperation({ summary: 'Update user menu permissions' })
  async updateUserMenuPermissions(
    @Body() permissionDto: UserMenuPermissionDto,
  ): Promise<void> {
    return this.menusService.updateUserMenuPermissions(permissionDto);
  }

  @Get('permissions/:userId')
  @ApiOperation({ summary: 'Get user menu permissions' })
  async getUserMenuPermissions(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<number[]> {
    return this.menusService.getUserMenuPermissions(userId);
  }

  @Get('website/:websiteId')
  @ApiOperation({ summary: 'Get menu items by website ID' })
  @ApiQuery({ name: 'menuType', required: false, type: String })
  async getMenuItemsByWebsite(
    @Param('websiteId', ParseIntPipe) websiteId: number,
    @Query('menuType') menuType?: string,
  ): Promise<MenuItemDto[]> {
    return this.menusService.getMenuItemsByWebsite(websiteId, menuType);
  }
}
