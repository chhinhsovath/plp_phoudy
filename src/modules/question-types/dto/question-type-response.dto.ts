import { ApiProperty } from '@nestjs/swagger';

export class QuestionTypeResponseDto {
  @ApiProperty({ example: 1, description: 'Question type ID' })
  id: number;

  @ApiProperty({ example: 'multiple_choice', description: 'Question type key' })
  typeKey: string;

  @ApiProperty({
    example: 'Multiple Choice',
    description: 'Question type label',
  })
  label: string;

  @ApiProperty({
    example: true,
    description: 'Whether the question type is active',
  })
  isActive: boolean;

  @ApiProperty({
    example: '2024-12-12T10:00:00.000Z',
    description: 'Creation timestamp',
  })
  createdAt: Date;
}
