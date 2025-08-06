import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Subject } from './subject.entity';
import { BookCategory } from './book-category.entity';

@Entity('books')
export class Book extends BaseEntity {
  @Column()
  title: string;

  @Column({ name: 'book_file' })
  book_file: string;

  @Column({ name: 'grade_level' })
  grade_level: number;

  @Column({ name: 'subject_id' })
  subjectId: number;

  @ManyToOne(() => Subject)
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @Column({ name: 'book_category_id' })
  bookCategoryId: number;

  @ManyToOne(() => BookCategory)
  @JoinColumn({ name: 'book_category_id' })
  bookCategory: BookCategory;

  @Column({ default: 'ACTIVE' })
  status: string;
}
