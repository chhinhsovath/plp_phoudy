import { ApiProperty } from '@nestjs/swagger';
import { GradeLevelType } from '../../../entities/class.entity';
import { Status } from '../../../entities/enums/status.enum';

export class TeacherClassDto {
  @ApiProperty({ example: 1 })
  classId: number;

  @ApiProperty({ example: 'Grade 5A' })
  name: string;

  @ApiProperty({ enum: GradeLevelType, example: GradeLevelType.GRADE_5 })
  gradeLevel: GradeLevelType;

  @ApiProperty({ example: 'A', required: false })
  section?: string;

  @ApiProperty({ example: 1 })
  schoolId: number;

  @ApiProperty({ example: 1 })
  teacherId: number;

  @ApiProperty({ example: '2023-2024' })
  academicYear: string;

  @ApiProperty({ example: 30 })
  maxStudents: number;

  @ApiProperty({ enum: Status, example: Status.ACTIVE })
  status: Status;

  @ApiProperty({
    example: {
      name: 'ABC School',
    },
  })
  school: {
    name: string;
  };
}
