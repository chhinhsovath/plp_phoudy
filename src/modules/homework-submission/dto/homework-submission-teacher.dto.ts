import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum CheckedStatus {
  UNCHECKED = 'UNCHECKED',
  CHECKED = 'CHECKED',
}

export class UpdateTeacherFeedbackDto {
  @ApiPropertyOptional({ type: Number, example: 85 })
  @IsOptional()
  @IsNumber()
  score?: number;

  @ApiPropertyOptional({ type: String, example: 'Good job!' })
  @IsOptional()
  @IsString()
  feedback?: string;

  @ApiPropertyOptional({ enum: CheckedStatus, example: CheckedStatus.CHECKED })
  @IsOptional()
  @IsEnum(CheckedStatus)
  checkedStatus?: CheckedStatus;

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
}
