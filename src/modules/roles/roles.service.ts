import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../entities/role.entity';
import { User } from '../../entities/user.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    // Check if role with same nameEn already exists
    const existingRole = await this.roleRepository.findOne({
      where: { nameEn: createRoleDto.nameEn },
    });

    if (existingRole) {
      throw new ConflictException(
        `Role with name '${createRoleDto.nameEn}' already exists`,
      );
    }

    const role = this.roleRepository.create(createRoleDto);
    return await this.roleRepository.save(role);
  }

  async findAll(page: number = 1, limit: number = 10): Promise<any> {
    const skip = (page - 1) * limit;

    const [roles, total] = await this.roleRepository.findAndCount({
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    // Get user count for each role
    const rolesWithUserCount = await Promise.all(
      roles.map(async (role) => {
        const userCount = await this.userRepository.count({
          where: { roleId: role.id },
        });
        return {
          ...role,
          userCount,
        };
      }),
    );

    return {
      data: rolesWithUserCount,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: ['users'],
    });

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    return role;
  }

  async findByName(nameEn: string): Promise<Role | null> {
    return await this.roleRepository.findOne({
      where: { nameEn },
    });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id);

    // Check if updating nameEn and it conflicts with existing role
    if (updateRoleDto.nameEn && updateRoleDto.nameEn !== role.nameEn) {
      const existingRole = await this.roleRepository.findOne({
        where: { nameEn: updateRoleDto.nameEn },
      });

      if (existingRole) {
        throw new ConflictException(
          `Role with name '${updateRoleDto.nameEn}' already exists`,
        );
      }
    }

    Object.assign(role, updateRoleDto);
    return await this.roleRepository.save(role);
  }

  async remove(id: number): Promise<void> {
    const role = await this.findOne(id);

    // Check if role is being used by any users
    const userCount = await this.userRepository.count({
      where: { roleId: id },
    });

    if (userCount > 0) {
      throw new ConflictException(
        `Cannot delete role. It is assigned to ${userCount} user(s). Please reassign users before deleting.`,
      );
    }

    await this.roleRepository.remove(role);
  }

  async getRoleStats(): Promise<any> {
    const roles = await this.roleRepository.find();

    const roleStats = await Promise.all(
      roles.map(async (role) => {
        const userCount = await this.userRepository.count({
          where: { roleId: role.id },
        });
        return {
          id: role.id,
          nameEn: role.nameEn,
          nameKh: role.nameKh,
          userCount,
        };
      }),
    );

    const totalRoles = roles.length;
    const totalUsers = await this.userRepository.count();

    return {
      totalRoles,
      totalUsers,
      roleDistribution: roleStats,
    };
  }
}
