import { Repository } from 'typeorm';
import { Book } from '../../entities/book.entity';
import { Subject } from '../../entities/subject.entity';
import { BookCategory } from '../../entities/book-category.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookDto } from './dto/book.dto';
export declare class BooksService {
    private bookRepository;
    private subjectRepository;
    private bookCategoryRepository;
    constructor(bookRepository: Repository<Book>, subjectRepository: Repository<Subject>, bookCategoryRepository: Repository<BookCategory>);
    findAll(): Promise<BookDto[]>;
    findOne(id: number): Promise<BookDto>;
    findByBookCategory(bookCategoryId: number): Promise<BookDto[]>;
    findByBookCategoryAndStatus(bookCategoryId: number, status: string): Promise<BookDto[]>;
    findBySubject(subjectId: number): Promise<BookDto[]>;
    findByGradeLevel(gradeLevel: number): Promise<BookDto[]>;
    findByStatus(status: string): Promise<BookDto[]>;
    findByTitleContaining(title: string): Promise<BookDto[]>;
    create(createBookDto: CreateBookDto): Promise<BookDto>;
    update(id: number, updateBookDto: UpdateBookDto): Promise<BookDto>;
    remove(id: number): Promise<void>;
    removeAll(ids: number[]): Promise<void>;
    findAllGradeLevels(): Promise<number[]>;
    findAllSubjects(): Promise<{
        id: number;
        name: string;
        khmerName?: string;
    }[]>;
    findAllBookCategories(): Promise<{
        id: number;
        name: string;
    }[]>;
    private toBookDto;
}
