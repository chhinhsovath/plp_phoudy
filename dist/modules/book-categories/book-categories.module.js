"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookCategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const book_categories_service_1 = require("./book-categories.service");
const book_categories_controller_1 = require("./book-categories.controller");
const book_category_entity_1 = require("../../entities/book-category.entity");
const subject_entity_1 = require("../../entities/subject.entity");
let BookCategoriesModule = class BookCategoriesModule {
};
exports.BookCategoriesModule = BookCategoriesModule;
exports.BookCategoriesModule = BookCategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([book_category_entity_1.BookCategory, subject_entity_1.Subject])],
        controllers: [book_categories_controller_1.BookCategoriesController],
        providers: [book_categories_service_1.BookCategoriesService],
        exports: [book_categories_service_1.BookCategoriesService],
    })
], BookCategoriesModule);
//# sourceMappingURL=book-categories.module.js.map