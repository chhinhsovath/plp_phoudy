import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ExaminationType } from '../../../entities/examination-category.entity';
import { GradeLevelType } from '../../../entities/class.entity';

export class CreateExaminationCategoryDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsNumber()
  subjectId?: number;

  @IsOptional()
  @IsNumber()
  subSubjectId?: number;

  @IsOptional()
  @IsEnum(GradeLevelType)
  grade?: GradeLevelType;

  @IsEnum(ExaminationType)
  type: ExaminationType;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  certificateFile?: string;
}
