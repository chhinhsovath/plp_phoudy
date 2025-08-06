import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { User } from './user.entity';
import { MenuItem } from './menu-item.entity';
import { WebsiteRolePermission } from './website-role-permission.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'name_en', type: 'varchar', length: 50 })
  nameEn: string;

  @Column({ name: 'name_kh', type: 'varchar', length: 50 })
  nameKh: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @ManyToMany(() => MenuItem, (menuItem) => menuItem.roles)
  menuItems: MenuItem[];

  @OneToMany(
    () => WebsiteRolePermission,
    (websiteRolePermission) => websiteRolePermission.role,
  )
  websiteRolePermissions: WebsiteRolePermission[];
}
