import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { QuestionUsage } from '../../../entities/question.entity';

export class CreateQuestionDto {
  @ApiProperty({ description: 'Introduction text', required: false })
  @IsOptional()
  @IsString()
  introduction?: string;

  @ApiProperty({ description: 'Question text (HTML content)', required: false })
  @IsOptional()
  @IsString()
  questionText?: string;

  @ApiProperty({
    description: 'Difficulty level (ស្រួល/មធ្យម/ពិបាក)',
    required: false,
  })
  @IsOptional()
  @IsString()
  difficultyLevel?: string;

  @ApiProperty({ description: 'Lesson activities ID', required: false })
  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
  @IsInt()
  lessonActivitiesId?: number;

  @ApiProperty({ description: 'Question image URL or file', required: false })
  @IsOptional()
  @IsString()
  questionImage?: string;

  @ApiProperty({ description: 'Question audio URL or file', required: false })
  @IsOptional()
  @IsString()
  questionAudio?: string;

  @ApiProperty({
    description: 'Status',
    default: 'ACTIVE',
    enum: ['ACTIVE', 'INACTIVE'],
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ description: 'Question type ID' })
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  questionTypeId: number;

  @ApiProperty({
    description: 'Usage type',
    enum: QuestionUsage,
    default: QuestionUsage.LEARN,
    required: false,
  })
  @IsOptional()
  @IsEnum(QuestionUsage)
  usageType?: QuestionUsage;

  @ApiProperty({
    description: 'Whether to randomize answer order',
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  randomAnswers?: boolean;
}
