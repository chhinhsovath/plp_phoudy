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
var AnalysisService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const class_entity_1 = require("../../entities/class.entity");
const student_entity_1 = require("../../entities/student.entity");
const user_response_entity_1 = require("../../entities/user-response.entity");
const user_entity_1 = require("../../entities/user.entity");
const teacher_entity_1 = require("../../entities/teacher.entity");
const question_entity_1 = require("../../entities/question.entity");
const lesson_entity_1 = require("../../entities/lesson.entity");
const lesson_activity_entity_1 = require("../../entities/lesson-activity.entity");
let AnalysisService = AnalysisService_1 = class AnalysisService {
    classRepository;
    studentRepository;
    userResponseRepository;
    userRepository;
    teacherRepository;
    questionRepository;
    lessonRepository;
    lessonActivityRepository;
    logger = new common_1.Logger(AnalysisService_1.name);
    constructor(classRepository, studentRepository, userResponseRepository, userRepository, teacherRepository, questionRepository, lessonRepository, lessonActivityRepository) {
        this.classRepository = classRepository;
        this.studentRepository = studentRepository;
        this.userResponseRepository = userResponseRepository;
        this.userRepository = userRepository;
        this.teacherRepository = teacherRepository;
        this.questionRepository = questionRepository;
        this.lessonRepository = lessonRepository;
        this.lessonActivityRepository = lessonActivityRepository;
    }
    async getClassAnalysis(classId, studentId, gradeLevel, subjectId, lessonNumbers) {
        this.logger.log(`Getting class analysis data for class ID: ${classId} with filters: ${JSON.stringify({
            studentId,
            gradeLevel,
            subjectId,
            lessonNumbers,
        })}`);
        try {
            let query = this.classRepository
                .createQueryBuilder('c')
                .leftJoinAndSelect('c.teacher', 't')
                .leftJoinAndSelect('t.user', 't_user')
                .leftJoinAndSelect('c.school', 'school')
                .leftJoin('students', 's', 's.class_id = c.class_id')
                .leftJoin('users', 's_user', 's.user_id = s_user.id')
                .leftJoin('user_responses', 'ur', 's_user.id = ur.user_id')
                .leftJoin('questions', 'q', 'ur.question_id = q.id')
                .leftJoin('lesson_activities', 'la', 'q.lesson_activities_id = la.id')
                .leftJoin('lessons', 'l', 'la.lesson_id = l.id')
                .select([
                'c.class_id as class_id',
                'c.grade_level as class_grade_level',
                'c.teacher_id as teacher_id',
                't_user.username as teacher_username',
                't_user.first_name as teacher_first_name',
                't_user.last_name as teacher_last_name',
                's.student_id as student_id',
                's_user.id as student_user_id',
                's_user.username as student_username',
                's_user.first_name as student_first_name',
                's_user.last_name as student_last_name',
                'ur.question_id as question_id',
                'q.introduction as introduction',
                'q.question_text as question_text',
                'q.difficulty_level as difficulty_level',
                'l.grade_level as question_grade_level',
                'l.id as lesson_id',
                'l.title as lesson_title',
                'l.lesson_number as lesson_number',
                'la.id as lesson_activities_id',
                'la.title as activity_title',
                'l.subject_id as subject_id',
                'ur.is_correct as is_correct',
                'ur.time_spent as time_spent',
                'ur.streak_count as streak_count',
            ])
                .where('c.class_id = :classId', { classId });
            if (studentId) {
                query = query.andWhere('s.student_id = :studentId', { studentId });
            }
            if (gradeLevel) {
                query = query.andWhere('l.grade_level = :gradeLevel', { gradeLevel });
            }
            if (subjectId) {
                query = query.andWhere('l.subject_id = :subjectId', { subjectId });
            }
            if (lessonNumbers && lessonNumbers.length > 0) {
                query = query.andWhere('l.lesson_number IN (:...lessonNumbers)', {
                    lessonNumbers,
                });
            }
            query = query
                .orderBy('s.student_id', 'ASC')
                .addOrderBy('ur.created_at', 'DESC');
            const results = await query.getRawMany();
            if (!results || results.length === 0) {
                throw new common_1.NotFoundException(`No analysis data found for class ID: ${classId} with the provided filters`);
            }
            return this.transformClassAnalysisData(results, gradeLevel, subjectId, lessonNumbers);
        }
        catch (error) {
            this.logger.error(`Error getting class analysis: ${error.message}`, error.stack);
            throw error;
        }
    }
    transformClassAnalysisData(results, gradeLevel, subjectId, lessonNumbers) {
        if (!results || results.length === 0) {
            throw new Error('No data to transform');
        }
        const firstResult = results[0];
        const responseDto = {
            class_id: parseInt(firstResult.class_id),
            class_grade_level: firstResult.class_grade_level,
            teacher_id: parseInt(firstResult.teacher_id),
            teacher_username: firstResult.teacher_username,
            teacher_first_name: firstResult.teacher_first_name,
            teacher_last_name: firstResult.teacher_last_name,
            students: [],
        };
        if (gradeLevel) {
            responseDto.grade_level = gradeLevel;
        }
        if (subjectId) {
            responseDto.subject_id = subjectId;
        }
        if (lessonNumbers && lessonNumbers.length > 0) {
            responseDto.lesson_numbers = lessonNumbers;
        }
        const studentMap = new Map();
        results.forEach((record) => {
            const student_id = parseInt(record.student_id);
            if (!studentMap.has(student_id)) {
                studentMap.set(student_id, {
                    student_id,
                    student_user_id: parseInt(record.student_user_id),
                    student_username: record.student_username,
                    student_first_name: record.student_first_name,
                    student_last_name: record.student_last_name,
                    total_average_score: 0,
                    total_time_spent: 0,
                    responses: [],
                });
            }
            const student = studentMap.get(student_id);
            const questionResponse = {
                question_id: parseInt(record.question_id),
                introduction: record.introduction,
                question_text: record.question_text,
                difficulty_level: record.difficulty_level,
                question_grade_level: record.question_grade_level,
                lesson_id: record.lesson_id,
                lesson_title: record.lesson_title,
                lesson_number: record.lesson_number,
                lesson_activities_id: parseInt(record.lesson_activities_id),
                activity_title: record.activity_title,
                subject_id: parseInt(record.subject_id),
                is_correct: record.is_correct,
                time_spent: record.time_spent,
                streak_count: record.streak_count,
            };
            if (student) {
                student.responses.push(questionResponse);
            }
        });
        studentMap.forEach((student) => {
            student.total_time_spent = student.responses.reduce((sum, response) => sum + response.time_spent, 0);
            const correctAnswers = student.responses.filter((response) => response.is_correct).length;
            student.total_average_score =
                student.responses.length > 0
                    ? Math.round((correctAnswers / student.responses.length) * 100)
                    : 0;
        });
        responseDto.students = Array.from(studentMap.values());
        return responseDto;
    }
};
exports.AnalysisService = AnalysisService;
exports.AnalysisService = AnalysisService = AnalysisService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(class_entity_1.Class)),
    __param(1, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(2, (0, typeorm_1.InjectRepository)(user_response_entity_1.UserResponse)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(4, (0, typeorm_1.InjectRepository)(teacher_entity_1.Teacher)),
    __param(5, (0, typeorm_1.InjectRepository)(question_entity_1.Question)),
    __param(6, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __param(7, (0, typeorm_1.InjectRepository)(lesson_activity_entity_1.LessonActivity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AnalysisService);
//# sourceMappingURL=analysis.service.js.map