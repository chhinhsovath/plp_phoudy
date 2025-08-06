import { ApiProperty } from '@nestjs/swagger';

export class BookDto {
  @ApiProperty({ description: 'Book ID' })
  id: number;

  @ApiProperty({ description: 'Book title' })
  title: string;

  @ApiProperty({ description: 'Book file path' })
  bookFile: string;

  @ApiProperty({ description: 'Book thumbnail', required: false })
  thumbnail?: string;

  @ApiProperty({ description: 'Grade level' })
  gradeLevel: number;

  @ApiProperty({ description: 'Subject ID' })
  subjectId: number;

  @ApiProperty({ description: 'Subject name' })
  subject: string;

  @ApiProperty({ description: 'Subject name in Khmer', required: false })
  subjectKhmer?: string;

  @ApiProperty({ description: 'Book category ID' })
  bookCategoryId: number;

  @ApiProperty({ description: 'Book category name' })
  bookCategory: string;

  @ApiProperty({ description: 'Status' })
  status: string;
}
