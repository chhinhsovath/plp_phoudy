"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptQuestionsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const prompt_questions_controller_1 = require("./prompt-questions.controller");
const prompt_questions_service_1 = require("./prompt-questions.service");
const prompt_question_entity_1 = require("../../entities/prompt-question.entity");
const gemma_module_1 = require("../gemma/gemma.module");
let PromptQuestionsModule = class PromptQuestionsModule {
};
exports.PromptQuestionsModule = PromptQuestionsModule;
exports.PromptQuestionsModule = PromptQuestionsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([prompt_question_entity_1.PromptQuestion]), gemma_module_1.GemmaModule],
        controllers: [prompt_questions_controller_1.PromptQuestionsController],
        providers: [prompt_questions_service_1.PromptQuestionsService],
        exports: [prompt_questions_service_1.PromptQuestionsService],
    })
], PromptQuestionsModule);
//# sourceMappingURL=prompt-questions.module.js.map