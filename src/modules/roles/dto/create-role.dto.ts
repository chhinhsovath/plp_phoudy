import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    example: 'ADMIN',
    description: 'Role name in English',
    maxLength: 50,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  nameEn: string;

  @ApiProperty({
    example: 'អ្នកគ្រប់គ្រង',
    description: 'Role name in Khmer',
    maxLength: 50,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  nameKh: string;

  @ApiProperty({
    example: 'Administrator with full system access',
    description: 'Role description',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
