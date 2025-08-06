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
exports.LessonsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const lesson_entity_1 = require("../../entities/lesson.entity");
const lesson_activity_entity_1 = require("../../entities/lesson-activity.entity");
const subject_entity_1 = require("../../entities/subject.entity");
const user_entity_1 = require("../../entities/user.entity");
const status_enum_1 = require("../../entities/enums/status.enum");
let LessonsService = class LessonsService {
    lessonRepository;
    lessonActivityRepository;
    subjectRepository;
    userRepository;
    constructor(lessonRepository, lessonActivityRepository, subjectRepository, userRepository) {
        this.lessonRepository = lessonRepository;
        this.lessonActivityRepository = lessonActivityRepository;
        this.subjectRepository = subjectRepository;
        this.userRepository = userRepository;
    }
    async findAll() {
        return this.lessonRepository.find({
            relations: ['subject', 'creator'],
        });
    }
    async findOne(id) {
        const lesson = await this.lessonRepository.findOne({
            where: { id },
            relations: ['subject', 'creator'],
        });
        if (!lesson) {
            throw new common_1.NotFoundException(`Lesson with ID ${id} not found`);
        }
        return lesson;
    }
    async findBySubjectAndGrade(subjectId, gradeLevel) {
        return this.lessonRepository.find({
            where: {
                subjectId,
                grade_level: gradeLevel,
            },
            relations: ['subject', 'creator'],
        });
    }
    async findActiveBySubjectAndGrade(subjectId, gradeLevel) {
        return this.lessonRepository.find({
            where: {
                subjectId,
                grade_level: gradeLevel,
                status: status_enum_1.Status.ACTIVE,
            },
            relations: ['subject', 'creator'],
            order: { created_at: 'DESC' },
        });
    }
    async findBySubjectAndGradeOrderByLessonNumber(subjectId, gradeLevel) {
        return this.lessonRepository.find({
            where: {
                subjectId,
                grade_level: gradeLevel,
            },
            relations: ['subject', 'creator'],
            order: { lesson_number: 'ASC' },
        });
    }
    async findActiveBySubjectAndGradeOrderByLessonNumber(subjectId, gradeLevel) {
        return this.lessonRepository.find({
            where: {
                subjectId,
                grade_level: gradeLevel,
                status: status_enum_1.Status.ACTIVE,
            },
            relations: ['subject', 'creator'],
            order: { lesson_number: 'ASC' },
        });
    }
    async create(createLessonDto, userId) {
        const subject = await this.subjectRepository.findOne({
            where: { id: createLessonDto.subjectId },
        });
        if (!subject) {
            throw new common_1.NotFoundException(`Subject with ID ${createLessonDto.subjectId} not found`);
        }
        const creator = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!creator) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        const lesson = new lesson_entity_1.Lesson();
        lesson.title = createLessonDto.title;
        if (createLessonDto.description !== undefined) {
            lesson.description = createLessonDto.description;
        }
        lesson.grade_level = createLessonDto.gradeLevel;
        lesson.lesson_number = createLessonDto.lessonNumber;
        lesson.is_hidden = createLessonDto.isHidden || false;
        lesson.status =
            createLessonDto.status === 'INACTIVE' ? status_enum_1.Status.INACTIVE : status_enum_1.Status.ACTIVE;
        lesson.subject = subject;
        lesson.creator = creator;
        return this.lessonRepository.save(lesson);
    }
    async update(id, updateLessonDto) {
        const lesson = await this.findOne(id);
        if (updateLessonDto.subjectId) {
            const subject = await this.subjectRepository.findOne({
                where: { id: updateLessonDto.subjectId },
            });
            if (!subject) {
                throw new common_1.NotFoundException(`Subject with ID ${updateLessonDto.subjectId} not found`);
            }
            lesson.subject = subject;
        }
        if (updateLessonDto.title)
            lesson.title = updateLessonDto.title;
        if (updateLessonDto.description !== undefined)
            lesson.description = updateLessonDto.description;
        if (updateLessonDto.gradeLevel)
            lesson.grade_level = updateLessonDto.gradeLevel;
        if (updateLessonDto.lessonNumber)
            lesson.lesson_number = updateLessonDto.lessonNumber;
        if (updateLessonDto.isHidden !== undefined)
            lesson.is_hidden = updateLessonDto.isHidden;
        if (updateLessonDto.status) {
            lesson.status =
                updateLessonDto.status === 'INACTIVE' ? status_enum_1.Status.INACTIVE : status_enum_1.Status.ACTIVE;
        }
        return this.lessonRepository.save(lesson);
    }
    async remove(id) {
        const result = await this.lessonRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Lesson with ID ${id} not found`);
        }
    }
    async findLessonActivitiesBySubjectAndGrade(subjectId, gradeLevel) {
        const lessons = await this.findBySubjectAndGrade(subjectId, gradeLevel);
        const lessonIds = lessons.map((lesson) => lesson.id);
        const activities = await this.lessonActivityRepository
            .createQueryBuilder('activity')
            .where('activity.lesson_id IN (:...lessonIds)', { lessonIds })
            .getMany();
        return activities.map((activity) => this.convertToActivityDto(activity));
    }
    async findLessonActivitiesBySubjectAndGradeOrdered(subjectId, gradeLevel) {
        const lessons = await this.findBySubjectAndGradeOrderByLessonNumber(subjectId, gradeLevel);
        const lessonIds = lessons.map((lesson) => lesson.id);
        const activities = await this.lessonActivityRepository
            .createQueryBuilder('activity')
            .where('activity.lesson_id IN (:...lessonIds)', { lessonIds })
            .orderBy('activity.order_index', 'ASC')
            .getMany();
        return activities.map((activity) => this.convertToActivityDto(activity));
    }
    async findLessonActivitiesByLessonId(lessonId) {
        const activities = await this.lessonActivityRepository.find({
            where: { lessonId },
            order: { order_index: 'ASC' },
        });
        return activities.map((activity) => this.convertToActivityDto(activity));
    }
    async findSimplifiedBySubjectAndGrade(subjectId, gradeLevel) {
        const lessons = await this.lessonRepository
            .createQueryBuilder('lesson')
            .leftJoinAndSelect('lesson.subject', 'subject')
            .select([
            'lesson.id',
            'lesson.title',
            'lesson.lesson_number',
            'lesson.grade_level',
            'lesson.status',
            'subject.id',
            'subject.name',
            'subject.khmer_name',
        ])
            .where('lesson.subjectId = :subjectId', { subjectId })
            .andWhere('lesson.grade_level = :gradeLevel', { gradeLevel })
            .andWhere('lesson.status = :status', { status: status_enum_1.Status.ACTIVE })
            .orderBy('lesson.lesson_number', 'ASC')
            .getMany();
        return lessons.map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
            lesson_number: lesson.lesson_number,
            grade_level: lesson.grade_level,
            status: lesson.status,
            subject: {
                id: lesson.subject.id,
                name: lesson.subject.name,
                khmer_name: lesson.subject.khmer_name,
            },
        }));
    }
    convertToActivityDto(activity) {
        return {
            id: activity.id,
            lessonId: activity.lessonId,
            title: activity.title,
            orderIndex: activity.order_index,
            status: activity.status,
            createdAt: activity.created_at,
            updatedAt: activity.updated_at,
        };
    }
    async findBySubject(subjectId) {
        const lessons = await this.lessonRepository
            .createQueryBuilder('lesson')
            .leftJoinAndSelect('lesson.subject', 'subject')
            .where('lesson.subjectId = :subjectId', { subjectId })
            .orderBy('lesson.grade_level', 'ASC')
            .addOrderBy('lesson.lesson_number', 'ASC')
            .getMany();
        return lessons.map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
            grade_level: lesson.grade_level,
            lesson_number: lesson.lesson_number,
            subject: {
                name: lesson.subject.name,
                khmer_name: lesson.subject.khmer_name,
            },
            status: lesson.status,
        }));
    }
    async findActiveBySubject(subjectId) {
        const lessons = await this.lessonRepository
            .createQueryBuilder('lesson')
            .leftJoinAndSelect('lesson.subject', 'subject')
            .where('lesson.subjectId = :subjectId', { subjectId })
            .andWhere('lesson.status = :status', { status: 'ACTIVE' })
            .orderBy('lesson.grade_level', 'ASC')
            .addOrderBy('lesson.lesson_number', 'ASC')
            .getMany();
        return lessons.map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
            grade_level: lesson.grade_level,
            lesson_number: lesson.lesson_number,
            subject: {
                name: lesson.subject.name,
                khmer_name: lesson.subject.khmer_name,
            },
            status: lesson.status,
        }));
    }
    async findBySubjectName(subjectName) {
        const lessons = await this.lessonRepository
            .createQueryBuilder('lesson')
            .leftJoinAndSelect('lesson.subject', 'subject')
            .where('LOWER(subject.name) = LOWER(:subjectName)', { subjectName })
            .orderBy('lesson.grade_level', 'ASC')
            .addOrderBy('lesson.lesson_number', 'ASC')
            .getMany();
        if (!lessons.length) {
            throw new common_1.NotFoundException(`No lessons found for subject: ${subjectName}`);
        }
        return lessons.map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
            grade_level: lesson.grade_level,
            lesson_number: lesson.lesson_number,
            subject: {
                name: lesson.subject.name,
                khmer_name: lesson.subject.khmer_name,
            },
            status: lesson.status,
        }));
    }
    async findActiveBySubjectName(subjectName) {
        const lessons = await this.lessonRepository
            .createQueryBuilder('lesson')
            .leftJoinAndSelect('lesson.subject', 'subject')
            .where('LOWER(subject.name) = LOWER(:subjectName)', { subjectName })
            .andWhere('lesson.status = :status', { status: 'ACTIVE' })
            .orderBy('lesson.grade_level', 'ASC')
            .addOrderBy('lesson.lesson_number', 'ASC')
            .getMany();
        if (!lessons.length) {
            throw new common_1.NotFoundException(`No active lessons found for subject: ${subjectName}`);
        }
        return lessons.map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
            grade_level: lesson.grade_level,
            lesson_number: lesson.lesson_number,
            subject: {
                name: lesson.subject.name,
                khmer_name: lesson.subject.khmer_name,
            },
            status: lesson.status,
        }));
    }
    async findAllSimplified(subjectId, gradeLevel) {
        const queryBuilder = this.lessonRepository
            .createQueryBuilder('lesson')
            .leftJoin('lesson.subject', 'subject')
            .leftJoin('lesson.creator', 'creator')
            .addSelect('lesson.id', 'id')
            .addSelect('lesson.subjectId', 'subjectId')
            .addSelect('lesson.title', 'title')
            .addSelect('lesson.description', 'description')
            .addSelect('lesson.grade_level', 'grade_level')
            .addSelect('lesson.lesson_number', 'lesson_number')
            .addSelect('lesson.createdBy', 'createdBy')
            .addSelect('lesson.status', 'status')
            .addSelect('lesson.is_hidden', 'is_hidden')
            .addSelect('subject.name', 'subject_name_en')
            .addSelect('subject.khmer_name', 'subject_name_kh')
            .addSelect('creator.first_name', 'creator_first_name')
            .addSelect('creator.last_name', 'creator_last_name');
        if (subjectId) {
            queryBuilder.andWhere('lesson.subjectId = :subjectId', { subjectId });
        }
        if (gradeLevel) {
            queryBuilder.andWhere('lesson.grade_level = :gradeLevel', { gradeLevel });
        }
        const results = await queryBuilder.getRawMany();
        return results.map((result) => ({
            id: result.id,
            subjectId: result.subjectId,
            subject_name_en: result.subject_name_en,
            subject_name_kh: result.subject_name_kh,
            title: result.title,
            description: result.description,
            grade_level: result.grade_level,
            lesson_number: result.lesson_number,
            createdBy: result.createdBy,
            creator: result.creator_first_name && result.creator_last_name
                ? `${result.creator_first_name} ${result.creator_last_name}`
                : null,
            status: result.status,
            is_hidden: result.is_hidden,
        }));
    }
};
exports.LessonsService = LessonsService;
exports.LessonsService = LessonsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __param(1, (0, typeorm_1.InjectRepository)(lesson_activity_entity_1.LessonActivity)),
    __param(2, (0, typeorm_1.InjectRepository)(subject_entity_1.Subject)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], LessonsService);
//# sourceMappingURL=lessons.service.js.map