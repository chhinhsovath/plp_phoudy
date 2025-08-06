import { Repository } from 'typeorm';
import { Website } from '../../entities/website.entity';
import { WebsiteRolePermission } from '../../entities/website-role-permission.entity';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { UpdateWebsiteDto } from './dto/update-website.dto';
import { PaginationResult } from '../../common/pagination.interface';
export declare class WebsitesService {
    private websiteRepository;
    private websiteRolePermissionRepository;
    constructor(websiteRepository: Repository<Website>, websiteRolePermissionRepository: Repository<WebsiteRolePermission>);
    create(createWebsiteDto: CreateWebsiteDto): Promise<Website>;
    findAll(limit?: number, offset?: number): Promise<PaginationResult<Website>>;
    findOne(id: number): Promise<Website>;
    update(id: number, updateWebsiteDto: UpdateWebsiteDto): Promise<Website>;
    remove(id: number): Promise<void>;
    activate(id: number): Promise<Website>;
    deactivate(id: number): Promise<Website>;
    assignRolePermission(websiteId: number, roleId: number): Promise<void>;
    removeRolePermission(websiteId: number, roleId: number): Promise<void>;
    getWebsitePermissions(websiteId: number): Promise<WebsiteRolePermission[]>;
}
