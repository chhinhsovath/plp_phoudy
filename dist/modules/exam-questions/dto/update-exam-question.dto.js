"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateExamQuestionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_exam_question_dto_1 = require("./create-exam-question.dto");
class UpdateExamQuestionDto extends (0, swagger_1.PartialType)(create_exam_question_dto_1.CreateExamQuestionDto) {
}
exports.UpdateExamQuestionDto = UpdateExamQuestionDto;
//# sourceMappingURL=update-exam-question.dto.js.map