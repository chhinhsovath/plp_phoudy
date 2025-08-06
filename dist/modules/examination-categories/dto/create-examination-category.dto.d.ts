import { ExaminationType } from '../../../entities/examination-category.entity';
import { GradeLevelType } from '../../../entities/class.entity';
export declare class CreateExaminationCategoryDto {
    title: string;
    subjectId?: number;
    subSubjectId?: number;
    grade?: GradeLevelType;
    type: ExaminationType;
    status?: string;
    certificateFile?: string;
}
