import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { User } from './user.entity';
import { MenuItem } from './menu-item.entity';

@Entity('user_menu_permissions')
@Unique(['userId', 'menuId'])
export class UserMenuPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'menu_id' })
  menuId: number;

  @ManyToOne(() => MenuItem)
  @JoinColumn({ name: 'menu_id' })
  menuItem: MenuItem;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
