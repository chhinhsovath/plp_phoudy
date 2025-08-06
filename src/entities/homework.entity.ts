// src/entities/homework.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { HomeworkSubmission } from './homework-submission.entity';

@Entity('homework')
export class Homework {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'class_id', type: 'bigint' })
  classId: number;

  @Column({ name: 'subject_id', type: 'bigint' })
  subjectId: number;

  @Column({ name: 'lesson_id', type: 'bigint' })
  lessonId: number;

  @Column({ name: 'teacher_id', type: 'bigint' })
  teacherId: number;

  @Column({ name: 'due_date', type: 'timestamp' })
  dueDate: Date;

  @Column({ nullable: false })
  status: string;

  @Column({ type: 'boolean', default: false })
  allowResubmit: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  // Relation: Homework → HomeworkSubmission
  @OneToMany(() => HomeworkSubmission, (submission) => submission.homework)
  submissions: HomeworkSubmission[];

  @BeforeInsert()
  setCreateDates() {
    const now = new Date();
    this.createdAt = now;
    this.updatedAt = now;
  }

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
