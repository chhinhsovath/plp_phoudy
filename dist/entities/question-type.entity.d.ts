import { Question } from './question.entity';
export declare class QuestionType {
    id: number;
    typeKey: string;
    label: string;
    isActive: boolean;
    questions: Question[];
    createdAt: Date;
}
