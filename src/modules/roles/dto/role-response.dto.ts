import { ApiProperty } from '@nestjs/swagger';

export class RoleResponseDto {
  @ApiProperty({ example: 1, description: 'Role ID' })
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'Role name in English' })
  nameEn: string;

  @ApiProperty({ example: 'អ្នកគ្រប់គ្រង', description: 'Role name in Khmer' })
  nameKh: string;

  @ApiProperty({
    example: 'Administrator with full system access',
    description: 'Role description',
    required: false,
  })
  description?: string;

  @ApiProperty({
    example: '2024-12-12T10:00:00.000Z',
    description: 'Creation timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-12-12T10:00:00.000Z',
    description: 'Last update timestamp',
  })
  updatedAt: Date;

  @ApiProperty({
    example: 15,
    description: 'Number of users with this role',
    required: false,
  })
  userCount?: number;
}
