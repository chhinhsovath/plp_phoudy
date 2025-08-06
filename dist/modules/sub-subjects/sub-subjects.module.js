"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubSubjectsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const sub_subjects_service_1 = require("./sub-subjects.service");
const sub_subjects_controller_1 = require("./sub-subjects.controller");
const sub_subject_entity_1 = require("../../entities/sub-subject.entity");
let SubSubjectsModule = class SubSubjectsModule {
};
exports.SubSubjectsModule = SubSubjectsModule;
exports.SubSubjectsModule = SubSubjectsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([sub_subject_entity_1.SubSubject])],
        controllers: [sub_subjects_controller_1.SubSubjectsController],
        providers: [sub_subjects_service_1.SubSubjectsService],
        exports: [sub_subjects_service_1.SubSubjectsService],
    })
], SubSubjectsModule);
//# sourceMappingURL=sub-subjects.module.js.map