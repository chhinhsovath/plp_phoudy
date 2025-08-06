import { PartialType, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
  IsDate,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum SubmissionStatus {
  NOT_SUBMITTED = 'NOT_SUBMITTED',
  SUBMITTED = 'SUBMITTED',
}

export enum CheckedStatus {
  UNCHECKED = 'UNCHECKED',
  CHECKED = 'CHECKED',
}

export class CreateHomeworkSubmissionDto {
  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  homeworkId: number;

  @ApiProperty({ type: Number, example: 1001 })
  @IsNumber()
  studentId: number;

  @ApiPropertyOptional({
    type: String,
    example: 'My answer to the homework question.',
  })
  @IsOptional()
  @IsString()
  submissionText?: string;

  @ApiPropertyOptional({ type: String, example: '/uploads/file.pdf' })
  @IsOptional()
  @IsString()
  fileUrl?: string;

  @ApiPropertyOptional({ type: Number, example: 85 })
  @IsOptional()
  @IsNumber()
  score?: number;

  @ApiPropertyOptional({ type: String, example: 'Good job!' })
  @IsOptional()
  @IsString()
  feedback?: string;

  @ApiProperty({ enum: SubmissionStatus, example: SubmissionStatus.SUBMITTED })
  @IsEnum(SubmissionStatus)
  status: SubmissionStatus;

  @ApiPropertyOptional({ enum: CheckedStatus, example: CheckedStatus.CHECKED })
  @IsOptional()
  @IsEnum(CheckedStatus)
  checkedStatus?: CheckedStatus;

  @ApiPropertyOptional({
    type: String,
    format: 'date-time',
    example: '2025-07-09T12:00:00Z',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  submittedAt?: Date;

  @ApiPropertyOptional({
    type: String,
    format: 'date-time',
    example: '2025-07-10T08:30:00Z',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  checkedDate?: Date;

  @ApiPropertyOptional({ type: Number, example: 2 })
  @IsOptional()
  @IsNumber()
  checkedByTeacherId?: number;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsBoolean()
  overdue?: boolean;

  @ApiPropertyOptional({
    type: Boolean,
    default: false,
    description: 'Allow resubmission of homework',
  })
  @IsOptional()
  @IsBoolean()
  allowResubmit?: boolean = false;
}

export class UpdateHomeworkSubmissionDto extends PartialType(
  CreateHomeworkSubmissionDto,
) {}
