export declare class UserResponseDto {
    id: number;
    userId: number;
    questionId: number;
    userAnswer?: string;
    userAnswerFile?: string;
    isCorrect: boolean;
    timeSpent: number;
    scoreImpact: number;
    streakCount: number;
    hintsUsed: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare class CreateUserResponseDto {
    userId: number;
    questionId: number;
    userAnswer?: string;
    userAnswerFile?: string;
    isCorrect: boolean;
    timeSpent: number;
    scoreImpact: number;
    streakCount: number;
    hintsUsed: number;
}
export declare class UpdateUserResponseDto extends CreateUserResponseDto {
}
export declare class BulkDeleteDto {
    ids: number[];
}
