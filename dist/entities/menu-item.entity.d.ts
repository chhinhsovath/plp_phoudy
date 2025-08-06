import { Role } from './role.entity';
export declare class MenuItem {
    id: number;
    name: string;
    url: string;
    icon: string;
    parentId: number;
    parent: MenuItem;
    children: MenuItem[];
    orderIndex: number;
    menuType: string;
    isActive: boolean;
    websiteId: number;
    roles: Role[];
    createdAt: Date;
    updatedAt: Date;
}
