import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty({ description: 'Question ID' })
  @IsNotEmpty()
  @IsInt()
  questionId: number;

  @ApiProperty({ description: 'Answer text', required: false })
  @IsOptional()
  @IsString()
  answerText?: string;

  @ApiProperty({ description: 'Answer file (image file)', required: false })
  @IsOptional()
  @IsString()
  answerFile?: string;

  @ApiProperty({ description: 'Whether the answer is correct' })
  @IsBoolean()
  isCorrect: boolean;

  @ApiProperty({
    description: 'Match key for matching questions',
    required: false,
  })
  @IsOptional()
  @IsString()
  matchKey?: string;

  @ApiProperty({
    description: 'Match value for matching questions',
    required: false,
  })
  @IsOptional()
  @IsString()
  matchValue?: string;

  @ApiProperty({ description: 'Order index for sorting' })
  @IsInt()
  orderIndex: number;

  @ApiProperty({ description: 'Display order for UI' })
  @IsInt()
  displayOrder: number;

  @ApiProperty({
    description:
      'Additional metadata as JSON (excluding explanations - use /questions/:id/explanation endpoint for explanations)',
    required: false,
    example: { optionLetter: 'A', category: 'geometry' },
  })
  @IsOptional()
  metadata?: Record<string, any>;
}
