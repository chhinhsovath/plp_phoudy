import { ApiProperty } from '@nestjs/swagger';
import { GradeLevelType } from '../../../entities/class.entity';
import { ExaminationType } from '../../../entities/examination-category.entity';

export class ExamDto {
  @ApiProperty({ description: 'Exam ID' })
  id: number;

  @ApiProperty({ description: 'Title of exam' })
  title: string;

  @ApiProperty({ description: 'Time spent on exam', required: false })
  timeSpent?: number;

  @ApiProperty({ description: 'Time limit in minutes' })
  timeLimit: number;

  @ApiProperty({ description: 'Average point', required: false })
  averagePoint?: number;

  @ApiProperty({ description: 'Passing score' })
  passingScore: number;

  @ApiProperty({ description: 'Number of questions per batch', required: false })
  questionsPerBatch?: string | null;

  @ApiProperty({ description: 'Examination category ID' })
  examinationCategoryId: number;

  @ApiProperty({ description: 'Examination category title', required: false })
  examinationCategoryTitle?: string;

  @ApiProperty({ description: 'Subject ID', required: false })
  subjectId?: number;

  @ApiProperty({ description: 'Subject name in English', required: false })
  subjectNameEn?: string;

  @ApiProperty({ description: 'Subject name in Khmer', required: false })
  subjectNameKh?: string;

  @ApiProperty({
    description: 'Grade level',
    enum: GradeLevelType,
    required: false,
  })
  grade?: GradeLevelType;

  @ApiProperty({
    description: 'Examination type',
    enum: ExaminationType,
    required: false,
  })
  type?: ExaminationType;

  @ApiProperty({ description: 'Creation date' })
  createdAt: Date;
}
