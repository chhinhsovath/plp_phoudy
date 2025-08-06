import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Entity('videos')
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'lesson_title', nullable: false })
  lessonTitle: string;

  @Column({ nullable: false })
  url: string;

  @Column({ name: 'teacher_name', nullable: false })
  teacherName: string;

  @Column({ nullable: false })
  subject: string;

  @Column({ nullable: false })
  grade: string;

  @Column({ nullable: false })
  uploader: string;

  @Column({ nullable: true })
  duration: number;

  @Column({ name: 'duration_string', nullable: true })
  durationString: string;

  @Column({ name: 'upload_date', nullable: true })
  uploadDate: string;

  @Column({ name: 'thumbnail_url', nullable: true })
  thumbnailUrl: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

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
