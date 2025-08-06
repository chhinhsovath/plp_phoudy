import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateSubjectGradeDto {
  @ApiProperty({ description: 'Subject ID' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  subject_id: number;

  @ApiProperty({ description: 'Grade level' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  grade_level: number;
}
