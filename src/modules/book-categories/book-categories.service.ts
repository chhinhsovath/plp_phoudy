import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookCategory } from '../../entities/book-category.entity';
import { CreateBookCategoryDto } from './dto/create-book-category.dto';
import { UpdateBookCategoryDto } from './dto/update-book-category.dto';

@Injectable()
export class BookCategoriesService {
  constructor(
    @InjectRepository(BookCategory)
    private bookCategoryRepository: Repository<BookCategory>,
  ) {}

  async findAll(): Promise<any[]> {
    const results = await this.bookCategoryRepository
      .createQueryBuilder('bookCategory')
      .leftJoin('bookCategory.subject', 'subject')
      .addSelect('bookCategory.id', 'id')
      .addSelect('bookCategory.name', 'name')
      .addSelect('bookCategory.description', 'description')
      .addSelect('bookCategory.subjectId', 'subjectId')
      .addSelect('bookCategory.gradeLevel', 'gradeLevel')
      .addSelect('bookCategory.status', 'status')
      .addSelect('bookCategory.created_at', 'created_at')
      .addSelect('bookCategory.updated_at', 'updated_at')
      .addSelect('subject.khmer_name', 'subject_khmer_name')
      .getRawMany();

    return results;
  }

  async findOne(id: number): Promise<any> {
    const result = await this.bookCategoryRepository
      .createQueryBuilder('bookCategory')
      .leftJoin('bookCategory.subject', 'subject')
      .addSelect('bookCategory.id', 'id')
      .addSelect('bookCategory.name', 'name')
      .addSelect('bookCategory.description', 'description')
      .addSelect('bookCategory.subjectId', 'subjectId')
      .addSelect('bookCategory.gradeLevel', 'gradeLevel')
      .addSelect('bookCategory.status', 'status')
      .addSelect('bookCategory.created_at', 'created_at')
      .addSelect('bookCategory.updated_at', 'updated_at')
      .addSelect('subject.khmer_name', 'subject_khmer_name')
      .where('bookCategory.id = :id', { id })
      .getRawOne();

    if (!result) {
      throw new NotFoundException(`Book category with ID ${id} not found`);
    }

    return result;
  }

  async create(
    createBookCategoryDto: CreateBookCategoryDto,
  ): Promise<BookCategory> {
    const category = new BookCategory();
    category.name = createBookCategoryDto.name;
    category.description = createBookCategoryDto.description || '';
    category.subjectId = createBookCategoryDto.subjectId || null;
    category.gradeLevel = createBookCategoryDto.gradeLevel || null;
    category.status = createBookCategoryDto.status || 'ACTIVE';

    return this.bookCategoryRepository.save(category);
  }

  async update(
    id: number,
    updateBookCategoryDto: UpdateBookCategoryDto,
  ): Promise<any> {
    const category = await this.bookCategoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Book category with ID ${id} not found`);
    }

    if (updateBookCategoryDto.name) {
      category.name = updateBookCategoryDto.name;
    }

    if (updateBookCategoryDto.description !== undefined) {
      category.description = updateBookCategoryDto.description || '';
    }

    if (updateBookCategoryDto.subjectId !== undefined) {
      category.subjectId = updateBookCategoryDto.subjectId;
    }

    if (updateBookCategoryDto.gradeLevel !== undefined) {
      category.gradeLevel = updateBookCategoryDto.gradeLevel;
    }

    if (updateBookCategoryDto.status) {
      category.status = updateBookCategoryDto.status;
    }

    await this.bookCategoryRepository.save(category);

    // Return the updated category with the same format as findOne
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.bookCategoryRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Book category with ID ${id} not found`);
    }
  }
}
