import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsArray,
  MaxLength,
} from 'class-validator';

export class CreateMenuItemDto {
  @ApiProperty({
    example: 'Dashboard',
    description: 'Menu item name',
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    example: '/dashboard',
    description: 'Menu item URL',
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  url: string;

  @ApiProperty({
    example: 'dashboard',
    description: 'Menu item icon',
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  icon?: string;

  @ApiProperty({
    example: 1,
    description: 'Parent menu item ID',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  parentId?: number;

  @ApiProperty({
    example: 1,
    description: 'Order index for sorting',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  orderIndex?: number;

  @ApiProperty({
    example: 'NAVBAR',
    description: 'Menu type (NAVBAR, SIDEBAR, etc)',
    maxLength: 50,
    default: 'NAVBAR',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  menuType?: string;

  @ApiProperty({
    example: 1,
    description: 'Website ID',
  })
  @IsNotEmpty()
  @IsNumber()
  websiteId: number;

  @ApiProperty({
    example: true,
    description: 'Is menu item active',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    example: [1, 2],
    description: 'Role IDs that can access this menu item',
    type: [Number],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  roleIds?: number[];
}
