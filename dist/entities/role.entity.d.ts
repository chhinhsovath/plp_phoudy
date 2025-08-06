import { User } from './user.entity';
import { MenuItem } from './menu-item.entity';
import { WebsiteRolePermission } from './website-role-permission.entity';
export declare class Role {
    id: number;
    nameEn: string;
    nameKh: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    users: User[];
    menuItems: MenuItem[];
    websiteRolePermissions: WebsiteRolePermission[];
}
