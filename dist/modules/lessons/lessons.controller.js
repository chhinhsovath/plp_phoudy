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
exports.LessonsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const lessons_service_1 = require("./lessons.service");
const create_lesson_dto_1 = require("./dto/create-lesson.dto");
const update_lesson_dto_1 = require("./dto/update-lesson.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const lesson_response_dto_1 = require("./dto/lesson-response.dto");
const lesson_activities_service_1 = require("../lesson-activities/lesson-activities.service");
const update_lesson_activity_dto_1 = require("../lesson-activities/dto/update-lesson-activity.dto");
const lesson_activity_entity_1 = require("../../entities/lesson-activity.entity");
let LessonsController = class LessonsController {
    lessonsService;
    lessonActivitiesService;
    constructor(lessonsService, lessonActivitiesService) {
        this.lessonsService = lessonsService;
        this.lessonActivitiesService = lessonActivitiesService;
    }
    async findAll() {
        return this.lessonsService.findAll();
    }
    async findAllSimplified(subjectId, gradeLevel) {
        return this.lessonsService.findAllSimplified(subjectId, gradeLevel);
    }
    async findOne(id) {
        return this.lessonsService.findOne(id);
    }
    async getLessonsBySubjectAndGrade(subjectId, gradeLevel) {
        return this.lessonsService.findActiveBySubjectAndGrade(subjectId, gradeLevel);
    }
    async getAllLessonsBySubjectAndGrade(subjectId, gradeLevel) {
        return this.lessonsService.findBySubjectAndGrade(subjectId, gradeLevel);
    }
    async getLessonsBySubjectAndGradeOrdered(subjectId, gradeLevel) {
        return this.lessonsService.findActiveBySubjectAndGradeOrderByLessonNumber(subjectId, gradeLevel);
    }
    async getAllLessonsBySubjectAndGradeOrdered(subjectId, gradeLevel) {
        return this.lessonsService.findBySubjectAndGradeOrderByLessonNumber(subjectId, gradeLevel);
    }
    async create(createLessonDto, req) {
        return this.lessonsService.create(createLessonDto, req.user.id);
    }
    async update(id, updateLessonDto) {
        return this.lessonsService.update(id, updateLessonDto);
    }
    async remove(id) {
        return this.lessonsService.remove(id);
    }
    async getLessonActivitiesBySubjectAndGrade(subjectId, gradeLevel) {
        return this.lessonsService.findLessonActivitiesBySubjectAndGrade(subjectId, gradeLevel);
    }
    async getLessonActivitiesBySubjectAndGradeOrdered(subjectId, gradeLevel) {
        return this.lessonsService.findLessonActivitiesBySubjectAndGradeOrdered(subjectId, gradeLevel);
    }
    async getLessonActivitiesByLessonId(lessonId) {
        return this.lessonsService.findLessonActivitiesByLessonId(lessonId);
    }
    async updateActivity(id, updateLessonActivityDto) {
        return this.lessonActivitiesService.update(id, updateLessonActivityDto);
    }
    async getSimplifiedLessonsBySubjectAndGrade(subjectId, gradeLevel) {
        return this.lessonsService.findSimplifiedBySubjectAndGrade(subjectId, gradeLevel);
    }
    async getLessonsBySubject(subjectName) {
        return this.lessonsService.findBySubjectName(subjectName);
    }
    async getActiveLessonsBySubject(subjectName) {
        return this.lessonsService.findActiveBySubjectName(subjectName);
    }
};
exports.LessonsController = LessonsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all lessons' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all lessons' }),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('simplified'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get lessons in simplified format with optional filtering',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return lessons in simplified format',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'subjectId',
        required: false,
        type: 'number',
        description: 'Filter by subject ID',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'gradeLevel',
        required: false,
        type: 'number',
        description: 'Filter by grade level',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)('subjectId')),
    __param(1, (0, common_1.Query)('gradeLevel')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "findAllSimplified", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a lesson by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the lesson' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lesson not found' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('subject/:subjectId/grade/:gradeLevel'),
    (0, swagger_1.ApiOperation)({ summary: 'Get active lessons by subject and grade' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return lessons' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('subjectId')),
    __param(1, (0, common_1.Param)('gradeLevel')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "getLessonsBySubjectAndGrade", null);
__decorate([
    (0, common_1.Get)('subject/:subjectId/grade/:gradeLevel/all'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all lessons by subject and grade' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return lessons' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('subjectId')),
    __param(1, (0, common_1.Param)('gradeLevel')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "getAllLessonsBySubjectAndGrade", null);
__decorate([
    (0, common_1.Get)('subject/:subjectId/grade/:gradeLevel/ordered'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get active lessons by subject and grade ordered by lesson number',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return lessons' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('subjectId')),
    __param(1, (0, common_1.Param)('gradeLevel')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "getLessonsBySubjectAndGradeOrdered", null);
__decorate([
    (0, common_1.Get)('subject/:subjectId/grade/:gradeLevel/all/ordered'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all lessons by subject and grade ordered by lesson number',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return lessons' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('subjectId')),
    __param(1, (0, common_1.Param)('gradeLevel')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "getAllLessonsBySubjectAndGradeOrdered", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new lesson' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Lesson successfully created' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lesson_dto_1.CreateLessonDto, Object]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a lesson' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lesson successfully updated' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lesson not found' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_lesson_dto_1.UpdateLessonDto]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a lesson' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lesson successfully deleted' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lesson not found' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('activities/subject/:subjectId/grade/:gradeLevel'),
    (0, swagger_1.ApiOperation)({ summary: 'Get lesson activities by subject and grade' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return lesson activities' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('subjectId')),
    __param(1, (0, common_1.Param)('gradeLevel')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "getLessonActivitiesBySubjectAndGrade", null);
__decorate([
    (0, common_1.Get)('activities/subject/:subjectId/grade/:gradeLevel/ordered'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get lesson activities by subject and grade ordered',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return lesson activities' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('subjectId')),
    __param(1, (0, common_1.Param)('gradeLevel')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "getLessonActivitiesBySubjectAndGradeOrdered", null);
__decorate([
    (0, common_1.Get)('activities/lesson/:lessonId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get lesson activities by lesson ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return lesson activities' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('lessonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "getLessonActivitiesByLessonId", null);
__decorate([
    (0, common_1.Patch)('activities/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a lesson activity' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The lesson activity has been successfully updated',
        type: lesson_activity_entity_1.LessonActivity,
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_lesson_activity_dto_1.UpdateLessonActivityDto]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "updateActivity", null);
__decorate([
    (0, common_1.Get)('subject/:subjectId/grade/:gradeLevel/simplified'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get simplified active lessons by subject and grade',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return simplified lessons' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('subjectId')),
    __param(1, (0, common_1.Param)('gradeLevel')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "getSimplifiedLessonsBySubjectAndGrade", null);
__decorate([
    (0, common_1.Get)('subject/:name'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all lessons for a subject by name' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns all lessons for the specified subject',
        type: [lesson_response_dto_1.LessonResponseDto],
    }),
    (0, swagger_1.ApiParam)({
        name: 'name',
        description: 'Subject name (e.g., MATHEMATICS)',
        example: 'MATHEMATICS',
    }),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "getLessonsBySubject", null);
__decorate([
    (0, common_1.Get)('subject/:name/active'),
    (0, swagger_1.ApiOperation)({ summary: 'Get active lessons for a subject by name' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns active lessons for the specified subject',
        type: [lesson_response_dto_1.LessonResponseDto],
    }),
    (0, swagger_1.ApiParam)({
        name: 'name',
        description: 'Subject name (e.g., MATHEMATICS)',
        example: 'MATHEMATICS',
    }),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "getActiveLessonsBySubject", null);
exports.LessonsController = LessonsController = __decorate([
    (0, swagger_1.ApiTags)('Lessons'),
    (0, common_1.Controller)('lessons'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [lessons_service_1.LessonsService,
        lesson_activities_service_1.LessonActivitiesService])
], LessonsController);
//# sourceMappingURL=lessons.controller.js.map