import { Forum } from './forum.entity';
import { User } from './user.entity';
export declare class ForumLike {
    id: number;
    forumId: number;
    forum: Forum;
    userId: number;
    user: User;
    createdAt: Date;
    updatedAt: Date;
    setCreatedAt(): void;
    setUpdatedAt(): void;
}
