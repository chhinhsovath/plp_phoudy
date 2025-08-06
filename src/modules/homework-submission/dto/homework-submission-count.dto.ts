import { IsOptional, IsEnum, IsNumber } from 'class-validator';
import { SubmissionStatus, CheckedStatus } from './homework-submission.dto';
import { Type } from 'class-transformer';

export class CountHomeworkSubmissionDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  studentId?: number;

  @IsOptional()
  @IsEnum(SubmissionStatus)
  status?: SubmissionStatus;

  @IsOptional()
  @IsEnum(CheckedStatus)
  checkedStatus?: CheckedStatus;
}
