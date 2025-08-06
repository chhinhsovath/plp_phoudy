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
var StudentsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const students_service_1 = require("./students.service");
const student_dto_1 = require("./dto/student.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const question_statistics_dto_1 = require("./dto/question-statistics.dto");
let StudentsController = StudentsController_1 = class StudentsController {
    studentsService;
    logger = new common_1.Logger(StudentsController_1.name);
    constructor(studentsService) {
        this.studentsService = studentsService;
    }
    async findMyStudents(req) {
        try {
            this.logger.log(`Handling GET /students/my-students request for user ${req.user.id}`);
            return await this.studentsService.findByTeacherUserId(req.user.id);
        }
        catch (error) {
            this.logger.error(`Error in findMyStudents: ${error.message}`, error.stack);
            throw error;
        }
    }
    async findOne(id) {
        try {
            this.logger.log(`Handling GET /students/${id} request`);
            const parsedId = parseInt(id, 10);
            if (isNaN(parsedId)) {
                throw new common_1.HttpException(`Invalid student ID: ${id}`, common_1.HttpStatus.BAD_REQUEST);
            }
            return await this.studentsService.findOne(parsedId);
        }
        catch (error) {
            this.logger.error(`Error in findOne: ${error.message}`, error.stack);
            throw error;
        }
    }
    async getQuestionsStatistics(grade, subjectId, lessonTitle, lessonNumber) {
        try {
            this.logger.log(`Handling GET /students/questions/statistics request with grade: ${grade}, subjectId: ${subjectId}, lessonTitle: ${lessonTitle}, lessonNumber: ${lessonNumber}`);
            return await this.studentsService.getQuestionsStatistics(grade, subjectId, lessonTitle, lessonNumber);
        }
        catch (error) {
            this.logger.error(`Error in getQuestionsStatistics: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.StudentsController = StudentsController;
__decorate([
    (0, common_1.Get)('my-students'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all students for the authenticated teacher with performance data',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return all students for the authenticated teacher with scores and statistics',
        type: [student_dto_1.StudentDto],
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'No students found for the teacher',
    }),
    (0, roles_decorator_1.Roles)('TEACHER'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "findMyStudents", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a student by ID with score data' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return the student with scores and statistics',
        type: student_dto_1.StudentDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Student not found' }),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('questions/statistics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get statistics for all questions' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return statistics for all questions',
        type: [question_statistics_dto_1.QuestionStatisticsDTO],
    }),
    (0, swagger_1.ApiQuery)({ name: 'grade', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'subjectId', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'lessonTitle', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'lessonNumber', required: false, type: Number }),
    (0, roles_decorator_1.Roles)('TEACHER', 'ADMIN'),
    __param(0, (0, common_1.Query)('grade')),
    __param(1, (0, common_1.Query)('subjectId')),
    __param(2, (0, common_1.Query)('lessonTitle')),
    __param(3, (0, common_1.Query)('lessonNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String, Number]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getQuestionsStatistics", null);
exports.StudentsController = StudentsController = StudentsController_1 = __decorate([
    (0, swagger_1.ApiTags)('Students'),
    (0, common_1.Controller)('students'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [students_service_1.StudentsService])
], StudentsController);
//# sourceMappingURL=students.controller.js.map