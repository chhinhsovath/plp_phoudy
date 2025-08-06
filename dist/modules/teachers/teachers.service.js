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
var TeachersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeachersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const teacher_entity_1 = require("../../entities/teacher.entity");
const class_entity_1 = require("../../entities/class.entity");
let TeachersService = TeachersService_1 = class TeachersService {
    teacherRepository;
    classRepository;
    logger = new common_1.Logger(TeachersService_1.name);
    constructor(teacherRepository, classRepository) {
        this.teacherRepository = teacherRepository;
        this.classRepository = classRepository;
    }
    async findOne(id) {
        this.logger.log(`Finding teacher with id: ${id}`);
        const teacher = await this.teacherRepository.findOne({
            where: { teacherId: id },
            relations: ['user', 'school'],
        });
        if (!teacher) {
            throw new common_1.NotFoundException(`Teacher with ID ${id} not found`);
        }
        return {
            teacherId: teacher.teacherId,
            userId: teacher.userId,
            schoolId: teacher.schoolId,
            hire_date: teacher.hire_date,
            isDirector: teacher.isDirector,
            status: teacher.status,
            user: {
                username: teacher.user.username,
                first_name: teacher.user.first_name,
                last_name: teacher.user.last_name,
            },
            school: {
                name: teacher.school.name,
            },
        };
    }
    async findByUserId(userId) {
        this.logger.log(`Finding teacher by user ID: ${userId}`);
        const teacher = await this.teacherRepository.findOne({
            where: { userId },
            relations: ['user', 'school'],
        });
        if (!teacher) {
            throw new common_1.NotFoundException(`Teacher not found for user ID ${userId}`);
        }
        return {
            teacherId: teacher.teacherId,
            userId: teacher.userId,
            schoolId: teacher.schoolId,
            hire_date: teacher.hire_date,
            isDirector: teacher.isDirector,
            status: teacher.status,
            user: {
                username: teacher.user.username,
                first_name: teacher.user.first_name,
                last_name: teacher.user.last_name,
            },
            school: {
                name: teacher.school.name,
            },
        };
    }
    async findClassesByTeacherId(teacherId) {
        this.logger.log(`Finding classes for teacher ID: ${teacherId}`);
        const teacher = await this.teacherRepository.findOne({
            where: { teacherId },
        });
        if (!teacher) {
            throw new common_1.NotFoundException(`Teacher with ID ${teacherId} not found`);
        }
        const classes = await this.classRepository.find({
            where: { teacherId },
            relations: ['school'],
            order: { gradeLevel: 'ASC', name: 'ASC' },
        });
        return classes.map((classEntity) => ({
            classId: classEntity.classId,
            name: classEntity.name,
            gradeLevel: classEntity.gradeLevel,
            section: classEntity.section,
            schoolId: classEntity.schoolId,
            teacherId: classEntity.teacherId,
            academicYear: classEntity.academicYear,
            maxStudents: classEntity.maxStudents,
            status: classEntity.status,
            school: {
                name: classEntity.school.name,
            },
        }));
    }
    async findAll() {
        this.logger.log('Finding all teachers');
        const teachers = await this.teacherRepository.find({
            relations: ['user', 'school'],
            order: { created_at: 'DESC' },
        });
        return teachers.map((teacher) => ({
            teacherId: teacher.teacherId,
            userId: teacher.userId,
            schoolId: teacher.schoolId,
            hire_date: teacher.hire_date,
            isDirector: teacher.isDirector,
            status: teacher.status,
            user: {
                username: teacher.user.username,
                first_name: teacher.user.first_name,
                last_name: teacher.user.last_name,
            },
            school: {
                name: teacher.school.name,
            },
        }));
    }
};
exports.TeachersService = TeachersService;
exports.TeachersService = TeachersService = TeachersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(teacher_entity_1.Teacher)),
    __param(1, (0, typeorm_1.InjectRepository)(class_entity_1.Class)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TeachersService);
//# sourceMappingURL=teachers.service.js.map