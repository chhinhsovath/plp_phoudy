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
exports.BookCategoriesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const book_categories_service_1 = require("./book-categories.service");
const create_book_category_dto_1 = require("./dto/create-book-category.dto");
const update_book_category_dto_1 = require("./dto/update-book-category.dto");
let BookCategoriesController = class BookCategoriesController {
    bookCategoriesService;
    constructor(bookCategoriesService) {
        this.bookCategoriesService = bookCategoriesService;
    }
    findAll() {
        return this.bookCategoriesService.findAll();
    }
    findOne(id) {
        return this.bookCategoriesService.findOne(id);
    }
    create(createBookCategoryDto) {
        return this.bookCategoriesService.create(createBookCategoryDto);
    }
    update(id, updateBookCategoryDto) {
        return this.bookCategoriesService.update(id, updateBookCategoryDto);
    }
    remove(id) {
        return this.bookCategoriesService.remove(id);
    }
};
exports.BookCategoriesController = BookCategoriesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all book categories' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookCategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a book category by ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookCategoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new book category' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_book_category_dto_1.CreateBookCategoryDto]),
    __metadata("design:returntype", Promise)
], BookCategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a book category' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_book_category_dto_1.UpdateBookCategoryDto]),
    __metadata("design:returntype", Promise)
], BookCategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a book category' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookCategoriesController.prototype, "remove", null);
exports.BookCategoriesController = BookCategoriesController = __decorate([
    (0, swagger_1.ApiTags)('Book Categories'),
    (0, common_1.Controller)('book-categories'),
    __metadata("design:paramtypes", [book_categories_service_1.BookCategoriesService])
], BookCategoriesController);
//# sourceMappingURL=book-categories.controller.js.map