import { ApiProperty } from '@nestjs/swagger';

class UserDto {
  @ApiProperty({ example: 'soksocheta' })
  username: string;

  @ApiProperty({ example: 'សុខ' })
  first_name: string;

  @ApiProperty({ example: 'សុជាតា' })
  last_name: string;
}

class ScoreDto {
  @ApiProperty({ example: '2024-03-20T08:00:00Z' })
  date: string;

  @ApiProperty({ example: 85 })
  value: number;

  @ApiProperty({ example: 'MATHEMATICS' })
  subject: string;

  @ApiProperty({ example: 'ថ្នាក់ទី១' })
  grade: string;
}

class ProblemPointDto {
  @ApiProperty({ example: 'មេរៀនទី១' })
  lesson: string;
}

export class StudentDto {
  @ApiProperty({ example: 1 })
  studentId: number;

  @ApiProperty({ type: UserDto })
  user: UserDto;

  @ApiProperty({ type: [ScoreDto] })
  scores: ScoreDto[];

  @ApiProperty({ type: [ProblemPointDto] })
  problemPoints: ProblemPointDto[];

  @ApiProperty({ example: 85.5 })
  averageScore: number;

  @ApiProperty({ example: 3600 })
  timeSpent: number;
}
