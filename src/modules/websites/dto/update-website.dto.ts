import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateWebsiteDto {
  @ApiProperty({ example: 'PLP Backend Updated', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'backend-updated.plp.com', required: false })
  @IsOptional()
  @IsString()
  domain?: string;

  @ApiProperty({ example: 'Updated description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
