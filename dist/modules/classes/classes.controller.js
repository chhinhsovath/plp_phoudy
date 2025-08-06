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
var ClassesController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const classes_service_1 = require("./classes.service");
const create_class_dto_1 = require("./dto/create-class.dto");
const update_class_dto_1 = require("./dto/update-class.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const class_entity_1 = require("../../entities/class.entity");
const class_student_dto_1 = require("./dto/class-student.dto");
let ClassesController = ClassesController_1 = class ClassesController {
    classesService;
    logger = new common_1.Logger(ClassesController_1.name);
    constructor(classesService) {
        this.classesService = classesService;
    }
    async create(createClassDto) {
        try {
            this.logger.log('Creating new class');
            return await this.classesService.create(createClassDto);
        }
        catch (error) {
            this.logger.error(`Error creating class: ${error.message}`, error.stack);
            throw error;
        }
    }
    async findAll() {
        try {
            this.logger.log('Getting all classes');
            return await this.classesService.findAll();
        }
        catch (error) {
            this.logger.error(`Error getting classes: ${error.message}`, error.stack);
            throw error;
        }
    }
    async findByGradeLevel(gradeLevel) {
        try {
            this.logger.log(`Getting classes for grade level ${gradeLevel}`);
            const parsedGradeLevel = parseInt(gradeLevel, 10);
            if (isNaN(parsedGradeLevel)) {
                throw new common_1.HttpException(`Invalid grade level: ${gradeLevel}`, common_1.HttpStatus.BAD_REQUEST);
            }
            const gradeLevelEnum = this.getGradeLevelEnum(parsedGradeLevel);
            if (!gradeLevelEnum) {
                throw new common_1.HttpException(`Invalid grade level: ${parsedGradeLevel}. Must be between 1 and 6.`, common_1.HttpStatus.BAD_REQUEST);
            }
            return await this.classesService.findByGradeLevel(gradeLevelEnum);
        }
        catch (error) {
            this.logger.error(`Error getting classes by grade: ${error.message}`, error.stack);
            throw error;
        }
    }
    async findStudentsByClassId(id) {
        try {
            this.logger.log(`Getting students for class ID ${id}`);
            const parsedId = parseInt(id, 10);
            if (isNaN(parsedId)) {
                throw new common_1.HttpException(`Invalid class ID: ${id}`, common_1.HttpStatus.BAD_REQUEST);
            }
            return await this.classesService.findStudentsByClassId(parsedId);
        }
        catch (error) {
            this.logger.error(`Error getting students for class: ${error.message}`, error.stack);
            throw error;
        }
    }
    async findStudentsInfoByClassId(id) {
        try {
            this.logger.log(`Getting detailed student info for class ID ${id}`);
            const parsedId = parseInt(id, 10);
            if (isNaN(parsedId)) {
                throw new common_1.HttpException(`Invalid class ID: ${id}`, common_1.HttpStatus.BAD_REQUEST);
            }
            return await this.classesService.findStudentsInfoByClassId(parsedId);
        }
        catch (error) {
            this.logger.error(`Error getting detailed student info for class: ${error.message}`, error.stack);
            throw error;
        }
    }
    getGradeLevelEnum(grade) {
        switch (grade) {
            case 1:
                return class_entity_1.GradeLevelType.GRADE_1;
            case 2:
                return class_entity_1.GradeLevelType.GRADE_2;
            case 3:
                return class_entity_1.GradeLevelType.GRADE_3;
            case 4:
                return class_entity_1.GradeLevelType.GRADE_4;
            case 5:
                return class_entity_1.GradeLevelType.GRADE_5;
            case 6:
                return class_entity_1.GradeLevelType.GRADE_6;
            default:
                return null;
        }
    }
    async findOne(id) {
        try {
            this.logger.log(`Getting class with id ${id}`);
            const parsedId = parseInt(id, 10);
            if (isNaN(parsedId)) {
                throw new common_1.HttpException(`Invalid class ID: ${id}`, common_1.HttpStatus.BAD_REQUEST);
            }
            return await this.classesService.findOne(parsedId);
        }
        catch (error) {
            this.logger.error(`Error getting class: ${error.message}`, error.stack);
            throw error;
        }
    }
    async update(id, updateClassDto) {
        try {
            this.logger.log(`Updating class with id ${id}`);
            const parsedId = parseInt(id, 10);
            if (isNaN(parsedId)) {
                throw new common_1.HttpException(`Invalid class ID: ${id}`, common_1.HttpStatus.BAD_REQUEST);
            }
            return await this.classesService.update(parsedId, updateClassDto);
        }
        catch (error) {
            this.logger.error(`Error updating class: ${error.message}`, error.stack);
            throw error;
        }
    }
    async remove(id) {
        try {
            this.logger.log(`Deleting class with id ${id}`);
            const parsedId = parseInt(id, 10);
            if (isNaN(parsedId)) {
                throw new common_1.HttpException(`Invalid class ID: ${id}`, common_1.HttpStatus.BAD_REQUEST);
            }
            await this.classesService.remove(parsedId);
            return { message: 'Class deleted successfully' };
        }
        catch (error) {
            this.logger.error(`Error deleting class: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.ClassesController = ClassesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new class' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The class has been successfully created.',
    }),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_class_dto_1.CreateClassDto]),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all classes' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all classes.' }),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('grade/:gradeLevel'),
    (0, swagger_1.ApiOperation)({ summary: 'Get classes by grade level' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return classes for the specified grade.',
    }),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    __param(0, (0, common_1.Param)('gradeLevel')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "findByGradeLevel", null);
__decorate([
    (0, common_1.Get)(':id/students'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all students of a class by class ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns all students in the specified class',
        type: [class_student_dto_1.ClassStudentDto],
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Class not found' }),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "findStudentsByClassId", null);
__decorate([
    (0, common_1.Get)(':id/students-info'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get detailed information of all students in a class',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns detailed information of all students in the specified class',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Class not found' }),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "findStudentsInfoByClassId", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a class by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the class.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Class not found.' }),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a class' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The class has been successfully updated.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Class not found.' }),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_class_dto_1.UpdateClassDto]),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a class' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The class has been successfully deleted.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Class not found.' }),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "remove", null);
exports.ClassesController = ClassesController = ClassesController_1 = __decorate([
    (0, swagger_1.ApiTags)('Classes'),
    (0, common_1.Controller)('classes'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [classes_service_1.ClassesService])
], ClassesController);
//# sourceMappingURL=classes.controller.js.map