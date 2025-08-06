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
var SubjectGradesController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectGradesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const subject_grades_service_1 = require("./subject-grades.service");
const create_subject_grade_dto_1 = require("./dto/create-subject-grade.dto");
const update_subject_grade_dto_1 = require("./dto/update-subject-grade.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const public_decorator_1 = require("../../decorators/public.decorator");
let SubjectGradesController = SubjectGradesController_1 = class SubjectGradesController {
    subjectGradesService;
    logger = new common_1.Logger(SubjectGradesController_1.name);
    constructor(subjectGradesService) {
        this.subjectGradesService = subjectGradesService;
    }
    async findAll() {
        this.logger.log('Handling GET /subject-grades request');
        return this.subjectGradesService.findAll();
    }
    async findAllSubjectsByGrades() {
        this.logger.log('Handling GET /subject-grades/all-subjects-by-grades request');
        return this.subjectGradesService.findAllSubjectsByGrades();
    }
    async findByGradeLevel(gradeLevel) {
        this.logger.log(`Handling GET /subject-grades/grade/${gradeLevel} request`);
        const parsedGradeLevel = parseInt(gradeLevel, 10);
        if (isNaN(parsedGradeLevel)) {
            throw new common_1.HttpException(`Invalid grade level: ${gradeLevel}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return this.subjectGradesService.findByGradeLevel(parsedGradeLevel);
    }
    async findBySubjectId(subjectId) {
        this.logger.log(`Handling GET /subject-grades/subject/${subjectId} request`);
        const parsedSubjectId = parseInt(subjectId, 10);
        if (isNaN(parsedSubjectId)) {
            throw new common_1.HttpException(`Invalid subject ID: ${subjectId}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return this.subjectGradesService.findBySubjectId(parsedSubjectId);
    }
    async findSubjectsByGradeLevel(gradeLevel) {
        this.logger.log(`Handling GET /subject-grades/subjects/grade/${gradeLevel} request`);
        const parsedGradeLevel = parseInt(gradeLevel, 10);
        if (isNaN(parsedGradeLevel)) {
            throw new common_1.HttpException(`Invalid grade level: ${gradeLevel}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return this.subjectGradesService.findSubjectsByGradeLevel(parsedGradeLevel);
    }
    async findGradesBySubjectId(subjectId) {
        this.logger.log(`Handling GET /subject-grades/grades/subject/${subjectId} request`);
        const parsedSubjectId = parseInt(subjectId, 10);
        if (isNaN(parsedSubjectId)) {
            throw new common_1.HttpException(`Invalid subject ID: ${subjectId}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return this.subjectGradesService.findGradesBySubjectId(parsedSubjectId);
    }
    async findOne(id) {
        this.logger.log(`Handling GET /subject-grades/${id} request`);
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId)) {
            throw new common_1.HttpException(`Invalid subject grade ID: ${id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return this.subjectGradesService.findOne(parsedId);
    }
    async create(createSubjectGradeDto) {
        this.logger.log('Handling POST /subject-grades request');
        return this.subjectGradesService.create(createSubjectGradeDto);
    }
    async update(id, updateSubjectGradeDto) {
        this.logger.log(`Handling PUT /subject-grades/${id} request`);
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId)) {
            throw new common_1.HttpException(`Invalid subject grade ID: ${id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return this.subjectGradesService.update(parsedId, updateSubjectGradeDto);
    }
    async remove(id) {
        this.logger.log(`Handling DELETE /subject-grades/${id} request`);
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId)) {
            throw new common_1.HttpException(`Invalid subject grade ID: ${id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return this.subjectGradesService.remove(parsedId);
    }
};
exports.SubjectGradesController = SubjectGradesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all subject grades' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all subject grades' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubjectGradesController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('all-subjects-by-grades'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all subjects grouped by grade levels' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return all active subjects grouped by grade levels',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    grade_level: { type: 'number' },
                    subjects: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: { type: 'number' },
                                name: { type: 'string' },
                                khmer_name: { type: 'string' },
                                status: { type: 'string' },
                                is_student: { type: 'boolean' },
                                path: { type: 'string' },
                                subject_type: { type: 'string' },
                            },
                        },
                    },
                },
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubjectGradesController.prototype, "findAllSubjectsByGrades", null);
__decorate([
    (0, common_1.Get)('grade/:gradeLevel'),
    (0, swagger_1.ApiOperation)({ summary: 'Get subject grades by grade level' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return subject grades for the specified grade level',
    }),
    __param(0, (0, common_1.Param)('gradeLevel')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubjectGradesController.prototype, "findByGradeLevel", null);
__decorate([
    (0, common_1.Get)('subject/:subjectId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get subject grades by subject ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return subject grades for the specified subject',
    }),
    __param(0, (0, common_1.Param)('subjectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubjectGradesController.prototype, "findBySubjectId", null);
__decorate([
    (0, common_1.Get)('subjects/grade/:gradeLevel'),
    (0, swagger_1.ApiOperation)({ summary: 'Get subjects by grade level' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return subjects for the specified grade level',
    }),
    __param(0, (0, common_1.Param)('gradeLevel')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubjectGradesController.prototype, "findSubjectsByGradeLevel", null);
__decorate([
    (0, common_1.Get)('grades/subject/:subjectId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get grade levels by subject ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return grade levels for the specified subject',
    }),
    __param(0, (0, common_1.Param)('subjectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubjectGradesController.prototype, "findGradesBySubjectId", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a subject grade by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the subject grade' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Subject grade not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubjectGradesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new subject grade' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Subject grade successfully created',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_subject_grade_dto_1.CreateSubjectGradeDto]),
    __metadata("design:returntype", Promise)
], SubjectGradesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a subject grade' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Subject grade successfully updated',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Subject grade not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_subject_grade_dto_1.UpdateSubjectGradeDto]),
    __metadata("design:returntype", Promise)
], SubjectGradesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a subject grade' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Subject grade successfully deleted',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Subject grade not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubjectGradesController.prototype, "remove", null);
exports.SubjectGradesController = SubjectGradesController = SubjectGradesController_1 = __decorate([
    (0, swagger_1.ApiTags)('Subject Grades'),
    (0, common_1.Controller)('subject-grades'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [subject_grades_service_1.SubjectGradesService])
], SubjectGradesController);
//# sourceMappingURL=subject-grades.controller.js.map