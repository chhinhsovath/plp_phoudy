import { Question } from './question.entity';
import { User } from './user.entity';
export declare class UserResponse {
    id: number;
    userId: number;
    user: User;
    questionId: number;
    question: Question;
    userAnswer: string;
    userAnswerFile: string;
    isCorrect: boolean;
    timeSpent: number;
    scoreImpact: number;
    streakCount: number;
    hintsUsed: number;
    createdAt: Date;
    updatedAt: Date;
}
