import { ApiProperty } from '@nestjs/swagger';

export class QuestionResponseDto {
  @ApiProperty({ description: 'Question ID', example: 2 })
  question_id: number;

  @ApiProperty({ description: 'Question introduction', example: 'សូមរាប់:' })
  introduction: string;

  @ApiProperty({
    description: 'Question text',
    example: 'រាប់ចំនួនខ្មៅដៃនៅលើតុរបស់អ្នក។',
  })
  question_text: string;

  @ApiProperty({ description: 'Question difficulty level', example: 'EASY' })
  difficulty_level: string;

  @ApiProperty({ description: 'Question grade level', example: '1' })
  question_grade_level: string;

  @ApiProperty({ description: 'Lesson ID', example: '1' })
  lesson_id: string;

  @ApiProperty({ description: 'Lesson title', example: 'ការរាប់ដល់លេខ១០' })
  lesson_title: string;

  @ApiProperty({ description: 'Lesson number', example: 1 })
  lesson_number: number;

  @ApiProperty({ description: 'Lesson activities ID', example: 1 })
  lesson_activities_id: number;

  @ApiProperty({
    description: 'Activity title',
    example: 'ការរាប់វត្ថុជុំវិញខ្លួន',
  })
  activity_title: string;

  @ApiProperty({ description: 'Subject ID', example: 15 })
  subject_id: number;

  @ApiProperty({ description: 'Whether the answer is correct', example: true })
  is_correct: boolean;

  @ApiProperty({ description: 'Time spent answering in seconds', example: 5 })
  time_spent: number;

  @ApiProperty({ description: 'Current streak count', example: 1 })
  streak_count: number;
}

export class StudentInfoDto {
  @ApiProperty({ description: 'Student ID', example: 1 })
  student_id: number;

  @ApiProperty({ description: 'Student user ID', example: 9 })
  student_user_id: number;

  @ApiProperty({ description: 'Student username', example: 'student1' })
  student_username: string;

  @ApiProperty({ description: 'Student first name', example: 'លឹម' })
  student_first_name: string;

  @ApiProperty({ description: 'Student last name', example: 'សុខខេង' })
  student_last_name: string;

  @ApiProperty({
    description: 'Total average score (percentage of correct answers)',
    example: 100,
  })
  total_average_score: number;

  @ApiProperty({
    description: 'Total time spent answering questions in seconds',
    example: 14,
  })
  total_time_spent: number;

  @ApiProperty({
    description: 'Question responses',
    type: [QuestionResponseDto],
  })
  responses: QuestionResponseDto[];
}

export class ClassAnalysisResponseDto {
  @ApiProperty({ description: 'Class ID', example: 1 })
  class_id: number;

  @ApiProperty({ description: 'Class grade level', example: '1' })
  class_grade_level: string;

  @ApiProperty({ description: 'Teacher ID', example: 1 })
  teacher_id: number;

  @ApiProperty({ description: 'Teacher username', example: 'teacher1' })
  teacher_username: string;

  @ApiProperty({ description: 'Teacher first name', example: 'ហេង' })
  teacher_first_name: string;

  @ApiProperty({ description: 'Teacher last name', example: 'សុខា' })
  teacher_last_name: string;

  @ApiProperty({
    description: 'Grade level filter applied',
    example: '1',
    required: false,
  })
  grade_level?: string;

  @ApiProperty({
    description: 'Subject ID filter applied',
    example: 15,
    required: false,
  })
  subject_id?: number;

  @ApiProperty({
    description: 'Lesson numbers filter applied',
    type: [Number],
    example: [1, 2, 3],
    required: false,
  })
  lesson_numbers?: number[];

  @ApiProperty({ description: 'Students', type: [StudentInfoDto] })
  students: StudentInfoDto[];
}

// Keep the old DTO for backward compatibility during development
export class StudentHistoryDto {
  @ApiProperty({ description: 'Student ID', example: 1 })
  student_id: number;

  @ApiProperty({ description: 'Student user ID', example: 9 })
  student_user_id: number;

  @ApiProperty({ description: 'Student username', example: 'student1' })
  student_username: string;

  @ApiProperty({ description: 'Student first name', example: 'លឹម' })
  student_first_name: string;

  @ApiProperty({ description: 'Student last name', example: 'សុខខេង' })
  student_last_name: string;

  @ApiProperty({ description: 'Question ID', example: 2 })
  question_id: number;

  @ApiProperty({ description: 'Question introduction', example: 'សូមរាប់:' })
  introduction: string;

  @ApiProperty({
    description: 'Question text',
    example: 'រាប់ចំនួនខ្មៅដៃនៅលើតុរបស់អ្នក។',
  })
  question_text: string;

  @ApiProperty({ description: 'Question difficulty level', example: 'EASY' })
  difficulty_level: string;

  @ApiProperty({ description: 'Question grade level', example: '1' })
  question_grade_level: string;

  @ApiProperty({ description: 'Lesson ID', example: '1' })
  lesson_id: string;

  @ApiProperty({ description: 'Lesson title', example: 'ការរាប់ដល់លេខ១០' })
  lesson_title: string;

  @ApiProperty({ description: 'Lesson number', example: 1 })
  lesson_number: number;

  @ApiProperty({ description: 'Lesson activities ID', example: 1 })
  lesson_activities_id: number;

  @ApiProperty({
    description: 'Activity title',
    example: 'ការរាប់វត្ថុជុំវិញខ្លួន',
  })
  activity_title: string;

  @ApiProperty({ description: 'Subject ID', example: 15 })
  subject_id: number;

  @ApiProperty({ description: 'Whether the answer is correct', example: true })
  is_correct: boolean;

  @ApiProperty({ description: 'Time spent answering in seconds', example: 5 })
  time_spent: number;

  @ApiProperty({ description: 'Current streak count', example: 1 })
  streak_count: number;
}
