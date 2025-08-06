import { Status } from '../../../entities/video.entity';
export declare class CreateVideoDto {
    lessonTitle: string;
    url: string;
    teacherName: string;
    subject: string;
    grade: string;
    uploader: string;
    duration?: number;
    durationString?: string;
    uploadDate?: string;
    thumbnailUrl?: string;
    status?: Status;
}
declare const UpdateVideoDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateVideoDto>>;
export declare class UpdateVideoDto extends UpdateVideoDto_base {
}
export declare class VideoResponseDto {
    id: number;
    lessonTitle: string;
    url: string;
    teacherName: string;
    subject: string;
    grade: string;
    uploader: string;
    duration?: number;
    durationString?: string;
    uploadDate?: string;
    thumbnailUrl?: string;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
}
export {};
