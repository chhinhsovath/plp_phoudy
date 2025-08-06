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
var ClassesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const class_entity_1 = require("../../entities/class.entity");
let ClassesService = ClassesService_1 = class ClassesService {
    classRepository;
    logger = new common_1.Logger(ClassesService_1.name);
    constructor(classRepository) {
        this.classRepository = classRepository;
    }
    async create(createClassDto) {
        this.logger.log('Creating new class');
        const newClass = this.classRepository.create(createClassDto);
        return await this.classRepository.save(newClass);
    }
    async findAll() {
        this.logger.log('Finding all classes');
        return await this.classRepository.find();
    }
    async findByGradeLevel(gradeLevel) {
        this.logger.log(`Finding classes with grade level: ${gradeLevel}`);
        return await this.classRepository.find({
            where: { gradeLevel: gradeLevel },
        });
    }
    async findOne(id) {
        this.logger.log(`Finding class with id: ${id}`);
        const classEntity = await this.classRepository.findOne({
            where: { classId: id },
        });
        if (!classEntity) {
            throw new common_1.NotFoundException(`Class with ID ${id} not found`);
        }
        return classEntity;
    }
    async update(id, updateClassDto) {
        this.logger.log(`Updating class with id: ${id}`);
        const classEntity = await this.findOne(id);
        Object.assign(classEntity, updateClassDto);
        return await this.classRepository.save(classEntity);
    }
    async remove(id) {
        this.logger.log(`Removing class with id: ${id}`);
        const classEntity = await this.findOne(id);
        await this.classRepository.remove(classEntity);
    }
    async findStudentsByClassId(classId) {
        this.logger.log(`Finding students for class ID: ${classId}`);
        await this.findOne(classId);
        const query = `
      SELECT
        c.class_id,
        c.grade_level AS class_grade_level,
        s.student_id,
        u.id AS user_id,
        u.username,
        u.first_name,
        u.last_name
      FROM
        classes AS c
      JOIN
        students AS s ON c.class_id = s.class_id
      JOIN
        users AS u ON s.user_id = u.id
      WHERE
        c.class_id = $1
      ORDER BY
        u.first_name, u.last_name
    `;
        const results = await this.classRepository.query(query, [classId]);
        if (!results || results.length === 0) {
            return [];
        }
        return results;
    }
    async findStudentsInfoByClassId(classId) {
        this.logger.log(`Finding detailed student info for class ID: ${classId}`);
        await this.findOne(classId);
        const query = `
      SELECT
        c.class_id,
        c.grade_level AS class_grade_level,
        c.name AS class_name,
        s.student_id,
        u.id AS user_id,
        u.username,
        u.first_name,
        u.last_name,
        u.email,
        u.phone,
        u.password_hash,
        u.profile_picture,
        u.created_at AS user_created_at,
        u.updated_at AS user_updated_at,
        s.created_at AS student_created_at,
        s.updated_at AS student_updated_at
      FROM
        classes AS c
      JOIN
        students AS s ON c.class_id = s.class_id
      JOIN
        users AS u ON s.user_id = u.id
      WHERE
        c.class_id = $1
      ORDER BY
        u.first_name, u.last_name
    `;
        const results = await this.classRepository.query(query, [classId]);
        if (!results || results.length === 0) {
            return {
                class_id: classId,
                students: [],
                total_students: 0,
            };
        }
        return {
            class_id: classId,
            class_name: results[0].class_name,
            class_grade_level: results[0].class_grade_level,
            students: results,
            total_students: results.length,
        };
    }
};
exports.ClassesService = ClassesService;
exports.ClassesService = ClassesService = ClassesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(class_entity_1.Class)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClassesService);
//# sourceMappingURL=classes.service.js.map