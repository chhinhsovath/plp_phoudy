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
exports.BooksController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const books_service_1 = require("./books.service");
const create_book_dto_1 = require("./dto/create-book.dto");
const update_book_dto_1 = require("./dto/update-book.dto");
const file_storage_service_1 = require("../file-storage/file-storage.service");
let BooksController = class BooksController {
    booksService;
    fileStorageService;
    constructor(booksService, fileStorageService) {
        this.booksService = booksService;
        this.fileStorageService = fileStorageService;
    }
    async findAll(bookCategoryId, subjectId, gradeLevel, status, title) {
        if (bookCategoryId && status) {
            return this.booksService.findByBookCategoryAndStatus(bookCategoryId, status);
        }
        else if (bookCategoryId) {
            return this.booksService.findByBookCategory(bookCategoryId);
        }
        else if (subjectId) {
            return this.booksService.findBySubject(subjectId);
        }
        else if (gradeLevel) {
            return this.booksService.findByGradeLevel(gradeLevel);
        }
        else if (status) {
            return this.booksService.findByStatus(status);
        }
        else if (title) {
            return this.booksService.findByTitleContaining(title);
        }
        else {
            return this.booksService.findAll();
        }
    }
    findOne(id) {
        return this.booksService.findOne(id);
    }
    async create(createBookDto, bookFile) {
        if (!bookFile) {
            throw new common_1.BadRequestException('Book file is required');
        }
        const bookFileName = await this.fileStorageService.storeFile(bookFile, false);
        createBookDto.bookFile = bookFileName;
        return this.booksService.create(createBookDto);
    }
    async update(id, updateBookDto, bookFile) {
        if (bookFile) {
            const bookFileName = await this.fileStorageService.storeFile(bookFile, false);
            updateBookDto.bookFile = bookFileName;
        }
        return this.booksService.update(id, updateBookDto);
    }
    async updatePut(id, updateBookDto) {
        return this.booksService.update(id, updateBookDto);
    }
    remove(id) {
        return this.booksService.remove(id);
    }
    removeAll(ids) {
        return this.booksService.removeAll(ids);
    }
    findByGradeLevel(gradeLevel) {
        return this.booksService.findByGradeLevel(gradeLevel);
    }
    async getAvailableGrades() {
        const grades = await this.booksService.findAllGradeLevels();
        return grades.map((grade) => ({ grade: grade.toString() }));
    }
    findBySubject(subjectId) {
        return this.booksService.findBySubject(subjectId);
    }
    getAvailableSubjects() {
        return this.booksService.findAllSubjects();
    }
    findByCategory(bookCategoryId) {
        return this.booksService.findByBookCategory(bookCategoryId);
    }
    getAvailableCategories() {
        return this.booksService.findAllBookCategories();
    }
};
exports.BooksController = BooksController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all books with optional filters' }),
    (0, swagger_1.ApiQuery)({ name: 'bookCategoryId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'subjectId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'gradeLevel', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'title', required: false }),
    __param(0, (0, common_1.Query)('bookCategoryId')),
    __param(1, (0, common_1.Query)('subjectId')),
    __param(2, (0, common_1.Query)('gradeLevel')),
    __param(3, (0, common_1.Query)('status')),
    __param(4, (0, common_1.Query)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a book by ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new book' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('bookFile')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_book_dto_1.CreateBookDto, Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a book' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('bookFile')),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_book_dto_1.UpdateBookDto, Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a book (PUT method)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_book_dto_1.UpdateBookDto]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "updatePut", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a book' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)('bulk'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete multiple books' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "removeAll", null);
__decorate([
    (0, common_1.Get)('grade/:gradeLevel'),
    (0, swagger_1.ApiOperation)({ summary: 'Get books by grade level' }),
    __param(0, (0, common_1.Param)('gradeLevel', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "findByGradeLevel", null);
__decorate([
    (0, common_1.Get)('grades'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all available grade levels' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "getAvailableGrades", null);
__decorate([
    (0, common_1.Get)('subject/:subjectId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get books by subject' }),
    __param(0, (0, common_1.Param)('subjectId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "findBySubject", null);
__decorate([
    (0, common_1.Get)('subjects'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all available subjects' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "getAvailableSubjects", null);
__decorate([
    (0, common_1.Get)('category/:bookCategoryId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get books by category' }),
    __param(0, (0, common_1.Param)('bookCategoryId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "findByCategory", null);
__decorate([
    (0, common_1.Get)('categories'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all available book categories' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "getAvailableCategories", null);
exports.BooksController = BooksController = __decorate([
    (0, swagger_1.ApiTags)('Books'),
    (0, common_1.Controller)('books'),
    __metadata("design:paramtypes", [books_service_1.BooksService,
        file_storage_service_1.FileStorageService])
], BooksController);
//# sourceMappingURL=books.controller.js.map