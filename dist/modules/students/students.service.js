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
var StudentsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const question_entity_1 = require("../../entities/question.entity");
const student_entity_1 = require("../../entities/student.entity");
const teacher_entity_1 = require("../../entities/teacher.entity");
const user_response_entity_1 = require("../../entities/user-response.entity");
let StudentsService = StudentsService_1 = class StudentsService {
    studentRepository;
    teacherRepository;
    userResponseRepository;
    questionRepository;
    logger = new common_1.Logger(StudentsService_1.name);
    constructor(studentRepository, teacherRepository, userResponseRepository, questionRepository) {
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.userResponseRepository = userResponseRepository;
        this.questionRepository = questionRepository;
    }
    async getTeacherIdByUserId(userId) {
        const teacher = await this.teacherRepository.findOne({
            where: { userId },
        });
        if (!teacher) {
            throw new common_1.NotFoundException(`Teacher not found for user ID ${userId}`);
        }
        return teacher.teacherId;
    }
    async calculateStudentStats(studentId) {
        const student = await this.studentRepository.findOne({
            where: { studentId },
        });
        if (!student) {
            throw new common_1.NotFoundException(`Student not found with ID ${studentId}`);
        }
        const responses = await this.userResponseRepository
            .createQueryBuilder('response')
            .leftJoinAndSelect('response.question', 'question')
            .leftJoinAndSelect('question.subject', 'subject')
            .where('response.userId = :userId', { userId: student.userId })
            .orderBy('response.createdAt', 'DESC')
            .getMany();
        if (!responses.length) {
            return {
                scores: [],
                problemPoints: [],
                averageScore: 0,
                timeSpent: 0,
            };
        }
        const totalTimeSpent = responses.reduce((sum, response) => sum + response.timeSpent, 0);
        const totalScoreImpact = responses.reduce((sum, response) => sum + response.scoreImpact, 0);
        const averageScore = responses.length > 0 ? totalScoreImpact / responses.length : 0;
        const scoreMap = new Map();
        for (const response of responses) {
            const date = response.createdAt.toISOString().split('T')[0];
            const subject = response.question?.questionType?.label || 'UNKNOWN';
            const grade = 'ថ្នាក់ទី១';
            const key = `${date}-${subject}`;
            if (!scoreMap.has(key)) {
                scoreMap.set(key, {
                    date: response.createdAt.toISOString(),
                    value: response.scoreImpact,
                    subject,
                    grade,
                    count: 1,
                });
            }
            else {
                const existing = scoreMap.get(key);
                existing.value =
                    (existing.value * existing.count + response.scoreImpact) /
                        (existing.count + 1);
                existing.count++;
            }
        }
        const lessonMap = new Map();
        for (const response of responses) {
            const lesson = response.question?.lessonActivity?.title || 'មេរៀនទី១';
            if (!lessonMap.has(lesson)) {
                lessonMap.set(lesson, { lesson });
            }
        }
        return {
            scores: Array.from(scoreMap.values()).map(({ ...rest }) => rest),
            problemPoints: Array.from(lessonMap.values()),
            averageScore: Math.round(averageScore * 10) / 10,
            timeSpent: totalTimeSpent,
        };
    }
    async findByTeacherUserId(userId) {
        const teacherId = await this.getTeacherIdByUserId(userId);
        const students = await this.studentRepository
            .createQueryBuilder('student')
            .leftJoinAndSelect('student.user', 'user')
            .leftJoin('student.class', 'class')
            .leftJoin('class.teacher', 'teacher')
            .where('teacher.teacherId = :teacherId', { teacherId })
            .getMany();
        if (!students.length) {
            throw new common_1.NotFoundException(`No students found for teacher ID ${teacherId}`);
        }
        const enrichedStudents = await Promise.all(students.map(async (student) => {
            const stats = await this.calculateStudentStats(student.studentId);
            return {
                studentId: student.studentId,
                user: {
                    username: student.user.username,
                    first_name: student.user.first_name,
                    last_name: student.user.last_name,
                },
                ...stats,
            };
        }));
        return enrichedStudents;
    }
    async findOne(id) {
        const student = await this.studentRepository.findOne({
            where: { studentId: id },
            relations: ['user'],
        });
        if (!student) {
            throw new common_1.NotFoundException(`Student not found with ID ${id}`);
        }
        const stats = await this.calculateStudentStats(student.studentId);
        return {
            studentId: student.studentId,
            user: {
                username: student.user.username,
                first_name: student.user.first_name,
                last_name: student.user.last_name,
            },
            ...stats,
        };
    }
    async getQuestionsStatistics(grade, subjectId, lessonTitle, lessonNumber) {
        try {
            const queryBuilder = this.questionRepository
                .createQueryBuilder('question')
                .leftJoinAndSelect('question.lesson', 'lesson')
                .leftJoinAndSelect('question.subject', 'subject')
                .leftJoin('user_responses', 'ur', 'ur.question_id = question.id')
                .select([
                'question.id',
                'question.question_text as question',
                'lesson.id',
                'lesson.title',
                'lesson.lesson_number',
                'subject.name as subject',
                'question.grade_level as grade',
                'COUNT(DISTINCT ur.user_id) as studentCompleted',
                'AVG(ur.score_impact) as averageScore',
                'SUM(CASE WHEN ur.is_correct = TRUE THEN 1 ELSE 0 END) as correct',
                'SUM(CASE WHEN ur.is_correct = FALSE THEN 1 ELSE 0 END) as incorrect',
            ])
                .groupBy('question.id')
                .addGroupBy('lesson.id')
                .addGroupBy('lesson.title')
                .addGroupBy('lesson.lesson_number')
                .addGroupBy('subject.name');
            if (grade) {
                queryBuilder.andWhere('question.grade_level = :grade', { grade });
            }
            if (subjectId) {
                queryBuilder.andWhere('subject.id = :subjectId', { subjectId });
            }
            if (lessonTitle) {
                queryBuilder.andWhere('lesson.title = :lessonTitle', { lessonTitle });
            }
            if (lessonNumber) {
                queryBuilder.andWhere('lesson.lesson_number = :lessonNumber', {
                    lessonNumber,
                });
            }
            const questions = await queryBuilder.getRawMany();
            const questionStats = await Promise.all(questions.map(async (q) => {
                const performance = await this.userResponseRepository
                    .createQueryBuilder('ur')
                    .where('ur.question_id = :questionId', { questionId: q.id })
                    .select([
                    'DATE(ur.created_at) as date',
                    'AVG(ur.score_impact) as value',
                    'SUM(CASE WHEN ur.is_correct = TRUE THEN 1 ELSE 0 END) as correct',
                    'SUM(CASE WHEN ur.is_correct = FALSE THEN 1 ELSE 0 END) as incorrect',
                ])
                    .groupBy('DATE(ur.created_at)')
                    .orderBy('DATE(ur.created_at)', 'ASC')
                    .getRawMany();
                return {
                    id: q.id,
                    question: q.question,
                    averageScore: parseFloat(q.averageScore) || 0,
                    studentCompleted: parseInt(q.studentCompleted),
                    lesson: {
                        id: q.lesson_id,
                        title: q.title,
                        lesson_number: q.lesson_number,
                    },
                    subject: q.subject,
                    grade: q.grade,
                    performance: performance.map((p) => ({
                        date: p.date,
                        correct: parseInt(p.correct) || 0,
                        incorrect: parseInt(p.incorrect) || 0,
                        value: parseFloat(p.value) || 0,
                    })),
                };
            }));
            return questionStats;
        }
        catch (error) {
            this.logger.error(`Error getting question statistics: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = StudentsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(1, (0, typeorm_1.InjectRepository)(teacher_entity_1.Teacher)),
    __param(2, (0, typeorm_1.InjectRepository)(user_response_entity_1.UserResponse)),
    __param(3, (0, typeorm_1.InjectRepository)(question_entity_1.Question)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], StudentsService);
//# sourceMappingURL=students.service.js.map