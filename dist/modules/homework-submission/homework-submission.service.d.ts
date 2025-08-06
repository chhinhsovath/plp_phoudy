import { Repository } from 'typeorm';
import { HomeworkSubmission } from 'src/entities/homework-submission.entity';
import { SubmissionFile } from 'src/entities/submission-files.entity';
import { SubmissionStatus, CheckedStatus } from './dto/homework-submission.dto';
import { CreateStudentSubmissionDto } from './dto/homework-submission-student.dto';
import { UpdateTeacherFeedbackDto } from './dto/homework-submission-teacher.dto';
export declare class HomeworkSubmissionService {
    private readonly submissionRepo;
    private readonly submissionFileRepo;
    constructor(submissionRepo: Repository<HomeworkSubmission>, submissionFileRepo: Repository<SubmissionFile>);
    findAll(): Promise<HomeworkSubmission[]>;
    findOne(id: number): Promise<HomeworkSubmission>;
    create(dto: CreateStudentSubmissionDto): Promise<HomeworkSubmission>;
    update(id: number, dto: UpdateTeacherFeedbackDto & {
        studentId?: number;
        submissionFiles?: any[];
        filesToDelete?: number[];
    }, options?: {
        isTeacher?: boolean;
    }): Promise<HomeworkSubmission>;
    findByHomeworkId(homeworkId: number): Promise<HomeworkSubmission[]>;
    findByStudentId(studentId: number): Promise<HomeworkSubmission[]>;
    searchSubmissions(filter: {
        studentId?: number;
        homeworkId?: number;
        status?: string;
        checkedStatus?: string;
        page?: number;
        limit?: number;
        overdue?: boolean;
    }): Promise<{
        data: HomeworkSubmission[];
        total: number;
    }>;
    remove(id: number): Promise<void>;
    countSubmissions(filter: {
        studentId?: number;
        status?: SubmissionStatus;
        checkedStatus?: CheckedStatus;
    }): Promise<{
        total: number;
    }>;
}
