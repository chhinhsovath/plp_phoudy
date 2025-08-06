import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class SchoolPlaceDto {
  @ApiProperty({ example: 1, description: 'Province ID' })
  @IsOptional()
  @IsNumber()
  provinceId?: number;

  @ApiProperty({ example: 1, description: 'District ID' })
  @IsOptional()
  @IsNumber()
  districtId?: number;

  @ApiProperty({ example: 1, description: 'Commune ID' })
  @IsOptional()
  @IsNumber()
  communeId?: number;

  @ApiProperty({ example: 1, description: 'Village ID' })
  @IsOptional()
  @IsNumber()
  villageId?: number;
}
