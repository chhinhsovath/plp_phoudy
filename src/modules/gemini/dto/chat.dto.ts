import { IsBoolean, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChatDTO {
  @ApiProperty({
    description: 'The message to send to Gemini',
    example: 'How do I solve 5 + 3?',
  })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({
    description: 'The title of the teacher (used in the prompt)',
    example: 'គ្រូ',
  })
  @IsNotEmpty()
  @IsString()
  teacherTitle: string;

  @ApiProperty({
    description: 'Whether this is the first interaction in the conversation',
    example: true,
  })
  @IsBoolean()
  isFirstInteraction: boolean;

  @ApiProperty({
    description: 'Optional student data for educational analysis',
    example: { grades: { math: 8, khmer: 7, science: 6 } },
    required: false,
  })
  @IsOptional()
  studentData?: unknown;

  @ApiProperty({
    description: 'Optional class data for educational analysis',
    example: { totalStudents: 25, averageGrade: 7.2 },
    required: false,
  })
  @IsOptional()
  classData?: unknown;

  @ApiProperty({
    description: 'Teacher user ID for fetching real educational data',
    example: 1,
    required: false,
  })
  @IsOptional()
  teacherUserId?: number;

  @ApiProperty({
    description: 'Class ID for fetching real student data directly',
    example: 1,
    required: false,
  })
  @IsOptional()
  classId?: number;
}
