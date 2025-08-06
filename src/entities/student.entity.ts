import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Class } from './class.entity';
import { Status } from './enums/status.enum';
import { HomeworkSubmission } from './homework-submission.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn({ name: 'student_id' })
  studentId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, { eager: true }) // optional eager loading
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'class_id', nullable: true })
  classId?: number;

  @ManyToOne(() => Class, { eager: true })
  @JoinColumn({ name: 'class_id' })
  class?: Class;

  @Column({ name: 'student_number', unique: true, nullable: true })
  studentNumber?: string;

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

  @OneToMany(() => HomeworkSubmission, (submission) => submission.student)
  homeworkSubmissions: HomeworkSubmission[];
}
