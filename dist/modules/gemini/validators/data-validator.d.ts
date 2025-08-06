export interface StudentDataValidation {
    isValid: boolean;
    errors: string[];
    cleanedData?: unknown;
}
export interface ClassDataValidation {
    isValid: boolean;
    errors: string[];
    cleanedData?: unknown;
}
export declare class DataValidator {
    static validateMessage(message: string): void;
    static validateTeacherTitle(teacherTitle: string): void;
    static validateStudentData(studentData: unknown): StudentDataValidation;
    static validateClassData(classData: unknown): ClassDataValidation;
    private static validateSingleStudent;
    private static sanitizeAnalytics;
    static sanitizeForPrompt(data: unknown): string;
}
