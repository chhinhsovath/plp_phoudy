"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonActivitiesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lesson_activities_controller_1 = require("./lesson-activities.controller");
const lesson_activities_service_1 = require("./lesson-activities.service");
const questions_module_1 = require("../questions/questions.module");
const answers_module_1 = require("../answers/answers.module");
const config_1 = require("@nestjs/config");
const lesson_activity_entity_1 = require("../../entities/lesson-activity.entity");
let LessonActivitiesModule = class LessonActivitiesModule {
};
exports.LessonActivitiesModule = LessonActivitiesModule;
exports.LessonActivitiesModule = LessonActivitiesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([lesson_activity_entity_1.LessonActivity]),
            questions_module_1.QuestionsModule,
            answers_module_1.AnswersModule,
            config_1.ConfigModule,
        ],
        controllers: [lesson_activities_controller_1.LessonActivitiesController],
        providers: [lesson_activities_service_1.LessonActivitiesService],
        exports: [lesson_activities_service_1.LessonActivitiesService],
    })
], LessonActivitiesModule);
//# sourceMappingURL=lesson-activities.module.js.map