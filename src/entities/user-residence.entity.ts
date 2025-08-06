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
import { User } from './user.entity';
import { Province } from './province.entity';
import { District } from './district.entity';
import { Commune } from './commune.entity';
import { Village } from './village.entity';

@Entity('user_residences')
export class UserResidence {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', type: 'bigint' })
  userId: number;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'province_id', type: 'int', nullable: true })
  provinceId?: number;

  @ManyToOne(() => Province, { nullable: true })
  @JoinColumn({ name: 'province_id' })
  province?: Province;

  @Column({ name: 'district_id', type: 'int', nullable: true })
  districtId?: number;

  @ManyToOne(() => District, { nullable: true })
  @JoinColumn({ name: 'district_id' })
  district?: District;

  @Column({ name: 'commune_id', type: 'int', nullable: true })
  communeId?: number;

  @ManyToOne(() => Commune, { nullable: true })
  @JoinColumn({ name: 'commune_id' })
  commune?: Commune;

  @Column({ name: 'village_id', type: 'int', nullable: true })
  villageId?: number;

  @ManyToOne(() => Village, { nullable: true })
  @JoinColumn({ name: 'village_id' })
  village?: Village;

  @Column({ name: 'full_address', type: 'text', nullable: true })
  fullAddress?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
