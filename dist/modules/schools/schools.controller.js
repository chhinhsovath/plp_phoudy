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
exports.SchoolsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const schools_service_1 = require("./schools.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const create_school_dto_1 = require("./dto/create-school.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const fs = require("fs");
const multerOptions = {
    storage: (0, multer_1.diskStorage)({
        destination: (req, file, cb) => {
            const uploadPath = './uploads/school_profile';
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            cb(null, `temp-${Date.now()}${(0, path_1.extname)(file.originalname)}`);
        },
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            cb(null, true);
        }
        else {
            cb(new Error('Only image files are allowed!'), false);
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
};
let SchoolsController = class SchoolsController {
    schoolsService;
    constructor(schoolsService) {
        this.schoolsService = schoolsService;
    }
    async findAll(limit, offset) {
        return this.schoolsService.findAll(limit, offset);
    }
    async findOne(id) {
        return this.schoolsService.findOne(id);
    }
    async create(createSchoolDto) {
        return this.schoolsService.create(createSchoolDto);
    }
    async update(id, updateSchoolDto) {
        return this.schoolsService.update(id, updateSchoolDto);
    }
    async findByDistrict(districtId) {
        return this.schoolsService.findByDistrict(districtId);
    }
    async findByProvince(provinceId) {
        return this.schoolsService.findByProvince(provinceId);
    }
    async findByCommune(communeId) {
        return this.schoolsService.findByCommune(communeId);
    }
    async findByVillage(villageId) {
        return this.schoolsService.findByVillage(villageId);
    }
    async remove(id) {
        return this.schoolsService.remove(id);
    }
    async activate(id) {
        return this.schoolsService.activate(id);
    }
    async deactivate(id) {
        return this.schoolsService.deactivate(id);
    }
    async uploadProfile(id, file) {
        return this.schoolsService.uploadProfile(id, file);
    }
};
exports.SchoolsController = SchoolsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all schools with pagination' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return paginated schools' }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Number of items per page',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'offset',
        required: false,
        type: Number,
        description: 'Number of items to skip',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], SchoolsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a school by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the school' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'School not found' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SchoolsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new school' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'School successfully created' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_school_dto_1.CreateSchoolDto]),
    __metadata("design:returntype", Promise)
], SchoolsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a school' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'School successfully updated' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'School not found' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SchoolsController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('district/:districtId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get schools by district' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return schools in the district' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('districtId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SchoolsController.prototype, "findByDistrict", null);
__decorate([
    (0, common_1.Get)('province/:provinceId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get schools by province' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return schools in the province' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('provinceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SchoolsController.prototype, "findByProvince", null);
__decorate([
    (0, common_1.Get)('commune/:communeId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get schools by commune' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return schools in the commune' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('communeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SchoolsController.prototype, "findByCommune", null);
__decorate([
    (0, common_1.Get)('village/:villageId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get schools by village' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return schools in the village' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('villageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SchoolsController.prototype, "findByVillage", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a school' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'School successfully deleted' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'School not found' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SchoolsController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/activate'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Activate a school' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'School successfully activated' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'School not found' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SchoolsController.prototype, "activate", null);
__decorate([
    (0, common_1.Patch)(':id/deactivate'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Deactivate a school' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'School successfully deactivated' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'School not found' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SchoolsController.prototype, "deactivate", null);
__decorate([
    (0, common_1.Post)(':id/upload-profile'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', multerOptions)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Upload school profile picture' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Profile picture uploaded successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'School not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SchoolsController.prototype, "uploadProfile", null);
exports.SchoolsController = SchoolsController = __decorate([
    (0, swagger_1.ApiTags)('Schools'),
    (0, common_1.Controller)('schools'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [schools_service_1.SchoolsService])
], SchoolsController);
//# sourceMappingURL=schools.controller.js.map