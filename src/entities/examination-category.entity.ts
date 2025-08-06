import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Subject } from './subject.entity';
import { SubSubject } from './sub-subject.entity';
import { GradeLevelType } from './class.entity';

export enum ExaminationType {
  TEST = 'test',
  EXAM = 'exam',
}

@Entity('examination_categories')
export class ExaminationCategory extends BaseEntity {
  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'subject_id', nullable: true })
  subjectId: number;

  @ManyToOne(() => Subject)
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @Column({ name: 'sub_subject_id', nullable: true })
  subSubjectId: number;

  @ManyToOne(() => SubSubject)
  @JoinColumn({ name: 'sub_subject_id' })
  subSubject: SubSubject;

  @Column({
    type: 'enum',
    enum: GradeLevelType,
    name: 'grade',
    nullable: true,
  })
  grade: GradeLevelType;

  @Column({
    type: 'enum',
    enum: ExaminationType,
    name: 'type',
    default: ExaminationType.TEST,
  })
  type: ExaminationType;

  @Column({ name: 'status', default: 'active' })
  status: string;

  @Column({ name: 'certificate_file', nullable: true })
  certificateFile: string;
}
