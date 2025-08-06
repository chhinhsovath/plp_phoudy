import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('student_question_responses')
export class StudentQuestionResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'student_id' })
  studentId: number;

  @ManyToOne('Student')
  @JoinColumn({ name: 'student_id' })
  student: any;

  @Column({ name: 'question_id' })
  questionId: number;

  @ManyToOne('Question')
  @JoinColumn({ name: 'question_id' })
  question: any;

  @Column({ name: 'answer_id', nullable: true })
  answerId: number;

  @ManyToOne('Answer')
  @JoinColumn({ name: 'answer_id' })
  answer: any;

  @Column({ type: 'text', nullable: true })
  response_text: string;

  @Column({ nullable: true })
  is_correct: boolean;

  @Column({ nullable: true })
  score: number;

  @Column({ nullable: true })
  attempts: number;

  @Column({ name: 'created_by', nullable: true })
  createdBy: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  creator: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
