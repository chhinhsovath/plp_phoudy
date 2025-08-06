// src/comments/dto/create-comment.dto.ts
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  forumId: number;
}

export class UpdateCommentDto {
  @IsOptional()
  @IsString()
  content?: string;
}
