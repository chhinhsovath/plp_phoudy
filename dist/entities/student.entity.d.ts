import { User } from './user.entity';
import { Class } from './class.entity';
import { Status } from './enums/status.enum';
import { HomeworkSubmission } from './homework-submission.entity';
export declare class Student {
    studentId: number;
    userId: number;
    user: User;
    classId?: number;
    class?: Class;
    studentNumber?: string;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
    homeworkSubmissions: HomeworkSubmission[];
}
