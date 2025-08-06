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
var ExamsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const exams_service_1 = require("./exams.service");
const create_exam_dto_1 = require("./dto/create-exam.dto");
const update_exam_dto_1 = require("./dto/update-exam.dto");
const exam_dto_1 = require("./dto/exam.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const class_entity_1 = require("../../entities/class.entity");
let ExamsController = ExamsController_1 = class ExamsController {
    examsService;
    logger = new common_1.Logger(ExamsController_1.name);
    constructor(examsService) {
        this.examsService = examsService;
    }
    async findAll(includeQuestions) {
        this.logger.log('Handling GET /exams request');
        const shouldIncludeQuestions = includeQuestions === 'true';
        return this.examsService.findAll(shouldIncludeQuestions);
    }
    async findBySubject(subjectId, includeQuestions) {
        this.logger.log(`Handling GET /exams/subject/${subjectId} request`);
        const parsedSubjectId = parseInt(subjectId, 10);
        if (isNaN(parsedSubjectId)) {
            throw new common_1.HttpException(`Invalid subject ID: ${subjectId}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const shouldIncludeQuestions = includeQuestions === 'true';
        const exams = await this.examsService.findBySubject(parsedSubjectId, shouldIncludeQuestions);
        this.logger.log(`Successfully retrieved ${exams.length} exams for subject ID ${parsedSubjectId}`);
        return exams;
    }
    async findByGradeLevel(gradeLevel, includeQuestions) {
        this.logger.log(`Handling GET /exams/grade/${gradeLevel} request`);
        if (!Object.values(class_entity_1.GradeLevelType).includes(gradeLevel)) {
            throw new common_1.HttpException(`Invalid grade level: ${gradeLevel}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const shouldIncludeQuestions = includeQuestions === 'true';
        const exams = await this.examsService.findByGradeLevel(gradeLevel, shouldIncludeQuestions);
        this.logger.log(`Successfully retrieved ${exams.length} exams for grade level ${gradeLevel}`);
        return exams;
    }
    async findOne(id) {
        this.logger.log(`Handling GET /exams/${id} request`);
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId)) {
            throw new common_1.HttpException(`Invalid exam ID: ${id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.examsService.findOne(parsedId);
    }
    async create(createExamDto) {
        this.logger.log('Handling POST /exams request');
        const exam = await this.examsService.create(createExamDto);
        this.logger.log(`Successfully created exam with ID ${exam.id}`);
        return exam;
    }
    async update(id, updateExamDto) {
        this.logger.log(`Handling PUT /exams/${id} request`);
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId)) {
            throw new common_1.HttpException(`Invalid exam ID: ${id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const exam = await this.examsService.update(parsedId, updateExamDto);
        this.logger.log(`Successfully updated exam with ID ${parsedId}`);
        return exam;
    }
    async remove(id) {
        this.logger.log(`Handling DELETE /exams/${id} request`);
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId)) {
            throw new common_1.HttpException(`Invalid exam ID: ${id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        await this.examsService.remove(parsedId);
        this.logger.log(`Successfully deleted exam with ID ${parsedId}`);
    }
};
exports.ExamsController = ExamsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all exams' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return all exams',
        type: [exam_dto_1.ExamDto],
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)('includeQuestions')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExamsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('subject/:subjectId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get exams by subject' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return exams for the specified subject',
        type: [exam_dto_1.ExamDto],
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('subjectId')),
    __param(1, (0, common_1.Query)('includeQuestions')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ExamsController.prototype, "findBySubject", null);
__decorate([
    (0, common_1.Get)('grade/:gradeLevel'),
    (0, swagger_1.ApiOperation)({ summary: 'Get exams by grade level' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return exams for the specified grade level',
        type: [exam_dto_1.ExamDto],
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('gradeLevel')),
    __param(1, (0, common_1.Query)('includeQuestions')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ExamsController.prototype, "findByGradeLevel", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get an exam by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return the exam',
        type: exam_dto_1.ExamDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Exam not found' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExamsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new exam' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Exam successfully created',
        type: exam_dto_1.ExamDto,
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_exam_dto_1.CreateExamDto]),
    __metadata("design:returntype", Promise)
], ExamsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an exam' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Exam successfully updated',
        type: exam_dto_1.ExamDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Exam not found' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_exam_dto_1.UpdateExamDto]),
    __metadata("design:returntype", Promise)
], ExamsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an exam' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Exam successfully deleted' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Exam not found' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExamsController.prototype, "remove", null);
exports.ExamsController = ExamsController = ExamsController_1 = __decorate([
    (0, swagger_1.ApiTags)('Exams'),
    (0, common_1.Controller)('exams'),
    __metadata("design:paramtypes", [exams_service_1.ExamsService])
], ExamsController);
//# sourceMappingURL=exams.controller.js.map