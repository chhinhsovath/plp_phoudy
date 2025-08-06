import { ApiProperty } from '@nestjs/swagger';

export class MenuItemDto {
  @ApiProperty({ description: 'Menu item ID' })
  id: number;

  @ApiProperty({ description: 'Menu item name' })
  name: string;

  @ApiProperty({ description: 'Menu item URL' })
  url: string;

  @ApiProperty({ description: 'Menu item icon', required: false })
  icon?: string;

  @ApiProperty({ description: 'Parent menu item ID', required: false })
  parentId?: number;

  @ApiProperty({ description: 'Menu item order index', required: false })
  orderIndex?: number;

  @ApiProperty({
    description: 'Roles that can access this menu item',
    type: [String],
    isArray: true,
  })
  role: string[];

  @ApiProperty({
    description: 'Type of menu (NAVBAR, SIDEBAR, etc)',
    default: 'NAVBAR',
  })
  menuType: string;

  @ApiProperty({ description: 'Website ID' })
  websiteId: number;

  @ApiProperty({ description: 'Is this menu item active' })
  isActive: boolean;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;

  @ApiProperty({
    description: 'Child menu items',
    type: [MenuItemDto],
    required: false,
  })
  children?: MenuItemDto[];
}
