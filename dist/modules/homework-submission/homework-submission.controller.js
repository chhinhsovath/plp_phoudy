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
exports.HomeworkSubmissionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const homework_submission_dto_1 = require("./dto/homework-submission.dto");
const homework_submission_teacher_dto_1 = require("./dto/homework-submission-teacher.dto");
const homework_submission_service_1 = require("./homework-submission.service");
const homework_submission_count_dto_1 = require("./dto/homework-submission-count.dto");
let HomeworkSubmissionController = class HomeworkSubmissionController {
    service;
    constructor(service) {
        this.service = service;
    }
    search(studentId, homeworkId, status, checkedStatus, page = 1, limit = 10, overdue) {
        const overdueBool = overdue === 'true' ? true : overdue === 'false' ? false : undefined;
        return this.service.searchSubmissions({
            studentId,
            homeworkId,
            status,
            checkedStatus,
            page,
            limit,
            overdue: overdueBool,
        });
    }
    countSubmissions(filter) {
        return this.service.countSubmissions(filter);
    }
    findAll() {
        return this.service.findAll();
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    findByHomeworkId(homeworkId) {
        return this.service.findByHomeworkId(homeworkId);
    }
    findByStudentId(studentId) {
        return this.service.findByStudentId(studentId);
    }
    async create(files, body) {
        if (!body.homeworkId || !body.studentId) {
            throw new common_1.BadRequestException('homeworkId and studentId are required');
        }
        const submissionFiles = files?.map((file) => ({
            name: file.originalname,
            size: file.size,
            type: file.mimetype,
            url: `/uploads/students/${file.filename}`,
        }));
        const submissionDto = {
            ...body,
            submissionFiles,
        };
        return this.service.create(submissionDto);
    }
    update(id, dto) {
        return this.service.update(id, dto, { isTeacher: true });
    }
    async studentUpdate(id, files, body) {
        const submissionFiles = files?.map((file) => ({
            name: file.originalname,
            size: file.size,
            type: file.mimetype,
            url: `/uploads/students/${file.filename}`,
        }));
        let filesToDelete = body.filesToDelete;
        if (filesToDelete && !Array.isArray(filesToDelete)) {
            filesToDelete = [filesToDelete];
        }
        if (filesToDelete) {
            filesToDelete = filesToDelete
                .map((id) => (typeof id === 'string' ? parseInt(id, 10) : id))
                .filter((id) => !isNaN(id));
        }
        const updateDto = {
            ...body,
            submissionFiles,
            filesToDelete,
        };
        return this.service.update(id, updateDto);
    }
    remove(id) {
        return this.service.remove(id);
    }
    async studentRemove(id, body) {
        return this.service.remove(id);
    }
};
exports.HomeworkSubmissionController = HomeworkSubmissionController;
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Search submissions with filters and pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'studentId', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'homeworkId', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: homework_submission_dto_1.SubmissionStatus }),
    (0, swagger_1.ApiQuery)({ name: 'checkedStatus', required: false, enum: homework_submission_dto_1.CheckedStatus }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'overdue', required: false, type: Boolean }),
    __param(0, (0, common_1.Query)('studentId')),
    __param(1, (0, common_1.Query)('homeworkId')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('checkedStatus')),
    __param(4, (0, common_1.Query)('page')),
    __param(5, (0, common_1.Query)('limit')),
    __param(6, (0, common_1.Query)('overdue')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, Object, Object, String]),
    __metadata("design:returntype", void 0)
], HomeworkSubmissionController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('count'),
    (0, swagger_1.ApiOperation)({ summary: 'Count homework submissions with optional filters' }),
    (0, swagger_1.ApiQuery)({ name: 'studentId', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: homework_submission_dto_1.SubmissionStatus }),
    (0, swagger_1.ApiQuery)({ name: 'checkedStatus', required: false, enum: homework_submission_dto_1.CheckedStatus }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [homework_submission_count_dto_1.CountHomeworkSubmissionDto]),
    __metadata("design:returntype", void 0)
], HomeworkSubmissionController.prototype, "countSubmissions", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all homework submissions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomeworkSubmissionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a submission by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HomeworkSubmissionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('homework/:homeworkId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get submissions by homework ID' }),
    (0, swagger_1.ApiParam)({ name: 'homeworkId', type: Number }),
    __param(0, (0, common_1.Param)('homeworkId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HomeworkSubmissionController.prototype, "findByHomeworkId", null);
__decorate([
    (0, common_1.Get)('student/:studentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get submissions by student ID' }),
    (0, swagger_1.ApiParam)({ name: 'studentId', type: Number }),
    __param(0, (0, common_1.Param)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HomeworkSubmissionController.prototype, "findByStudentId", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Student submits homework with optional files' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                files: {
                    type: 'array',
                    items: { type: 'string', format: 'binary' },
                    nullable: true,
                },
                homeworkId: { type: 'number' },
                studentId: { type: 'number' },
                submissionText: { type: 'string' },
            },
            required: ['homeworkId', 'studentId'],
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 5, {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/students',
            filename: (_req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                callback(null, `${uniqueSuffix}${ext}`);
            },
        }),
        limits: { fileSize: 10 * 1024 * 1024 },
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], HomeworkSubmissionController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Teacher updates feedback and score' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Submission updated' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, homework_submission_teacher_dto_1.UpdateTeacherFeedbackDto]),
    __metadata("design:returntype", void 0)
], HomeworkSubmissionController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('student/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Student updates their own submission (if allowed)',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                files: {
                    type: 'array',
                    items: { type: 'string', format: 'binary' },
                    nullable: true,
                },
                studentId: { type: 'number' },
                submissionText: { type: 'string' },
                filesToDelete: {
                    type: 'array',
                    items: { type: 'number' },
                    nullable: true,
                },
            },
            required: ['studentId'],
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 5, {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/students',
            filename: (_req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                callback(null, `${uniqueSuffix}${ext}`);
            },
        }),
        limits: { fileSize: 10 * 1024 * 1024 },
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array, Object]),
    __metadata("design:returntype", Promise)
], HomeworkSubmissionController.prototype, "studentUpdate", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a homework submission' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HomeworkSubmissionController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)('student/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Student deletes their own submission (if allowed)',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], HomeworkSubmissionController.prototype, "studentRemove", null);
exports.HomeworkSubmissionController = HomeworkSubmissionController = __decorate([
    (0, swagger_1.ApiTags)('Homework Submissions'),
    (0, common_1.Controller)('homework-submissions'),
    __metadata("design:paramtypes", [homework_submission_service_1.HomeworkSubmissionService])
], HomeworkSubmissionController);
//# sourceMappingURL=homework-submission.controller.js.map