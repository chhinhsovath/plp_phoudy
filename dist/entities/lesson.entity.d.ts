import { Subject } from './subject.entity';
import { User } from './user.entity';
import { Status } from './enums/status.enum';
export declare class Lesson {
    id: number;
    subjectId: number;
    subject: Subject;
    title: string;
    description: string;
    grade_level: number;
    lesson_number: number;
    createdBy: number;
    creator: User;
    status: Status;
    is_hidden: boolean;
    activities: any[];
    questions: any[];
    created_at: Date;
    updated_at: Date;
}
