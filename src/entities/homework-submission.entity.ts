import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Homework } from './homework.entity';
import { SubmissionFile } from './submission-files.entity';
import { Teacher } from './teacher.entity';
import { Student } from './student.entity';

// Enums inside entity file
export enum SubmissionStatus {
  NOT_SUBMITTED = 'NOT_SUBMITTED',
  SUBMITTED = 'SUBMITTED',
}

export enum CheckedStatus {
  UNCHECKED = 'UNCHECKED',
  CHECKED = 'CHECKED',
}

@Entity('homework_submissions')
export class HomeworkSubmission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'submission_text', nullable: true })
  submissionText?: string;

  @Column({ name: 'file_url', nullable: true })
  fileUrl?: string;

  @Column({ name: 'student_id' })
  studentId: number;

  @ManyToOne(() => Student, (student) => student.homeworkSubmissions)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column({
    name: 'submitted_at',
    type: 'timestamp',
    nullable: true,
  })
  submittedAt?: Date;

  @Column({ type: 'int', nullable: true })
  score?: number;

  @Column({ nullable: true })
  feedback?: string;

  @Column({
    type: 'enum',
    enum: SubmissionStatus,
    enumName: 'submission_status', // Explicit name for Postgres enum type
    default: SubmissionStatus.NOT_SUBMITTED,
  })
  status: SubmissionStatus;

  @Column({
    name: 'checked_status',
    type: 'enum',
    enum: CheckedStatus,
    enumName: 'checked_status', // Explicit name for Postgres enum type
    default: CheckedStatus.UNCHECKED,
  })
  checkedStatus: CheckedStatus;

  @Column({
    name: 'checked_date',
    type: 'timestamp',
    nullable: true,
  })
  checkedDate?: Date;

  @ManyToOne(() => Teacher, { nullable: true })
  @JoinColumn({ name: 'checked_by' }) // assuming your DB column name is 'checked_by'
  checkedByTeacher?: Teacher;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Homework, (homework) => homework.submissions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'homework_id' })
  homework: Homework;

  @OneToMany(() => SubmissionFile, (file) => file.submission, {
    cascade: true,
    eager: false,
  })
  submissionFiles: SubmissionFile[];
}
