import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';

export class UserPobDto {
  @ApiProperty({
    example: 1,
    required: false,
    description: 'Province ID for place of birth',
  })
  @IsOptional()
  @IsNumber()
  provinceId?: number;

  @ApiProperty({
    example: 1,
    required: false,
    description: 'District ID for place of birth',
  })
  @IsOptional()
  @IsNumber()
  districtId?: number;

  @ApiProperty({
    example: 1,
    required: false,
    description: 'Commune ID for place of birth',
  })
  @IsOptional()
  @IsNumber()
  communeId?: number;

  @ApiProperty({
    example: 1,
    required: false,
    description: 'Village ID for place of birth',
  })
  @IsOptional()
  @IsNumber()
  villageId?: number;
}
