import { Question } from './question.entity';
export declare class Answer {
    id: number;
    questionId: number;
    answerText: string | null;
    answerFile: string | null;
    isCorrect: boolean;
    matchKey: string | null;
    matchValue: string | null;
    orderIndex: number;
    displayOrder: number;
    metadata: any;
    createdAt: Date;
    updatedAt: Date;
    question: Question;
}
