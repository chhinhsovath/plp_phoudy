import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ExaminationCategory } from './examination-category.entity';

@Entity('examinations')
export class Exam extends BaseEntity {
  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'time_spent', nullable: true })
  timeSpent: number;

  @Column({ name: 'time_limit' })
  timeLimit: number;

  @Column({
    name: 'average_point',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  averagePoint: number;

  @Column({ name: 'passing_score', type: 'decimal', precision: 5, scale: 2 })
  passingScore: number;

  @Column({ name: 'response_count', nullable: true })
  responseCount: number;

  @Column({ name: 'questions_per_batch', type: 'varchar', nullable: true })
  questionsPerBatch: string | null;

  @Column({ name: 'examination_category_id' })
  examinationCategoryId: number;

  @Column({ name: 'status', default: 'ACTIVE' })
  status: string;

  @ManyToOne(() => ExaminationCategory)
  @JoinColumn({ name: 'examination_category_id' })
  examinationCategory: ExaminationCategory;
}
