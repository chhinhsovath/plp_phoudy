export declare class PerformanceHistoryDTO {
    date: string;
    value: number;
    correct: number;
    incorrect: number;
}
export declare class LessonInfoDTO {
    id: string;
    title: string;
    lesson_number: number;
}
export declare class QuestionStatisticsDTO {
    id: string;
    question: string;
    averageScore: number;
    studentCompleted: number;
    lesson: LessonInfoDTO;
    subject: string;
    grade: string;
    performance: PerformanceHistoryDTO[];
}
