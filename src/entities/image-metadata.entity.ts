import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('image_metadata')
export class ImageMetadata extends BaseEntity {
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

  @Column({ nullable: true })
  alt_text?: string;

  @Column({ default: 0 })
  width?: number;

  @Column({ default: 0 })
  height?: number;
}
