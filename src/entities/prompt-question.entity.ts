import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('prompt_questions')
export class PromptQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  grade: string;

  @Column({ nullable: true })
  domain: string;

  @Column({ nullable: true })
  topic: string;

  @Column({ nullable: true })
  bloom_level: string;

  @Column({ nullable: true })
  skills_knowledge: string;

  @Column({ nullable: true })
  tarl_level: string;

  @Column({ nullable: true })
  difficulty: string;

  @Column()
  question_title: string;

  @Column({ type: 'text' })
  question_content: string;

  @Column({ nullable: true, type: 'text' })
  response: string;

  @Column({ nullable: true })
  tags: string;

  @Column({ nullable: true })
  source_file: string;

  @Column({ nullable: true, type: 'jsonb' })
  embedding: any;

  @Column({ default: false })
  is_suggestion: boolean;

  @CreateDateColumn()
  created_at: Date;
}
