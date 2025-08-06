import { Forum } from './forum.entity';
import { User } from './user.entity';
export declare class ForumComment {
    id: number;
    content: string;
    forumId: number;
    forum: Forum;
    userId: number;
    user: User;
    createdAt: Date;
    updatedAt: Date;
    setCreatedAt(): void;
    setUpdatedAt(): void;
}
