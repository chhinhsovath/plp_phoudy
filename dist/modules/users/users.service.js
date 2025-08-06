"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../../entities/user.entity");
const user_residence_entity_1 = require("../../entities/user-residence.entity");
const user_pob_entity_1 = require("../../entities/user-pob.entity");
const province_entity_1 = require("../../entities/province.entity");
const district_entity_1 = require("../../entities/district.entity");
const commune_entity_1 = require("../../entities/commune.entity");
const village_entity_1 = require("../../entities/village.entity");
const teacher_entity_1 = require("../../entities/teacher.entity");
let UsersService = class UsersService {
    userRepository;
    userResidenceRepository;
    userPobRepository;
    provinceRepository;
    districtRepository;
    communeRepository;
    villageRepository;
    teacherRepository;
    constructor(userRepository, userResidenceRepository, userPobRepository, provinceRepository, districtRepository, communeRepository, villageRepository, teacherRepository) {
        this.userRepository = userRepository;
        this.userResidenceRepository = userResidenceRepository;
        this.userPobRepository = userPobRepository;
        this.provinceRepository = provinceRepository;
        this.districtRepository = districtRepository;
        this.communeRepository = communeRepository;
        this.villageRepository = villageRepository;
        this.teacherRepository = teacherRepository;
        this.createAdminIfNotExists();
    }
    async createAdminIfNotExists() {
        try {
            const adminExists = await this.userRepository.findOne({
                where: { username: 'admin1' },
                select: {
                    id: true,
                    username: true,
                },
            });
            if (!adminExists) {
                const roleRepo = this.userRepository.manager.getRepository('Role');
                const adminRole = await roleRepo.findOne({
                    where: { nameEn: 'ADMIN' },
                });
                if (!adminRole)
                    throw new Error('ADMIN role not found');
                const admin = new user_entity_1.User();
                admin.username = 'admin1';
                admin.email = 'admin@example.com';
                admin.first_name = 'Admin';
                admin.last_name = 'User';
                admin.password_hash = await bcrypt.hash('password123', 10);
                admin.roleId = adminRole.id;
                admin.date_of_birth = new Date('1990-01-01');
                admin.gender = user_entity_1.Gender.MALE;
                admin.is_active = true;
                await this.userRepository.save(admin);
                console.log('Admin user created successfully');
            }
        }
        catch (error) {
            console.error('Error creating admin user:', error.message);
        }
    }
    async create(createUserDto) {
        const { username, email, password, residence, placeOfBirth, ...rest } = createUserDto;
        const existingUser = await this.userRepository.findOne({
            where: [{ username }, { email }],
        });
        if (existingUser) {
            throw new common_1.ConflictException('Username or email already exists');
        }
        const password_hash = await bcrypt.hash(password, 10);
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
    async findAll(page = 1, limit = 10) {
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
        const total_active = await this.userRepository.count({
            where: { is_active: true },
        });
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
        const usersWithLocationsAndRoles = await Promise.all(users.map(async (user) => {
            let residenceData = null;
            let placeOfBirthData = null;
            let roleData = null;
            if (user.roleId) {
                const roleRepo = this.userRepository.manager.getRepository('Role');
                roleData = await roleRepo.findOne({ where: { id: user.roleId } });
            }
            if (user.residence) {
                const [resProvince, resDistrict, resCommune, resVillage] = await Promise.all([
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
                const [pobProvince, pobDistrict, pobCommune, pobVillage] = await Promise.all([
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
        }));
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
    async findOne(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['teacher', 'residence', 'placeOfBirth'],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        let roleData = null;
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
    async findByUsername(username) {
        return this.userRepository.findOne({ where: { username } });
    }
    async update(id, updateData) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['teacher'],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        const teacherNumberToUpdate = updateData.teacher_number;
        delete updateData.teacher_number;
        this.userRepository.merge(user, updateData);
        await this.userRepository.save(user);
        if (teacherNumberToUpdate && user.teacher) {
            try {
                console.log(`Updating teacher_number to ${teacherNumberToUpdate} for teacher with user_id ${id}`);
                const updateResult = await this.teacherRepository
                    .createQueryBuilder('teacher')
                    .update(teacher_entity_1.Teacher)
                    .set({ teacher_number: teacherNumberToUpdate })
                    .where('user_id = :userId', { userId: id })
                    .execute();
                console.log('Update result:', updateResult);
                if (updateResult.affected === 0) {
                    console.warn(`No teacher record was updated for user_id ${id}`);
                }
                user.teacher.teacher_number = teacherNumberToUpdate;
            }
            catch (error) {
                console.error('Failed to update teacher number:', error);
                console.error('Error details:', error.message);
                console.error('SQL query:', error.query);
                throw new Error(`Failed to update teacher number: ${error.message}`);
            }
        }
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
            throw new common_1.NotFoundException(`User with ID ${id} not found after update`);
        }
        return updatedUser;
    }
    async remove(id) {
        const user = await this.findOne(id);
        await this.userRepository.remove(user);
    }
    generateTeacherNumber() {
        const prefix = 'TCH';
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        return `${prefix}${randomNum}`;
    }
    async createUserWithTeacherRole(createUserDto) {
        const user = await this.create(createUserDto);
        const teacher = new teacher_entity_1.Teacher();
        teacher.user = user;
        await this.teacherRepository.save(teacher);
        teacher.teacher_number = `T${teacher.teacherId.toString().padStart(8, '0')}`;
        await this.teacherRepository.save(teacher);
        return user;
    }
    async findById(id) {
        return this.findOne(id);
    }
    async getUserWithAddressDetails(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['teacher', 'residence', 'placeOfBirth'],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        let roleData = null;
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
    async findByStatusAndRole(status, roleId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const whereConditions = {};
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
        const total_active = await this.userRepository.count({
            where: { is_active: true, ...whereConditions },
        });
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
        const usersWithLocationsAndRoles = await Promise.all(users.map(async (user) => {
            let residenceData = null;
            let placeOfBirthData = null;
            let roleData = null;
            if (user.roleId) {
                const roleRepo = this.userRepository.manager.getRepository('Role');
                roleData = await roleRepo.findOne({ where: { id: user.roleId } });
            }
            if (user.residence) {
                const [resProvince, resDistrict, resCommune, resVillage] = await Promise.all([
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
                const [pobProvince, pobDistrict, pobCommune, pobVillage] = await Promise.all([
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
        }));
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
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(user_residence_entity_1.UserResidence)),
    __param(2, (0, typeorm_1.InjectRepository)(user_pob_entity_1.UserPob)),
    __param(3, (0, typeorm_1.InjectRepository)(province_entity_1.Province)),
    __param(4, (0, typeorm_1.InjectRepository)(district_entity_1.District)),
    __param(5, (0, typeorm_1.InjectRepository)(commune_entity_1.Commune)),
    __param(6, (0, typeorm_1.InjectRepository)(village_entity_1.Village)),
    __param(7, (0, typeorm_1.InjectRepository)(teacher_entity_1.Teacher)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map