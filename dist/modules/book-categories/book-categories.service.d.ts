import { Repository } from 'typeorm';
import { BookCategory } from '../../entities/book-category.entity';
import { CreateBookCategoryDto } from './dto/create-book-category.dto';
import { UpdateBookCategoryDto } from './dto/update-book-category.dto';
export declare class BookCategoriesService {
    private bookCategoryRepository;
    constructor(bookCategoryRepository: Repository<BookCategory>);
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    create(createBookCategoryDto: CreateBookCategoryDto): Promise<BookCategory>;
    update(id: number, updateBookCategoryDto: UpdateBookCategoryDto): Promise<any>;
    remove(id: number): Promise<void>;
}
