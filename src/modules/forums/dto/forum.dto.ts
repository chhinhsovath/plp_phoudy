import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Audience } from '../../../entities/forum.entity';

export class CreateForumDto {
  @ApiProperty({ description: 'Forum title' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty({ description: 'Forum content', required: false })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({ description: 'Audience', enum: Audience, required: false })
  @IsOptional()
  @IsEnum(Audience)
  audience?: Audience;

  @ApiProperty({ description: 'Subject ID', required: false })
  @IsOptional()
  @IsInt()
  subjectId?: number;

  @ApiProperty({ description: 'Grade' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  grade: string;

  @ApiProperty({ description: 'Status', required: false, default: 'ACTIVE' })
  @IsOptional()
  @IsString()
  status?: string;
}

export class UpdateForumDto extends PartialType(CreateForumDto) {}

export class ForumResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  content?: string;

  @ApiProperty({ enum: Audience })
  audience: Audience;

  @ApiProperty({ required: false })
  subjectId?: number;

  @ApiProperty()
  grade: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  usersId: number;

  @ApiProperty({ required: false })
  user?: any;

  @ApiProperty()
  viewCount: number;

  @ApiProperty()
  commentCount: number;

  @ApiProperty()
  userLike: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export interface FilterOptions {
  audience?:
    | 'YOUR'
    | 'SAVE'
    | 'CLASS'
    | 'STUDENT'
    | 'PUBLIC'
    | 'PRIVATE'
    | 'DRAFT';
  subjectId?: number;
  search?: string;
  page: number;
  limit: number;
  userId?: string;
}
