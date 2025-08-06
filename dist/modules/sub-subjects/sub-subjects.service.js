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
exports.SubSubjectsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sub_subject_entity_1 = require("../../entities/sub-subject.entity");
let SubSubjectsService = class SubSubjectsService {
    subSubjectRepository;
    constructor(subSubjectRepository) {
        this.subSubjectRepository = subSubjectRepository;
    }
    async create(createSubSubjectDto) {
        const subSubject = this.subSubjectRepository.create(createSubSubjectDto);
        const saved = await this.subSubjectRepository.save(subSubject);
        const subSubjectWithSubject = await this.subSubjectRepository.findOne({
            where: { id: saved.id },
            relations: ['subject'],
        });
        if (!subSubjectWithSubject) {
            throw new common_1.NotFoundException(`Sub subject with ID ${saved.id} not found after creation`);
        }
        return this.formatSubSubjectResponse(subSubjectWithSubject);
    }
    async findAll() {
        const subSubjects = await this.subSubjectRepository.find({
            relations: ['subject'],
            order: { created_at: 'DESC' },
        });
        return subSubjects.map((subSubject) => this.formatSubSubjectResponse(subSubject));
    }
    async findOne(id) {
        const subSubject = await this.subSubjectRepository.findOne({
            where: { id },
            relations: ['subject'],
        });
        if (!subSubject) {
            throw new common_1.NotFoundException(`Sub subject with ID ${id} not found`);
        }
        return this.formatSubSubjectResponse(subSubject);
    }
    async findBySubject(subjectId) {
        const subSubjects = await this.subSubjectRepository.find({
            where: { subjectId },
            relations: ['subject'],
            order: { created_at: 'DESC' },
        });
        return subSubjects.map((subSubject) => this.formatSubSubjectResponse(subSubject));
    }
    async findByStatus(status) {
        const subSubjects = await this.subSubjectRepository.find({
            where: { status },
            relations: ['subject'],
            order: { created_at: 'DESC' },
        });
        return subSubjects.map((subSubject) => this.formatSubSubjectResponse(subSubject));
    }
    async update(id, updateSubSubjectDto) {
        const subSubject = await this.subSubjectRepository.findOne({
            where: { id },
            relations: ['subject'],
        });
        if (!subSubject) {
            throw new common_1.NotFoundException(`Sub subject with ID ${id} not found`);
        }
        Object.assign(subSubject, updateSubSubjectDto);
        const saved = await this.subSubjectRepository.save(subSubject);
        const updatedSubSubject = await this.subSubjectRepository.findOne({
            where: { id: saved.id },
            relations: ['subject'],
        });
        if (!updatedSubSubject) {
            throw new common_1.NotFoundException(`Sub subject with ID ${saved.id} not found after update`);
        }
        return this.formatSubSubjectResponse(updatedSubSubject);
    }
    async remove(id) {
        const subSubject = await this.subSubjectRepository.findOne({
            where: { id },
        });
        if (!subSubject) {
            throw new common_1.NotFoundException(`Sub subject with ID ${id} not found`);
        }
        await this.subSubjectRepository.remove(subSubject);
    }
    formatSubSubjectResponse(subSubject) {
        return {
            id: subSubject.id,
            created_at: subSubject.created_at,
            updated_at: subSubject.updated_at,
            subjectId: subSubject.subjectId,
            subjectNameEn: subSubject.subject?.name || null,
            subjectNameKh: subSubject.subject?.khmer_name || null,
            name: subSubject.name,
            khmerName: subSubject.khmerName,
            description: subSubject.description,
            status: subSubject.status,
            path: subSubject.path,
        };
    }
};
exports.SubSubjectsService = SubSubjectsService;
exports.SubSubjectsService = SubSubjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sub_subject_entity_1.SubSubject)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SubSubjectsService);
//# sourceMappingURL=sub-subjects.service.js.map