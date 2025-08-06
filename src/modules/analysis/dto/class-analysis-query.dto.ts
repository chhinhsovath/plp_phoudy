import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class ClassAnalysisQueryDto {
  @ApiProperty({
    description: 'Class ID to filter by',
    required: true,
    example: 1,
  })
  @IsInt({ message: 'classId must be an integer' })
  @Type(() => Number)
  classId: number;

  @ApiProperty({
    description: 'Student ID to filter by (optional)',
    required: false,
    example: 1,
  })
  @IsOptional()
  @IsInt({ message: 'studentId must be an integer' })
  @Type(() => Number)
  studentId?: number;

  @ApiProperty({
    description: 'Grade level to filter by (optional)',
    required: false,
    example: '1',
  })
  @IsOptional()
  @IsString({ message: 'gradeLevel must be a string' })
  gradeLevel?: string;

  @ApiProperty({
    description: 'Subject ID to filter by (optional)',
    required: false,
    example: 15,
  })
  @IsOptional()
  @IsInt({ message: 'subjectId must be an integer' })
  @Type(() => Number)
  subjectId?: number;

  @ApiProperty({
    description: 'Lesson numbers to filter by (optional)',
    required: false,
    example: [1, 2, 3],
    type: [Number],
    isArray: true,
  })
  @IsOptional()
  @IsArray({ message: 'lessonNumbers must be an array' })
  @Type(() => Number)
  lessonNumbers?: number[];
}
