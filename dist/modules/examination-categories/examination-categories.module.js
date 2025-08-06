"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExaminationCategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const examination_categories_controller_1 = require("./examination-categories.controller");
const examination_categories_service_1 = require("./examination-categories.service");
const examination_category_entity_1 = require("../../entities/examination-category.entity");
let ExaminationCategoriesModule = class ExaminationCategoriesModule {
};
exports.ExaminationCategoriesModule = ExaminationCategoriesModule;
exports.ExaminationCategoriesModule = ExaminationCategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([examination_category_entity_1.ExaminationCategory])],
        controllers: [examination_categories_controller_1.ExaminationCategoriesController],
        providers: [examination_categories_service_1.ExaminationCategoriesService],
        exports: [examination_categories_service_1.ExaminationCategoriesService],
    })
], ExaminationCategoriesModule);
//# sourceMappingURL=examination-categories.module.js.map