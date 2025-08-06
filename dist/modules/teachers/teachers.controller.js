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
var TeachersController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeachersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const teachers_service_1 = require("./teachers.service");
const teacher_dto_1 = require("./dto/teacher.dto");
const teacher_class_dto_1 = require("./dto/teacher-class.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let TeachersController = TeachersController_1 = class TeachersController {
    teachersService;
    logger = new common_1.Logger(TeachersController_1.name);
    constructor(teachersService) {
        this.teachersService = teachersService;
    }
    async findAll() {
        try {
            this.logger.log('Handling GET /teachers request');
            return await this.teachersService.findAll();
        }
        catch (error) {
            this.logger.error(`Error in findAll: ${error.message}`, error.stack);
            throw error;
        }
    }
    async findMe(req) {
        try {
            this.logger.log(`Handling GET /teachers/me request for user ${req.user.id}`);
            return await this.teachersService.findByUserId(req.user.id);
        }
        catch (error) {
            this.logger.error(`Error in findMe: ${error.message}`, error.stack);
            throw error;
        }
    }
    async findOne(id) {
        try {
            this.logger.log(`Handling GET /teachers/${id} request`);
            const parsedId = parseInt(id, 10);
            if (isNaN(parsedId)) {
                throw new common_1.HttpException(`Invalid teacher ID: ${id}`, common_1.HttpStatus.BAD_REQUEST);
            }
            return await this.teachersService.findOne(parsedId);
        }
        catch (error) {
            this.logger.error(`Error in findOne: ${error.message}`, error.stack);
            throw error;
        }
    }
    async findClassesByTeacherId(id) {
        try {
            this.logger.log(`Handling GET /teachers/${id}/classes request`);
            const parsedId = parseInt(id, 10);
            if (isNaN(parsedId)) {
                throw new common_1.HttpException(`Invalid teacher ID: ${id}`, common_1.HttpStatus.BAD_REQUEST);
            }
            return await this.teachersService.findClassesByTeacherId(parsedId);
        }
        catch (error) {
            this.logger.error(`Error in findClassesByTeacherId: ${error.message}`, error.stack);
            throw error;
        }
    }
    async findMyClasses(req) {
        try {
            this.logger.log(`Handling GET /teachers/me/classes request for user ${req.user.id}`);
            const teacher = await this.teachersService.findByUserId(req.user.id);
            return await this.teachersService.findClassesByTeacherId(teacher.teacherId);
        }
        catch (error) {
            this.logger.error(`Error in findMyClasses: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.TeachersController = TeachersController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all teachers' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return all teachers',
        type: [teacher_dto_1.TeacherDto],
    }),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TeachersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current teacher information' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return current teacher information',
        type: teacher_dto_1.TeacherDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Teacher not found' }),
    (0, roles_decorator_1.Roles)('TEACHER'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeachersController.prototype, "findMe", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a teacher by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return the teacher',
        type: teacher_dto_1.TeacherDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Teacher not found' }),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER', 'STUDENT'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeachersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/classes'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all classes for a teacher' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return all classes for the teacher',
        type: [teacher_class_dto_1.TeacherClassDto],
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Teacher not found' }),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeachersController.prototype, "findClassesByTeacherId", null);
__decorate([
    (0, common_1.Get)('me/classes'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all classes for the current teacher' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return all classes for the current teacher',
        type: [teacher_class_dto_1.TeacherClassDto],
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Teacher not found' }),
    (0, roles_decorator_1.Roles)('TEACHER'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeachersController.prototype, "findMyClasses", null);
exports.TeachersController = TeachersController = TeachersController_1 = __decorate([
    (0, swagger_1.ApiTags)('Teachers'),
    (0, common_1.Controller)('teachers'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [teachers_service_1.TeachersService])
], TeachersController);
//# sourceMappingURL=teachers.controller.js.map