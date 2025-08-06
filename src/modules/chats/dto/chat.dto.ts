import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  IsNumber,
  IsUUID,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { CreateMessageDto, MessageResponseDto } from './message.dto';

export class CreateChatDto {
  @ApiProperty({ description: 'Chat ID (for updates)', required: false })
  @IsOptional()
  @Transform(({ value }) => {
    // If it's a valid UUID, keep it, otherwise return null so a new one will be generated
    const uuidPattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return value && typeof value === 'string' && uuidPattern.test(value)
      ? value
      : null;
  })
  id?: string | null;

  @ApiProperty({
    description: 'Username of the chat owner',
    example: 'john_doe',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: 'Chat timestamp', required: false })
  @IsOptional()
  @Type(() => Date)
  timestamp?: Date;

  @ApiProperty({
    description: 'Preview text of the chat',
    example: 'How can I improve my math skills?',
  })
  @IsNotEmpty()
  @IsString()
  preview: string;

  @ApiProperty({
    description: 'Initial messages to create with this chat',
    required: false,
    type: [CreateMessageDto],
  })
  @IsOptional()
  @IsArray()
  messages?: CreateMessageDto[] | null;

  @ApiProperty({
    description: 'Total message count',
    required: false,
    example: 2,
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  message_count?: number | null;

  @ApiProperty({
    description: 'User message count',
    required: false,
    example: 1,
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  user_message_count?: number | null;

  @ApiProperty({
    description: 'AI message count',
    required: false,
    example: 1,
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  ai_message_count?: number | null;

  @ApiProperty({
    description: 'Whether this chat is a training candidate',
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true')
  isTrainingCandidate?: boolean;

  @ApiProperty({
    description: 'Training status',
    required: false,
    default: 'UNPROCESSED',
  })
  @IsOptional()
  @IsString()
  training_status?: string;

  @ApiProperty({
    description: 'Training notes',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  trainingNotes?: string | null;

  @ApiProperty({
    description: 'Detected language',
    required: false,
    default: 'km',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  language_detected?: string | null;

  @ApiProperty({
    description: 'Topic category',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  topicCategory?: string | null;
}

export class UpdateChatDto extends CreateChatDto {}

export class ChatResponseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  timestamp: Date;

  @ApiProperty()
  preview: string;

  @ApiProperty({ required: false, type: [MessageResponseDto] })
  messages: MessageResponseDto[] | null;

  @ApiProperty({ required: false, nullable: true })
  message_count?: number | null;

  @ApiProperty({ required: false, nullable: true })
  user_message_count?: number | null;

  @ApiProperty({ required: false, nullable: true })
  ai_message_count?: number | null;

  @ApiProperty({ required: false })
  is_training_candidate?: boolean;

  @ApiProperty({ required: false })
  training_status?: string;

  @ApiProperty({ required: false, nullable: true })
  training_notes?: string | null;

  @ApiProperty({ required: false, nullable: true })
  language_detected?: string | null;

  @ApiProperty({ required: false, nullable: true })
  topic_category?: string | null;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
