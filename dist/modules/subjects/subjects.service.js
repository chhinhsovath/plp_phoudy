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
exports.SubjectsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const subject_entity_1 = require("../../entities/subject.entity");
const status_enum_1 = require("../../entities/enums/status.enum");
const subject_entity_2 = require("../../entities/subject.entity");
let SubjectsService = class SubjectsService {
    subjectRepository;
    constructor(subjectRepository) {
        this.subjectRepository = subjectRepository;
    }
    async findAll() {
        return this.subjectRepository.find();
    }
    async findActive() {
        return this.subjectRepository
            .createQueryBuilder('subject')
            .where('subject.status = :status', { status: status_enum_1.Status.ACTIVE })
            .getMany();
    }
    async findStudentSubjects() {
        return this.subjectRepository
            .createQueryBuilder('subject')
            .where('subject.is_student = :isStudent', { isStudent: true })
            .andWhere('subject.status = :status', { status: status_enum_1.Status.ACTIVE })
            .getMany();
    }
    async findByGradeLevel(gradeLevel) {
        return this.subjectRepository
            .createQueryBuilder('subject')
            .innerJoin('subject_grades', 'sg', 'subject.id = sg.subject_id')
            .where('sg.grade_level = :gradeLevel', { gradeLevel })
            .andWhere('subject.status = :status', { status: status_enum_1.Status.ACTIVE })
            .getMany();
    }
    async findActiveByGradeLevel(gradeLevel) {
        return this.subjectRepository
            .createQueryBuilder('subject')
            .innerJoin('subject_grades', 'sg', 'subject.id = sg.subject_id')
            .where('sg.grade_level = :gradeLevel', { gradeLevel })
            .andWhere('subject.status = :status', { status: status_enum_1.Status.ACTIVE })
            .getMany();
    }
    async findOne(id) {
        if (isNaN(id) || id <= 0) {
            throw new common_1.NotFoundException(`Invalid subject ID: ${id}`);
        }
        const subject = await this.subjectRepository.findOne({ where: { id } });
        if (!subject) {
            throw new common_1.NotFoundException(`Subject with ID ${id} not found`);
        }
        return subject;
    }
    async findByPath(path) {
        const subject = await this.subjectRepository
            .createQueryBuilder('subject')
            .where('subject.path = :path', { path })
            .getOne();
        if (!subject) {
            throw new common_1.NotFoundException(`Subject with path ${path} not found`);
        }
        return subject;
    }
    async findSpecialSubjects() {
        return this.subjectRepository
            .createQueryBuilder('subject')
            .where('subject.subject_type = :type', { type: subject_entity_2.SubjectType.SPECIAL })
            .andWhere('subject.status = :status', { status: status_enum_1.Status.ACTIVE })
            .getMany();
    }
    findSubjectContent() {
        return [];
    }
    async create(createSubjectDto) {
        const subject = new subject_entity_1.Subject();
        subject.name = createSubjectDto.name;
        if (createSubjectDto.khmer_name !== undefined)
            subject.khmer_name = createSubjectDto.khmer_name;
        if (createSubjectDto.description !== undefined)
            subject.description = createSubjectDto.description;
        if (createSubjectDto.is_student !== undefined)
            subject.is_student = createSubjectDto.is_student;
        if (createSubjectDto.path !== undefined)
            subject.path = createSubjectDto.path;
        if (createSubjectDto.subject_type !== undefined)
            subject.subject_type = createSubjectDto.subject_type;
        subject.status = createSubjectDto.status || status_enum_1.Status.ACTIVE;
        return this.subjectRepository.save(subject);
    }
    async update(id, updateSubjectDto) {
        const subject = await this.findOne(id);
        if (updateSubjectDto.name !== undefined)
            subject.name = updateSubjectDto.name;
        if (updateSubjectDto.khmer_name !== undefined)
            subject.khmer_name = updateSubjectDto.khmer_name;
        if (updateSubjectDto.description !== undefined)
            subject.description = updateSubjectDto.description;
        if (updateSubjectDto.status !== undefined)
            subject.status = updateSubjectDto.status;
        if (updateSubjectDto.is_student !== undefined)
            subject.is_student = updateSubjectDto.is_student;
        if (updateSubjectDto.path !== undefined)
            subject.path = updateSubjectDto.path;
        if (updateSubjectDto.subject_type !== undefined)
            subject.subject_type = updateSubjectDto.subject_type;
        return this.subjectRepository.save(subject);
    }
    async remove(id) {
        const result = await this.subjectRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Subject with ID ${id} not found`);
        }
    }
    async activate(id) {
        const subject = await this.findOne(id);
        subject.status = status_enum_1.Status.ACTIVE;
        return this.subjectRepository.save(subject);
    }
    async deactivate(id) {
        const subject = await this.findOne(id);
        subject.status = status_enum_1.Status.INACTIVE;
        return this.subjectRepository.save(subject);
    }
    async findNormalSubjects() {
        return this.subjectRepository
            .createQueryBuilder('subject')
            .where('subject.subject_type = :type', { type: subject_entity_2.SubjectType.NORMAL })
            .andWhere('subject.status = :status', { status: status_enum_1.Status.ACTIVE })
            .getMany();
    }
    async findAllGradesWithSubjects() {
        const query = `
      SELECT 
        sg.grade_level,
        json_agg(
          json_build_object(
            'id', s.id,
            'name', s.name,
            'khmer_name', s.khmer_name,
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
        return this.subjectRepository.query(query);
    }
    async findGradesBySubjectId(subjectId) {
        if (isNaN(subjectId) || subjectId <= 0) {
            throw new common_1.NotFoundException(`Invalid subject ID: ${subjectId}`);
        }
        const subject = await this.subjectRepository.findOne({
            where: { id: subjectId },
        });
        if (!subject) {
            throw new common_1.NotFoundException(`Subject with ID ${subjectId} not found`);
        }
        const query = `
      SELECT 
        sg.grade_level
      FROM subject_grades sg
      WHERE sg.subject_id = $1
      ORDER BY sg.grade_level
    `;
        return this.subjectRepository.query(query, [subjectId]);
    }
    async findActiveForDropdown() {
        return this.subjectRepository
            .createQueryBuilder('subject')
            .select(['subject.name', 'subject.khmer_name', 'subject.path'])
            .where('subject.status = :status', { status: status_enum_1.Status.ACTIVE })
            .orderBy('subject.name', 'ASC')
            .getMany();
    }
};
exports.SubjectsService = SubjectsService;
exports.SubjectsService = SubjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(subject_entity_1.Subject)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SubjectsService);
//# sourceMappingURL=subjects.service.js.map