import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
  IsDate,
  IsNotEmpty,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum SubmissionStatus {
  NOT_SUBMITTED = 'NOT_SUBMITTED',
  SUBMITTED = 'SUBMITTED',
}

export class SubmissionFileDto {
  @ApiPropertyOptional({ type: String, example: 'file.pdf' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ type: Number, example: 102400 })
  @IsNumber()
  size: number;

  @ApiPropertyOptional({ type: String, example: 'application/pdf' })
  @IsString()
  type: string;

  @ApiPropertyOptional({ type: String, example: '/uploads/file.pdf' })
  @IsString()
  url: string;
}

export class CreateStudentSubmissionDto {
  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  @IsNotEmpty()
  homeworkId: number;

  @ApiProperty({ type: Number, example: 1001 })
  @IsNumber()
  @IsNotEmpty()
  studentId: number;

  @ApiPropertyOptional({
    type: String,
    example: 'My answer to the homework question.',
  })
  @IsOptional()
  @IsString()
  submissionText?: string;

  @ApiPropertyOptional({
    type: [SubmissionFileDto],
    description: 'List of submission files',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubmissionFileDto)
  submissionFiles?: SubmissionFileDto[];

  @ApiPropertyOptional({
    type: String,
    format: 'date-time',
    example: '2025-07-09T12:00:00Z',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  submittedAt?: Date;

  @ApiProperty({
    enum: SubmissionStatus,
    example: SubmissionStatus.SUBMITTED,
    default: SubmissionStatus.SUBMITTED,
  })
  @IsEnum(SubmissionStatus)
  @IsOptional()
  status: SubmissionStatus = SubmissionStatus.SUBMITTED;
}
