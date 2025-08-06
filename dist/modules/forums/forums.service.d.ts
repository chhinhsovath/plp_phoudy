import { ApiResponseMessage } from 'src/common/message.interface';
import { PaginationResult } from 'src/common/pagination.interface';
import { ForumSave } from 'src/entities/forum-save.entity';
import { Repository } from 'typeorm';
import { Audience, Forum } from '../../entities/forum.entity';
import { CreateForumDto, FilterOptions, UpdateForumDto } from './dto/forum.dto';
import { ForumLike } from 'src/entities/forum-like.entity';
import { ForumComment } from 'src/entities/forum-comment.entity';
import { CreateCommentDto, UpdateCommentDto } from './dto/forum-comment.dto';
import { Student } from 'src/entities/student.entity';
import { Teacher } from 'src/entities/teacher.entity';
import { Class } from 'src/entities/class.entity';
export declare class ForumsService {
    private forumRepository;
    private forumSaveRepository;
    private forumLikeRepository;
    private forumCommentRepository;
    private studentRepository;
    private teacherRepository;
    private classRepository;
    constructor(forumRepository: Repository<Forum>, forumSaveRepository: Repository<ForumSave>, forumLikeRepository: Repository<ForumLike>, forumCommentRepository: Repository<ForumComment>, studentRepository: Repository<Student>, teacherRepository: Repository<Teacher>, classRepository: Repository<Class>);
    private decryptForumContent;
    private decryptForumsContent;
    private decryptComment;
    getMyStudentForums(options: FilterOptions): Promise<PaginationResult<Forum>>;
    getClassForums(options: FilterOptions): Promise<PaginationResult<Forum>>;
    getPublicOrPrivateForums(options: FilterOptions): Promise<PaginationResult<Forum>>;
    getFilteredForums(options: FilterOptions): Promise<PaginationResult<Forum>>;
    findAll(): Promise<Forum[]>;
    checkIsLiked(forumId: number, userId?: number): Promise<boolean>;
    checkIsSaved(forumId: number, userId?: number): Promise<boolean>;
    findOne(id: number, userId?: number): Promise<{
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
        saves: ForumSave[];
        likes: ForumLike[];
        comments: ForumComment[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    findBySubjectId(subjectId: number): Promise<Forum[]>;
    findByUserId(userId: number): Promise<Forum[]>;
    findByAudience(audience: Audience): Promise<Forum[]>;
    findByGrade(grade: string): Promise<Forum[]>;
    create(createForumDto: CreateForumDto, userId: string): Promise<Forum>;
    update(id: number, updateForumDto: UpdateForumDto): Promise<Forum>;
    incrementViewCount(id: number): Promise<Forum>;
    remove(id: number): Promise<void>;
    togglerSaveForum(forumId: number, userId: number): Promise<ApiResponseMessage & {
        forum?: {
            id: number;
            title: string;
        };
    }>;
    togglerLikeForum(forumId: number, userId: number): Promise<ApiResponseMessage & {
        forum?: {
            id: number;
            title: string;
        };
    }>;
    creatComment(createDto: CreateCommentDto, userId: number): Promise<any>;
    updateComment(id: number, dto: UpdateCommentDto, userId: number): Promise<any>;
    removeComment(id: number, userId: number): Promise<ForumComment>;
    getForumComments(forumId: number): Promise<any[]>;
}
