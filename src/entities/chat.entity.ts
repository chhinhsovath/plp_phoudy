import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Message } from './message.entity';

@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  timestamp: Date;

  @Column()
  preview: string;

  @OneToMany(() => Message, (message) => message.chat, {
    cascade: true,
    eager: false, // Don't load messages eagerly by default
  })
  messages: Message[];

  @Column({ type: 'integer', nullable: true })
  message_count: number | null;

  @Column({ type: 'integer', nullable: true })
  user_message_count: number | null;

  @Column({ type: 'integer', nullable: true })
  ai_message_count: number | null;

  @Column({ type: 'boolean', default: false })
  is_training_candidate: boolean;

  @Column({ type: 'varchar', default: 'UNPROCESSED' })
  training_status: string;

  @Column({ type: 'varchar', nullable: true })
  training_notes: string | null;

  @Column({ type: 'varchar', default: 'km', nullable: true })
  language_detected: string | null;

  @Column({ type: 'varchar', nullable: true })
  topic_category: string | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
