import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'john_doe' })
  username: string;

  @ApiProperty({ example: 'John' })
  first_name: string;

  @ApiProperty({ example: 'Doe' })
  last_name: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: 1 })
  roleId: number;

  @ApiProperty({ example: 'MALE' })
  gender: string;

  @ApiProperty({
    example: 1,
    required: false,
    description: 'Teacher ID if user is a teacher',
  })
  teacherId?: number;

  @ApiProperty({
    example: [1, 2],
    required: false,
    description: 'Class IDs associated with user',
  })
  classIds?: number[];

  @ApiProperty({
    example: ['Grade 1A', 'Grade 2B'],
    required: false,
    description: 'Class names associated with user',
  })
  classNames?: string[];

  @ApiProperty({
    example: ['1', '2'],
    required: false,
    description: 'Grade levels associated with user classes',
  })
  gradeLevels?: string[];

  @ApiProperty({ example: 'ADMIN' })
  roleEn: string;

  @ApiProperty({ example: 'អ្នកគ្រប់គ្រង' })
  roleKh: string;
}

export class AuthResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken: string;

  @ApiProperty({ type: UserDto })
  user: UserDto;
}
