export declare enum Status {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}
export declare class Video {
    id: number;
    lessonTitle: string;
    url: string;
    teacherName: string;
    subject: string;
    grade: string;
    uploader: string;
    duration: number;
    durationString: string;
    uploadDate: string;
    thumbnailUrl: string;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
    setCreatedAt(): void;
    setUpdatedAt(): void;
}
