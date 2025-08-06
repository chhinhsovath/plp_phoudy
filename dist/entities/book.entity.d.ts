import { BaseEntity } from './base.entity';
import { Subject } from './subject.entity';
import { BookCategory } from './book-category.entity';
export declare class Book extends BaseEntity {
    title: string;
    book_file: string;
    grade_level: number;
    subjectId: number;
    subject: Subject;
    bookCategoryId: number;
    bookCategory: BookCategory;
    status: string;
}
