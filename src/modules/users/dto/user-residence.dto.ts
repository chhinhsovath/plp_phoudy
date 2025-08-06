import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UserResidenceDto {
  @ApiProperty({ example: 1, required: false, description: 'Province ID' })
  @IsOptional()
  @IsNumber()
  provinceId?: number;

  @ApiProperty({ example: 1, required: false, description: 'District ID' })
  @IsOptional()
  @IsNumber()
  districtId?: number;

  @ApiProperty({ example: 1, required: false, description: 'Commune ID' })
  @IsOptional()
  @IsNumber()
  communeId?: number;

  @ApiProperty({ example: 1, required: false, description: 'Village ID' })
  @IsOptional()
  @IsNumber()
  villageId?: number;

  @ApiProperty({
    example: '123 Main Street, Phnom Penh, Cambodia',
    required: false,
    description: 'Full address text',
  })
  @IsOptional()
  @IsString()
  fullAddress?: string;
}
