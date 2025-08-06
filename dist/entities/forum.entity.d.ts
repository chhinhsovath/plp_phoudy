import { Subject } from './subject.entity';
import { User } from './user.entity';
import { ForumSave } from './forum-save.entity';
import { ForumLike } from './forum-like.entity';
import { ForumComment } from './forum-comment.entity';
export declare enum Audience {
    DRAFT = "DRAFT",
    PRIVATE = "PRIVATE",
    PUBLIC = "PUBLIC",
    CLASS = "CLASS",
    SAVE = "SAVE"
}
export declare enum Status {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}
export declare class Forum {
    id: number;
    title: string;
    content: string;
    audience: Audience;
    subjectId?: number;
    subject?: Subject;
    grade: string;
    status: string;
    usersId: number;
    user: User;
    viewCount: number;
    commentCount: number;
    userLike: number;
    saves: ForumSave[];
    likes: ForumLike[];
    comments: ForumComment[];
    createdAt: Date;
    updatedAt: Date;
    setCreatedAt(): void;
    setUpdatedAt(): void;
}
