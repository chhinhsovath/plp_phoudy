import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { School } from './school.entity';
import { Teacher } from './teacher.entity';
import { Status } from './enums/status.enum';

export enum GradeLevelType {
  GRADE_1 = '1',
  GRADE_2 = '2',
  GRADE_3 = '3',
  GRADE_4 = '4',
  GRADE_5 = '5',
  GRADE_6 = '6',
}

@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn({ name: 'class_id' })
  classId: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: GradeLevelType,
    name: 'grade_level',
  })
  gradeLevel: GradeLevelType;

  @Column({ nullable: true })
  section: string;

  @Column({ name: 'school_id' })
  schoolId: number;

  @ManyToOne(() => School)
  @JoinColumn({ name: 'school_id' })
  school: School;

  @Column({ name: 'teacher_id' })
  teacherId: number;

  @ManyToOne(() => Teacher)
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @Column({ name: 'academic_year' })
  academicYear: string;

  @Column({ name: 'max_students', default: 200 })
  maxStudents: number;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
