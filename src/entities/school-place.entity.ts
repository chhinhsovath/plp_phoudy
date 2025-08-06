import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { School } from './school.entity';
import { Province } from './province.entity';
import { District } from './district.entity';
import { Commune } from './commune.entity';
import { Village } from './village.entity';

@Entity('school_place')
export class SchoolPlace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'school_id' })
  schoolId: number;

  @OneToOne(() => School, (school) => school.place)
  @JoinColumn({ name: 'school_id' })
  school: School;

  @Column({ name: 'province_id', nullable: true })
  provinceId: number;

  @ManyToOne(() => Province)
  @JoinColumn({ name: 'province_id' })
  province: Province;

  @Column({ name: 'district_id', nullable: true })
  districtId: number;

  @ManyToOne(() => District)
  @JoinColumn({ name: 'district_id' })
  district: District;

  @Column({ name: 'commune_id', nullable: true })
  communeId: number;

  @ManyToOne(() => Commune)
  @JoinColumn({ name: 'commune_id' })
  commune: Commune;

  @Column({ name: 'village_id', nullable: true })
  villageId: number;

  @ManyToOne(() => Village)
  @JoinColumn({ name: 'village_id' })
  village: Village;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
