import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookDto } from './dto/book.dto';
import { FileStorageService } from '../file-storage/file-storage.service';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly fileStorageService: FileStorageService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all books with optional filters' })
  @ApiQuery({ name: 'bookCategoryId', required: false })
  @ApiQuery({ name: 'subjectId', required: false })
  @ApiQuery({ name: 'gradeLevel', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'title', required: false })
  async findAll(
    @Query('bookCategoryId') bookCategoryId?: number,
    @Query('subjectId') subjectId?: number,
    @Query('gradeLevel') gradeLevel?: number,
    @Query('status') status?: string,
    @Query('title') title?: string,
  ): Promise<BookDto[]> {
    if (bookCategoryId && status) {
      return this.booksService.findByBookCategoryAndStatus(
        bookCategoryId,
        status,
      );
    } else if (bookCategoryId) {
      return this.booksService.findByBookCategory(bookCategoryId);
    } else if (subjectId) {
      return this.booksService.findBySubject(subjectId);
    } else if (gradeLevel) {
      return this.booksService.findByGradeLevel(gradeLevel);
    } else if (status) {
      return this.booksService.findByStatus(status);
    } else if (title) {
      return this.booksService.findByTitleContaining(title);
    } else {
      return this.booksService.findAll();
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<BookDto> {
    return this.booksService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('bookFile'))
  async create(
    @Body() createBookDto: CreateBookDto,
    @UploadedFile() bookFile: Express.Multer.File,
  ): Promise<BookDto> {
    if (!bookFile) {
      throw new BadRequestException('Book file is required');
    }

    const bookFileName = await this.fileStorageService.storeFile(
      bookFile,
      false,
    );
    createBookDto.bookFile = bookFileName;

    return this.booksService.create(createBookDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a book' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('bookFile'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
    @UploadedFile() bookFile?: Express.Multer.File,
  ): Promise<BookDto> {
    if (bookFile) {
      const bookFileName = await this.fileStorageService.storeFile(
        bookFile,
        false,
      );
      updateBookDto.bookFile = bookFileName;
    }

    return this.booksService.update(id, updateBookDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a book (PUT method)' })
  async updatePut(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<BookDto> {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.booksService.remove(id);
  }

  @Delete('bulk')
  @ApiOperation({ summary: 'Delete multiple books' })
  removeAll(@Body() ids: number[]): Promise<void> {
    return this.booksService.removeAll(ids);
  }

  @Get('grade/:gradeLevel')
  @ApiOperation({ summary: 'Get books by grade level' })
  findByGradeLevel(
    @Param('gradeLevel', ParseIntPipe) gradeLevel: number,
  ): Promise<BookDto[]> {
    return this.booksService.findByGradeLevel(gradeLevel);
  }

  @Get('grades')
  @ApiOperation({ summary: 'Get all available grade levels' })
  async getAvailableGrades(): Promise<{ grade: string }[]> {
    const grades = await this.booksService.findAllGradeLevels();
    return grades.map((grade) => ({ grade: grade.toString() }));
  }

  @Get('subject/:subjectId')
  @ApiOperation({ summary: 'Get books by subject' })
  findBySubject(
    @Param('subjectId', ParseIntPipe) subjectId: number,
  ): Promise<BookDto[]> {
    return this.booksService.findBySubject(subjectId);
  }

  @Get('subjects')
  @ApiOperation({ summary: 'Get all available subjects' })
  getAvailableSubjects(): Promise<
    { id: number; name: string; khmerName?: string }[]
  > {
    return this.booksService.findAllSubjects();
  }

  @Get('category/:bookCategoryId')
  @ApiOperation({ summary: 'Get books by category' })
  findByCategory(
    @Param('bookCategoryId', ParseIntPipe) bookCategoryId: number,
  ): Promise<BookDto[]> {
    return this.booksService.findByBookCategory(bookCategoryId);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get all available book categories' })
  getAvailableCategories(): Promise<{ id: number; name: string }[]> {
    return this.booksService.findAllBookCategories();
  }
}
