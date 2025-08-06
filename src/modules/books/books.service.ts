import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../../entities/book.entity';
import { Subject } from '../../entities/subject.entity';
import { BookCategory } from '../../entities/book-category.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookDto } from './dto/book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
    @InjectRepository(BookCategory)
    private bookCategoryRepository: Repository<BookCategory>,
  ) {}

  async findAll(): Promise<BookDto[]> {
    const books = await this.bookRepository.find({
      relations: ['subject', 'bookCategory'],
    });
    return books.map((book) => this.toBookDto(book));
  }

  async findOne(id: number): Promise<BookDto> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['subject', 'bookCategory'],
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return this.toBookDto(book);
  }

  async findByBookCategory(bookCategoryId: number): Promise<BookDto[]> {
    const books = await this.bookRepository.find({
      where: { bookCategoryId },
      relations: ['subject', 'bookCategory'],
    });
    return books.map((book) => this.toBookDto(book));
  }

  async findByBookCategoryAndStatus(
    bookCategoryId: number,
    status: string,
  ): Promise<BookDto[]> {
    const books = await this.bookRepository.find({
      where: { bookCategoryId, status },
      relations: ['subject', 'bookCategory'],
    });
    return books.map((book) => this.toBookDto(book));
  }

  async findBySubject(subjectId: number): Promise<BookDto[]> {
    const books = await this.bookRepository.find({
      where: { subjectId },
      relations: ['subject', 'bookCategory'],
    });
    return books.map((book) => this.toBookDto(book));
  }

  async findByGradeLevel(gradeLevel: number): Promise<BookDto[]> {
    const books = await this.bookRepository.find({
      where: { grade_level: gradeLevel },
      relations: ['subject', 'bookCategory'],
    });
    return books.map((book) => this.toBookDto(book));
  }

  async findByStatus(status: string): Promise<BookDto[]> {
    const books = await this.bookRepository.find({
      where: { status },
      relations: ['subject', 'bookCategory'],
    });
    return books.map((book) => this.toBookDto(book));
  }

  async findByTitleContaining(title: string): Promise<BookDto[]> {
    const books = await this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.subject', 'subject')
      .leftJoinAndSelect('book.bookCategory', 'bookCategory')
      .where('book.title ILIKE :title', { title: `%${title}%` })
      .getMany();

    return books.map((book) => this.toBookDto(book));
  }

  async create(createBookDto: CreateBookDto): Promise<BookDto> {
    // Verify subject exists
    const subject = await this.subjectRepository.findOne({
      where: { id: createBookDto.subjectId },
    });

    if (!subject) {
      throw new NotFoundException(
        `Subject with ID ${createBookDto.subjectId} not found`,
      );
    }

    // Verify book category exists
    const bookCategory = await this.bookCategoryRepository.findOne({
      where: { id: createBookDto.bookCategoryId },
    });

    if (!bookCategory) {
      throw new NotFoundException(
        `Book category with ID ${createBookDto.bookCategoryId} not found`,
      );
    }

    const book = new Book();
    book.title = createBookDto.title;
    book.book_file = createBookDto.bookFile;
    book.grade_level = createBookDto.gradeLevel;
    book.subjectId = createBookDto.subjectId;
    book.subject = subject;
    book.bookCategoryId = createBookDto.bookCategoryId;
    book.bookCategory = bookCategory;
    book.status = createBookDto.status || 'ACTIVE';

    const savedBook = await this.bookRepository.save(book);
    return this.toBookDto(savedBook);
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<BookDto> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['subject', 'bookCategory'],
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    if (updateBookDto.subjectId) {
      const subject = await this.subjectRepository.findOne({
        where: { id: updateBookDto.subjectId },
      });

      if (!subject) {
        throw new NotFoundException(
          `Subject with ID ${updateBookDto.subjectId} not found`,
        );
      }

      book.subject = subject;
      book.subjectId = updateBookDto.subjectId;
    }

    if (updateBookDto.bookCategoryId) {
      const bookCategory = await this.bookCategoryRepository.findOne({
        where: { id: updateBookDto.bookCategoryId },
      });

      if (!bookCategory) {
        throw new NotFoundException(
          `Book category with ID ${updateBookDto.bookCategoryId} not found`,
        );
      }

      book.bookCategory = bookCategory;
      book.bookCategoryId = updateBookDto.bookCategoryId;
    }

    if (updateBookDto.title) book.title = updateBookDto.title;
    if (updateBookDto.bookFile) book.book_file = updateBookDto.bookFile;
    if (updateBookDto.gradeLevel) book.grade_level = updateBookDto.gradeLevel;
    if (updateBookDto.status) book.status = updateBookDto.status;

    const updatedBook = await this.bookRepository.save(book);
    return this.toBookDto(updatedBook);
  }

  async remove(id: number): Promise<void> {
    const result = await this.bookRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
  }

  async removeAll(ids: number[]): Promise<void> {
    await this.bookRepository.delete(ids);
  }

  async findAllGradeLevels(): Promise<number[]> {
    const result = await this.bookRepository
      .createQueryBuilder('book')
      .select('DISTINCT book.grade_level', 'grade_level')
      .orderBy('book.grade_level', 'ASC')
      .getRawMany();

    return result.map((item) => item.grade_level);
  }

  async findAllSubjects(): Promise<
    { id: number; name: string; khmerName?: string }[]
  > {
    const subjects = await this.subjectRepository
      .createQueryBuilder('subject')
      .innerJoin('subject.books', 'book')
      .select([
        'subject.id AS id',
        'subject.name AS name',
        'subject.khmer_name AS khmerName',
      ])
      .distinct(true)
      .getRawMany();

    return subjects.map((subject) => ({
      id: subject.id,
      name: subject.name,
      khmerName: subject.khmerName,
    }));
  }

  async findAllBookCategories(): Promise<{ id: number; name: string }[]> {
    const categories = await this.bookCategoryRepository
      .createQueryBuilder('category')
      .innerJoin('category.books', 'book')
      .select(['category.id AS id', 'category.name AS name'])
      .distinct(true)
      .getRawMany();

    return categories.map((category) => ({
      id: category.id,
      name: category.name,
    }));
  }

  private toBookDto(book: Book): BookDto {
    const bookDto = new BookDto();
    bookDto.id = book.id;
    bookDto.title = book.title;
    bookDto.bookFile = book.book_file;
    bookDto.gradeLevel = book.grade_level;
    bookDto.subjectId = book.subjectId;
    bookDto.subject = book.subject?.name || '';
    bookDto.subjectKhmer = book.subject?.khmer_name;
    bookDto.bookCategoryId = book.bookCategoryId;
    bookDto.bookCategory = book.bookCategory?.name || '';
    bookDto.status = book.status;

    // Generate thumbnail URL from book file if it's a PDF
    if (book.book_file && book.book_file.toLowerCase().endsWith('.pdf')) {
      bookDto.thumbnail = `${book.book_file.replace('.pdf', '')}_thumbnail.jpg`;
    }

    return bookDto;
  }
}
