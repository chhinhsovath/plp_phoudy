import { BaseEntity } from './base.entity';
import { ExaminationCategory } from './examination-category.entity';
export declare class Exam extends BaseEntity {
    title: string;
    timeSpent: number;
    timeLimit: number;
    averagePoint: number;
    passingScore: number;
    responseCount: number;
    questionsPerBatch: string | null;
    examinationCategoryId: number;
    status: string;
    examinationCategory: ExaminationCategory;
}
