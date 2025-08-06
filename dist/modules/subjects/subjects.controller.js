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
var SubjectsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const subjects_service_1 = require("./subjects.service");
const create_subject_dto_1 = require("./dto/create-subject.dto");
const update_subject_dto_1 = require("./dto/update-subject.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const public_decorator_1 = require("../../decorators/public.decorator");
let SubjectsController = SubjectsController_1 = class SubjectsController {
    subjectsService;
    logger = new common_1.Logger(SubjectsController_1.name);
    constructor(subjectsService) {
        this.subjectsService = subjectsService;
    }
    async findAll() {
        return this.subjectsService.findAll();
    }
    async findActive() {
        this.logger.log('Handling GET /subjects/active request');
        return await this.subjectsService.findActive();
    }
    async findStudentSubjects() {
        this.logger.log('Handling GET /subjects/student request');
        return await this.subjectsService.findStudentSubjects();
    }
    async findSpecialSubjects() {
        this.logger.log('Handling GET /subjects/special request');
        return await this.subjectsService.findSpecialSubjects();
    }
    async findNormalSubjects() {
        this.logger.log('Handling GET /subjects/normal request');
        const subjects = await this.subjectsService.findNormalSubjects();
        this.logger.log(`Successfully retrieved ${subjects.length} normal subjects`);
        return subjects;
    }
    healthCheck() {
        this.logger.log('Health check endpoint called');
        return Promise.resolve({
            status: 'ok',
            message: 'Subjects API is healthy',
        });
    }
    async getGrades() {
        this.logger.log('Getting all grades with their subjects');
        return this.subjectsService.findAllGradesWithSubjects();
    }
    async findByGradeLevel(gradeLevel) {
        this.logger.log(`Handling GET /subjects/grade/${gradeLevel} request`);
        const subjects = await this.subjectsService.findByGradeLevel(gradeLevel);
        this.logger.log(`Successfully retrieved ${subjects.length} subjects for grade level ${gradeLevel}`);
        return subjects;
    }
    async findActiveByGradeLevel(gradeLevel) {
        this.logger.log(`Handling GET /subjects/grade/${gradeLevel}/active request`);
        const subjects = await this.subjectsService.findActiveByGradeLevel(gradeLevel);
        this.logger.log(`Successfully retrieved ${subjects.length} active subjects for grade level ${gradeLevel}`);
        return subjects;
    }
    async findByPath(path) {
        this.logger.log(`Handling GET /subjects/path/${path} request`);
        return await this.subjectsService.findByPath(path);
    }
    async findOne(id) {
        this.logger.log(`Handling GET /subjects/${id} request`);
        const parsedId = parseInt(id.toString(), 10);
        if (isNaN(parsedId)) {
            throw new common_1.HttpException(`Invalid subject ID: ${id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.subjectsService.findOne(parsedId);
    }
    findSubjectContent(id) {
        return Promise.resolve(this.subjectsService.findSubjectContent());
    }
    async create(createSubjectDto) {
        return this.subjectsService.create(createSubjectDto);
    }
    async update(id, updateSubjectDto) {
        return this.subjectsService.update(id, updateSubjectDto);
    }
    async updatePatch(id, updateSubjectDto) {
        return this.subjectsService.update(id, updateSubjectDto);
    }
    async remove(id) {
        return this.subjectsService.remove(id);
    }
    async activate(id) {
        return this.subjectsService.activate(id);
    }
    async deactivate(id) {
        return this.subjectsService.deactivate(id);
    }
    async findGradesBySubjectId(id) {
        this.logger.log(`Handling GET /subjects/${id}/grades request`);
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId)) {
            throw new common_1.HttpException(`Invalid subject ID: ${id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const grades = await this.subjectsService.findGradesBySubjectId(parsedId);
        this.logger.log(`Successfully retrieved ${grades.length} grades for subject ID ${parsedId}`);
        return grades;
    }
    async findActiveForDropdown() {
        this.logger.log('Handling GET /subjects/active/dropdown request');
        return await this.subjectsService.findActiveForDropdown();
    }
};
exports.SubjectsController = SubjectsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all subjects' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all subjects' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('active'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active subjects' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all active subjects' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "findActive", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('student'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all student subjects' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all student subjects' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "findStudentSubjects", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('special'),
    (0, swagger_1.ApiOperation)({ summary: 'Get special subjects' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return special subjects' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "findSpecialSubjects", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('normal'),
    (0, swagger_1.ApiOperation)({ summary: 'Get normal subjects' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return normal subjects' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "findNormalSubjects", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('health'),
    (0, swagger_1.ApiOperation)({ summary: 'Health check endpoint' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'API is healthy' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "healthCheck", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('grades'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all grades with their subjects' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return all grades with their subjects',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "getGrades", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('grade/:gradeLevel'),
    (0, swagger_1.ApiOperation)({ summary: 'Get subjects by grade level' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return subjects for the specified grade level',
    }),
    __param(0, (0, common_1.Param)('gradeLevel')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "findByGradeLevel", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('grade/:gradeLevel/active'),
    (0, swagger_1.ApiOperation)({ summary: 'Get active subjects by grade level' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return active subjects for the specified grade level',
    }),
    __param(0, (0, common_1.Param)('gradeLevel')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "findActiveByGradeLevel", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('path/:path'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a subject by path' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the subject' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Subject not found' }),
    __param(0, (0, common_1.Param)('path')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "findByPath", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a subject by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the subject' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Subject not found' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/content'),
    (0, swagger_1.ApiOperation)({ summary: 'Get content for a subject' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the subject content' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Subject not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "findSubjectContent", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new subject' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Subject successfully created' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_subject_dto_1.CreateSubjectDto]),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a subject' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Subject successfully updated' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Subject not found' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_subject_dto_1.UpdateSubjectDto]),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a subject (PATCH method)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Subject successfully updated' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Subject not found' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_subject_dto_1.UpdateSubjectDto]),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "updatePatch", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a subject' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Subject successfully deleted' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Subject not found' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/activate'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Activate a subject' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Subject successfully activated' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Subject not found' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "activate", null);
__decorate([
    (0, common_1.Patch)(':id/deactivate'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Deactivate a subject' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Subject successfully deactivated' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Subject not found' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "deactivate", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id/grades'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all grades for a specific subject' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return all grades for the specified subject',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Subject not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "findGradesBySubjectId", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('active/specific'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get active subjects for dropdown (name, khmer_name, path only)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return active subjects with minimal fields',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "findActiveForDropdown", null);
exports.SubjectsController = SubjectsController = SubjectsController_1 = __decorate([
    (0, swagger_1.ApiTags)('Subjects'),
    (0, common_1.Controller)('subjects'),
    __metadata("design:paramtypes", [subjects_service_1.SubjectsService])
], SubjectsController);
//# sourceMappingURL=subjects.controller.js.map