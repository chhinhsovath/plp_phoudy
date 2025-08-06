import { ApiProperty } from '@nestjs/swagger';

export class MenuItemResponseDto {
  @ApiProperty({ example: 1, description: 'Menu item ID' })
  id: number;

  @ApiProperty({ example: 'Dashboard', description: 'Menu item name' })
  name: string;

  @ApiProperty({ example: '/dashboard', description: 'Menu item URL' })
  url: string;

  @ApiProperty({
    example: 'dashboard',
    description: 'Menu item icon',
    required: false,
  })
  icon?: string;

  @ApiProperty({
    example: 1,
    description: 'Parent menu item ID',
    required: false,
  })
  parentId?: number;

  @ApiProperty({
    example: 1,
    description: 'Order index for sorting',
    required: false,
  })
  orderIndex?: number;

  @ApiProperty({
    example: 'NAVBAR',
    description: 'Menu type (NAVBAR, SIDEBAR, etc)',
  })
  menuType: string;

  @ApiProperty({ example: 1, description: 'Website ID' })
  websiteId: number;

  @ApiProperty({ example: true, description: 'Is menu item active' })
  isActive: boolean;

  @ApiProperty({
    example: ['ADMIN', 'TEACHER'],
    description: 'Role names that can access this menu item',
    type: [String],
  })
  roles: string[];

  @ApiProperty({
    example: '2024-01-15T10:00:00.000Z',
    description: 'Creation timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:00:00.000Z',
    description: 'Last update timestamp',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Child menu items',
    type: [MenuItemResponseDto],
    required: false,
  })
  children?: MenuItemResponseDto[];
}
