import { Homework } from './homework.entity';
import { SubmissionFile } from './submission-files.entity';
import { Teacher } from './teacher.entity';
import { Student } from './student.entity';
export declare enum SubmissionStatus {
    NOT_SUBMITTED = "NOT_SUBMITTED",
    SUBMITTED = "SUBMITTED"
}
export declare enum CheckedStatus {
    UNCHECKED = "UNCHECKED",
    CHECKED = "CHECKED"
}
export declare class HomeworkSubmission {
    id: number;
    submissionText?: string;
    fileUrl?: string;
    studentId: number;
    student: Student;
    submittedAt?: Date;
    score?: number;
    feedback?: string;
    status: SubmissionStatus;
    checkedStatus: CheckedStatus;
    checkedDate?: Date;
    checkedByTeacher?: Teacher;
    createdAt: Date;
    updatedAt: Date;
    homework: Homework;
    submissionFiles: SubmissionFile[];
}
