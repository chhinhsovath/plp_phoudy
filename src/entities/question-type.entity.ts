import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question.entity';

@Entity('question_types')
export class QuestionType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'type_key', length: 100 })
  typeKey: string;

  @Column({ type: 'varchar', length: 255 })
  label: string;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive: boolean;

  @OneToMany(() => Question, (question) => question.questionType)
  questions: Question[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
