import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Subject } from './subject.entity';

@Entity('sub_subjects')
export class SubSubject extends BaseEntity {
  @Column({ name: 'subject_id', nullable: true })
  subjectId: number | null;

  @ManyToOne(() => Subject)
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'khmer_name' })
  khmerName: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'status', default: 'ACTIVE' })
  status: string;

  @Column({ name: 'path' })
  path: string;
}
