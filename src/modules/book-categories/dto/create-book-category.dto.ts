import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateBookCategoryDto {
  @ApiProperty({ description: 'Book category name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Book category description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Subject ID', required: false })
  @IsOptional()
  @IsNumber()
  subjectId?: number;

  @ApiProperty({ description: 'Grade Level', required: false })
  @IsOptional()
  @IsNumber()
  gradeLevel?: number;

  @ApiProperty({ description: 'Status', default: 'ACTIVE' })
  @IsOptional()
  @IsString()
  status?: string;
}
