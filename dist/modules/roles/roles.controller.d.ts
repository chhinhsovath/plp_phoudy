import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(createRoleDto: CreateRoleDto): Promise<import("../../entities/role.entity").Role>;
    findAll(page?: number, limit?: number): Promise<any>;
    getStats(): Promise<any>;
    findOne(id: number): Promise<import("../../entities/role.entity").Role>;
    update(id: number, updateRoleDto: UpdateRoleDto): Promise<import("../../entities/role.entity").Role>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
