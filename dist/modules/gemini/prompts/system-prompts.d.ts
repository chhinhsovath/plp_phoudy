export declare class SystemPrompts {
    static getStudentAnalysisPrompt(studentData?: unknown, message?: string): string;
    static getClassSummaryPrompt(classData?: unknown): string;
    static getMathPerformancePrompt(studentData?: unknown): string;
    static getSubjectPerformancePrompt(subject: string, studentData?: unknown): string;
    static getExerciseAnalysisPrompt(studentData?: unknown): string;
    static getTeachingMaterialsPrompt(): string;
    static getAssessmentPrompt(): string;
    static getStudentRankingPrompt(studentData?: unknown): string;
    static getSubjectActivityPrompt(classData?: unknown): string;
}
