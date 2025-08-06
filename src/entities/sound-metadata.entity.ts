import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('sound_metadata')
export class SoundMetadata extends BaseEntity {
  @Column({ unique: true })
  @Index()
  filename: string;

  @Column()
  original_name: string;

  @Column()
  file_path: string;

  @Column()
  url: string;

  @Column({ type: 'bigint' })
  size: number;

  @Column()
  mime_type: string;

  @Column({ type: 'text', array: true, default: [] })
  @Index()
  tags: string[];

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true, type: 'float' })
  duration?: number;

  @Column({ nullable: true })
  bitrate?: number;

  @Column({ nullable: true })
  sample_rate?: number;
}
