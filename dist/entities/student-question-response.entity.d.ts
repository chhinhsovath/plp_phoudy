import { User } from './user.entity';
export declare class StudentQuestionResponse {
    id: number;
    studentId: number;
    student: any;
    questionId: number;
    question: any;
    answerId: number;
    answer: any;
    response_text: string;
    is_correct: boolean;
    score: number;
    attempts: number;
    createdBy: number;
    creator: User;
    created_at: Date;
    updated_at: Date;
}
