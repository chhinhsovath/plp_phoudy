import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from './enums/status.enum';

export enum SubjectType {
  NORMAL = 'NORMAL',
  SPECIAL = 'SPECIAL',
}

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'khmer_name', nullable: true })
  khmer_name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  @Column({ name: 'is_student', default: false })
  is_student: boolean;

  @Column({ nullable: true })
  path: string;

  @Column({
    name: 'subject_type',
    type: 'enum',
    enum: SubjectType,
    default: SubjectType.NORMAL,
  })
  subject_type: SubjectType;

  @OneToMany('Lesson', 'subject')
  lessons: any[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
