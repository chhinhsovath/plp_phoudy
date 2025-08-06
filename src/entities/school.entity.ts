import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Teacher } from './teacher.entity';
import { SchoolPlace } from './school-place.entity';
import { Status } from './enums/status.enum';

@Entity('schools')
export class School {
  @PrimaryGeneratedColumn({ name: 'school_id' })
  schoolId: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'profile\r\n' })
  profile: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relationships
  @OneToMany(() => Teacher, (teacher) => teacher.school)
  teachers: Teacher[];

  @OneToOne(() => SchoolPlace, (schoolPlace) => schoolPlace.school)
  place: SchoolPlace;
}
