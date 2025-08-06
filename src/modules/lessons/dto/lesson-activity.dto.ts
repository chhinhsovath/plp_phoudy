import { ApiProperty } from '@nestjs/swagger';

import { Status } from '../../../entities/enums/status.enum';

export class LessonActivityDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  lessonId: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  orderIndex: number;

  @ApiProperty()
  status: Status;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
