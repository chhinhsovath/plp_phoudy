import { GradeLevelType } from '../../../entities/class.entity';
import { ExaminationType } from '../../../entities/examination-category.entity';
export declare class ExamDto {
    id: number;
    title: string;
    timeSpent?: number;
    timeLimit: number;
    averagePoint?: number;
    passingScore: number;
    questionsPerBatch?: string | null;
    examinationCategoryId: number;
    examinationCategoryTitle?: string;
    subjectId?: number;
    subjectNameEn?: string;
    subjectNameKh?: string;
    grade?: GradeLevelType;
    type?: ExaminationType;
    createdAt: Date;
}
