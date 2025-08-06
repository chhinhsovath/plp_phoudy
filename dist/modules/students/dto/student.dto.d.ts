declare class UserDto {
    username: string;
    first_name: string;
    last_name: string;
}
declare class ScoreDto {
    date: string;
    value: number;
    subject: string;
    grade: string;
}
declare class ProblemPointDto {
    lesson: string;
}
export declare class StudentDto {
    studentId: number;
    user: UserDto;
    scores: ScoreDto[];
    problemPoints: ProblemPointDto[];
    averageScore: number;
    timeSpent: number;
}
export {};
