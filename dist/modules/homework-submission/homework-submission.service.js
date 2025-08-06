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
exports.HomeworkSubmissionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const homework_submission_entity_1 = require("../../entities/homework-submission.entity");
const submission_files_entity_1 = require("../../entities/submission-files.entity");
const homework_submission_dto_1 = require("./dto/homework-submission.dto");
const fs_1 = require("fs");
const path_1 = require("path");
let HomeworkSubmissionService = class HomeworkSubmissionService {
    submissionRepo;
    submissionFileRepo;
    constructor(submissionRepo, submissionFileRepo) {
        this.submissionRepo = submissionRepo;
        this.submissionFileRepo = submissionFileRepo;
    }
    async findAll() {
        return this.submissionRepo.find({
            relations: [
                'homework',
                'submissionFiles',
                'checkedByTeacher',
                'student',
                'student.user',
                'student.class',
            ],
        });
    }
    async findOne(id) {
        const submission = await this.submissionRepo.findOne({
            where: { id },
            relations: [
                'homework',
                'submissionFiles',
                'checkedByTeacher',
                'student',
                'student.user',
                'student.class',
            ],
        });
        if (!submission) {
            throw new common_1.NotFoundException(`Submission not found with ID: ${id}`);
        }
        return submission;
    }
    async create(dto) {
        const homework = await this.submissionRepo.manager
            .getRepository('Homework')
            .findOne({
            where: { id: dto.homeworkId },
        });
        if (!homework) {
            throw new common_1.NotFoundException('Homework not found');
        }
        const now = new Date();
        if (homework.dueDate && now > new Date(homework.dueDate)) {
            throw new Error('The deadline for this homework has passed. No further submissions are allowed.');
        }
        if (!homework.allowResubmit) {
            const existing = await this.submissionRepo.findOne({
                where: { homework: { id: dto.homeworkId }, studentId: dto.studentId },
            });
            if (existing) {
                if (existing.checkedStatus === 'CHECKED') {
                    throw new Error('Your submission has already been reviewed by your teacher and cannot be changed or resubmitted. If you have concerns, please contact your teacher.');
                }
                throw new Error('You have already submitted this homework. Resubmission is not allowed.');
            }
        }
        const submission = this.submissionRepo.create({
            submissionText: dto.submissionText,
            studentId: dto.studentId,
            submittedAt: dto.submittedAt || new Date(),
            homework: { id: dto.homeworkId },
            status: homework_submission_dto_1.SubmissionStatus.SUBMITTED,
        });
        const savedSubmission = await this.submissionRepo.save(submission);
        if (dto.submissionFiles && dto.submissionFiles.length > 0) {
            const files = dto.submissionFiles.map((fileDto) => this.submissionFileRepo.create({
                name: fileDto.name,
                size: fileDto.size,
                type: fileDto.type,
                url: fileDto.url,
                submission: savedSubmission,
            }));
            await this.submissionFileRepo.save(files);
            savedSubmission.submissionFiles = files;
        }
        return savedSubmission;
    }
    async update(id, dto, options) {
        const submission = await this.submissionRepo.findOne({
            where: { id },
            relations: ['homework', 'submissionFiles'],
        });
        if (!submission)
            throw new common_1.NotFoundException('Submission not found');
        const homeworkId = submission.homework?.id;
        const homework = submission.homework ||
            (homeworkId
                ? await this.submissionRepo.manager
                    .getRepository('Homework')
                    .findOne({ where: { id: homeworkId } })
                : undefined);
        if (!homework) {
            throw new common_1.NotFoundException('Homework not found');
        }
        if (!options?.isTeacher) {
            const now = new Date();
            if (homework.dueDate && now > new Date(homework.dueDate)) {
                throw new Error('The deadline for this homework has passed. No further updates are allowed.');
            }
            if (!homework.allowResubmit) {
                throw new Error('You cannot update this submission. Resubmission is not allowed.');
            }
            if (submission.checkedStatus === 'CHECKED') {
                throw new Error('This submission has already been reviewed by your teacher and cannot be updated. If you need to make changes, please contact your teacher.');
            }
        }
        else {
            const now = new Date();
            if (homework.dueDate && now <= new Date(homework.dueDate)) {
                throw new Error('You can only provide feedback after the homework deadline has passed. Please wait until the due date is over to give feedback or a score.');
            }
        }
        if (dto.filesToDelete && dto.filesToDelete.length > 0) {
            let filesFlat = Array.isArray(dto.filesToDelete)
                ? dto.filesToDelete
                : [dto.filesToDelete];
            filesFlat = filesFlat.filter((file) => !Array.isArray(file));
            const filesToDelete = await this.submissionFileRepo.findByIds(filesFlat);
            for (const file of filesToDelete) {
                try {
                    const filePath = (0, path_1.join)(process.cwd(), file.url.startsWith('/') ? file.url.substring(1) : file.url);
                    (0, fs_1.unlinkSync)(filePath);
                }
                catch (err) {
                    console.warn('Failed to delete file from server:', file.url, err.message);
                }
            }
            await this.submissionFileRepo.delete(filesFlat);
        }
        if (dto.submissionFiles && dto.submissionFiles.length > 0) {
            let filesFlat = dto.submissionFiles.reduce((acc, val) => acc.concat(val), []);
            filesFlat = filesFlat.filter((file) => !Array.isArray(file));
            const fileEntities = filesFlat.map((file) => this.submissionFileRepo.create({ ...file, submission }));
            await this.submissionFileRepo.save(fileEntities);
        }
        const { checkedByTeacherId, ...restDto } = dto;
        Object.assign(submission, restDto);
        if (checkedByTeacherId) {
            submission.checkedByTeacher = {
                teacherId: checkedByTeacherId,
            };
        }
        else if ('checkedByTeacherId' in dto) {
            submission.checkedByTeacher = undefined;
        }
        return this.submissionRepo.save(submission);
    }
    async findByHomeworkId(homeworkId) {
        return this.submissionRepo.find({
            where: { homework: { id: homeworkId } },
            relations: [
                'homework',
                'submissionFiles',
                'checkedByTeacher',
                'student',
                'student.user',
                'student.class',
            ],
        });
    }
    async findByStudentId(studentId) {
        return this.submissionRepo.find({
            where: { studentId },
            relations: [
                'homework',
                'submissionFiles',
                'checkedByTeacher',
                'student',
                'student.user',
                'student.class',
            ],
        });
    }
    async searchSubmissions(filter) {
        const page = filter.page || 1;
        const limit = filter.limit || 10;
        const now = new Date();
        const qb = this.submissionRepo
            .createQueryBuilder('submission')
            .leftJoinAndSelect('submission.homework', 'homework')
            .leftJoinAndSelect('submission.submissionFiles', 'submissionFiles')
            .leftJoinAndSelect('submission.checkedByTeacher', 'checkedByTeacher');
        if (filter.studentId) {
            qb.andWhere('submission.studentId = :studentId', {
                studentId: filter.studentId,
            });
        }
        if (filter.homeworkId) {
            qb.andWhere('homework.id = :homeworkId', {
                homeworkId: filter.homeworkId,
            });
        }
        if (filter.status &&
            Object.values(homework_submission_dto_1.SubmissionStatus).includes(filter.status)) {
            qb.andWhere('submission.status = :status', { status: filter.status });
        }
        if (filter.checkedStatus &&
            Object.values(homework_submission_dto_1.CheckedStatus).includes(filter.checkedStatus)) {
            qb.andWhere('submission.checkedStatus = :checkedStatus', {
                checkedStatus: filter.checkedStatus,
            });
        }
        if (filter.overdue !== undefined) {
            if (filter.overdue) {
                qb.andWhere('homework.dueDate < :now', { now }).andWhere('(submission.status IS NULL OR submission.status != :submitted)', { submitted: homework_submission_dto_1.SubmissionStatus.SUBMITTED });
            }
            else {
                qb.andWhere('homework.dueDate >= :now', { now });
            }
        }
        qb.skip((page - 1) * limit).take(limit);
        qb.orderBy('submission.submittedAt', 'DESC');
        const [data, total] = await qb.getManyAndCount();
        return { data, total };
    }
    async remove(id) {
        const submission = await this.submissionRepo.findOne({
            where: { id },
            relations: ['homework'],
        });
        if (!submission) {
            throw new common_1.NotFoundException(`Submission not found with ID: ${id}`);
        }
        const homeworkId = submission.homework?.id;
        const homework = submission.homework ||
            (homeworkId
                ? await this.submissionRepo.manager
                    .getRepository('Homework')
                    .findOne({ where: { id: homeworkId } })
                : undefined);
        if (!homework) {
            throw new common_1.NotFoundException('Homework not found');
        }
        const now = new Date();
        if (homework.dueDate && now > new Date(homework.dueDate)) {
            throw new Error('The deadline for this homework has passed. No further deletions are allowed.');
        }
        if (!homework.allowResubmit) {
            throw new Error('You cannot delete this submission. Resubmission is not allowed.');
        }
        if (submission.checkedStatus === 'CHECKED') {
            throw new Error('This submission has already been reviewed by your teacher and cannot be deleted. If you have concerns, please contact your teacher.');
        }
        await this.submissionRepo.remove(submission);
    }
    async countSubmissions(filter) {
        const where = {};
        if (filter.studentId !== undefined) {
            where.studentId = filter.studentId;
        }
        if (filter.status !== undefined) {
            where.status = filter.status;
        }
        if (filter.checkedStatus !== undefined) {
            where.checkedStatus = filter.checkedStatus;
        }
        const total = await this.submissionRepo.count({ where });
        return { total };
    }
};
exports.HomeworkSubmissionService = HomeworkSubmissionService;
exports.HomeworkSubmissionService = HomeworkSubmissionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(homework_submission_entity_1.HomeworkSubmission)),
    __param(1, (0, typeorm_1.InjectRepository)(submission_files_entity_1.SubmissionFile)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], HomeworkSubmissionService);
//# sourceMappingURL=homework-submission.service.js.map