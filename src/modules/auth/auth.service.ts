import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../entities/user.entity';
import { Teacher } from '../../entities/teacher.entity';
import { Student } from '../../entities/student.entity';
import { Class } from '../../entities/class.entity';
import { Website } from '../../entities/website.entity';
import { WebsiteRolePermission } from '../../entities/website-role-permission.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
    @InjectRepository(Website)
    private websiteRepository: Repository<Website>,
    @InjectRepository(WebsiteRolePermission)
    private websiteRolePermissionRepository: Repository<WebsiteRolePermission>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    // Use TypeORM to get user with role relation
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['role'],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Update last login time
    await this.userRepository.update(user.id, { last_login: new Date() });

    // Validate password (assuming password_hash is stored)
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      id: user.id,
      username: user.username,
      role: user.role?.nameEn,
    };
    const accessToken = this.jwtService.sign(payload);

    // Get teacherId, classIds, classNames and gradeLevels based on user role
    let teacherId: number | undefined;
    let studentId: number | undefined;
    let classIds: number[] = [];
    let classNames: string[] = [];
    let gradeLevels: string[] = [];

    if (user.role?.nameEn === 'TEACHER') {
      const teacher = await this.teacherRepository.findOne({
        where: { userId: user.id },
      });
      teacherId = teacher?.teacherId;

      // Get classes taught by this teacher
      if (teacherId) {
        const classes = await this.classRepository.find({
          where: { teacherId },
        });
        classIds = classes.map((cls) => cls.classId);
        classNames = classes.map((cls) => cls.name);
        gradeLevels = classes.map((cls) => cls.gradeLevel.toString());
      }
    } else if (user.role?.nameEn === 'STUDENT') {
      // Get student's class and studentId
      const student = await this.studentRepository.findOne({
        where: { userId: user.id },
        relations: ['class'],
      });
      studentId = student?.studentId;
      if (student?.classId && student.class) {
        classIds = [student.classId];
        classNames = [student.class.name];
        gradeLevels = [student.class.gradeLevel.toString()];
      }
    }

    return {
      accessToken,
      user: {
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        roleId: user.roleId,
        roleEn: user.role?.nameEn,
        roleKh: user.role?.nameKh,
        gender: user.gender,
        teacherId,
        studentId,
        classIds,
        classNames,
        gradeLevels,
      },
    };
  }

  async validateUser(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async getUserWebsitePermissions(userId: number): Promise<Website[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['role'],
    });

    if (!user) {
      return [];
    }

    const permissions = await this.websiteRolePermissionRepository.find({
      where: { role_id: user.roleId },
      relations: ['website'],
    });

    return permissions
      .map((permission) => permission.website)
      .filter((website) => website.is_active);
  }

  async hasWebsitePermission(
    userId: number,
    websiteId: number,
  ): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['role'],
    });

    if (!user) {
      return false;
    }

    const permission = await this.websiteRolePermissionRepository.findOne({
      where: {
        role_id: user.roleId,
        website_id: websiteId,
      },
      relations: ['website'],
    });

    return !!(permission && permission.website.is_active);
  }

  async hasWebsitePermissionByDomain(
    userId: number,
    domain: string,
  ): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['role'],
    });

    if (!user) {
      return false;
    }

    const website = await this.websiteRepository.findOne({
      where: { domain, is_active: true },
    });

    if (!website) {
      return false;
    }

    const permission = await this.websiteRolePermissionRepository.findOne({
      where: {
        role_id: user.roleId,
        website_id: website.id,
      },
    });

    return !!permission;
  }
}
