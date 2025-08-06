export declare class SearchHomeworkDto {
    query?: string;
    page?: number;
    limit?: number;
    teacherId?: number;
    classId?: number;
    subjectId?: number;
    lessonId?: number;
    status?: 'DRAFT' | 'ACTIVE' | 'CLOSED';
    overdue?: string;
    studentId?: number;
    hasSubmission?: string;
    createdFrom?: string;
    createdTo?: string;
    dueFrom?: string;
    dueTo?: string;
    submittedFrom?: string;
    submittedTo?: string;
}
