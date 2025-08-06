export declare enum SubmissionStatus {
    NOT_SUBMITTED = "NOT_SUBMITTED",
    SUBMITTED = "SUBMITTED"
}
export declare class SubmissionFileDto {
    name: string;
    size: number;
    type: string;
    url: string;
}
export declare class CreateStudentSubmissionDto {
    homeworkId: number;
    studentId: number;
    submissionText?: string;
    submissionFiles?: SubmissionFileDto[];
    submittedAt?: Date;
    status: SubmissionStatus;
}
