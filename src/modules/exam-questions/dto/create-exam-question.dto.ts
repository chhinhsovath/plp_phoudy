import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateExamQuestionDto {
  @ApiProperty({ description: 'Exam ID' })
  @IsNotEmpty()
  @IsNumber()
  examId: number;

  @ApiProperty({ description: 'Question ID' })
  @IsNotEmpty()
  @IsNumber()
  questionId: number;

  @ApiProperty({ description: 'Points for this question' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  points: number;
}
