export declare class CreateAnswerDto {
    questionId: number;
    answerText?: string;
    answerFile?: string;
    isCorrect: boolean;
    matchKey?: string;
    matchValue?: string;
    orderIndex: number;
    displayOrder: number;
    metadata?: Record<string, any>;
}
