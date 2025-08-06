export declare class CreateExamDto {
    title: string;
    examinationCategoryId: number;
    timeLimit: number;
    passingScore: number;
    responseCount: number;
    questionsPerBatch?: string | null;
    selectedLessons: string[];
    selectedActivities: {
        [key: string]: string[];
    };
    selectedQuestions: {
        [key: string]: string[];
    };
    questionPoints: {
        [key: string]: number;
    };
    timeSpent?: number;
    averagePoint?: number;
    status?: string;
}
