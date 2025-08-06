import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ description: 'Book title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Book file path' })
  @IsNotEmpty()
  @IsString()
  bookFile: string;

  @ApiProperty({ description: 'Grade level' })
  @IsNotEmpty()
  @IsInt()
  gradeLevel: number;

  @ApiProperty({ description: 'Subject ID' })
  @IsNotEmpty()
  @IsInt()
  subjectId: number;

  @ApiProperty({ description: 'Book category ID' })
  @IsNotEmpty()
  @IsInt()
  bookCategoryId: number;

  @ApiProperty({ description: 'Status', default: 'ACTIVE' })
  @IsOptional()
  @IsString()
  status?: string;
}
