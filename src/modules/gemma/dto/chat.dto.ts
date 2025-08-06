import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChatDTOGemma {
  @ApiProperty({
    description: 'The message to send to Gemma 3',
    example: 'How do I solve 5 + 3?',
  })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({
    description: 'The title of the teacher (used in the prompt)',
    example: 'គ្រូ',
  })
  @IsNotEmpty()
  @IsString()
  teacherTitle: string;

  @ApiProperty({
    description: 'Whether this is the first interaction in the conversation',
    example: true,
  })
  @IsBoolean()
  isFirstInteraction: boolean;
}
