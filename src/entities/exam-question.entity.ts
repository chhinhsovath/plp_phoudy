import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exam } from './exam.entity';

@Entity('exam_questions')
export class ExamQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'exam_id' })
  examId: number;

  @Column({ name: 'question_id' })
  questionId: number;

  @Column({ name: 'points', type: 'decimal', precision: 5, scale: 2 })
  points: number;

  @ManyToOne(() => Exam)
  @JoinColumn({ name: 'exam_id' })
  exam: Exam;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
