"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateExaminationCategoryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_examination_category_dto_1 = require("./create-examination-category.dto");
class UpdateExaminationCategoryDto extends (0, mapped_types_1.PartialType)(create_examination_category_dto_1.CreateExaminationCategoryDto) {
}
exports.UpdateExaminationCategoryDto = UpdateExaminationCategoryDto;
//# sourceMappingURL=update-examination-category.dto.js.map