import { ApiProperty } from '@nestjs/swagger';

export class PerformanceHistoryDTO {
  @ApiProperty({ description: 'Date of responses', example: '2024-05-18' })
  date: string;

  @ApiProperty({ description: 'Average score value', example: 85.5 })
  value: number;

  @ApiProperty({ description: 'Number of correct answers', example: 12 })
  correct: number;

  @ApiProperty({ description: 'Number of incorrect answers', example: 5 })
  incorrect: number;
}

export class LessonInfoDTO {
  @ApiProperty({ description: 'Lesson ID', example: '123' })
  id: string;

  @ApiProperty({ description: 'Lesson title', example: 'មេរៀនទី១' })
  title: string;

  @ApiProperty({
    name: 'lesson_number',
    description: 'Lesson number',
    example: 1,
  })
  lesson_number: number;
}

export class QuestionStatisticsDTO {
  @ApiProperty({ description: 'Question ID', example: '123' })
  id: string;

  @ApiProperty({ description: 'Question text', example: 'រកចម្លើយ 5 + 7 = ?' })
  question: string;

  @ApiProperty({ description: 'Average score of all responses', example: 85.5 })
  averageScore: number;

  @ApiProperty({
    description: 'Number of students who attempted this question',
    example: 25,
  })
  studentCompleted: number;

  @ApiProperty({ type: () => LessonInfoDTO, description: 'Lesson information' })
  lesson: LessonInfoDTO;

  @ApiProperty({ description: 'Subject name', example: 'MATHEMATICS' })
  subject: string;

  @ApiProperty({ description: 'Grade level', example: 'ថ្នាក់ទី១' })
  grade: string;

  @ApiProperty({
    type: [PerformanceHistoryDTO],
    description: 'History of student performances',
  })
  performance: PerformanceHistoryDTO[];
}
