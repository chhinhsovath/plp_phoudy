import { HomeworkSubmission } from './homework-submission.entity';
import { Homework } from './homework.entity';
export declare class SubmissionFile {
    id: number;
    name: string;
    size: number;
    type: string;
    url: string;
    submission: HomeworkSubmission;
    homework?: Homework;
}
