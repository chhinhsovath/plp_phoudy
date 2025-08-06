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
exports.ExaminationCategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const examination_category_entity_1 = require("../../entities/examination-category.entity");
let ExaminationCategoriesService = class ExaminationCategoriesService {
    examinationCategoryRepository;
    constructor(examinationCategoryRepository) {
        this.examinationCategoryRepository = examinationCategoryRepository;
    }
    async create(createExaminationCategoryDto) {
        const examinationCategory = this.examinationCategoryRepository.create(createExaminationCategoryDto);
        const saved = await this.examinationCategoryRepository.save(examinationCategory);
        const categoryWithRelations = await this.examinationCategoryRepository.findOne({
            where: { id: saved.id },
            relations: ['subject', 'subSubject', 'subSubject.subject'],
        });
        if (!categoryWithRelations) {
            throw new common_1.NotFoundException(`Examination category with ID ${saved.id} not found after creation`);
        }
        return this.formatExaminationCategoryResponse(categoryWithRelations);
    }
    async findAll() {
        const categories = await this.examinationCategoryRepository.find({
            relations: ['subject', 'subSubject', 'subSubject.subject'],
            order: { created_at: 'DESC' },
        });
        return categories.map((category) => this.formatExaminationCategoryResponse(category));
    }
    async findOne(id) {
        const examinationCategory = await this.examinationCategoryRepository.findOne({
            where: { id },
            relations: ['subject', 'subSubject', 'subSubject.subject'],
        });
        if (!examinationCategory) {
            throw new common_1.NotFoundException(`Examination category with ID ${id} not found`);
        }
        return this.formatExaminationCategoryResponse(examinationCategory);
    }
    async findBySubject(subjectId) {
        const categories = await this.examinationCategoryRepository.find({
            where: { subjectId },
            relations: ['subject', 'subSubject', 'subSubject.subject'],
            order: { created_at: 'DESC' },
        });
        return categories.map((category) => this.formatExaminationCategoryResponse(category));
    }
    async findBySubSubject(subSubjectId) {
        const categories = await this.examinationCategoryRepository.find({
            where: { subSubjectId },
            relations: ['subject', 'subSubject', 'subSubject.subject'],
            order: { created_at: 'DESC' },
        });
        return categories.map((category) => this.formatExaminationCategoryResponse(category));
    }
    async findByType(type) {
        const categories = await this.examinationCategoryRepository.find({
            where: { type: type },
            relations: ['subject', 'subSubject', 'subSubject.subject'],
            order: { created_at: 'DESC' },
        });
        return categories.map((category) => this.formatExaminationCategoryResponse(category));
    }
    async update(id, updateExaminationCategoryDto) {
        const examinationCategory = await this.examinationCategoryRepository.findOne({
            where: { id },
            relations: ['subject', 'subSubject', 'subSubject.subject'],
        });
        if (!examinationCategory) {
            throw new common_1.NotFoundException(`Examination category with ID ${id} not found`);
        }
        Object.assign(examinationCategory, updateExaminationCategoryDto);
        const saved = await this.examinationCategoryRepository.save(examinationCategory);
        const updatedCategory = await this.examinationCategoryRepository.findOne({
            where: { id: saved.id },
            relations: ['subject', 'subSubject', 'subSubject.subject'],
        });
        if (!updatedCategory) {
            throw new common_1.NotFoundException(`Examination category with ID ${saved.id} not found after update`);
        }
        return this.formatExaminationCategoryResponse(updatedCategory);
    }
    async remove(id) {
        const examinationCategory = await this.examinationCategoryRepository.findOne({
            where: { id },
        });
        if (!examinationCategory) {
            throw new common_1.NotFoundException(`Examination category with ID ${id} not found`);
        }
        await this.examinationCategoryRepository.remove(examinationCategory);
    }
    formatExaminationCategoryResponse(category) {
        return {
            id: category.id,
            created_at: category.created_at,
            updated_at: category.updated_at,
            title: category.title,
            subjectId: category.subjectId,
            subjectNameEn: category.subject?.name || null,
            subjectNameKh: category.subject?.khmer_name || null,
            subSubjectId: category.subSubjectId,
            subSubjectName: category.subSubject?.name || null,
            subSubjectKhmerName: category.subSubject?.khmerName || null,
            subSubjectParentSubjectId: category.subSubject?.subjectId || null,
            subSubjectParentNameEn: category.subSubject?.subject?.name || null,
            subSubjectParentNameKh: category.subSubject?.subject?.khmer_name || null,
            grade: category.grade,
            type: category.type,
            status: category.status,
            certificateFile: category.certificateFile,
        };
    }
};
exports.ExaminationCategoriesService = ExaminationCategoriesService;
exports.ExaminationCategoriesService = ExaminationCategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(examination_category_entity_1.ExaminationCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ExaminationCategoriesService);
//# sourceMappingURL=examination-categories.service.js.map