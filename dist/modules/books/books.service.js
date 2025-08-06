"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const book_entity_1 = require("../../entities/book.entity");
const subject_entity_1 = require("../../entities/subject.entity");
const book_category_entity_1 = require("../../entities/book-category.entity");
const book_dto_1 = require("./dto/book.dto");
let BooksService = class BooksService {
    bookRepository;
    subjectRepository;
    bookCategoryRepository;
    constructor(bookRepository, subjectRepository, bookCategoryRepository) {
        this.bookRepository = bookRepository;
        this.subjectRepository = subjectRepository;
        this.bookCategoryRepository = bookCategoryRepository;
    }
    async findAll() {
        const books = await this.bookRepository.find({
            relations: ['subject', 'bookCategory'],
        });
        return books.map((book) => this.toBookDto(book));
    }
    async findOne(id) {
        const book = await this.bookRepository.findOne({
            where: { id },
            relations: ['subject', 'bookCategory'],
        });
        if (!book) {
            throw new common_1.NotFoundException(`Book with ID ${id} not found`);
        }
        return this.toBookDto(book);
    }
    async findByBookCategory(bookCategoryId) {
        const books = await this.bookRepository.find({
            where: { bookCategoryId },
            relations: ['subject', 'bookCategory'],
        });
        return books.map((book) => this.toBookDto(book));
    }
    async findByBookCategoryAndStatus(bookCategoryId, status) {
        const books = await this.bookRepository.find({
            where: { bookCategoryId, status },
            relations: ['subject', 'bookCategory'],
        });
        return books.map((book) => this.toBookDto(book));
    }
    async findBySubject(subjectId) {
        const books = await this.bookRepository.find({
            where: { subjectId },
            relations: ['subject', 'bookCategory'],
        });
        return books.map((book) => this.toBookDto(book));
    }
    async findByGradeLevel(gradeLevel) {
        const books = await this.bookRepository.find({
            where: { grade_level: gradeLevel },
            relations: ['subject', 'bookCategory'],
        });
        return books.map((book) => this.toBookDto(book));
    }
    async findByStatus(status) {
        const books = await this.bookRepository.find({
            where: { status },
            relations: ['subject', 'bookCategory'],
        });
        return books.map((book) => this.toBookDto(book));
    }
    async findByTitleContaining(title) {
        const books = await this.bookRepository
            .createQueryBuilder('book')
            .leftJoinAndSelect('book.subject', 'subject')
            .leftJoinAndSelect('book.bookCategory', 'bookCategory')
            .where('book.title ILIKE :title', { title: `%${title}%` })
            .getMany();
        return books.map((book) => this.toBookDto(book));
    }
    async create(createBookDto) {
        const subject = await this.subjectRepository.findOne({
            where: { id: createBookDto.subjectId },
        });
        if (!subject) {
            throw new common_1.NotFoundException(`Subject with ID ${createBookDto.subjectId} not found`);
        }
        const bookCategory = await this.bookCategoryRepository.findOne({
            where: { id: createBookDto.bookCategoryId },
        });
        if (!bookCategory) {
            throw new common_1.NotFoundException(`Book category with ID ${createBookDto.bookCategoryId} not found`);
        }
        const book = new book_entity_1.Book();
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
    async update(id, updateBookDto) {
        const book = await this.bookRepository.findOne({
            where: { id },
            relations: ['subject', 'bookCategory'],
        });
        if (!book) {
            throw new common_1.NotFoundException(`Book with ID ${id} not found`);
        }
        if (updateBookDto.subjectId) {
            const subject = await this.subjectRepository.findOne({
                where: { id: updateBookDto.subjectId },
            });
            if (!subject) {
                throw new common_1.NotFoundException(`Subject with ID ${updateBookDto.subjectId} not found`);
            }
            book.subject = subject;
            book.subjectId = updateBookDto.subjectId;
        }
        if (updateBookDto.bookCategoryId) {
            const bookCategory = await this.bookCategoryRepository.findOne({
                where: { id: updateBookDto.bookCategoryId },
            });
            if (!bookCategory) {
                throw new common_1.NotFoundException(`Book category with ID ${updateBookDto.bookCategoryId} not found`);
            }
            book.bookCategory = bookCategory;
            book.bookCategoryId = updateBookDto.bookCategoryId;
        }
        if (updateBookDto.title)
            book.title = updateBookDto.title;
        if (updateBookDto.bookFile)
            book.book_file = updateBookDto.bookFile;
        if (updateBookDto.gradeLevel)
            book.grade_level = updateBookDto.gradeLevel;
        if (updateBookDto.status)
            book.status = updateBookDto.status;
        const updatedBook = await this.bookRepository.save(book);
        return this.toBookDto(updatedBook);
    }
    async remove(id) {
        const result = await this.bookRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Book with ID ${id} not found`);
        }
    }
    async removeAll(ids) {
        await this.bookRepository.delete(ids);
    }
    async findAllGradeLevels() {
        const result = await this.bookRepository
            .createQueryBuilder('book')
            .select('DISTINCT book.grade_level', 'grade_level')
            .orderBy('book.grade_level', 'ASC')
            .getRawMany();
        return result.map((item) => item.grade_level);
    }
    async findAllSubjects() {
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
    async findAllBookCategories() {
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
    toBookDto(book) {
        const bookDto = new book_dto_1.BookDto();
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
        if (book.book_file && book.book_file.toLowerCase().endsWith('.pdf')) {
            bookDto.thumbnail = `${book.book_file.replace('.pdf', '')}_thumbnail.jpg`;
        }
        return bookDto;
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(book_entity_1.Book)),
    __param(1, (0, typeorm_1.InjectRepository)(subject_entity_1.Subject)),
    __param(2, (0, typeorm_1.InjectRepository)(book_category_entity_1.BookCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BooksService);
//# sourceMappingURL=books.service.js.map