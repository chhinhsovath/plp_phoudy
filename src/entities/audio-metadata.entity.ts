import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('audio_metadata')
export class AudioMetadata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  filename: string;

  @Column({ type: 'varchar', length: 255 })
  original_name: string;

  @Column({ type: 'varchar', length: 500 })
  url: string;

  @Column({ type: 'varchar', length: 500 })
  path: string;

  @Column({ type: 'bigint' })
  size: number;

  @Column({ type: 'int', nullable: true })
  duration: number;

  @Column({ type: 'varchar', length: 100 })
  mime_type: string;

  @Column({ type: 'json', nullable: true })
  tags: string[];

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  alt_text: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
