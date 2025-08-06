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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const user_response_dto_1 = require("./dto/user-response.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const update_user_dto_1 = require("./dto/update-user.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");
const user_qrcode_dto_1 = require("./dto/user-qrcode.dto");
const UPLOAD_DIR = 'uploads';
const PROFILE_DIR = 'profile_pictures';
function ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}
function normalizeImagePath(path) {
    if (!path)
        return null;
    let cleanPath = path
        .replace(/^\/+(uploads\/)+/, '/uploads/')
        .replace(/\/+/g, '/');
    cleanPath = cleanPath.replace(/\/uploads\/uploads\//, '/uploads/');
    return cleanPath;
}
function getUniqueFileName(dir, fileName) {
    let safeFileName = fileName.replace(/\s+/g, '_');
    let filePath = path.join(dir, safeFileName);
    let counter = 1;
    while (fs.existsSync(filePath)) {
        const nameWithoutExt = path.basename(safeFileName, path.extname(safeFileName));
        const ext = path.extname(safeFileName);
        safeFileName = `${nameWithoutExt}_${counter}${ext}`;
        filePath = path.join(dir, safeFileName);
        counter++;
    }
    return safeFileName;
}
const multerOptions = {
    storage: (0, multer_1.diskStorage)({
        destination: (req, file, cb) => {
            const tempPath = path.join(process.cwd(), 'uploads', 'temp');
            ensureDirectoryExists(tempPath);
            cb(null, tempPath);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const ext = path.extname(file.originalname);
            cb(null, `${uniqueSuffix}${ext}`);
        },
    }),
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|webp|svg)$/i)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
};
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    async createTeacher(createUserDto) {
        return this.usersService.createUserWithTeacherRole(createUserDto);
    }
    async findAll(page = 1, limit = 10) {
        return this.usersService.findAll(page, limit);
    }
    async findByStatusAndRole(status, roleId, page = 1, limit = 10) {
        let statusBoolean = undefined;
        if (status !== undefined) {
            statusBoolean = status === 'true';
        }
        return this.usersService.findByStatusAndRole(statusBoolean, roleId, page, limit);
    }
    async getMyAccountWithAddress(req) {
        if (!req.user || !req.user['id']) {
            throw new common_1.UnauthorizedException('Invalid user data');
        }
        const userId = parseInt(req.user['id'], 10);
        if (isNaN(userId)) {
            throw new common_1.BadRequestException('Invalid user ID');
        }
        return this.usersService.getUserWithAddressDetails(userId);
    }
    async getMyAccount(req) {
        if (!req.user || !req.user['id']) {
            throw new common_1.UnauthorizedException('Invalid user data');
        }
        const userId = parseInt(req.user['id'], 10);
        if (isNaN(userId)) {
            throw new common_1.BadRequestException('Invalid user ID');
        }
        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return {
            fullname: `${user.first_name} ${user.last_name}`,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            email: user.email,
            roleId: user.roleId,
            roleNameEn: user.roleNameEn,
            roleNameKh: user.roleNameKh,
            date_of_birth: user.date_of_birth,
            gender: user.gender,
            profile_picture: normalizeImagePath(user.profile_picture),
            phone: user.phone,
            teacherId: user.teacher?.teacher_number || null,
            nationality: user.nationality,
            residence: user.residence,
            placeOfBirth: user.placeOfBirth,
        };
    }
    async updateMyAccount(req, updateData) {
        if (!req.user || !req.user['id']) {
            throw new common_1.UnauthorizedException('Invalid user data');
        }
        const userId = parseInt(req.user['id'], 10);
        if (isNaN(userId)) {
            throw new common_1.BadRequestException('Invalid user ID');
        }
        const allowedFields = [
            'username',
            'first_name',
            'last_name',
            'email',
            'date_of_birth',
            'gender',
            'profile_picture',
            'phone',
            'nationality',
            'emergency_contact',
            'provinceId',
            'districtId',
            'communeId',
            'villageId',
            'teacher_number',
        ];
        const filteredData = {};
        for (const key of allowedFields) {
            if (updateData[key] !== undefined) {
                filteredData[key] = updateData[key];
            }
        }
        if (updateData.newPassword) {
            filteredData.newPassword = updateData.newPassword;
        }
        console.log('Update data before service call:', filteredData);
        const updatedUser = await this.usersService.update(userId, filteredData);
        console.log('Updated user from service:', updatedUser);
        const { password_hash, ...result } = updatedUser;
        return {
            ...result,
            teacherId: updatedUser.teacher?.teacher_number || null,
            profile_picture: normalizeImagePath(updatedUser.profile_picture),
        };
    }
    async updateProfilePicture(req, file) {
        try {
            if (!file) {
                throw new common_1.BadRequestException('No file uploaded');
            }
            const userId = req.user['id'];
            const user = await this.usersService.findById(userId);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            const uploadPath = path.join(process.cwd(), UPLOAD_DIR);
            const profilePath = path.join(uploadPath, PROFILE_DIR);
            ensureDirectoryExists(uploadPath);
            ensureDirectoryExists(profilePath);
            const fileExtension = path.extname(file.originalname);
            const sanitizedFullName = `${user.first_name}_${user.last_name}`.replace(/\s+/g, '_');
            const profileDir = path.join(process.cwd(), UPLOAD_DIR, PROFILE_DIR);
            const newFileName = getUniqueFileName(profileDir, `${sanitizedFullName}${fileExtension}`);
            const relativePath = `/uploads/${PROFILE_DIR}/${newFileName}`;
            const newFilePath = path.join(process.cwd(), UPLOAD_DIR, PROFILE_DIR, newFileName);
            if (user.profile_picture) {
                const oldPathNormalized = user.profile_picture.replace(/^\//, '');
                const oldPath = path.join(process.cwd(), oldPathNormalized);
                if (fs.existsSync(oldPath)) {
                    try {
                        fs.unlinkSync(oldPath);
                    }
                    catch (err) {
                        console.error('Error deleting old profile picture:', err);
                    }
                }
            }
            try {
                fs.copyFileSync(file.path, newFilePath);
                fs.unlinkSync(file.path);
            }
            catch (err) {
                console.error('Error moving file:', err);
                throw new Error('Failed to save uploaded file');
            }
            await this.usersService.update(userId, { profile_picture: relativePath });
            return {
                success: true,
                profile_picture: relativePath,
            };
        }
        catch (error) {
            console.error('Profile picture upload error:', error);
            throw error;
        }
    }
    async generateLoginQR(credentials) {
        try {
            const loginUrl = new URL('/login', process.env.FRONTEND_URL);
            loginUrl.searchParams.append('username', credentials.username);
            loginUrl.searchParams.append('auto_login', 'true');
            loginUrl.searchParams.append('timestamp', new Date().toISOString());
            const qrData = JSON.stringify({
                title: 'PLP Login',
                url: loginUrl.toString(),
            });
            const qrCode = await QRCode.toDataURL(qrData, {
                errorCorrectionLevel: 'H',
                margin: 2,
                width: 300,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF',
                },
            });
            return { qrCode };
        }
        catch (error) {
            console.error('QR code generation error:', error);
            throw new common_1.BadRequestException('Failed to generate QR code');
        }
    }
    async uploadProfile(id, file) {
        const user = await this.usersService.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const fileExtension = path.extname(file.originalname);
        const newFileName = `${user.username}${fileExtension}`;
        const newFilePath = path.join(process.cwd(), 'uploads', 'user_profile', newFileName);
        const tempFilePath = file.path;
        const profileDir = path.join(process.cwd(), 'uploads', 'user_profile');
        if (fs.existsSync(profileDir)) {
            const files = fs.readdirSync(profileDir);
            const existingFiles = files.filter((f) => f.startsWith(user.username + '.'));
            existingFiles.forEach((existingFile) => {
                const existingFilePath = path.join(profileDir, existingFile);
                if (fs.existsSync(existingFilePath)) {
                    fs.unlinkSync(existingFilePath);
                }
            });
        }
        fs.renameSync(tempFilePath, newFilePath);
        const relativePath = `user_profile/${newFileName}`;
        await this.usersService.update(id, { profile_picture: relativePath });
        return {
            profile_picture: `/${relativePath}`,
        };
    }
    async findOne(id) {
        return this.usersService.findById(id);
    }
    async update(id, updateData) {
        return this.usersService.update(id, updateData);
    }
    async remove(id) {
        return this.usersService.remove(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'User successfully created' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Username or email already exists' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('teacher'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user with teacher role' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Teacher user successfully created',
    }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Username or email already exists' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createTeacher", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all users with pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 10 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return paginated users with role information',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/UserResponseDto' },
                },
                pagination: {
                    type: 'object',
                    properties: {
                        page: { type: 'number', example: 1 },
                        limit: { type: 'number', example: 10 },
                        total: { type: 'number', example: 100 },
                        pages: { type: 'number', example: 10 },
                    },
                },
            },
        },
    }),
    __param(0, (0, common_1.Query)('page', new common_1.ParseIntPipe({ optional: true }))),
    __param(1, (0, common_1.Query)('limit', new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('filter'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get users filtered by status and role' }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        required: false,
        type: Boolean,
        example: true,
        description: 'Filter by active status (true/false)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'roleId',
        required: false,
        type: Number,
        example: 8,
        description: 'Filter by role ID',
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 10 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return filtered paginated users with role information',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/UserResponseDto' },
                },
                pagination: {
                    type: 'object',
                    properties: {
                        page: { type: 'number', example: 1 },
                        limit: { type: 'number', example: 10 },
                        total: { type: 'number', example: 100 },
                        total_active: { type: 'number', example: 20 },
                        most_role_count: { type: 'string', example: 'គ្រូបង្រៀន 15' },
                        pages: { type: 'number', example: 10 },
                    },
                },
            },
        },
    }),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('roleId', new common_1.ParseIntPipe({ optional: true }))),
    __param(2, (0, common_1.Query)('page', new common_1.ParseIntPipe({ optional: true }))),
    __param(3, (0, common_1.Query)('limit', new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findByStatusAndRole", null);
__decorate([
    (0, common_1.Get)('my-account/address-details'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get current user profile with detailed address information',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns current user profile with address details',
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getMyAccountWithAddress", null);
__decorate([
    (0, common_1.Get)('my-account'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns current user profile' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getMyAccount", null);
__decorate([
    (0, common_1.Patch)('my-account'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateMyAccountDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateMyAccount", null);
__decorate([
    (0, common_1.Patch)('my-account/profile-picture'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', multerOptions)),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfilePicture", null);
__decorate([
    (0, common_1.Post)('generate-login-qr'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate QR code for login credentials' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'QR code generated successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_qrcode_dto_1.LoginQrDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "generateLoginQR", null);
__decorate([
    (0, common_1.Post)(':id/upload-profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', multerOptions)),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Upload profile picture for a user by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Profile picture uploaded successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "uploadProfile", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a user by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns the user with role information',
        type: user_response_dto_1.UserResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User successfully updated' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User successfully deleted' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map