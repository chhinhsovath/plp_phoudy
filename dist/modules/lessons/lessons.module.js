"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lessons_controller_1 = require("./lessons.controller");
const lessons_service_1 = require("./lessons.service");
const lesson_entity_1 = require("../../entities/lesson.entity");
const lesson_activity_entity_1 = require("../../entities/lesson-activity.entity");
const subject_entity_1 = require("../../entities/subject.entity");
const user_entity_1 = require("../../entities/user.entity");
const lesson_activities_module_1 = require("../lesson-activities/lesson-activities.module");
let LessonsModule = class LessonsModule {
};
exports.LessonsModule = LessonsModule;
exports.LessonsModule = LessonsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([lesson_entity_1.Lesson, lesson_activity_entity_1.LessonActivity, subject_entity_1.Subject, user_entity_1.User]),
            lesson_activities_module_1.LessonActivitiesModule,
        ],
        controllers: [lessons_controller_1.LessonsController],
        providers: [lessons_service_1.LessonsService],
        exports: [lessons_service_1.LessonsService],
    })
], LessonsModule);
//# sourceMappingURL=lessons.module.js.map