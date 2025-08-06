"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExaminationCategoriesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const examination_categories_service_1 = require("./examination-categories.service");
const create_examination_category_dto_1 = require("./dto/create-examination-category.dto");
const update_examination_category_dto_1 = require("./dto/update-examination-category.dto");
let ExaminationCategoriesController = class ExaminationCategoriesController {
    examinationCategoriesService;
    constructor(examinationCategoriesService) {
        this.examinationCategoriesService = examinationCategoriesService;
    }
    create(createExaminationCategoryDto) {
        return this.examinationCategoriesService.create(createExaminationCategoryDto);
    }
    findAll() {
        return this.examinationCategoriesService.findAll();
    }
    findBySubject(subjectId) {
        return this.examinationCategoriesService.findBySubject(+subjectId);
    }
    findBySubSubject(subSubjectId) {
        return this.examinationCategoriesService.findBySubSubject(+subSubjectId);
    }
    findByType(type) {
        return this.examinationCategoriesService.findByType(type);
    }
    findOne(id) {
        return this.examinationCategoriesService.findOne(+id);
    }
    update(id, updateExaminationCategoryDto) {
        return this.examinationCategoriesService.update(+id, updateExaminationCategoryDto);
    }
    remove(id) {
        return this.examinationCategoriesService.remove(+id);
    }
};
exports.ExaminationCategoriesController = ExaminationCategoriesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_examination_category_dto_1.CreateExaminationCategoryDto]),
    __metadata("design:returntype", void 0)
], ExaminationCategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExaminationCategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('by-subject/:subjectId'),
    __param(0, (0, common_1.Param)('subjectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExaminationCategoriesController.prototype, "findBySubject", null);
__decorate([
    (0, common_1.Get)('by-sub-subject/:subSubjectId'),
    __param(0, (0, common_1.Param)('subSubjectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExaminationCategoriesController.prototype, "findBySubSubject", null);
__decorate([
    (0, common_1.Get)('by-type'),
    __param(0, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExaminationCategoriesController.prototype, "findByType", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExaminationCategoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_examination_category_dto_1.UpdateExaminationCategoryDto]),
    __metadata("design:returntype", void 0)
], ExaminationCategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExaminationCategoriesController.prototype, "remove", null);
exports.ExaminationCategoriesController = ExaminationCategoriesController = __decorate([
    (0, common_1.Controller)('examination-categories'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [examination_categories_service_1.ExaminationCategoriesService])
], ExaminationCategoriesController);
//# sourceMappingURL=examination-categories.controller.js.map