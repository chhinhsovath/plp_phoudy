import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  IsNumber,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GradeLevelType } from '../../../entities/class.entity';

export class CreateClassDto {
  @ApiProperty({ description: 'The name of the class' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The grade level',
    enum: GradeLevelType,
    example: GradeLevelType.GRADE_1,
  })
  @IsNotEmpty()
  @IsEnum(GradeLevelType)
  gradeLevel: GradeLevelType;

  @ApiProperty({ description: 'The section (e.g., A, B, C)', required: false })
  @IsOptional()
  @IsString()
  section?: string;

  @ApiProperty({ description: 'The school ID' })
  @IsNotEmpty()
  @IsNumber()
  schoolId: number;

  @ApiProperty({ description: 'The teacher ID' })
  @IsNotEmpty()
  @IsNumber()
  teacherId: number;

  @ApiProperty({ description: 'The academic year (e.g., 2024-2025)' })
  @IsNotEmpty()
  @IsString()
  academicYear: string;

  @ApiProperty({
    description: 'Maximum number of students',
    minimum: 1,
    default: 200,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  maxStudents?: number;
}
