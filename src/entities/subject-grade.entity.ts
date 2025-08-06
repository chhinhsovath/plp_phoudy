import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Subject } from './subject.entity';

@Entity('subject_grades')
export class SubjectGrade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'subject_id' })
  subject_id: number;

  @Column({ name: 'grade_level' })
  grade_level: number;

  @ManyToOne(() => Subject)
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
