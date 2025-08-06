import { BookCategoriesService } from './book-categories.service';
import { CreateBookCategoryDto } from './dto/create-book-category.dto';
import { UpdateBookCategoryDto } from './dto/update-book-category.dto';
import { BookCategory } from '../../entities/book-category.entity';
export declare class BookCategoriesController {
    private readonly bookCategoriesService;
    constructor(bookCategoriesService: BookCategoriesService);
    findAll(): Promise<BookCategory[]>;
    findOne(id: number): Promise<BookCategory>;
    create(createBookCategoryDto: CreateBookCategoryDto): Promise<BookCategory>;
    update(id: number, updateBookCategoryDto: UpdateBookCategoryDto): Promise<BookCategory>;
    remove(id: number): Promise<void>;
}
