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
exports.StatisticsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const question_entity_1 = require("../../entities/question.entity");
const student_entity_1 = require("../../entities/student.entity");
const teacher_entity_1 = require("../../entities/teacher.entity");
const school_entity_1 = require("../../entities/school.entity");
let StatisticsService = class StatisticsService {
    questionRepository;
    studentRepository;
    teacherRepository;
    schoolRepository;
    constructor(questionRepository, studentRepository, teacherRepository, schoolRepository) {
        this.questionRepository = questionRepository;
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.schoolRepository = schoolRepository;
    }
    async getOverallStatistics() {
        const [totalQuestions, totalStudents, totalTeachers, totalSchools] = await Promise.all([
            this.questionRepository.count(),
            this.studentRepository.count(),
            this.teacherRepository.count(),
            this.schoolRepository.count(),
        ]);
        const currentMonth = new Date();
        currentMonth.setDate(1);
        currentMonth.setHours(0, 0, 0, 0);
        const previousMonth = new Date(currentMonth);
        previousMonth.setMonth(previousMonth.getMonth() - 1);
        const [currentMonthQuestions, currentMonthStudents, currentMonthTeachers, currentMonthSchools,] = await Promise.all([
            this.questionRepository
                .createQueryBuilder('question')
                .where('question.createdAt >= :start', { start: currentMonth })
                .getCount(),
            this.studentRepository
                .createQueryBuilder('student')
                .where('student.created_at >= :start', { start: currentMonth })
                .getCount(),
            this.teacherRepository
                .createQueryBuilder('teacher')
                .where('teacher.created_at >= :start', { start: currentMonth })
                .getCount(),
            this.schoolRepository
                .createQueryBuilder('school')
                .where('school.createdAt >= :start', { start: currentMonth })
                .getCount(),
        ]);
        const [prevQuestions, prevStudents, prevTeachers, prevSchools] = await Promise.all([
            this.questionRepository
                .createQueryBuilder('question')
                .where('question.createdAt >= :start AND question.createdAt < :end', {
                start: previousMonth,
                end: currentMonth,
            })
                .getCount(),
            this.studentRepository
                .createQueryBuilder('student')
                .where('student.created_at >= :start AND student.created_at < :end', {
                start: previousMonth,
                end: currentMonth,
            })
                .getCount(),
            this.teacherRepository
                .createQueryBuilder('teacher')
                .where('teacher.created_at >= :start AND teacher.created_at < :end', {
                start: previousMonth,
                end: currentMonth,
            })
                .getCount(),
            this.schoolRepository
                .createQueryBuilder('school')
                .where('school.createdAt >= :start AND school.createdAt < :end', {
                start: previousMonth,
                end: currentMonth,
            })
                .getCount(),
        ]);
        const calculateTrend = (current, previous) => {
            if (previous === 0)
                return current > 0 ? 100 : 0;
            return Math.round(((current - previous) / previous) * 100);
        };
        return {
            totalQuestions,
            totalStudents,
            totalTeachers,
            totalSchools,
            trends: {
                questions: calculateTrend(currentMonthQuestions, prevQuestions),
                students: calculateTrend(currentMonthStudents, prevStudents),
                teachers: calculateTrend(currentMonthTeachers, prevTeachers),
                schools: calculateTrend(currentMonthSchools, prevSchools),
            },
        };
    }
    async getChartStatistics() {
        const months = [];
        const khmerMonths = [
            'មករា',
            'កុម្ភៈ',
            'មីនា',
            'មេសា',
            'ឧសភា',
            'មិថុនា',
            'កក្កដា',
            'សីហា',
            'កញ្ញា',
            'តុលា',
            'វិច្ឆិកា',
            'ធ្នូ',
        ];
        for (let i = 5; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            months.push({
                date: new Date(date.getFullYear(), date.getMonth(), 1),
                khmerName: khmerMonths[date.getMonth()],
            });
        }
        const monthlyData = await Promise.all(months.map(async (month) => {
            const nextMonth = new Date(month.date);
            nextMonth.setMonth(nextMonth.getMonth() + 1);
            const [questions, students, teachers, schools] = await Promise.all([
                this.questionRepository
                    .createQueryBuilder('question')
                    .where('question.createdAt >= :start AND question.createdAt < :end', {
                    start: month.date,
                    end: nextMonth,
                })
                    .getCount(),
                this.studentRepository
                    .createQueryBuilder('student')
                    .where('student.created_at >= :start AND student.created_at < :end', {
                    start: month.date,
                    end: nextMonth,
                })
                    .getCount(),
                this.teacherRepository
                    .createQueryBuilder('teacher')
                    .where('teacher.created_at >= :start AND teacher.created_at < :end', {
                    start: month.date,
                    end: nextMonth,
                })
                    .getCount(),
                this.schoolRepository
                    .createQueryBuilder('school')
                    .where('school.createdAt >= :start AND school.createdAt < :end', {
                    start: month.date,
                    end: nextMonth,
                })
                    .getCount(),
            ]);
            return { questions, students, teachers, schools };
        }));
        const monthlyStats = {
            សំណួរ: monthlyData.map((data) => data.questions),
            សិស្ស: monthlyData.map((data) => data.students),
            គ្រូ: monthlyData.map((data) => data.teachers),
            សាលា: monthlyData.map((data) => data.schools),
        };
        const categories = months.map((month) => month.khmerName);
        return {
            monthlyStats,
            categories,
        };
    }
};
exports.StatisticsService = StatisticsService;
exports.StatisticsService = StatisticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(question_entity_1.Question)),
    __param(1, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(2, (0, typeorm_1.InjectRepository)(teacher_entity_1.Teacher)),
    __param(3, (0, typeorm_1.InjectRepository)(school_entity_1.School)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], StatisticsService);
//# sourceMappingURL=statistics.service.js.map