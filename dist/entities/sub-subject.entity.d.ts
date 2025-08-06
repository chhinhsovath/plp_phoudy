import { BaseEntity } from './base.entity';
import { Subject } from './subject.entity';
export declare class SubSubject extends BaseEntity {
    subjectId: number | null;
    subject: Subject;
    name: string;
    khmerName: string;
    description: string;
    status: string;
    path: string;
}
