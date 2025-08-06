import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('student_exercise')
export class StudentExercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'student_id' })
  studentId: number;

  @ManyToOne('Student', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'student_id' })
  student: any;

  @Column({ name: 'exercise_id' })
  exerciseId: string;

  @ManyToOne('Exercise', 'studentExercises', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'exercise_id' })
  exercise: any;

  @Column({ type: 'date' })
  assigned_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  completed_at: Date;

  @Column({ default: 0 })
  total_questions: number;

  @Column({ default: 0 })
  correct_answers: number;

  @Column({ default: 0 })
  total_time_spent_seconds: number;

  @Column({ default: 'assigned', length: 20 })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
