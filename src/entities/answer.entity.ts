import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from './question.entity';

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'question_id', type: 'bigint' })
  questionId: number;

  @Column({ name: 'answer_text', type: 'text', nullable: true })
  answerText: string | null;

  @Column({ name: 'answer_file', type: 'text', nullable: true })
  answerFile: string | null;

  @Column({ name: 'is_correct', type: 'boolean' })
  isCorrect: boolean;

  @Column({ name: 'match_key', type: 'text', nullable: true })
  matchKey: string | null;

  @Column({ name: 'match_value', type: 'text', nullable: true })
  matchValue: string | null;

  @Column({ name: 'order_index', type: 'int' })
  orderIndex: number;

  @Column({ name: 'display_order', type: 'int' })
  displayOrder: number;

  @Column({ name: 'metadata', type: 'jsonb', nullable: true })
  metadata: any;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Question, (question) => question.answers)
  @JoinColumn({ name: 'question_id' })
  question: Question;
}
