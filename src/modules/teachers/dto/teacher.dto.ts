import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../../../entities/enums/status.enum';

export class TeacherDto {
  @ApiProperty({ example: 1 })
  teacherId: number;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 1 })
  schoolId: number;

  @ApiProperty({ example: '2023-01-01', required: false })
  hire_date?: Date;

  @ApiProperty({ example: false })
  isDirector: boolean;

  @ApiProperty({ enum: Status, example: Status.ACTIVE })
  status: Status;

  @ApiProperty({
    example: {
      username: 'teacher123',
      first_name: 'John',
      last_name: 'Doe',
    },
  })
  user: {
    username: string;
    first_name: string;
    last_name: string;
  };

  @ApiProperty({
    example: {
      name: 'ABC School',
    },
  })
  school: {
    name: string;
  };
}
