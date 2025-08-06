import { Subject } from './subject.entity';
export declare class BookCategory {
    id: number;
    name: string;
    description: string;
    subjectId: number | null;
    subject: Subject | null;
    gradeLevel: number | null;
    status: string;
    created_at: Date;
    updated_at: Date;
}
