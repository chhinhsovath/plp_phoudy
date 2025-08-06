import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class AssignRolePermissionDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  roleId: number;
}
