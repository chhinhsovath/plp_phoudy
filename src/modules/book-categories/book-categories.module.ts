import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookCategoriesService } from './book-categories.service';
import { BookCategoriesController } from './book-categories.controller';
import { BookCategory } from '../../entities/book-category.entity';
import { Subject } from '../../entities/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookCategory, Subject])],
  controllers: [BookCategoriesController],
  providers: [BookCategoriesService],
  exports: [BookCategoriesService],
})
export class BookCategoriesModule {}
