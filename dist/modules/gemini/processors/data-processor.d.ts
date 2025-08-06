export interface ProcessedStudentData {
    id?: string | number;
    name?: string;
    performance: {
        averageScore: number;
        totalTimeSpent: number;
        averageTimePerExercise: number;
        totalExercisesCompleted: number;
        exerciseCompletionRate: number;
        detailedScores: any[];
        strongSubjects: Array<{
            subject: string;
            score: number;
        }>;
        weakSubjects: Array<{
            subject: string;
            score: number;
        }>;
        totalQuestions: number;
        correctAnswers: number;
    };
}
export interface ProcessedClassData {
    classId: number;
    className: string;
    gradeLevel: number;
    totalStudents: number;
    teacherName: string;
    students: ProcessedStudentData[];
    analytics: {
        classAverageScore: number;
        totalClassTimeSpent: number;
        averageCompletionRate: number;
        highPerformersCount: number;
        studentsNeedingHelpCount: number;
        mostActiveStudents: ProcessedStudentData[];
        engagementLevel: string;
    };
}
export declare class DataProcessor {
    static getKhmerSubjectName(subjectId: number | string): string;
    static formatKhmerStudentName(student: any): string;
    static processAnalysisData(analysisData: any): {
        studentData: ProcessedStudentData[];
        classData: ProcessedClassData;
    };
    private static processIndividualStudent;
    private static calculateEngagementLevel;
    static processFallbackData(teacherUserId: number, students: any[]): {
        studentData: any[];
        classData: any;
    };
    static validateAndCleanData(studentData?: unknown, classData?: unknown): {
        validStudentData: unknown;
        validClassData: unknown;
        errors: string[];
    };
    static optimizeForPrompt(data: unknown): string;
    static createPerformanceSummary(studentData: ProcessedStudentData[]): {
        topPerformers: ProcessedStudentData[];
        needingHelp: ProcessedStudentData[];
        averageMetrics: {
            classAverage: number;
            completionRate: number;
            totalTimeSpent: number;
        };
    };
}
