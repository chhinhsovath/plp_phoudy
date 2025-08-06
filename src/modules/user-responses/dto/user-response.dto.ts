import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ description: 'Unique identifier', example: 1 })
  id: number;

  @ApiProperty({ description: 'User ID', example: 1 })
  userId: number;

  @ApiProperty({ description: 'Question ID', example: 1 })
  questionId: number;

  @ApiProperty({
    description: "User's answer text",
    required: false,
    example: 'Paris',
  })
  userAnswer?: string;

  @ApiProperty({
    description: "Path to user's answer file",
    required: false,
    example: 'uploads/answer123.jpg',
  })
  userAnswerFile?: string;

  @ApiProperty({ description: 'Whether the answer is correct', example: true })
  isCorrect: boolean;

  @ApiProperty({ description: 'Time spent answering in seconds', example: 45 })
  timeSpent: number;

  @ApiProperty({ description: 'Score impact of this response', example: 10 })
  scoreImpact: number;

  @ApiProperty({ description: 'Current streak count', example: 3 })
  streakCount: number;

  @ApiProperty({ description: 'Number of hints used', example: 1 })
  hintsUsed: number;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2023-05-15T09:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2023-05-15T09:00:00Z',
  })
  updatedAt: Date;
}

export class CreateUserResponseDto {
  @ApiProperty({ description: 'User ID', example: 1 })
  userId: number;

  @ApiProperty({ description: 'Question ID', example: 1 })
  questionId: number;

  @ApiProperty({
    description: "User's answer text",
    required: false,
    example: 'Paris',
  })
  userAnswer?: string;

  @ApiProperty({
    description: "Path to user's answer file",
    required: false,
    example: 'uploads/answer123.jpg',
  })
  userAnswerFile?: string;

  @ApiProperty({ description: 'Whether the answer is correct', example: true })
  isCorrect: boolean;

  @ApiProperty({ description: 'Time spent answering in seconds', example: 45 })
  timeSpent: number;

  @ApiProperty({ description: 'Score impact of this response', example: 10 })
  scoreImpact: number;

  @ApiProperty({ description: 'Current streak count', example: 3 })
  streakCount: number;

  @ApiProperty({ description: 'Number of hints used', example: 1 })
  hintsUsed: number;
}

export class UpdateUserResponseDto extends CreateUserResponseDto {}

export class BulkDeleteDto {
  @ApiProperty({
    description: 'Array of user response IDs to delete',
    example: [1, 2, 3],
  })
  ids: number[];
}
