import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { HomeworkSubmission } from './homework-submission.entity';
import { Homework } from './homework.entity';

@Entity('submission_files')
export class SubmissionFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'bigint', nullable: false })
  size: number;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  url: string;

  @ManyToOne(
    () => HomeworkSubmission,
    (submission) => submission.submissionFiles,
    {
      onDelete: 'CASCADE',
      eager: false,
    },
  )
  @JoinColumn({ name: 'submission_id' })
  submission: HomeworkSubmission;

  @ManyToOne(() => Homework, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'homework_id' })
  homework?: Homework;
}
