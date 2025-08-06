import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Forum } from './forum.entity';
import { User } from './user.entity';

@Entity('forum_comments')
export class ForumComment {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ name: 'forum_id', type: 'bigint' })
  forumId: number;

  @ManyToOne(() => Forum, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'forum_id' })
  forum: Forum;

  @Column({ name: 'user_id', type: 'bigint' })
  userId: number;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  setCreatedAt() {
    const now = new Date();
    this.createdAt = now;
    this.updatedAt = now;
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }
}
