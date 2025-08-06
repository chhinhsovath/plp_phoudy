import { Question } from './question.entity';
export declare class QuestionExplanation {
    questionId: number;
    explanation: string;
    question: Question;
    createdAt: Date;
}
