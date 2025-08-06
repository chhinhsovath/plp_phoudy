import { Status } from './enums/status.enum';
export declare enum SubjectType {
    NORMAL = "NORMAL",
    SPECIAL = "SPECIAL"
}
export declare class Subject {
    id: number;
    name: string;
    khmer_name: string;
    description: string;
    status: Status;
    is_student: boolean;
    path: string;
    subject_type: SubjectType;
    lessons: any[];
    created_at: Date;
    updated_at: Date;
}
