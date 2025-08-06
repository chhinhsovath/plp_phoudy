import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Chat } from './chat.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  chat_id: string;

  @ManyToOne(() => Chat, (chat) => chat.messages, {
    onDelete: 'CASCADE',
    eager: false, // Don't load chat eagerly by default
  })
  @JoinColumn({ name: 'chat_id' })
  chat: Chat;

  @Column({ type: 'varchar' })
  role: string; // 'user' or 'assistant'

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'varchar', nullable: true })
  model: string | null;

  @Column({ type: 'jsonb', nullable: true })
  metadata: any;
}
