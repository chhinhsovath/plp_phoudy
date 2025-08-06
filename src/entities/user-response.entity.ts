import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from './question.entity';
import { User } from './user.entity';

@Entity('user_responses')
export class UserResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'question_id' })
  questionId: number;

  @ManyToOne(() => Question)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @Column({ name: 'user_answer', nullable: true })
  userAnswer: string;

  @Column({ name: 'user_answer_file', nullable: true })
  userAnswerFile: string;

  @Column({ name: 'is_correct' })
  isCorrect: boolean;

  @Column({ name: 'time_spent' })
  timeSpent: number;

  @Column({ name: 'score_impact' })
  scoreImpact: number;

  @Column({ name: 'streak_count' })
  streakCount: number;

  @Column({ name: 'hints_used' })
  hintsUsed: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
