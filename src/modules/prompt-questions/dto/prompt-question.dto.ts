import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class PromptQuestionDto {
  @ApiProperty({ description: 'Question ID', required: false })
  id?: number;

  @ApiProperty({ description: 'Grade level', required: false })
  @IsOptional()
  @IsString()
  grade?: string;

  @ApiProperty({ description: 'Domain', required: false })
  @IsOptional()
  @IsString()
  domain?: string;

  @ApiProperty({ description: 'Topic', required: false })
  @IsOptional()
  @IsString()
  topic?: string;

  @ApiProperty({ description: 'Bloom taxonomy level', required: false })
  @IsOptional()
  @IsString()
  bloom_level?: string;

  @ApiProperty({ description: 'Skills and knowledge', required: false })
  @IsOptional()
  @IsString()
  skills_knowledge?: string;

  @ApiProperty({ description: 'TARL level', required: false })
  @IsOptional()
  @IsString()
  tarl_level?: string;

  @ApiProperty({ description: 'Difficulty level', required: false })
  @IsOptional()
  @IsString()
  difficulty?: string;

  @ApiProperty({ description: 'Question title' })
  @IsNotEmpty()
  @IsString()
  question_title: string;

  @ApiProperty({ description: 'Question content' })
  @IsNotEmpty()
  @IsString()
  question_content: string;

  @ApiProperty({ description: 'Response', required: false })
  @IsOptional()
  @IsString()
  response?: string;

  @ApiProperty({ description: 'Tags', required: false })
  @IsOptional()
  @IsString()
  tags?: string;

  @ApiProperty({ description: 'Source file', required: false })
  @IsOptional()
  @IsString()
  source_file?: string;

  @ApiProperty({
    description: 'Whether this prompt is a suggestion',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  is_suggestion?: boolean;

  @ApiProperty({ description: 'Created date', required: false })
  created_at?: Date;
}

export class SearchPromptQuestionDto {
  @ApiProperty({ description: 'Search content' })
  @IsNotEmpty()
  @IsString()
  content: string;
}

export class MarkAsSuggestionDto {
  @ApiProperty({
    description: 'Whether this prompt should be marked as a suggestion',
    default: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  is_suggestion: boolean;
}

export class SuggestedPromptResponseDto {
  @ApiProperty({ description: 'Question ID' })
  id: number;

  @ApiProperty({ description: 'Question title' })
  question_title: string;

  @ApiProperty({ description: 'Question content' })
  question_content: string;

  @ApiProperty({ description: 'Response', required: false })
  response?: string;

  @ApiProperty({ description: 'Source file', required: false })
  source_file?: string;

  @ApiProperty({ description: 'Tags', required: false })
  tags?: string;

  @ApiProperty({
    description: 'Whether this prompt is a suggestion',
    default: false,
  })
  is_suggestion: boolean;
}
