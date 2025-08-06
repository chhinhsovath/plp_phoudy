import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { Status } from '../../../entities/enums/status.enum';

export class UpdateLessonActivityDto {
  @ApiProperty({ description: 'The title of the lesson activity', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'The ID of the lesson this activity belongs to', required: false })
  @IsOptional()
  @IsNumber()
  lessonId?: number;

  @ApiProperty({
    description: 'The order index of the activity',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  order_index?: number;

  @ApiProperty({
    description: 'The status of the lesson activity',
    enum: Status,
    required: false,
  })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}