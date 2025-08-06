import { Audience, Forum } from '../../entities/forum.entity';
import { CreateCommentDto, UpdateCommentDto } from './dto/forum-comment.dto';
import { CreateForumDto, FilterOptions, UpdateForumDto } from './dto/forum.dto';
import { ForumsService } from './forums.service';
export declare class ForumsController {
    private readonly forumsService;
    constructor(forumsService: ForumsService);
    getForums(audience?: FilterOptions['audience'], subjectId?: number, search?: string, page?: number, limit?: number): Promise<import("../../common/pagination.interface").PaginationResult<Forum>>;
    getMyForums(audience?: FilterOptions['audience'], subjectId?: number, search?: string, page?: number, limit?: number, req?: any): Promise<import("../../common/pagination.interface").PaginationResult<Forum>>;
    findOne(id: number, req: any): Promise<{
        id: number;
        isLiked: boolean;
        isSaved: boolean;
        title: string;
        content: string;
        audience: Audience;
        subjectId?: number;
        subject?: import("../../entities/subject.entity").Subject;
        grade: string;
        status: string;
        usersId: number;
        user: import("../../entities/user.entity").User;
        viewCount: number;
        commentCount: number;
        userLike: number;
        saves: import("../../entities/forum-save.entity").ForumSave[];
        likes: import("../../entities/forum-like.entity").ForumLike[];
        comments: import("../../entities/forum-comment.entity").ForumComment[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOnePublic(id: number, req: any): Promise<{
        id: number;
        isLiked: boolean;
        isSaved: boolean;
        title: string;
        content: string;
        audience: Audience;
        subjectId?: number;
        subject?: import("../../entities/subject.entity").Subject;
        grade: string;
        status: string;
        usersId: number;
        user: import("../../entities/user.entity").User;
        viewCount: number;
        commentCount: number;
        userLike: number;
        saves: import("../../entities/forum-save.entity").ForumSave[];
        likes: import("../../entities/forum-like.entity").ForumLike[];
        comments: import("../../entities/forum-comment.entity").ForumComment[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    findBySubjectId(subjectId: number): Promise<Forum[]>;
    togglerSaveForum(forumId: number, req: any): Promise<import("../../common/message.interface").ApiResponseMessage & {
        forum?: {
            id: number;
            title: string;
        };
    }>;
    togglerLikeForum(forumId: number, req: any): Promise<import("../../common/message.interface").ApiResponseMessage & {
        forum?: {
            id: number;
            title: string;
        };
    }>;
    findByUserId(userId: number): Promise<Forum[]>;
    create(createForumDto: CreateForumDto, req: any): Promise<Forum>;
    update(id: number, updateForumDto: UpdateForumDto, req: any): Promise<Forum>;
    incrementViewCount(id: number): Promise<Forum>;
    remove(id: number, req: any): Promise<void>;
    createComment(dto: CreateCommentDto, req: any): Promise<any>;
    updateComment(id: number, dto: UpdateCommentDto, req: any): Promise<any>;
    removeComment(id: number, req: any): Promise<import("../../entities/forum-comment.entity").ForumComment>;
    getForumComments(forumId: number): Promise<any[]>;
}
