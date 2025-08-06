import { StatisticsService } from './statistics.service';
export declare class StatisticsController {
    private readonly statisticsService;
    constructor(statisticsService: StatisticsService);
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
