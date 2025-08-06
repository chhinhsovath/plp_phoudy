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
exports.SubjectGradesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const subject_grade_entity_1 = require("../../entities/subject-grade.entity");
const subject_entity_1 = require("../../entities/subject.entity");
let SubjectGradesService = class SubjectGradesService {
    subjectGradeRepository;
    subjectRepository;
    constructor(subjectGradeRepository, subjectRepository) {
        this.subjectGradeRepository = subjectGradeRepository;
        this.subjectRepository = subjectRepository;
    }
    async findAll() {
        return this.subjectGradeRepository.find({
            relations: ['subject'],
        });
    }
    async findByGradeLevel(gradeLevel) {
        return this.subjectGradeRepository.find({
            where: { grade_level: gradeLevel },
            relations: ['subject'],
        });
    }
    async findBySubjectId(subjectId) {
        return this.subjectGradeRepository.find({
            where: { subject_id: subjectId },
            relations: ['subject'],
        });
    }
    async findSubjectsByGradeLevel(gradeLevel) {
        const subjectGrades = await this.subjectGradeRepository.find({
            where: { grade_level: gradeLevel },
            relations: ['subject'],
        });
        return subjectGrades.map((sg) => sg.subject);
    }
    async findGradesBySubjectId(subjectId) {
        const subjectGrades = await this.subjectGradeRepository.find({
            where: { subject_id: subjectId },
        });
        return subjectGrades.map((sg) => sg.grade_level);
    }
    async findOne(id) {
        if (isNaN(id) || id <= 0) {
            throw new common_1.NotFoundException(`Invalid subject grade ID: ${id}`);
        }
        const subjectGrade = await this.subjectGradeRepository.findOne({
            where: { id },
            relations: ['subject'],
        });
        if (!subjectGrade) {
            throw new common_1.NotFoundException(`Subject grade with ID ${id} not found`);
        }
        return subjectGrade;
    }
    async create(createSubjectGradeDto) {
        const subject = await this.subjectRepository.findOne({
            where: { id: createSubjectGradeDto.subject_id },
        });
        if (!subject) {
            throw new common_1.NotFoundException(`Subject with ID ${createSubjectGradeDto.subject_id} not found`);
        }
        const existing = await this.subjectGradeRepository.findOne({
            where: {
                subject_id: createSubjectGradeDto.subject_id,
                grade_level: createSubjectGradeDto.grade_level,
            },
        });
        if (existing) {
            throw new Error(`Subject grade combination already exists`);
        }
        const subjectGrade = this.subjectGradeRepository.create(createSubjectGradeDto);
        return this.subjectGradeRepository.save(subjectGrade);
    }
    async update(id, updateSubjectGradeDto) {
        const subjectGrade = await this.findOne(id);
        if (updateSubjectGradeDto.subject_id) {
            const subject = await this.subjectRepository.findOne({
                where: { id: updateSubjectGradeDto.subject_id },
            });
            if (!subject) {
                throw new common_1.NotFoundException(`Subject with ID ${updateSubjectGradeDto.subject_id} not found`);
            }
        }
        Object.assign(subjectGrade, updateSubjectGradeDto);
        return this.subjectGradeRepository.save(subjectGrade);
    }
    async remove(id) {
        const result = await this.subjectGradeRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Subject grade with ID ${id} not found`);
        }
    }
    async findAllSubjectsByGrades() {
        const query = `
      SELECT 
        sg.grade_level,
        json_agg(
          json_build_object(
            'id', s.id,
            'name', s.name,
            'khmer_name', s.khmer_name,
            'status', s.status,
            'is_student', s.is_student,
            'path', s.path,
            'subject_type', s.subject_type
          ) ORDER BY s.name
        ) as subjects
      FROM subject_grades sg
      JOIN subjects s ON sg.subject_id = s.id
      WHERE s.status = 'ACTIVE'
      GROUP BY sg.grade_level
      ORDER BY sg.grade_level
    `;
        return this.subjectGradeRepository.query(query);
    }
};
exports.SubjectGradesService = SubjectGradesService;
exports.SubjectGradesService = SubjectGradesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(subject_grade_entity_1.SubjectGrade)),
    __param(1, (0, typeorm_1.InjectRepository)(subject_entity_1.Subject)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SubjectGradesService);
//# sourceMappingURL=subject-grades.service.js.map