import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionExplanationDto {
  @ApiProperty({
    description: 'The explanation text for the question',
    example: 'This is the detailed explanation for why this answer is correct.',
  })
  @IsString()
  @IsNotEmpty()
  explanation: string;
}

export class QuestionExplanationResponseDto {
  @ApiProperty({ description: 'Question ID', example: 264 })
  questionId: number;

  @ApiProperty({
    description: 'Explanation text',
    example: 'This is the detailed explanation for why this answer is correct.',
  })
  explanation: string;

  @ApiProperty({
    description: 'Creation date',
    example: '2025-07-22T10:30:00Z',
  })
  createdAt: Date;
}
