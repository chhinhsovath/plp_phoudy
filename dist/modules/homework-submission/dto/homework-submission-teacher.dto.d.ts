export declare enum CheckedStatus {
    UNCHECKED = "UNCHECKED",
    CHECKED = "CHECKED"
}
export declare class UpdateTeacherFeedbackDto {
    score?: number;
    feedback?: string;
    checkedStatus?: CheckedStatus;
    checkedDate?: Date;
    checkedByTeacherId?: number;
}
