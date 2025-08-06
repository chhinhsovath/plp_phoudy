import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateWebsiteDto {
  @ApiProperty({ example: 'PLP Backend' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'backend.plp.com', required: false })
  @IsOptional()
  @IsString()
  domain?: string;

  @ApiProperty({ example: 'Main backend application for PLP', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
