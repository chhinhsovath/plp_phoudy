import { Exam } from './exam.entity';
export declare class ExamQuestion {
    id: number;
    examId: number;
    questionId: number;
    points: number;
    exam: Exam;
    createdAt: Date;
}
