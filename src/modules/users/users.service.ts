import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Gender, User } from '../../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResidence } from '../../entities/user-residence.entity';
import { UserPob } from '../../entities/user-pob.entity';
import { Province } from '../../entities/province.entity';
import { District } from '../../entities/district.entity';
import { Commune } from '../../entities/commune.entity';
import { Village } from '../../entities/village.entity';
import { Teacher } from '../../entities/teacher.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserResidence)
    private userResidenceRepository: Repository<UserResidence>,
    @InjectRepository(UserPob)
    private userPobRepository: Repository<UserPob>,
    @InjectRepository(Province)
    private provinceRepository: Repository<Province>,
    @InjectRepository(District)
    private districtRepository: Repository<District>,
    @InjectRepository(Commune)
    private communeRepository: Repository<Commune>,
    @InjectRepository(Village)
    private villageRepository: Repository<Village>,
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {
    this.createAdminIfNotExists();
  }

  private async createAdminIfNotExists() {
    try {
      const adminExists = await this.userRepository.findOne({
        where: { username: 'admin1' },
        select: {
          id: true,
          username: true,
        },
      });

      if (!adminExists) {
        // Fetch admin role from roles table
        const roleRepo = this.userRepository.manager.getRepository('Role');
        const adminRole = await roleRepo.findOne({
          where: { nameEn: 'ADMIN' },
        });
        if (!adminRole) throw new Error('ADMIN role not found');

        const admin = new User();
        admin.username = 'admin1';
        admin.email = 'admin@example.com';
        admin.first_name = 'Admin';
        admin.last_name = 'User';
        admin.password_hash = await bcrypt.hash('password123', 10);
        admin.roleId = adminRole.id;
        admin.date_of_birth = new Date('1990-01-01');
        admin.gender = Gender.MALE;
        admin.is_active = true;

        await this.userRepository.save(admin);
        console.log('Admin user created successfully');
      }
    } catch (error) {
      console.error('Error creating admin user:', error.message);
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password, residence, placeOfBirth, ...rest } =
      createUserDto;

    // Check if username or email already exists
    const existingUser = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });

    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Create new user
    const user = this.userRepository.create({
      username,
      email,
      password_hash,
      first_name: rest.first_name,
      last_name: rest.last_name,
      roleId: rest.roleId,
      date_of_birth: rest.date_of_birth,
      gender: rest.gender,
      phone: rest.phone,
      nationality: rest.nationality,
    });

    const savedUser = await this.userRepository.save(user);

    // Create residence if provided
    if (residence) {
      const userResidence = this.userResidenceRepository.create({
        userId: savedUser.id,
        provinceId: residence.provinceId,
        districtId: residence.districtId,
        communeId: residence.communeId,
        villageId: residence.villageId,
        fullAddress: residence.fullAddress,
      });
      await this.userResidenceRepository.save(userResidence);
    }

    // Create place of birth if provided
    if (placeOfBirth) {
      const userPob = this.userPobRepository.create({
        userId: savedUser.id,
        provinceId: placeOfBirth.provinceId,
        districtId: placeOfBirth.districtId,
        communeId: placeOfBirth.communeId,
        villageId: placeOfBirth.villageId,
      });
      await this.userPobRepository.save(userPob);
    }

    return savedUser;
  }

  async findAll(page: number = 1, limit: number = 10): Promise<any> {
    const skip = (page - 1) * limit;

    const [users, total] = await this.userRepository.findAndCount({
      skip,
      take: limit,
      relations: ['teacher', 'residence', 'placeOfBirth'],
      select: {
        id: true,
        username: true,
        first_name: true,
        last_name: true,
        email: true,
        roleId: true,
        date_of_birth: true,
        gender: true,
        is_active: true,
        phone: true,
        nationality: true,
        profile_picture: true,
        created_at: true,
        updated_at: true,
      },
    });

    // Get total active users count
    const total_active = await this.userRepository.count({
      where: { is_active: true },
    });

    // Get role counts to find the most common role
    const roleRepo = this.userRepository.manager.getRepository('Role');
    const roleCounts = await this.userRepository
      .createQueryBuilder('user')
      .select('user.roleId')
      .addSelect('COUNT(*)', 'count')
      .groupBy('user.roleId')
      .orderBy('count', 'DESC')
      .getRawMany();

    let most_role_count = '';
    if (roleCounts.length > 0) {
      const mostCommonRoleId = roleCounts[0].user_roleId;
      const mostCommonRoleData = await roleRepo.findOne({
        where: { id: mostCommonRoleId },
      });
      const count = roleCounts[0].count;
      most_role_count = `${mostCommonRoleData?.nameKh || 'Unknown'} ${count}`;
    }

    // Manually fetch location data and role information
    const usersWithLocationsAndRoles = await Promise.all(
      users.map(async (user) => {
        let residenceData: any = null;
        let placeOfBirthData: any = null;
        let roleData: any = null;

        // Fetch role information
        if (user.roleId) {
          const roleRepo = this.userRepository.manager.getRepository('Role');
          roleData = await roleRepo.findOne({ where: { id: user.roleId } });
        }

        if (user.residence) {
          const [resProvince, resDistrict, resCommune, resVillage] =
            await Promise.all([
              user.residence.provinceId
                ? this.provinceRepository.findOne({
                    where: { id: user.residence.provinceId },
                  })
                : null,
              user.residence.districtId
                ? this.districtRepository.findOne({
                    where: { id: user.residence.districtId },
                  })
                : null,
              user.residence.communeId
                ? this.communeRepository.findOne({
                    where: { id: user.residence.communeId },
                  })
                : null,
              user.residence.villageId
                ? this.villageRepository.findOne({
                    where: { id: user.residence.villageId },
                  })
                : null,
            ]);

          residenceData = {
            ...user.residence,
            province: resProvince,
            district: resDistrict,
            commune: resCommune,
            village: resVillage,
          };
        }

        if (user.placeOfBirth) {
          const [pobProvince, pobDistrict, pobCommune, pobVillage] =
            await Promise.all([
              user.placeOfBirth.provinceId
                ? this.provinceRepository.findOne({
                    where: { id: user.placeOfBirth.provinceId },
                  })
                : null,
              user.placeOfBirth.districtId
                ? this.districtRepository.findOne({
                    where: { id: user.placeOfBirth.districtId },
                  })
                : null,
              user.placeOfBirth.communeId
                ? this.communeRepository.findOne({
                    where: { id: user.placeOfBirth.communeId },
                  })
                : null,
              user.placeOfBirth.villageId
                ? this.villageRepository.findOne({
                    where: { id: user.placeOfBirth.villageId },
                  })
                : null,
            ]);

          placeOfBirthData = {
            ...user.placeOfBirth,
            province: pobProvince,
            district: pobDistrict,
            commune: pobCommune,
            village: pobVillage,
          };
        }

        return {
          ...user,
          profile_picture: user.profile_picture
            ? `/${user.profile_picture}`
            : null,
          roleNameEn: roleData?.nameEn || null,
          roleNameKh: roleData?.nameKh || null,
          residence: residenceData,
          placeOfBirth: placeOfBirthData,
        };
      }),
    );

    return {
      data: usersWithLocationsAndRoles,
      pagination: {
        page,
        limit,
        total,
        total_active,
        most_role_count,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['teacher', 'residence', 'placeOfBirth'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Fetch role information
    let roleData: any = null;
    if (user.roleId) {
      const roleRepo = this.userRepository.manager.getRepository('Role');
      roleData = await roleRepo.findOne({ where: { id: user.roleId } });
    }

    const { password_hash, ...userWithoutPassword } = user;

    return {
      ...userWithoutPassword,
      profile_picture: user.profile_picture
        ? `/uploads/${user.profile_picture}`
        : null,
      roleNameEn: roleData?.nameEn || null,
      roleNameKh: roleData?.nameKh || null,
    };
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async update(id: number, updateData: any): Promise<User> {
    // Find user with teacher relation
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['teacher'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Store teacher_number to update later if provided
    const teacherNumberToUpdate = updateData.teacher_number;
    delete updateData.teacher_number; // Remove from user update data

    // Update user entity
    this.userRepository.merge(user, updateData);
    await this.userRepository.save(user);

    // If teacher_number is provided and teacher exists, update it
    if (teacherNumberToUpdate && user.teacher) {
      try {
        console.log(
          `Updating teacher_number to ${teacherNumberToUpdate} for teacher with user_id ${id}`,
        );

        // Update teacher directly using query builder and log the SQL
        const updateResult = await this.teacherRepository
          .createQueryBuilder('teacher')
          .update(Teacher)
          .set({ teacher_number: teacherNumberToUpdate })
          .where('user_id = :userId', { userId: id })
          .execute();

        console.log('Update result:', updateResult);

        if (updateResult.affected === 0) {
          console.warn(`No teacher record was updated for user_id ${id}`);
        }

        // Force update the teacher entity in memory
        user.teacher.teacher_number = teacherNumberToUpdate;
      } catch (error) {
        console.error('Failed to update teacher number:', error);
        console.error('Error details:', error.message);
        console.error('SQL query:', error.query);
        throw new Error(`Failed to update teacher number: ${error.message}`);
      }
    }

    // Fetch updated user with teacher relation to return
    const updatedUser = await this.userRepository.findOne({
      where: { id },
      relations: ['teacher'],
      select: {
        id: true,
        username: true,
        first_name: true,
        last_name: true,
        email: true,
        roleId: true,
        date_of_birth: true,
        gender: true,
        phone: true,
        nationality: true,
        profile_picture: true,
        created_at: true,
        updated_at: true,
        is_active: true,
      },
    });

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found after update`);
    }

    return updatedUser;
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  private generateTeacherNumber(): string {
    const prefix = 'TCH';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}${randomNum}`;
  }

  async createUserWithTeacherRole(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.create(createUserDto);

    // Save teacher first to get the auto-incremented teacherId
    const teacher = new Teacher();
    teacher.user = user;
    await this.teacherRepository.save(teacher);

    // Now set teacher_number as T + 8-digit teacherId
    teacher.teacher_number = `T${teacher.teacherId.toString().padStart(8, '0')}`;
    await this.teacherRepository.save(teacher);

    return user;
  }

  async findById(id: number): Promise<any> {
    return this.findOne(id);
  }

  async getUserWithAddressDetails(id: number): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['teacher', 'residence', 'placeOfBirth'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Fetch role information
    let roleData: any = null;
    if (user.roleId) {
      const roleRepo = this.userRepository.manager.getRepository('Role');
      roleData = await roleRepo.findOne({ where: { id: user.roleId } });
    }

    const { password_hash, ...userWithoutPassword } = user;

    return {
      ...userWithoutPassword,
      profile_picture: user.profile_picture
        ? `/uploads/${user.profile_picture}`
        : null,
      roleNameEn: roleData?.nameEn || null,
      roleNameKh: roleData?.nameKh || null,
    };
  }

  async findByStatusAndRole(
    status?: boolean,
    roleId?: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<any> {
    const skip = (page - 1) * limit;

    const whereConditions: any = {};
    if (status !== undefined) {
      whereConditions.is_active = status;
    }
    if (roleId !== undefined) {
      whereConditions.roleId = roleId;
    }

    const [users, total] = await this.userRepository.findAndCount({
      where: whereConditions,
      skip,
      take: limit,
      relations: ['teacher', 'residence', 'placeOfBirth'],
      select: {
        id: true,
        username: true,
        first_name: true,
        last_name: true,
        email: true,
        roleId: true,
        date_of_birth: true,
        gender: true,
        is_active: true,
        phone: true,
        nationality: true,
        profile_picture: true,
        created_at: true,
        updated_at: true,
      },
    });

    // Get total active users count
    const total_active = await this.userRepository.count({
      where: { is_active: true, ...whereConditions },
    });

    // Get role counts to find the most common role
    const roleRepo = this.userRepository.manager.getRepository('Role');
    const roleCounts = await this.userRepository
      .createQueryBuilder('user')
      .select('user.roleId')
      .addSelect('COUNT(*)', 'count')
      .where(whereConditions)
      .groupBy('user.roleId')
      .orderBy('count', 'DESC')
      .getRawMany();

    let most_role_count = '';
    if (roleCounts.length > 0) {
      const mostCommonRoleId = roleCounts[0].user_roleId;
      const mostCommonRoleData = await roleRepo.findOne({
        where: { id: mostCommonRoleId },
      });
      const count = roleCounts[0].count;
      most_role_count = `${mostCommonRoleData?.nameKh || 'Unknown'} ${count}`;
    }

    // Manually fetch location data and role information
    const usersWithLocationsAndRoles = await Promise.all(
      users.map(async (user) => {
        let residenceData: any = null;
        let placeOfBirthData: any = null;
        let roleData: any = null;

        // Fetch role information
        if (user.roleId) {
          const roleRepo = this.userRepository.manager.getRepository('Role');
          roleData = await roleRepo.findOne({ where: { id: user.roleId } });
        }

        if (user.residence) {
          const [resProvince, resDistrict, resCommune, resVillage] =
            await Promise.all([
              user.residence.provinceId
                ? this.provinceRepository.findOne({
                    where: { id: user.residence.provinceId },
                  })
                : null,
              user.residence.districtId
                ? this.districtRepository.findOne({
                    where: { id: user.residence.districtId },
                  })
                : null,
              user.residence.communeId
                ? this.communeRepository.findOne({
                    where: { id: user.residence.communeId },
                  })
                : null,
              user.residence.villageId
                ? this.villageRepository.findOne({
                    where: { id: user.residence.villageId },
                  })
                : null,
            ]);

          residenceData = {
            ...user.residence,
            province: resProvince,
            district: resDistrict,
            commune: resCommune,
            village: resVillage,
          };
        }

        if (user.placeOfBirth) {
          const [pobProvince, pobDistrict, pobCommune, pobVillage] =
            await Promise.all([
              user.placeOfBirth.provinceId
                ? this.provinceRepository.findOne({
                    where: { id: user.placeOfBirth.provinceId },
                  })
                : null,
              user.placeOfBirth.districtId
                ? this.districtRepository.findOne({
                    where: { id: user.placeOfBirth.districtId },
                  })
                : null,
              user.placeOfBirth.communeId
                ? this.communeRepository.findOne({
                    where: { id: user.placeOfBirth.communeId },
                  })
                : null,
              user.placeOfBirth.villageId
                ? this.villageRepository.findOne({
                    where: { id: user.placeOfBirth.villageId },
                  })
                : null,
            ]);

          placeOfBirthData = {
            ...user.placeOfBirth,
            province: pobProvince,
            district: pobDistrict,
            commune: pobCommune,
            village: pobVillage,
          };
        }

        return {
          ...user,
          profile_picture: user.profile_picture
            ? `/${user.profile_picture}`
            : null,
          roleNameEn: roleData?.nameEn || null,
          roleNameKh: roleData?.nameKh || null,
          residence: residenceData,
          placeOfBirth: placeOfBirthData,
        };
      }),
    );

    return {
      data: usersWithLocationsAndRoles,
      pagination: {
        page,
        limit,
        total,
        total_active,
        most_role_count,
        pages: Math.ceil(total / limit),
      },
    };
  }
}
