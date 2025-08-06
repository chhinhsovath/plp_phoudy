import { Repository } from 'typeorm';
import { Question } from '../../entities/question.entity';
import { Student } from '../../entities/student.entity';
import { Teacher } from '../../entities/teacher.entity';
import { School } from '../../entities/school.entity';
export declare class StatisticsService {
    private questionRepository;
    private studentRepository;
    private teacherRepository;
    private schoolRepository;
    constructor(questionRepository: Repository<Question>, studentRepository: Repository<Student>, teacherRepository: Repository<Teacher>, schoolRepository: Repository<School>);
    getOverallStatistics(): Promise<{
        totalQuestions: number;
        totalStudents: number;
        totalTeachers: number;
        totalSchools: number;
        trends: {
            questions: number;
            students: number;
            teachers: number;
            schools: number;
        };
    }>;
    getChartStatistics(): Promise<{
        monthlyStats: {
            សំណួរ: number[];
            សិស្ស: number[];
            គ្រូ: number[];
            សាលា: number[];
        };
        categories: string[];
    }>;
}
