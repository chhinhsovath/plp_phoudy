import { Audience } from '../../../entities/forum.entity';
export declare class CreateForumDto {
    title: string;
    content?: string;
    audience?: Audience;
    subjectId?: number;
    grade: string;
    status?: string;
}
declare const UpdateForumDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateForumDto>>;
export declare class UpdateForumDto extends UpdateForumDto_base {
}
export declare class ForumResponseDto {
    id: number;
    title: string;
    content?: string;
    audience: Audience;
    subjectId?: number;
    grade: string;
    status: string;
    usersId: number;
    user?: any;
    viewCount: number;
    commentCount: number;
    userLike: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface FilterOptions {
    audience?: 'YOUR' | 'SAVE' | 'CLASS' | 'STUDENT' | 'PUBLIC' | 'PRIVATE' | 'DRAFT';
    subjectId?: number;
    search?: string;
    page: number;
    limit: number;
    userId?: string;
}
export {};
