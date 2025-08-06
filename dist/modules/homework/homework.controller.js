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
exports.HomeworkController = void 0;
const common_1 = require("@nestjs/common");
const homework_dto_1 = require("./dto/homework.dto");
const homework_service_1 = require("./homework.service");
const swagger_1 = require("@nestjs/swagger");
const searchHomework_dto_1 = require("./dto/searchHomework.dto");
const common_2 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
let HomeworkController = class HomeworkController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(files, dto) {
        try {
            if (dto && typeof dto === 'object' && 'files' in dto) {
                delete dto['files'];
            }
            const homeworkFiles = files?.map((file) => ({
                name: file.originalname,
                size: file.size,
                type: file.mimetype,
                url: `/uploads/homeworks/${file.filename}`,
            }));
            return await this.service.create({ ...dto, homeworkFiles });
        }
        catch (error) {
            console.error('Create homework error:', error);
            throw error;
        }
    }
    findAll() {
        return this.service.findAll();
    }
    async search(searchDto) {
        return this.service.search(searchDto);
    }
    async getHomeworkCounts(teacherIdStr, classIdStr) {
        let teacherId;
        let classId;
        if (teacherIdStr !== undefined) {
            teacherId = parseInt(teacherIdStr, 10);
            if (isNaN(teacherId)) {
                throw new common_2.BadRequestException('Invalid teacherId');
            }
        }
        if (classIdStr !== undefined) {
            classId = parseInt(classIdStr, 10);
            if (isNaN(classId)) {
                throw new common_2.BadRequestException('Invalid classId');
            }
        }
        return this.service.getHomeworkCountsActiveByTeacher(teacherId, classId);
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    async update(id, newFiles, body) {
        let filesToDelete = body.filesToDelete;
        if (filesToDelete && !Array.isArray(filesToDelete)) {
            filesToDelete = [filesToDelete];
        }
        if ('files' in body)
            delete body.files;
        if ('newFiles' in body)
            delete body.newFiles;
        const homeworkFiles = newFiles?.map((file) => ({
            name: file.originalname,
            size: file.size,
            type: file.mimetype,
            url: `/uploads/homeworks/${file.filename}`,
        }));
        const updateDto = {
            ...body,
            filesToDelete,
            homeworkFiles,
        };
        if ('allowResubmit' in updateDto) {
            updateDto.allowResubmit =
                updateDto.allowResubmit === true || updateDto.allowResubmit === 'true';
        }
        try {
            return await this.service.update(+id, updateDto);
        }
        catch (error) {
            console.error('Update error:', error);
            throw error;
        }
    }
    async softDelete(id) {
        await this.service.softDelete(+id);
        return { message: 'Homework soft deleted successfully' };
    }
    async hardDelete(id) {
        await this.service.hardDelete(+id);
        return { message: 'Homework hard deleted successfully' };
    }
    findByTeacher(teacherId) {
        return this.service.findByTeacherId(+teacherId);
    }
    findByClass(classId) {
        return this.service.findByClassId(+classId);
    }
    findBySubject(subjectId) {
        return this.service.findBySubjectId(+subjectId);
    }
    findByLesson(lessonId) {
        return this.service.findByLessonId(+lessonId);
    }
};
exports.HomeworkController = HomeworkController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new homework' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Homework created successfully',
    }),
    (0, swagger_1.ApiBearerAuth)(),
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
                title: { type: 'string' },
                description: { type: 'string' },
                classId: { type: 'number' },
                subjectId: { type: 'number' },
                lessonId: { type: 'number' },
                teacherId: { type: 'number' },
                dueDate: { type: 'string', format: 'date-time' },
                status: { type: 'string' },
                allowResubmit: {
                    type: 'boolean',
                    default: false,
                    description: 'Allow resubmission of homework',
                },
            },
            required: [
                'title',
                'classId',
                'subjectId',
                'lessonId',
                'teacherId',
                'dueDate',
                'status',
            ],
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 5, {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/homeworks',
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
    __metadata("design:paramtypes", [Array, homework_dto_1.CreateHomeworkDto]),
    __metadata("design:returntype", Promise)
], HomeworkController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all homeworks' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return all homeworks',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomeworkController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({
        summary: 'Search homeworks by title or description with pagination and filters',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Filtered homeworks list' }),
    (0, swagger_1.ApiQuery)({
        name: 'query',
        required: false,
        type: String,
        description: 'Search keyword (title or description)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number for pagination (default: 1)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Number of results per page (default: 5)',
    }),
    (0, swagger_1.ApiQuery)({ name: 'teacherId', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'classId', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'subjectId', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'lessonId', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        required: false,
        enum: ['DRAFT', 'ACTIVE', 'CLOSED'],
        description: 'Status of homework',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'overdue',
        required: false,
        type: String,
        enum: ['true', 'false'],
        description: 'Whether homework is overdue or not (string boolean)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'studentId',
        required: false,
        type: Number,
        description: "Filter homework based on this student's submission status",
    }),
    (0, swagger_1.ApiQuery)({
        name: 'hasSubmission',
        required: false,
        enum: ['true', 'false'],
        description: 'Filter by whether the student has submitted (requires studentId)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'createdFrom',
        required: false,
        schema: {
            type: 'string',
            format: 'date',
            example: '2024-01-01',
        },
        description: 'Filter homeworks created from this date (YYYY-MM-DD format)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'createdTo',
        required: false,
        schema: {
            type: 'string',
            format: 'date',
            example: '2024-12-31',
        },
        description: 'Filter homeworks created up to this date (YYYY-MM-DD format)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'dueFrom',
        required: false,
        schema: {
            type: 'string',
            format: 'date',
            example: '2024-02-01',
        },
        description: 'Filter homeworks with due date from this date (YYYY-MM-DD format)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'dueTo',
        required: false,
        schema: {
            type: 'string',
            format: 'date',
            example: '2024-02-29',
        },
        description: 'Filter homeworks with due date up to this date (YYYY-MM-DD format)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'submittedFrom',
        required: false,
        schema: {
            type: 'string',
            format: 'date',
            example: '2024-01-15',
        },
        description: 'Filter homeworks submitted from this date (YYYY-MM-DD format)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'submittedTo',
        required: false,
        schema: {
            type: 'string',
            format: 'date',
            example: '2024-01-20',
        },
        description: 'Filter homeworks submitted up to this date (YYYY-MM-DD format)',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [searchHomework_dto_1.SearchHomeworkDto]),
    __metadata("design:returntype", Promise)
], HomeworkController.prototype, "search", null);
__decorate([
    (0, swagger_1.ApiQuery)({ name: 'teacherId', required: false, type: Number }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('count/active'),
    __param(0, (0, common_1.Query)('teacherId')),
    __param(1, (0, common_1.Query)('classId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], HomeworkController.prototype, "getHomeworkCounts", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a homework by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the homework' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Homework not found' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HomeworkController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a homework' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Homework updated successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Homework not found' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                filesToDelete: {
                    type: 'array',
                    items: { type: 'string' },
                    nullable: true,
                },
                title: { type: 'string' },
                description: { type: 'string' },
                classId: { type: 'number' },
                subjectId: { type: 'number' },
                lessonId: { type: 'number' },
                teacherId: { type: 'number' },
                dueDate: { type: 'string', format: 'date-time' },
                status: { type: 'string' },
                newFiles: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                    nullable: true,
                },
                allowResubmit: {
                    type: 'boolean',
                    default: false,
                    description: 'Allow resubmission of homework',
                },
            },
            required: [
                'title',
                'classId',
                'subjectId',
                'lessonId',
                'teacherId',
                'dueDate',
                'status',
            ],
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('newFiles', 5, {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/homeworks',
            filename: (_req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                cb(null, `${uniqueSuffix}${ext}`);
            },
        }),
        limits: { fileSize: 10 * 1024 * 1024 },
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, Object]),
    __metadata("design:returntype", Promise)
], HomeworkController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('soft/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a homework (set status to DELETED)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Homework soft deleted successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Homework not found' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HomeworkController.prototype, "softDelete", null);
__decorate([
    (0, common_1.Delete)('hard/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Hard delete a homework (remove from DB)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Homework hard deleted successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Homework not found' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HomeworkController.prototype, "hardDelete", null);
__decorate([
    (0, common_1.Get)('teacher/:teacherId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get homeworks by teacher ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return homeworks for the given teacher',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiParam)({ name: 'teacherId', type: 'number' }),
    __param(0, (0, common_1.Param)('teacherId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HomeworkController.prototype, "findByTeacher", null);
__decorate([
    (0, common_1.Get)('class/:classId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get homeworks by class ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return homeworks for the given class',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiParam)({ name: 'classId', type: 'number' }),
    __param(0, (0, common_1.Param)('classId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HomeworkController.prototype, "findByClass", null);
__decorate([
    (0, common_1.Get)('subject/:subjectId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get homeworks by subject ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return homeworks for the given subject',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiParam)({ name: 'subjectId', type: 'number' }),
    __param(0, (0, common_1.Param)('subjectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HomeworkController.prototype, "findBySubject", null);
__decorate([
    (0, common_1.Get)('lesson/:lessonId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get homeworks by lesson ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return homeworks for the given lessonId',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiParam)({ name: 'lessonId', type: 'number' }),
    __param(0, (0, common_1.Param)('lessonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HomeworkController.prototype, "findByLesson", null);
exports.HomeworkController = HomeworkController = __decorate([
    (0, swagger_1.ApiTags)('Homeworks'),
    (0, common_1.Controller)('homeworks'),
    __metadata("design:paramtypes", [homework_service_1.HomeworkService])
], HomeworkController);
//# sourceMappingURL=homework.controller.js.map