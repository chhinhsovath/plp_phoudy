import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
  IsObject,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateMessageDto {
  @ApiProperty({ description: 'Message ID (for updates)', required: false })
  @IsOptional()
  @Transform(({ value }) => {
    // If it's a valid UUID, keep it, otherwise return null so a new one will be generated
    const uuidPattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return value && typeof value === 'string' && uuidPattern.test(value)
      ? value
      : null;
  })
  id?: string;

  @ApiProperty({ description: 'Chat ID that this message belongs to' })
  @IsNotEmpty()
  @Transform(({ value }) => {
    // If it's a valid UUID, keep it, otherwise return null
    const uuidPattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return value && typeof value === 'string' && uuidPattern.test(value)
      ? value
      : null;
  })
  chat_id: string;

  @ApiProperty({
    description: 'Role of the message sender',
    example: 'user',
    enum: ['user', 'assistant', 'system'],
  })
  @IsNotEmpty()
  @IsString()
  role: string;

  @ApiProperty({
    description: 'Content of the message',
    example: 'How can I improve my math skills?',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    description:
      'Model used for generating the response (for assistant messages)',
    required: false,
  })
  @IsOptional()
  @IsString()
  model?: string | null;

  @ApiProperty({
    description: 'Additional metadata for the message',
    required: false,
  })
  @IsOptional()
  @IsObject()
  metadata?: any;
}

export class UpdateMessageDto extends CreateMessageDto {}

export class MessageResponseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsUUID()
  chat_id: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty({ required: false, nullable: true })
  model: string | null;

  @ApiProperty({ required: false, nullable: true })
  metadata: any;
}
