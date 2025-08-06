import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Question } from './question.entity';

@Entity('question_explanations')
export class QuestionExplanation {
  @PrimaryColumn({ type: 'bigint', name: 'question_id' })
  questionId: number;

  @Column({ type: 'text' })
  explanation: string;

  @OneToOne(() => Question)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
