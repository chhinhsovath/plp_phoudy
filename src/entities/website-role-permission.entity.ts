import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Website } from './website.entity';
import { Role } from './role.entity';

@Entity('website_role_permissions')
export class WebsiteRolePermission {
  @PrimaryColumn()
  website_id: number;

  @PrimaryColumn()
  role_id: number;

  @ManyToOne(() => Website, (website) => website.websiteRolePermissions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'website_id' })
  website: Website;

  @ManyToOne(() => Role, (role) => role.websiteRolePermissions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
