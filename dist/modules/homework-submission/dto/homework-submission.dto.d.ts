export declare enum SubmissionStatus {
    NOT_SUBMITTED = "NOT_SUBMITTED",
    SUBMITTED = "SUBMITTED"
}
export declare enum CheckedStatus {
    UNCHECKED = "UNCHECKED",
    CHECKED = "CHECKED"
}
export declare class CreateHomeworkSubmissionDto {
    homeworkId: number;
    studentId: number;
    submissionText?: string;
    fileUrl?: string;
    score?: number;
    feedback?: string;
    status: SubmissionStatus;
    checkedStatus?: CheckedStatus;
    submittedAt?: Date;
    checkedDate?: Date;
    checkedByTeacherId?: number;
    overdue?: boolean;
    allowResubmit?: boolean;
}
declare const UpdateHomeworkSubmissionDto_base: import("@nestjs/common").Type<Partial<CreateHomeworkSubmissionDto>>;
export declare class UpdateHomeworkSubmissionDto extends UpdateHomeworkSubmissionDto_base {
}
export {};
