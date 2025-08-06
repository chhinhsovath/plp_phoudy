import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from '../../../entities/video.entity';
import { PartialType } from '@nestjs/mapped-types';

export class CreateVideoDto {
  @ApiProperty({ description: 'Lesson title' })
  @IsNotEmpty()
  @IsString()
  lessonTitle: string;

  @ApiProperty({ description: 'Video URL' })
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiProperty({ description: 'Teacher name' })
  @IsNotEmpty()
  @IsString()
  teacherName: string;

  @ApiProperty({ description: 'Subject' })
  @IsNotEmpty()
  @IsString()
  subject: string;

  @ApiProperty({ description: 'Grade' })
  @IsNotEmpty()
  @IsString()
  grade: string;

  @ApiProperty({ description: 'Uploader' })
  @IsNotEmpty()
  @IsString()
  uploader: string;

  @ApiProperty({ description: 'Duration in seconds', required: false })
  @IsOptional()
  @IsNumber()
  duration?: number;

  @ApiProperty({
    description: 'Duration as a string (e.g., "5:30")',
    required: false,
  })
  @IsOptional()
  @IsString()
  durationString?: string;

  @ApiProperty({ description: 'Upload date', required: false })
  @IsOptional()
  @IsString()
  uploadDate?: string;

  @ApiProperty({ description: 'Thumbnail URL', required: false })
  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @ApiProperty({ description: 'Status', enum: Status, default: Status.ACTIVE })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}

// Use PartialType to make all properties optional for updates
export class UpdateVideoDto extends PartialType(CreateVideoDto) {}

export class VideoResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  lessonTitle: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  teacherName: string;

  @ApiProperty()
  subject: string;

  @ApiProperty()
  grade: string;

  @ApiProperty()
  uploader: string;

  @ApiProperty({ required: false })
  duration?: number;

  @ApiProperty({ required: false })
  durationString?: string;

  @ApiProperty({ required: false })
  uploadDate?: string;

  @ApiProperty({ required: false })
  thumbnailUrl?: string;

  @ApiProperty({ enum: Status })
  status: Status;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
