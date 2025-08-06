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
exports.LessonActivitiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const lesson_activity_entity_1 = require("../../entities/lesson-activity.entity");
let LessonActivitiesService = class LessonActivitiesService {
    lessonActivityRepository;
    constructor(lessonActivityRepository) {
        this.lessonActivityRepository = lessonActivityRepository;
    }
    async findAll() {
        const results = await this.lessonActivityRepository
            .createQueryBuilder('lessonActivity')
            .leftJoin('lessonActivity.lesson', 'lesson')
            .leftJoin('lesson.subject', 'subject')
            .leftJoin('lesson.creator', 'creator')
            .addSelect('lessonActivity.id', 'id')
            .addSelect('lessonActivity.lessonId', 'lessonId')
            .addSelect('lessonActivity.title', 'title')
            .addSelect('lessonActivity.order_index', 'order_index')
            .addSelect('lessonActivity.status', 'status')
            .addSelect('lessonActivity.created_at', 'created_at')
            .addSelect('lessonActivity.updated_at', 'updated_at')
            .addSelect('lesson.title', 'lesson_title')
            .addSelect('lesson.grade_level', 'grade_level')
            .addSelect('lesson.lesson_number', 'lesson_number')
            .addSelect('lesson.subjectId', 'subjectId')
            .addSelect('subject.name', 'subject_name_en')
            .addSelect('subject.khmer_name', 'subject_name_kh')
            .addSelect('creator.first_name', 'creator_first_name')
            .addSelect('creator.last_name', 'creator_last_name')
            .getRawMany();
        return results.map((result) => ({
            id: result.id.toString(),
            lessonId: result.lessonId,
            title: result.title,
            order_index: result.order_index,
            status: result.status,
            created_at: result.created_at,
            updated_at: result.updated_at,
            lesson_title: result.lesson_title,
            grade_level: result.grade_level ? result.grade_level.toString() : null,
            lesson_number: result.lesson_number,
            subjectId: result.subjectId ? result.subjectId.toString() : null,
            subject_name_en: result.subject_name_en,
            subject_name_kh: result.subject_name_kh,
            creator: result.creator_first_name && result.creator_last_name
                ? `${result.creator_first_name} ${result.creator_last_name}`
                : null,
        }));
    }
    async findByGradeLevelAndSubjectId(gradeLevel, subjectId) {
        const results = await this.lessonActivityRepository
            .createQueryBuilder('lessonActivity')
            .leftJoin('lessonActivity.lesson', 'lesson')
            .leftJoin('lesson.subject', 'subject')
            .leftJoin('lesson.creator', 'creator')
            .addSelect('lessonActivity.id', 'id')
            .addSelect('lessonActivity.lessonId', 'lessonId')
            .addSelect('lessonActivity.title', 'title')
            .addSelect('lessonActivity.order_index', 'order_index')
            .addSelect('lessonActivity.status', 'status')
            .addSelect('lessonActivity.created_at', 'created_at')
            .addSelect('lessonActivity.updated_at', 'updated_at')
            .addSelect('lesson.title', 'lesson_title')
            .addSelect('lesson.grade_level', 'grade_level')
            .addSelect('lesson.lesson_number', 'lesson_number')
            .addSelect('lesson.subjectId', 'subjectId')
            .addSelect('subject.name', 'subject_name_en')
            .addSelect('subject.khmer_name', 'subject_name_kh')
            .addSelect('creator.first_name', 'creator_first_name')
            .addSelect('creator.last_name', 'creator_last_name')
            .where('lesson.grade_level = :gradeLevel', { gradeLevel })
            .andWhere('lesson.subjectId = :subjectId', { subjectId })
            .getRawMany();
        return results.map((result) => ({
            id: result.id.toString(),
            lessonId: result.lessonId,
            title: result.title,
            order_index: result.order_index,
            status: result.status,
            created_at: result.created_at,
            updated_at: result.updated_at,
            lesson_title: result.lesson_title,
            grade_level: result.grade_level ? result.grade_level.toString() : null,
            lesson_number: result.lesson_number,
            subjectId: result.subjectId ? result.subjectId.toString() : null,
            subject_name_en: result.subject_name_en,
            subject_name_kh: result.subject_name_kh,
            creator: result.creator_first_name && result.creator_last_name
                ? `${result.creator_first_name} ${result.creator_last_name}`
                : null,
        }));
    }
    async create(createLessonActivityDto) {
        const lessonActivity = this.lessonActivityRepository.create(createLessonActivityDto);
        return this.lessonActivityRepository.save(lessonActivity);
    }
    async findById(id) {
        const lessonActivity = await this.lessonActivityRepository.findOne({
            where: { id },
        });
        if (!lessonActivity) {
            throw new common_1.NotFoundException(`Lesson activity with ID ${id} not found`);
        }
        return lessonActivity;
    }
    async update(id, updateLessonActivityDto) {
        const lessonActivity = await this.findById(id);
        Object.assign(lessonActivity, updateLessonActivityDto);
        return this.lessonActivityRepository.save(lessonActivity);
    }
};
exports.LessonActivitiesService = LessonActivitiesService;
exports.LessonActivitiesService = LessonActivitiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lesson_activity_entity_1.LessonActivity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LessonActivitiesService);
//# sourceMappingURL=lesson-activities.service.js.map