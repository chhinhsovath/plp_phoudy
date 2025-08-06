// DTO: create-homework.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
  IsArray,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SubmissionFileDto } from '../../homework-submission/dto/homework-submission-student.dto';

export class CreateHomeworkDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  classId: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  subjectId: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  lessonId: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  teacherId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  dueDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ default: false })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  allowResubmit?: boolean = false;

  @ApiPropertyOptional({
    type: [SubmissionFileDto],
    description: 'Files attached to the homework',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubmissionFileDto)
  homeworkFiles?: SubmissionFileDto[];

  @ApiPropertyOptional({
    type: [Number],
    description: 'IDs of files to delete',
  })
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  filesToDelete?: number[];
}
