"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateQuestionTypeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_question_type_dto_1 = require("./create-question-type.dto");
class UpdateQuestionTypeDto extends (0, mapped_types_1.PartialType)(create_question_type_dto_1.CreateQuestionTypeDto) {
}
exports.UpdateQuestionTypeDto = UpdateQuestionTypeDto;
//# sourceMappingURL=update-question-type.dto.js.map