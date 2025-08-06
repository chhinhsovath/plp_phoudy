import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from '../../entities/book.entity';
import { Subject } from '../../entities/subject.entity';
import { BookCategory } from '../../entities/book-category.entity';
import { FileStorageModule } from '../file-storage/file-storage.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, Subject, BookCategory]),
    FileStorageModule,
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
