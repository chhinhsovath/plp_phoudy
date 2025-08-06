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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../../entities/user.entity");
const teacher_entity_1 = require("../../entities/teacher.entity");
const student_entity_1 = require("../../entities/student.entity");
const class_entity_1 = require("../../entities/class.entity");
const website_entity_1 = require("../../entities/website.entity");
const website_role_permission_entity_1 = require("../../entities/website-role-permission.entity");
let AuthService = class AuthService {
    userRepository;
    teacherRepository;
    studentRepository;
    classRepository;
    websiteRepository;
    websiteRolePermissionRepository;
    jwtService;
    constructor(userRepository, teacherRepository, studentRepository, classRepository, websiteRepository, websiteRolePermissionRepository, jwtService) {
        this.userRepository = userRepository;
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
        this.classRepository = classRepository;
        this.websiteRepository = websiteRepository;
        this.websiteRolePermissionRepository = websiteRolePermissionRepository;
        this.jwtService = jwtService;
    }
    async login(loginDto) {
        const { username, password } = loginDto;
        const user = await this.userRepository.findOne({
            where: { username },
            relations: ['role'],
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        await this.userRepository.update(user.id, { last_login: new Date() });
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = {
            id: user.id,
            username: user.username,
            role: user.role?.nameEn,
        };
        const accessToken = this.jwtService.sign(payload);
        let teacherId;
        let studentId;
        let classIds = [];
        let classNames = [];
        let gradeLevels = [];
        if (user.role?.nameEn === 'TEACHER') {
            const teacher = await this.teacherRepository.findOne({
                where: { userId: user.id },
            });
            teacherId = teacher?.teacherId;
            if (teacherId) {
                const classes = await this.classRepository.find({
                    where: { teacherId },
                });
                classIds = classes.map((cls) => cls.classId);
                classNames = classes.map((cls) => cls.name);
                gradeLevels = classes.map((cls) => cls.gradeLevel.toString());
            }
        }
        else if (user.role?.nameEn === 'STUDENT') {
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
    async validateUser(id) {
        return this.userRepository.findOne({ where: { id } });
    }
    async getUserWebsitePermissions(userId) {
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
    async hasWebsitePermission(userId, websiteId) {
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
    async hasWebsitePermissionByDomain(userId, domain) {
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(teacher_entity_1.Teacher)),
    __param(2, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(3, (0, typeorm_1.InjectRepository)(class_entity_1.Class)),
    __param(4, (0, typeorm_1.InjectRepository)(website_entity_1.Website)),
    __param(5, (0, typeorm_1.InjectRepository)(website_role_permission_entity_1.WebsiteRolePermission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map