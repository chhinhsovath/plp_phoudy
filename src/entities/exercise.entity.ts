import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Lesson } from './lesson.entity';

@Entity('exercises')
export class Exercise {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  id: string;

  @Column({ name: 'lesson_id' })
  lessonId: number;

  @ManyToOne(() => Lesson, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lesson;

  @Column({ length: 200 })
  title: string;

  @Column({ length: 20 })
  grade_level: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany('StudentExercise', 'exercise')
  studentExercises: any[];
}
