import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

@Entity('analysis')
@Unique(['studentId', 'subjectName', 'analysisDate'])
export class Analysis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'student_id' })
  studentId: string;

  @Column({ name: 'subject_name' })
  subjectName: string;

  @Column({ name: 'total_exercises', type: 'int', default: 0 })
  totalExercises: number;

  @Column({ name: 'completed_exercises', type: 'int', default: 0 })
  completedExercises: number;

  @Column({ name: 'total_questions', type: 'int', default: 0 })
  totalQuestions: number;

  @Column({ name: 'correct_answers', type: 'int', default: 0 })
  correctAnswers: number;

  @Column({ name: 'total_time_spent_minutes', type: 'int', default: 0 })
  totalTimeSpentMinutes: number;

  @Column({ name: 'analysis_date', type: 'date' })
  analysisDate: string; // You can use `Date` as well, depending on your preference

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
