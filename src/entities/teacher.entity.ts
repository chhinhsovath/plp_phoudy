import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { User } from './user.entity';
import { School } from './school.entity';
import { Status } from './enums/status.enum';

@Entity('teachers')
export class Teacher {
  @PrimaryGeneratedColumn({ name: 'teacher_id' })
  teacherId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @OneToOne(() => User, (user) => user.teacher)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'school_id' })
  schoolId: number;

  @ManyToOne(() => School)
  @JoinColumn({ name: 'school_id' })
  school: School;

  @Column({ type: 'date', nullable: true })
  hire_date: Date;

  @Column({ name: 'is_director', default: false })
  isDirector: boolean;

  @Column({ unique: true, type: 'varchar', length: 50 })
  teacher_number: string;

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
