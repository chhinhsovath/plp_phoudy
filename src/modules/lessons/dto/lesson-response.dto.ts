import { ApiProperty } from '@nestjs/swagger';

class SubjectDto {
  @ApiProperty({ example: 'MATHEMATICS' })
  name: string;

  @ApiProperty({ example: 'គណិតវិទ្យា' })
  khmer_name: string;
}

export class LessonResponseDto {
  @ApiProperty({ example: 101 })
  id: number;

  @ApiProperty({ example: 'ដំណើរផ្សងព្រេងក្នុងព្រៃ' })
  title: string;

  @ApiProperty({ example: 1 })
  grade_level: number;

  @ApiProperty({ example: 105 })
  lesson_number: number;

  @ApiProperty({ type: SubjectDto })
  subject: SubjectDto;

  @ApiProperty({ example: 'ACTIVE' })
  status: string;
}
