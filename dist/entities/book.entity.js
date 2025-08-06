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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const subject_entity_1 = require("./subject.entity");
const book_category_entity_1 = require("./book-category.entity");
let Book = class Book extends base_entity_1.BaseEntity {
    title;
    book_file;
    grade_level;
    subjectId;
    subject;
    bookCategoryId;
    bookCategory;
    status;
};
exports.Book = Book;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Book.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'book_file' }),
    __metadata("design:type", String)
], Book.prototype, "book_file", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'grade_level' }),
    __metadata("design:type", Number)
], Book.prototype, "grade_level", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'subject_id' }),
    __metadata("design:type", Number)
], Book.prototype, "subjectId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subject_entity_1.Subject),
    (0, typeorm_1.JoinColumn)({ name: 'subject_id' }),
    __metadata("design:type", subject_entity_1.Subject)
], Book.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'book_category_id' }),
    __metadata("design:type", Number)
], Book.prototype, "bookCategoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => book_category_entity_1.BookCategory),
    (0, typeorm_1.JoinColumn)({ name: 'book_category_id' }),
    __metadata("design:type", book_category_entity_1.BookCategory)
], Book.prototype, "bookCategory", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'ACTIVE' }),
    __metadata("design:type", String)
], Book.prototype, "status", void 0);
exports.Book = Book = __decorate([
    (0, typeorm_1.Entity)('books')
], Book);
//# sourceMappingURL=book.entity.js.map