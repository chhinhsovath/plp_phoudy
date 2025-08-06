import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Role } from './role.entity';

@Entity('menu_items')
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ name: 'parent_id', nullable: true })
  parentId: number;

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.children, {
    nullable: true,
  })
  @JoinColumn({ name: 'parent_id' })
  parent: MenuItem;

  @OneToMany(() => MenuItem, (menuItem) => menuItem.parent)
  children: MenuItem[];

  @Column({ name: 'order_index', nullable: true })
  orderIndex: number;

  @Column({ name: 'menu_type', default: 'NAVBAR' })
  menuType: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'website_id' })
  websiteId: number;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'menu_item_roles',
    joinColumn: { name: 'menu_item_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
