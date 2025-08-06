import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateQuestionTypeDto {
  @ApiProperty({
    example: 'multiple_choice',
    description: 'Question type key',
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  typeKey: string;

  @ApiProperty({
    example: 'Multiple Choice',
    description: 'Question type label',
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  label: string;

  @ApiProperty({
    example: true,
    description: 'Whether the question type is active',
    required: false,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
