import { Repository } from 'typeorm';
import { Role } from '../../entities/role.entity';
import { User } from '../../entities/user.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RolesService {
    private roleRepository;
    private userRepository;
    constructor(roleRepository: Repository<Role>, userRepository: Repository<User>);
    create(createRoleDto: CreateRoleDto): Promise<Role>;
    findAll(page?: number, limit?: number): Promise<any>;
    findOne(id: number): Promise<Role>;
    findByName(nameEn: string): Promise<Role | null>;
    update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role>;
    remove(id: number): Promise<void>;
    getRoleStats(): Promise<any>;
}
