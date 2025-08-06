import { ApiProperty } from '@nestjs/swagger';

export class SubjectContentDto {
  @ApiProperty({ description: 'Content ID' })
  id: number;

  @ApiProperty({ description: 'Subject ID' })
  subjectId: number;

  @ApiProperty({ description: 'Content title' })
  title: string;

  @ApiProperty({ description: 'Creation date' })
  createdAt: string;

  @ApiProperty({ description: 'Last update date' })
  updatedAt: string;
}
