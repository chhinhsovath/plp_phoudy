import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('villages')
export class Village {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  village_name_kh: string;

  @Column({ type: 'varchar', length: 100 })
  village_name_en: string;

  @Column({ type: 'varchar', length: 10, unique: true })
  village_code: string;

  @Column({ type: 'varchar', length: 10 })
  commune_code: string;

  @Column({ type: 'varchar', length: 10 })
  district_code: string;

  @Column()
  province_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
