import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BookCategoriesService } from './book-categories.service';
import { CreateBookCategoryDto } from './dto/create-book-category.dto';
import { UpdateBookCategoryDto } from './dto/update-book-category.dto';
import { BookCategory } from '../../entities/book-category.entity';

@ApiTags('Book Categories')
@Controller('book-categories')
export class BookCategoriesController {
  constructor(private readonly bookCategoriesService: BookCategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all book categories' })
  findAll(): Promise<BookCategory[]> {
    return this.bookCategoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book category by ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<BookCategory> {
    return this.bookCategoriesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new book category' })
  create(
    @Body() createBookCategoryDto: CreateBookCategoryDto,
  ): Promise<BookCategory> {
    return this.bookCategoriesService.create(createBookCategoryDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a book category' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookCategoryDto: UpdateBookCategoryDto,
  ): Promise<BookCategory> {
    return this.bookCategoriesService.update(id, updateBookCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book category' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.bookCategoriesService.remove(id);
  }
}
