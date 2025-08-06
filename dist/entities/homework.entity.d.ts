import { HomeworkSubmission } from './homework-submission.entity';
export declare class Homework {
    id: number;
    title: string;
    description: string;
    classId: number;
    subjectId: number;
    lessonId: number;
    teacherId: number;
    dueDate: Date;
    status: string;
    allowResubmit: boolean;
    createdAt: Date;
    updatedAt: Date;
    submissions: HomeworkSubmission[];
    setCreateDates(): void;
    updateTimestamp(): void;
}
