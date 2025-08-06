"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBookCategoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_book_category_dto_1 = require("./create-book-category.dto");
class UpdateBookCategoryDto extends (0, swagger_1.PartialType)(create_book_category_dto_1.CreateBookCategoryDto) {
}
exports.UpdateBookCategoryDto = UpdateBookCategoryDto;
//# sourceMappingURL=update-book-category.dto.js.map