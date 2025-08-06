import { Subject } from './subject.entity';
export declare class SubjectGrade {
    id: number;
    subject_id: number;
    grade_level: number;
    subject: Subject;
    created_at: Date;
    updated_at: Date;
}
