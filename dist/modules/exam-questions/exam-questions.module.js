"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamQuestionsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const exam_question_entity_1 = require("../../entities/exam-question.entity");
const exam_questions_service_1 = require("./exam-questions.service");
const exam_questions_controller_1 = require("./exam-questions.controller");
let ExamQuestionsModule = class ExamQuestionsModule {
};
exports.ExamQuestionsModule = ExamQuestionsModule;
exports.ExamQuestionsModule = ExamQuestionsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([exam_question_entity_1.ExamQuestion])],
        controllers: [exam_questions_controller_1.ExamQuestionsController],
        providers: [exam_questions_service_1.ExamQuestionsService],
        exports: [exam_questions_service_1.ExamQuestionsService],
    })
], ExamQuestionsModule);
//# sourceMappingURL=exam-questions.module.js.map