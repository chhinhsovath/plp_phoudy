import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from './enums/status.enum';
import { LessonActivity } from './lesson-activity.entity';
import { QuestionType } from './question-type.entity';
import { QuestionExplanation } from './question-explanation.entity';

export enum QuestionUsage {
  EXAM = 'exam',
  LEARN = 'learn',
  BOTH = 'both',
}

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'text', nullable: true })
  introduction: string;

  @Column({ type: 'text', nullable: true, name: 'question_text' })
  questionText: string;

  @Column({ type: 'text', nullable: true, name: 'difficulty_level' })
  difficultyLevel: string;

  @Column({ type: 'int', name: 'question_type_id' })
  questionTypeId: number;

  @ManyToOne(() => QuestionType, (questionType) => questionType.questions)
  @JoinColumn({ name: 'question_type_id' })
  questionType: QuestionType;

  @Column({ type: 'bigint', nullable: true, name: 'lesson_activities_id' })
  lessonActivitiesId: number | null;

  @ManyToOne(() => LessonActivity, (activity) => activity.questions, {
    nullable: true,
  })
  @JoinColumn({ name: 'lesson_activities_id' })
  lessonActivity: LessonActivity | null;

  @Column({ type: 'text', nullable: true, name: 'question_image' })
  questionImage: string;

  @Column({ type: 'text', nullable: true, name: 'question_audio' })
  questionAudio: string;

  @OneToOne(() => QuestionExplanation, (explanation) => explanation.question)
  explanation: QuestionExplanation;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  @Column({
    type: 'enum',
    enum: QuestionUsage,
    default: QuestionUsage.LEARN,
    name: 'usage_type',
  })
  usageType: QuestionUsage;

  @Column({
    type: 'boolean',
    default: false,
    name: 'random_answers',
  })
  randomAnswers: boolean;

  @OneToMany('Answer', 'question')
  answers: any[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
