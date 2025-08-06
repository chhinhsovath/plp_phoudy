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
exports.HomeworkService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const homework_entity_1 = require("../../entities/homework.entity");
const typeorm_2 = require("typeorm");
const submission_files_entity_1 = require("../../entities/submission-files.entity");
let HomeworkService = class HomeworkService {
    homeworkRepo;
    submissionFileRepo;
    constructor(homeworkRepo, submissionFileRepo) {
        this.homeworkRepo = homeworkRepo;
        this.submissionFileRepo = submissionFileRepo;
    }
    async create(data) {
        console.log('Creating homework with data:', data);
        const { homeworkFiles, ...homeworkData } = data;
        const homework = this.homeworkRepo.create({
            ...homeworkData,
            allowResubmit: data.allowResubmit ?? false,
        });
        const savedHomework = await this.homeworkRepo.save(homework);
        if (homeworkFiles && homeworkFiles.length > 0) {
            const fileEntities = homeworkFiles.map((file) => this.submissionFileRepo.create({
                ...file,
                homework: savedHomework,
            }));
            await this.submissionFileRepo.save(fileEntities);
        }
        return savedHomework;
    }
    async findAll() {
        const homeworks = await this.homeworkRepo.find();
        for (const hw of homeworks) {
            const files = await this.submissionFileRepo.find({
                where: { homework: { id: hw.id } },
            });
            hw.homeworkFiles = files;
        }
        return (await this.search({ limit: 1000 })).data;
    }
    async findOne(id) {
        if (isNaN(id)) {
            throw new common_1.NotFoundException('Invalid homework ID');
        }
        const homework = await this.homeworkRepo.findOne({
            where: { id },
            relations: [
                'submissions',
                'submissions.submissionFiles',
                'submissions.checkedByTeacher',
                'submissions.student',
                'submissions.student.user',
            ],
        });
        if (!homework)
            throw new common_1.NotFoundException('Homework not found');
        const files = await this.submissionFileRepo.find({
            where: { homework: { id } },
        });
        homework.homeworkFiles = files;
        return homework;
    }
    async update(id, data) {
        const homework = await this.findOne(id);
        const { homeworkFiles, filesToDelete, ...updateData } = data;
        Object.assign(homework, updateData);
        if (data.allowResubmit !== undefined) {
            homework.allowResubmit = data.allowResubmit;
        }
        const updatedHomework = await this.homeworkRepo.save(homework);
        if (filesToDelete && filesToDelete.length > 0) {
            const validIds = filesToDelete
                .map((id) => (typeof id === 'string' ? parseInt(id, 10) : id))
                .filter((id) => !isNaN(id));
            if (validIds.length > 0) {
                await this.submissionFileRepo.delete(validIds);
            }
        }
        if (homeworkFiles && homeworkFiles.length > 0) {
            const fileEntities = homeworkFiles.map((file) => this.submissionFileRepo.create({
                ...file,
                homework: updatedHomework,
            }));
            await this.submissionFileRepo.save(fileEntities);
        }
        return updatedHomework;
    }
    async findByTeacherId(teacherId) {
        const homeworks = await this.homeworkRepo.find({
            where: { teacherId },
            relations: ['submissions'],
        });
        for (const hw of homeworks) {
            const files = await this.submissionFileRepo.find({
                where: { homework: { id: hw.id } },
            });
            hw.homeworkFiles = files;
        }
        return homeworks;
    }
    async findByClassId(classId) {
        const homeworks = await this.homeworkRepo.find({
            where: { classId },
            relations: ['submissions'],
        });
        for (const hw of homeworks) {
            const files = await this.submissionFileRepo.find({
                where: { homework: { id: hw.id } },
            });
            hw.homeworkFiles = files;
        }
        return homeworks;
    }
    async findBySubjectId(subjectId) {
        const homeworks = await this.homeworkRepo.find({
            where: { subjectId },
            relations: ['submissions'],
        });
        for (const hw of homeworks) {
            const files = await this.submissionFileRepo.find({
                where: { homework: { id: hw.id } },
            });
            hw.homeworkFiles = files;
        }
        return homeworks;
    }
    async findByLessonId(lessonId) {
        const homeworks = await this.homeworkRepo.find({
            where: { lessonId },
            relations: ['submissions'],
        });
        for (const hw of homeworks) {
            const files = await this.submissionFileRepo.find({
                where: { homework: { id: hw.id } },
            });
            hw.homeworkFiles = files;
        }
        return homeworks;
    }
    async search(filter) {
        const { query, page = 1, limit = 5, teacherId, classId, subjectId, lessonId, status, overdue, studentId, hasSubmission, createdFrom, createdTo, dueFrom, dueTo, submittedFrom, submittedTo, } = filter;
        const qb = this.homeworkRepo
            .createQueryBuilder('homework')
            .leftJoinAndSelect('homework.submissions', 'submission')
            .leftJoinAndSelect('submission.submissionFiles', 'file')
            .leftJoinAndSelect('submission.checkedByTeacher', 'checkedBy')
            .leftJoinAndSelect('submission.student', 'student')
            .leftJoinAndSelect('student.user', 'studentUser');
        if (query) {
            qb.andWhere('(homework.title ILIKE :q OR homework.description ILIKE :q)', {
                q: `%${query}%`,
            });
        }
        if (teacherId)
            qb.andWhere('homework.teacherId = :teacherId', { teacherId });
        if (classId)
            qb.andWhere('homework.classId = :classId', { classId });
        if (subjectId)
            qb.andWhere('homework.subjectId = :subjectId', { subjectId });
        if (lessonId)
            qb.andWhere('homework.lessonId = :lessonId', { lessonId });
        if (status)
            qb.andWhere('homework.status = :status', { status });
        if (createdFrom) {
            qb.andWhere('homework.createdAt >= :createdFrom', {
                createdFrom: new Date(createdFrom),
            });
        }
        if (createdTo) {
            qb.andWhere('homework.createdAt <= :createdTo', {
                createdTo: new Date(createdTo),
            });
        }
        if (dueFrom) {
            qb.andWhere('homework.dueDate >= :dueFrom', {
                dueFrom: new Date(dueFrom),
            });
        }
        if (dueTo) {
            qb.andWhere('homework.dueDate <= :dueTo', {
                dueTo: new Date(dueTo),
            });
        }
        if (overdue !== undefined) {
            const now = new Date();
            if (overdue === 'true') {
                qb.andWhere('homework.dueDate < :now', { now });
            }
            else {
                qb.andWhere('homework.dueDate >= :now', { now });
            }
        }
        if (studentId !== undefined) {
            if (hasSubmission !== undefined) {
                if (hasSubmission === 'true') {
                    qb.andWhere('submission.studentId = :studentId', { studentId });
                }
                else {
                    qb.andWhere('homework.id NOT IN (SELECT hs.homework_id FROM homework_submissions hs WHERE hs.student_id = :studentId)', { studentId });
                }
            }
            else {
                qb.andWhere('submission.studentId = :studentId', { studentId });
            }
        }
        else {
            if (hasSubmission !== undefined) {
                if (hasSubmission === 'true') {
                    qb.andWhere('submission.id IS NOT NULL');
                }
                else {
                    qb.andWhere('submission.id IS NULL');
                }
            }
        }
        if (submittedFrom || submittedTo) {
            if (submittedFrom) {
                qb.andWhere('submission.submittedAt >= :submittedFrom', {
                    submittedFrom: new Date(submittedFrom),
                });
            }
            if (submittedTo) {
                qb.andWhere('submission.submittedAt <= :submittedTo', {
                    submittedTo: new Date(submittedTo),
                });
            }
        }
        qb.orderBy('homework.createdAt', 'DESC')
            .skip((page - 1) * limit)
            .take(limit);
        const [results, total] = await qb.getManyAndCount();
        const totalPages = Math.ceil(total / limit);
        const dataWithSubmittedFlag = await Promise.all(results.map(async (homework) => {
            const hw = homework;
            let submission;
            if (studentId !== undefined) {
                submission = hw.submissions?.find((s) => s.studentId === studentId);
            }
            else {
                submission = undefined;
            }
            hw.submitted = !!submission;
            hw.submittedAt = submission?.submittedAt ?? null;
            const files = await this.submissionFileRepo.find({
                where: { homework: { id: hw.id } },
            });
            hw.homeworkFiles = files;
            return hw;
        }));
        return {
            data: dataWithSubmittedFlag,
            totalItems: total,
            page,
            limit,
            totalPages,
        };
    }
    async getHomeworkCountsActiveByTeacher(teacherId, classId) {
        const now = new Date();
        const baseFilter = {};
        if (teacherId !== undefined) {
            baseFilter.teacherId = teacherId;
        }
        if (classId !== undefined) {
            baseFilter.classId = classId;
        }
        const activeBase = { ...baseFilter, status: 'ACTIVE' };
        const total = await this.homeworkRepo.count({ where: activeBase });
        const overdue = await this.homeworkRepo.count({
            where: {
                ...activeBase,
                dueDate: (0, typeorm_2.LessThan)(now),
            },
        });
        const upcoming = await this.homeworkRepo.count({
            where: {
                ...activeBase,
                dueDate: (0, typeorm_2.MoreThanOrEqual)(now),
            },
        });
        const draftFilter = { status: 'DRAFT' };
        if (teacherId !== undefined)
            draftFilter.teacherId = teacherId;
        if (classId !== undefined)
            draftFilter.classId = classId;
        const draft = await this.homeworkRepo.count({ where: draftFilter });
        const withSubmission = await this.homeworkRepo
            .createQueryBuilder('homework')
            .leftJoin('homework.submissions', 'submission')
            .where('homework.status = :status', { status: 'ACTIVE' })
            .andWhere('submission.id IS NOT NULL')
            .andWhere(teacherId !== undefined ? 'homework.teacherId = :teacherId' : '1=1', { teacherId })
            .andWhere(classId !== undefined ? 'homework.classId = :classId' : '1=1', {
            classId,
        })
            .getCount();
        return {
            total,
            overdue,
            upcoming,
            draft,
            withSubmission,
        };
    }
    async softDelete(id) {
        const homework = await this.findOne(id);
        homework.status = 'INACTIVE';
        await this.homeworkRepo.save(homework);
    }
    async hardDelete(id) {
        const homework = await this.findOne(id);
        await this.homeworkRepo.remove(homework);
    }
};
exports.HomeworkService = HomeworkService;
exports.HomeworkService = HomeworkService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(homework_entity_1.Homework)),
    __param(1, (0, typeorm_1.InjectRepository)(submission_files_entity_1.SubmissionFile)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], HomeworkService);
//# sourceMappingURL=homework.service.js.map