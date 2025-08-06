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
import { Subject } from './subject.entity';
import { User } from './user.entity';
import { Status } from './enums/status.enum';

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'subject_id' })
  subjectId: number;

  @ManyToOne(() => Subject, (subject) => subject.lessons)
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  grade_level: number;

  @Column({ unique: true })
  lesson_number: number;

  @Column({ name: 'created_by' })
  createdBy: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  creator: User;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  @Column({ default: false })
  is_hidden: boolean;

  @OneToMany('LessonActivity', 'lesson')
  activities: any[];

  @OneToMany('Question', 'lesson')
  questions: any[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
