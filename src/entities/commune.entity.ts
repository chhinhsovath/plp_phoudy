import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('communes')
export class Commune {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  commune_name_kh: string;

  @Column({ type: 'varchar', length: 100 })
  commune_name_en: string;

  @Column({ type: 'varchar', length: 10, unique: true })
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
