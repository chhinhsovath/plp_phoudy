import { SubmissionFileDto } from '../../homework-submission/dto/homework-submission-student.dto';
export declare class CreateHomeworkDto {
    title: string;
    description?: string;
    classId: number;
    subjectId: number;
    lessonId: number;
    teacherId: number;
    dueDate: string;
    status: string;
    allowResubmit?: boolean;
    homeworkFiles?: SubmissionFileDto[];
    filesToDelete?: number[];
}
