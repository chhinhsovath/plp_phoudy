import { Website } from './website.entity';
import { Role } from './role.entity';
export declare class WebsiteRolePermission {
    website_id: number;
    role_id: number;
    website: Website;
    role: Role;
}
