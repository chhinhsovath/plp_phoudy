import { ApiProperty } from '@nestjs/swagger';

export class SubSubjectDto {
  @ApiProperty({ description: 'Sub subject ID' })
  id: number;

  @ApiProperty({ description: 'Subject ID', required: false })
  subjectId?: number;

  @ApiProperty({ description: 'Subject name in English', required: false })
  subjectNameEn?: string;

  @ApiProperty({ description: 'Subject name in Khmer', required: false })
  subjectNameKh?: string;

  @ApiProperty({ description: 'Sub subject name' })
  name: string;

  @ApiProperty({ description: 'Sub subject name in Khmer' })
  khmerName: string;

  @ApiProperty({ description: 'Sub subject description' })
  description: string;

  @ApiProperty({ description: 'Sub subject status' })
  status: string;

  @ApiProperty({ description: 'Sub subject path' })
  path: string;

  @ApiProperty({ description: 'Creation date' })
  created_at: Date;

  @ApiProperty({ description: 'Update date' })
  updated_at: Date;
}
