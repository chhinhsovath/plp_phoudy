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
exports.BookDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class BookDto {
    id;
    title;
    bookFile;
    thumbnail;
    gradeLevel;
    subjectId;
    subject;
    subjectKhmer;
    bookCategoryId;
    bookCategory;
    status;
}
exports.BookDto = BookDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Book ID' }),
    __metadata("design:type", Number)
], BookDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Book title' }),
    __metadata("design:type", String)
], BookDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Book file path' }),
    __metadata("design:type", String)
], BookDto.prototype, "bookFile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Book thumbnail', required: false }),
    __metadata("design:type", String)
], BookDto.prototype, "thumbnail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Grade level' }),
    __metadata("design:type", Number)
], BookDto.prototype, "gradeLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Subject ID' }),
    __metadata("design:type", Number)
], BookDto.prototype, "subjectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Subject name' }),
    __metadata("design:type", String)
], BookDto.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Subject name in Khmer', required: false }),
    __metadata("design:type", String)
], BookDto.prototype, "subjectKhmer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Book category ID' }),
    __metadata("design:type", Number)
], BookDto.prototype, "bookCategoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Book category name' }),
    __metadata("design:type", String)
], BookDto.prototype, "bookCategory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Status' }),
    __metadata("design:type", String)
], BookDto.prototype, "status", void 0);
//# sourceMappingURL=book.dto.js.map