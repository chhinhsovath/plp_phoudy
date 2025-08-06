import { SubmissionStatus, CheckedStatus } from './dto/homework-submission.dto';
import { CreateStudentSubmissionDto } from './dto/homework-submission-student.dto';
import { UpdateTeacherFeedbackDto } from './dto/homework-submission-teacher.dto';
import { HomeworkSubmissionService } from './homework-submission.service';
import { CountHomeworkSubmissionDto } from './dto/homework-submission-count.dto';
export declare class HomeworkSubmissionController {
    private readonly service;
    constructor(service: HomeworkSubmissionService);
    search(studentId?: number, homeworkId?: number, status?: SubmissionStatus, checkedStatus?: CheckedStatus, page?: number, limit?: number, overdue?: string): Promise<{
        data: import("../../entities/homework-submission.entity").HomeworkSubmission[];
        total: number;
    }>;
    countSubmissions(filter: CountHomeworkSubmissionDto): Promise<{
        total: number;
    }>;
    findAll(): Promise<import("../../entities/homework-submission.entity").HomeworkSubmission[]>;
    findOne(id: number): Promise<import("../../entities/homework-submission.entity").HomeworkSubmission>;
    findByHomeworkId(homeworkId: number): Promise<import("../../entities/homework-submission.entity").HomeworkSubmission[]>;
    findByStudentId(studentId: number): Promise<import("../../entities/homework-submission.entity").HomeworkSubmission[]>;
    create(files: Express.Multer.File[], body: CreateStudentSubmissionDto & {
        homeworkId: number;
        studentId: number;
        submissionText?: string;
    }): Promise<import("../../entities/homework-submission.entity").HomeworkSubmission>;
    update(id: number, dto: UpdateTeacherFeedbackDto): Promise<import("../../entities/homework-submission.entity").HomeworkSubmission>;
    studentUpdate(id: number, files: Express.Multer.File[], body: any): Promise<import("../../entities/homework-submission.entity").HomeworkSubmission>;
    remove(id: number): Promise<void>;
    studentRemove(id: number, body: {
        studentId: number;
    }): Promise<void>;
}
