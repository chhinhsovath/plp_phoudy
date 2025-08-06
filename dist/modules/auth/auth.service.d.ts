import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Teacher } from '../../entities/teacher.entity';
import { Student } from '../../entities/student.entity';
import { Class } from '../../entities/class.entity';
import { Website } from '../../entities/website.entity';
import { WebsiteRolePermission } from '../../entities/website-role-permission.entity';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private userRepository;
    private teacherRepository;
    private studentRepository;
    private classRepository;
    private websiteRepository;
    private websiteRolePermissionRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, teacherRepository: Repository<Teacher>, studentRepository: Repository<Student>, classRepository: Repository<Class>, websiteRepository: Repository<Website>, websiteRolePermissionRepository: Repository<WebsiteRolePermission>, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: number;
            username: string;
            first_name: string;
            last_name: string;
            email: string;
            roleId: number;
            roleEn: string;
            roleKh: string;
            gender: import("../../entities/user.entity").Gender;
            teacherId: number | undefined;
            studentId: number | undefined;
            classIds: number[];
            classNames: string[];
            gradeLevels: string[];
        };
    }>;
    validateUser(id: number): Promise<User | null>;
    getUserWebsitePermissions(userId: number): Promise<Website[]>;
    hasWebsitePermission(userId: number, websiteId: number): Promise<boolean>;
    hasWebsitePermissionByDomain(userId: number, domain: string): Promise<boolean>;
}
