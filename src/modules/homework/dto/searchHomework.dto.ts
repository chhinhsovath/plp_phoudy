import {
  IsOptional,
  IsString,
  IsNumber,
  IsIn,
  IsBooleanString,
  IsInt,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SearchHomeworkDto {
  @IsOptional()
  @IsString()
  query?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  teacherId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  classId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  subjectId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  lessonId?: number;

  @IsOptional()
  @IsIn(['DRAFT', 'ACTIVE', 'CLOSED'])
  status?: 'DRAFT' | 'ACTIVE' | 'CLOSED';

  @IsOptional()
  @IsBooleanString() // 'true' or 'false' as string
  overdue?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  studentId?: number;

  @IsOptional()
  @IsBooleanString()
  hasSubmission?: string;

  // Date range filters
  @IsOptional()
  @IsDateString()
  createdFrom?: string; // ISO date string

  @IsOptional()
  @IsDateString()
  createdTo?: string; // ISO date string

  @IsOptional()
  @IsDateString()
  dueFrom?: string; // ISO date string

  @IsOptional()
  @IsDateString()
  dueTo?: string; // ISO date string

  @IsOptional()
  @IsDateString()
  submittedFrom?: string; // ISO date string

  @IsOptional()
  @IsDateString()
  submittedTo?: string; // ISO date string
}
