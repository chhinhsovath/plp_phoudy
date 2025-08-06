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
import { Status } from './enums/status.enum';
import { Lesson } from './lesson.entity';

@Entity('lesson_activities')
export class LessonActivity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'lesson_id' })
  lessonId: number;

  @ManyToOne(() => Lesson)
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lesson;

  @Column()
  title: string;

  @Column({ nullable: true })
  order_index: number;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  @OneToMany('Question', 'lessonActivity')
  questions: any[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
