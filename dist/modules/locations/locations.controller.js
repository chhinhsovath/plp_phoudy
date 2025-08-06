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
exports.LocationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const locations_service_1 = require("./locations.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let LocationsController = class LocationsController {
    locationsService;
    constructor(locationsService) {
        this.locationsService = locationsService;
    }
    async getProvinces() {
        return this.locationsService.getProvinces();
    }
    async getProvince(id) {
        return this.locationsService.getProvince(id);
    }
    async getDistricts(provinceId) {
        return this.locationsService.getDistricts(provinceId);
    }
    async getDistrict(id) {
        return this.locationsService.getDistrict(id);
    }
    async getCommunes(districtCode, provinceId) {
        return this.locationsService.getCommunes(districtCode, provinceId);
    }
    async getCommune(id) {
        return this.locationsService.getCommune(id);
    }
    async getVillages(communeCode, districtCode, provinceId) {
        return this.locationsService.getVillages(communeCode, districtCode, provinceId);
    }
    async getVillage(id) {
        return this.locationsService.getVillage(id);
    }
};
exports.LocationsController = LocationsController;
__decorate([
    (0, common_1.Get)('provinces'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all provinces' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all provinces' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "getProvinces", null);
__decorate([
    (0, common_1.Get)('provinces/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get province by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return province' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Province not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "getProvince", null);
__decorate([
    (0, common_1.Get)('districts'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all districts or districts by province' }),
    (0, swagger_1.ApiQuery)({ name: 'province_id', required: false, type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return districts' }),
    __param(0, (0, common_1.Query)('province_id', new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "getDistricts", null);
__decorate([
    (0, common_1.Get)('districts/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get district by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return district' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'District not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "getDistrict", null);
__decorate([
    (0, common_1.Get)('communes'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all communes or communes by district/province',
    }),
    (0, swagger_1.ApiQuery)({ name: 'district_code', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'province_id', required: false, type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return communes' }),
    __param(0, (0, common_1.Query)('district_code')),
    __param(1, (0, common_1.Query)('province_id', new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "getCommunes", null);
__decorate([
    (0, common_1.Get)('communes/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get commune by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return commune' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Commune not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "getCommune", null);
__decorate([
    (0, common_1.Get)('villages'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all villages or villages by commune/district/province',
    }),
    (0, swagger_1.ApiQuery)({ name: 'commune_code', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'district_code', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'province_id', required: false, type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return villages' }),
    __param(0, (0, common_1.Query)('commune_code')),
    __param(1, (0, common_1.Query)('district_code')),
    __param(2, (0, common_1.Query)('province_id', new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "getVillages", null);
__decorate([
    (0, common_1.Get)('villages/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get village by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return village' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Village not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "getVillage", null);
exports.LocationsController = LocationsController = __decorate([
    (0, swagger_1.ApiTags)('Locations'),
    (0, common_1.Controller)('locations'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [locations_service_1.LocationsService])
], LocationsController);
//# sourceMappingURL=locations.controller.js.map