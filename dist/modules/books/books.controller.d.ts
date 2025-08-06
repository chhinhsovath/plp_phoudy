import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookDto } from './dto/book.dto';
import { FileStorageService } from '../file-storage/file-storage.service';
export declare class BooksController {
    private readonly booksService;
    private readonly fileStorageService;
    constructor(booksService: BooksService, fileStorageService: FileStorageService);
    findAll(bookCategoryId?: number, subjectId?: number, gradeLevel?: number, status?: string, title?: string): Promise<BookDto[]>;
    findOne(id: number): Promise<BookDto>;
    create(createBookDto: CreateBookDto, bookFile: Express.Multer.File): Promise<BookDto>;
    update(id: number, updateBookDto: UpdateBookDto, bookFile?: Express.Multer.File): Promise<BookDto>;
    updatePut(id: number, updateBookDto: UpdateBookDto): Promise<BookDto>;
    remove(id: number): Promise<void>;
    removeAll(ids: number[]): Promise<void>;
    findByGradeLevel(gradeLevel: number): Promise<BookDto[]>;
    getAvailableGrades(): Promise<{
        grade: string;
    }[]>;
    findBySubject(subjectId: number): Promise<BookDto[]>;
    getAvailableSubjects(): Promise<{
        id: number;
        name: string;
        khmerName?: string;
    }[]>;
    findByCategory(bookCategoryId: number): Promise<BookDto[]>;
    getAvailableCategories(): Promise<{
        id: number;
        name: string;
    }[]>;
}
