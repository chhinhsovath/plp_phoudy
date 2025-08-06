import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({ description: 'Subject ID' })
  @IsInt()
  subjectId: number;

  @ApiProperty({ description: 'Lesson title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Lesson description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Grade level' })
  @IsInt()
  gradeLevel: number;

  @ApiProperty({ description: 'Lesson number' })
  @IsInt()
  lessonNumber: number;

  @ApiProperty({ description: 'Is hidden', default: false })
  @IsOptional()
  @IsBoolean()
  isHidden?: boolean;

  @ApiProperty({
    description: 'Status',
    default: 'ACTIVE',
    enum: ['ACTIVE', 'INACTIVE'],
  })
  @IsOptional()
  @IsString()
  status?: string;
}
