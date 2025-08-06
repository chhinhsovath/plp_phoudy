import { WebsitesService } from './websites.service';
import { Website } from '../../entities/website.entity';
import { WebsiteRolePermission } from '../../entities/website-role-permission.entity';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { UpdateWebsiteDto } from './dto/update-website.dto';
import { AssignRolePermissionDto } from './dto/assign-role-permission.dto';
import { PaginationResult } from '../../common/pagination.interface';
export declare class WebsitesController {
    private readonly websitesService;
    constructor(websitesService: WebsitesService);
    findAll(limit?: number, offset?: number): Promise<PaginationResult<Website>>;
    findOne(id: number): Promise<Website>;
    create(createWebsiteDto: CreateWebsiteDto): Promise<Website>;
    update(id: number, updateWebsiteDto: UpdateWebsiteDto): Promise<Website>;
    remove(id: number): Promise<void>;
    activate(id: number): Promise<Website>;
    deactivate(id: number): Promise<Website>;
    assignRolePermission(id: number, assignRolePermissionDto: AssignRolePermissionDto): Promise<void>;
    removeRolePermission(id: number, roleId: number): Promise<void>;
    getWebsitePermissions(id: number): Promise<WebsiteRolePermission[]>;
}
