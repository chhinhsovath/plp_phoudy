import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../../../entities/user.entity';

export class UserResponseDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  id: number;

  @ApiProperty({ example: 'john_doe', description: 'Username' })
  username: string;

  @ApiProperty({ example: 'John', description: 'First name' })
  first_name: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  last_name: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email address' })
  email: string;

  @ApiProperty({ example: 1, description: 'Role ID' })
  roleId: number;

  @ApiProperty({ example: 'STUDENT', description: 'Role name in English' })
  roleNameEn: string;

  @ApiProperty({ example: 'សិស្ស', description: 'Role name in Khmer' })
  roleNameKh: string;

  @ApiProperty({ example: '1995-01-15', description: 'Date of birth' })
  date_of_birth: Date;

  @ApiProperty({ example: 'MALE', enum: Gender, description: 'Gender' })
  gender: Gender;

  @ApiProperty({ example: true, description: 'Account active status' })
  is_active: boolean;

  @ApiProperty({
    example: '+855123456789',
    description: 'Phone number',
    required: false,
  })
  phone?: string;

  @ApiProperty({
    example: 'Cambodian',
    description: 'Nationality',
    required: false,
  })
  nationality?: string;

  @ApiProperty({
    example: 'profile.jpg',
    description: 'Profile picture filename',
    required: false,
  })
  profile_picture?: string;

  @ApiProperty({
    example: '2024-12-12T10:00:00.000Z',
    description: 'Creation timestamp',
  })
  created_at: Date;

  @ApiProperty({
    example: '2024-12-12T10:00:00.000Z',
    description: 'Last update timestamp',
  })
  updated_at: Date;

  @ApiProperty({ description: 'User residence information', required: false })
  residence?: any;

  @ApiProperty({
    description: 'User place of birth information',
    required: false,
  })
  placeOfBirth?: any;

  @ApiProperty({
    description: 'Teacher information if user is a teacher',
    required: false,
  })
  teacher?: any;
}
