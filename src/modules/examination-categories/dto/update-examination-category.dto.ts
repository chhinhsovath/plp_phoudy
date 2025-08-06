import { PartialType } from '@nestjs/mapped-types';
import { CreateExaminationCategoryDto } from './create-examination-category.dto';

export class UpdateExaminationCategoryDto extends PartialType(
  CreateExaminationCategoryDto,
) {}
