import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsArray,
  IsObject,
  Min,
  Max,
} from 'class-validator';

export class CreateExamDto {
  @ApiProperty({ description: 'Title of exam' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Examination category ID' })
  @IsNotEmpty()
  @IsNumber()
  examinationCategoryId: number;

  @ApiProperty({ description: 'Time limit in minutes' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  timeLimit: number;

  @ApiProperty({ description: 'Passing score percentage (0-100)' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  passingScore: number;

  @ApiProperty({ description: 'Number of questions to be shown to students' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  responseCount: number;

  @ApiProperty({ 
    description: 'Number of questions per batch (1-10, 20, or "all")', 
    required: false,
    example: '5'
  })
  @IsOptional()
  @IsString()
  questionsPerBatch?: string | null;

  @ApiProperty({
    description: 'Array of lesson IDs included in the exam',
    type: [String],
    example: ['33', '34'],
  })
  @IsArray()
  @IsString({ each: true })
  selectedLessons: string[];

  @ApiProperty({
    description: 'Object mapping lesson IDs to arrays of activity IDs',
    example: { '33': ['151', '152'], '34': ['153'] },
  })
  @IsObject()
  selectedActivities: { [key: string]: string[] };

  @ApiProperty({
    description: 'Object mapping activity IDs to arrays of question IDs',
    example: { '151': ['297', '298'], '152': ['299'] },
  })
  @IsObject()
  selectedQuestions: { [key: string]: string[] };

  @ApiProperty({
    description:
      'Object mapping question instances to their point values (must total 100)',
    example: { '151-297': 50, '151-298': 30, '152-299': 20 },
  })
  @IsObject()
  questionPoints: { [key: string]: number };

  @ApiProperty({ description: 'Time spent on exam', required: false })
  @IsOptional()
  @IsNumber()
  timeSpent?: number;

  @ApiProperty({ description: 'Average point', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  averagePoint?: number;

  @ApiProperty({
    description: 'Exam status',
    default: 'ACTIVE',
    required: false,
  })
  @IsOptional()
  @IsString()
  status?: string;
}
