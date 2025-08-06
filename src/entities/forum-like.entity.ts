import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { Forum } from './forum.entity';
import { User } from './user.entity';

@Entity('forum_likes')
@Unique(['forumId', 'userId']) // Ensure one like per user per forum
export class ForumLike {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'forum_id', type: 'bigint' })
  forumId: number;

  @ManyToOne(() => Forum, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'forum_id' })
  forum: Forum;

  @Column({ name: 'user_id', type: 'bigint' })
  userId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }
}
