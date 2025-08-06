import { BaseEntity } from './base.entity';
import { Subject } from './subject.entity';
import { SubSubject } from './sub-subject.entity';
import { GradeLevelType } from './class.entity';
export declare enum ExaminationType {
    TEST = "test",
    EXAM = "exam"
}
export declare class ExaminationCategory extends BaseEntity {
    title: string;
    subjectId: number;
    subject: Subject;
    subSubjectId: number;
    subSubject: SubSubject;
    grade: GradeLevelType;
    type: ExaminationType;
    status: string;
    certificateFile: string;
}
