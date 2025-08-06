import { User } from './user.entity';
import { MenuItem } from './menu-item.entity';
export declare class UserMenuPermission {
    id: number;
    userId: number;
    user: User;
    menuId: number;
    menuItem: MenuItem;
    createdAt: Date;
    updatedAt: Date;
}
