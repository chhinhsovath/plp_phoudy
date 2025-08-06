import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class UserMenuPermissionDto {
  @ApiProperty({ description: 'User ID' })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({ description: 'Menu item IDs', type: [Number] })
  @IsArray()
  menuIds: number[];
}
