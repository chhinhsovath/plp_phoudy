import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('districts')
export class District {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  district_name_kh: string;

  @Column({ type: 'varchar', length: 100 })
  district_name_en: string;

  @Column({ type: 'varchar', length: 10, unique: true })
  district_code: string;

  @Column()
  province_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
