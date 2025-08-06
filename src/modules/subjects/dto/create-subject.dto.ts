import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsArray,
  IsEnum,
} from 'class-validator';
import { Status } from '../../../entities/enums/status.enum';
import { SubjectType } from '../../../entities/subject.entity';

export class CreateSubjectDto {
  @ApiProperty({ description: 'Subject name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Subject Khmer name', required: false })
  @IsOptional()
  @IsString()
  khmer_name?: string;

  @ApiProperty({ description: 'Subject description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Status',
    default: 'ACTIVE',
    enum: ['ACTIVE', 'INACTIVE'],
  })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @ApiProperty({
    description: 'Whether the subject is for students',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  is_student?: boolean;

  @ApiProperty({ description: 'Subject path', required: false })
  @IsOptional()
  @IsString()
  path?: string;

  @ApiProperty({
    description: 'Subject type',
    default: 'NORMAL',
    enum: ['NORMAL', 'SPECIAL'],
  })
  @IsOptional()
  @IsEnum(SubjectType)
  subject_type?: SubjectType;

  @ApiProperty({ description: 'Grade levels', type: [Number], required: false })
  @IsOptional()
  @IsArray()
  gradeLevels?: number[];
}
