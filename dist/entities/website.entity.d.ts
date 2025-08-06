import { WebsiteRolePermission } from './website-role-permission.entity';
export declare class Website {
    id: number;
    name: string;
    domain: string;
    description: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
    websiteRolePermissions: WebsiteRolePermission[];
}
