"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectGradesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const subject_grades_controller_1 = require("./subject-grades.controller");
const subject_grades_service_1 = require("./subject-grades.service");
const subject_grade_entity_1 = require("../../entities/subject-grade.entity");
const subject_entity_1 = require("../../entities/subject.entity");
let SubjectGradesModule = class SubjectGradesModule {
};
exports.SubjectGradesModule = SubjectGradesModule;
exports.SubjectGradesModule = SubjectGradesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([subject_grade_entity_1.SubjectGrade, subject_entity_1.Subject])],
        controllers: [subject_grades_controller_1.SubjectGradesController],
        providers: [subject_grades_service_1.SubjectGradesService],
        exports: [subject_grades_service_1.SubjectGradesService],
    })
], SubjectGradesModule);
//# sourceMappingURL=subject-grades.module.js.map