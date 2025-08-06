import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Subject } from './subject.entity';
import { User } from './user.entity';
import { ForumSave } from './forum-save.entity';
import { ForumLike } from './forum-like.entity';
import { ForumComment } from './forum-comment.entity';

export enum Audience {
  DRAFT = 'DRAFT',
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
  CLASS = 'CLASS',
  SAVE = 'SAVE',
}

export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Entity('forums')
export class Forum {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({
    type: 'enum',
    enum: Audience,
  })
  audience: Audience;

  @Column({ name: 'subjects_id', type: 'bigint', nullable: true })
  subjectId?: number;

  @ManyToOne(() => Subject, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'subjects_id' })
  subject?: Subject;

  @Column({ length: 10 })
  grade: string;

  @Column({
    length: 20,
    default: Status.ACTIVE,
  })
  status: string;

  @Column({ name: 'users_id', type: 'bigint' })
  usersId: number;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'users_id' })
  user: User;

  @Column({ name: 'view_count', default: 0 })
  viewCount: number;

  @Column({ name: 'comment_count', default: 0 })
  commentCount: number;

  @Column({ name: 'user_like', default: 0 })
  userLike: number;

  @OneToMany(() => ForumSave, (save) => save.forum)
  saves: ForumSave[];

  @OneToMany(() => ForumLike, (save) => save.forum)
  likes: ForumLike[];

  @OneToMany(() => ForumComment, (save) => save.forum)
  comments: ForumComment[];

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
