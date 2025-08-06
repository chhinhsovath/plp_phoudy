import { PartialType } from '@nestjs/swagger';
import { CreateSubjectGradeDto } from './create-subject-grade.dto';

export class UpdateSubjectGradeDto extends PartialType(CreateSubjectGradeDto) {}
