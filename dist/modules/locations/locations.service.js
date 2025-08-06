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
exports.LocationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const province_entity_1 = require("../../entities/province.entity");
const district_entity_1 = require("../../entities/district.entity");
const commune_entity_1 = require("../../entities/commune.entity");
const village_entity_1 = require("../../entities/village.entity");
let LocationsService = class LocationsService {
    provinceRepository;
    districtRepository;
    communeRepository;
    villageRepository;
    constructor(provinceRepository, districtRepository, communeRepository, villageRepository) {
        this.provinceRepository = provinceRepository;
        this.districtRepository = districtRepository;
        this.communeRepository = communeRepository;
        this.villageRepository = villageRepository;
    }
    async getProvinces() {
        return this.provinceRepository.find({
            order: { province_name_en: 'ASC' },
        });
    }
    async getProvince(id) {
        const province = await this.provinceRepository.findOne({
            where: { id },
        });
        if (!province) {
            throw new common_1.NotFoundException(`Province with ID ${id} not found`);
        }
        const districts = await this.districtRepository.find({
            where: { province_id: id },
            order: { district_name_en: 'ASC' },
        });
        const communes = await this.communeRepository.find({
            where: { province_id: id },
            order: { commune_name_en: 'ASC' },
        });
        const villages = await this.villageRepository.find({
            where: { province_id: id },
            order: { village_name_en: 'ASC' },
        });
        return { ...province, districts, communes, villages };
    }
    async getDistricts(provinceId) {
        const where = provinceId ? { province_id: provinceId } : {};
        return this.districtRepository.find({
            where,
            order: { district_name_en: 'ASC' },
        });
    }
    async getDistrict(id) {
        const district = await this.districtRepository.findOne({
            where: { id },
        });
        if (!district) {
            throw new common_1.NotFoundException(`District with ID ${id} not found`);
        }
        const province = await this.provinceRepository.findOne({
            where: { id: district.province_id },
        });
        const communes = await this.communeRepository.find({
            where: { district_code: district.district_code },
            order: { commune_name_en: 'ASC' },
        });
        const villages = await this.villageRepository.find({
            where: { district_code: district.district_code },
            order: { village_name_en: 'ASC' },
        });
        return { ...district, province, communes, villages };
    }
    async getCommunes(districtCode, provinceId) {
        const where = {};
        if (districtCode)
            where.district_code = districtCode;
        if (provinceId)
            where.province_id = provinceId;
        return this.communeRepository.find({
            where,
            order: { commune_name_en: 'ASC' },
        });
    }
    async getCommune(id) {
        const commune = await this.communeRepository.findOne({
            where: { id },
        });
        if (!commune) {
            throw new common_1.NotFoundException(`Commune with ID ${id} not found`);
        }
        const province = await this.provinceRepository.findOne({
            where: { id: commune.province_id },
        });
        const district = await this.districtRepository.findOne({
            where: { district_code: commune.district_code },
        });
        const villages = await this.villageRepository.find({
            where: { commune_code: commune.commune_code },
            order: { village_name_en: 'ASC' },
        });
        return { ...commune, province, district, villages };
    }
    async getVillages(communeCode, districtCode, provinceId) {
        const where = {};
        if (communeCode)
            where.commune_code = communeCode;
        if (districtCode)
            where.district_code = districtCode;
        if (provinceId)
            where.province_id = provinceId;
        return this.villageRepository.find({
            where,
            order: { village_name_en: 'ASC' },
        });
    }
    async getVillage(id) {
        const village = await this.villageRepository.findOne({
            where: { id },
        });
        if (!village) {
            throw new common_1.NotFoundException(`Village with ID ${id} not found`);
        }
        const province = await this.provinceRepository.findOne({
            where: { id: village.province_id },
        });
        const district = await this.districtRepository.findOne({
            where: { district_code: village.district_code },
        });
        const commune = await this.communeRepository.findOne({
            where: { commune_code: village.commune_code },
        });
        return { ...village, province, district, commune };
    }
};
exports.LocationsService = LocationsService;
exports.LocationsService = LocationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(province_entity_1.Province)),
    __param(1, (0, typeorm_1.InjectRepository)(district_entity_1.District)),
    __param(2, (0, typeorm_1.InjectRepository)(commune_entity_1.Commune)),
    __param(3, (0, typeorm_1.InjectRepository)(village_entity_1.Village)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], LocationsService);
//# sourceMappingURL=locations.service.js.map