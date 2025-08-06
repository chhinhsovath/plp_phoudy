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
exports.BookCategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const book_category_entity_1 = require("../../entities/book-category.entity");
let BookCategoriesService = class BookCategoriesService {
    bookCategoryRepository;
    constructor(bookCategoryRepository) {
        this.bookCategoryRepository = bookCategoryRepository;
    }
    async findAll() {
        const results = await this.bookCategoryRepository
            .createQueryBuilder('bookCategory')
            .leftJoin('bookCategory.subject', 'subject')
            .addSelect('bookCategory.id', 'id')
            .addSelect('bookCategory.name', 'name')
            .addSelect('bookCategory.description', 'description')
            .addSelect('bookCategory.subjectId', 'subjectId')
            .addSelect('bookCategory.gradeLevel', 'gradeLevel')
            .addSelect('bookCategory.status', 'status')
            .addSelect('bookCategory.created_at', 'created_at')
            .addSelect('bookCategory.updated_at', 'updated_at')
            .addSelect('subject.khmer_name', 'subject_khmer_name')
            .getRawMany();
        return results;
    }
    async findOne(id) {
        const result = await this.bookCategoryRepository
            .createQueryBuilder('bookCategory')
            .leftJoin('bookCategory.subject', 'subject')
            .addSelect('bookCategory.id', 'id')
            .addSelect('bookCategory.name', 'name')
            .addSelect('bookCategory.description', 'description')
            .addSelect('bookCategory.subjectId', 'subjectId')
            .addSelect('bookCategory.gradeLevel', 'gradeLevel')
            .addSelect('bookCategory.status', 'status')
            .addSelect('bookCategory.created_at', 'created_at')
            .addSelect('bookCategory.updated_at', 'updated_at')
            .addSelect('subject.khmer_name', 'subject_khmer_name')
            .where('bookCategory.id = :id', { id })
            .getRawOne();
        if (!result) {
            throw new common_1.NotFoundException(`Book category with ID ${id} not found`);
        }
        return result;
    }
    async create(createBookCategoryDto) {
        const category = new book_category_entity_1.BookCategory();
        category.name = createBookCategoryDto.name;
        category.description = createBookCategoryDto.description || '';
        category.subjectId = createBookCategoryDto.subjectId || null;
        category.gradeLevel = createBookCategoryDto.gradeLevel || null;
        category.status = createBookCategoryDto.status || 'ACTIVE';
        return this.bookCategoryRepository.save(category);
    }
    async update(id, updateBookCategoryDto) {
        const category = await this.bookCategoryRepository.findOne({
            where: { id },
        });
        if (!category) {
            throw new common_1.NotFoundException(`Book category with ID ${id} not found`);
        }
        if (updateBookCategoryDto.name) {
            category.name = updateBookCategoryDto.name;
        }
        if (updateBookCategoryDto.description !== undefined) {
            category.description = updateBookCategoryDto.description || '';
        }
        if (updateBookCategoryDto.subjectId !== undefined) {
            category.subjectId = updateBookCategoryDto.subjectId;
        }
        if (updateBookCategoryDto.gradeLevel !== undefined) {
            category.gradeLevel = updateBookCategoryDto.gradeLevel;
        }
        if (updateBookCategoryDto.status) {
            category.status = updateBookCategoryDto.status;
        }
        await this.bookCategoryRepository.save(category);
        return this.findOne(id);
    }
    async remove(id) {
        const result = await this.bookCategoryRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Book category with ID ${id} not found`);
        }
    }
};
exports.BookCategoriesService = BookCategoriesService;
exports.BookCategoriesService = BookCategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(book_category_entity_1.BookCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BookCategoriesService);
//# sourceMappingURL=book-categories.service.js.map