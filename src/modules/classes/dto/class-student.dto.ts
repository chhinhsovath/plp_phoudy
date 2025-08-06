import { ApiProperty } from '@nestjs/swagger';

export class ClassStudentDto {
  @ApiProperty({ description: 'Class ID', example: 1 })
  class_id: number;

  @ApiProperty({ description: 'Class grade level', example: '1' })
  class_grade_level: string;

  @ApiProperty({ description: 'Student ID', example: 1 })
  student_id: number;

  @ApiProperty({ description: 'User ID', example: 9 })
  user_id: number;

  @ApiProperty({ description: 'Username', example: 'student1' })
  username: string;

  @ApiProperty({ description: 'First name', example: 'លឹម' })
  first_name: string;

  @ApiProperty({ description: 'Last name', example: 'សុខខេង' })
  last_name: string;
}
