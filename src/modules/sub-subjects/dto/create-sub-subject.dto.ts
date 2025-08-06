import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateSubSubjectDto {
  @ApiProperty({ description: 'Subject ID', required: false })
  @IsOptional()
  @IsNumber()
  subjectId?: number;

  @ApiProperty({ description: 'Sub subject name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Sub subject name in Khmer' })
  @IsNotEmpty()
  @IsString()
  khmerName: string;

  @ApiProperty({ description: 'Sub subject description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Sub subject status',
    required: false,
    default: 'ACTIVE',
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ description: 'Sub subject path' })
  @IsNotEmpty()
  @IsString()
  path: string;
}
