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
exports.SchoolsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const school_entity_1 = require("../../entities/school.entity");
const school_place_entity_1 = require("../../entities/school-place.entity");
const province_entity_1 = require("../../entities/province.entity");
const district_entity_1 = require("../../entities/district.entity");
const commune_entity_1 = require("../../entities/commune.entity");
const village_entity_1 = require("../../entities/village.entity");
const status_enum_1 = require("../../entities/enums/status.enum");
let SchoolsService = class SchoolsService {
    schoolRepository;
    schoolPlaceRepository;
    provinceRepository;
    districtRepository;
    communeRepository;
    villageRepository;
    constructor(schoolRepository, schoolPlaceRepository, provinceRepository, districtRepository, communeRepository, villageRepository) {
        this.schoolRepository = schoolRepository;
        this.schoolPlaceRepository = schoolPlaceRepository;
        this.provinceRepository = provinceRepository;
        this.districtRepository = districtRepository;
        this.communeRepository = communeRepository;
        this.villageRepository = villageRepository;
    }
    async findAll(limit, offset) {
        const [schools, total] = await this.schoolRepository.findAndCount({
            relations: ['place'],
            take: limit,
            skip: offset,
        });
        const schoolsWithLocationData = await Promise.all(schools.map(async (school) => {
            let placeData = null;
            if (school.place) {
                const [province, district, commune, village] = await Promise.all([
                    school.place.provinceId
                        ? this.provinceRepository.findOne({
                            where: { id: school.place.provinceId },
                        })
                        : null,
                    school.place.districtId
                        ? this.districtRepository.findOne({
                            where: { id: school.place.districtId },
                        })
                        : null,
                    school.place.communeId
                        ? this.communeRepository.findOne({
                            where: { id: school.place.communeId },
                        })
                        : null,
                    school.place.villageId
                        ? this.villageRepository.findOne({
                            where: { id: school.place.villageId },
                        })
                        : null,
                ]);
                placeData = {
                    id: school.place.id,
                    provinceId: school.place.provinceId,
                    province_name_kh: province?.province_name_kh || null,
                    province_name_en: province?.province_name_en || null,
                    province_code: province?.province_code || null,
                    districtId: school.place.districtId,
                    district_name_kh: district?.district_name_kh || null,
                    district_name_en: district?.district_name_en || null,
                    district_code: district?.district_code || null,
                    communeId: school.place.communeId,
                    commune_name_kh: commune?.commune_name_kh || null,
                    commune_name_en: commune?.commune_name_en || null,
                    commune_code: commune?.commune_code || null,
                    villageId: school.place.villageId,
                    village_name_kh: village?.village_name_kh || null,
                    village_name_en: village?.village_name_en || null,
                    village_code: village?.village_code || null,
                };
            }
            return {
                ...school,
                place: placeData,
            };
        }));
        const page = offset && limit ? Math.floor(offset / limit) + 1 : 1;
        const totalPages = limit ? Math.ceil(total / limit) : 1;
        return {
            data: schoolsWithLocationData,
            total,
            page,
            limit: limit || total,
            totalPages,
        };
    }
    async findOne(id) {
        const school = await this.schoolRepository.findOne({
            where: { schoolId: id },
            relations: ['place'],
        });
        if (!school) {
            throw new common_1.NotFoundException(`School with ID ${id} not found`);
        }
        let placeData = null;
        if (school.place) {
            const [province, district, commune, village] = await Promise.all([
                school.place.provinceId
                    ? this.provinceRepository.findOne({
                        where: { id: school.place.provinceId },
                    })
                    : null,
                school.place.districtId
                    ? this.districtRepository.findOne({
                        where: { id: school.place.districtId },
                    })
                    : null,
                school.place.communeId
                    ? this.communeRepository.findOne({
                        where: { commune_code: school.place.communeId.toString() },
                    })
                    : null,
                school.place.villageId
                    ? this.villageRepository.findOne({
                        where: { id: school.place.villageId },
                    })
                    : null,
            ]);
            placeData = {
                id: school.place.id,
                provinceId: school.place.provinceId,
                province_name_kh: province?.province_name_kh || null,
                province_name_en: province?.province_name_en || null,
                province_code: province?.province_code || null,
                districtId: school.place.districtId,
                district_name_kh: district?.district_name_kh || null,
                district_name_en: district?.district_name_en || null,
                district_code: district?.district_code || null,
                communeId: school.place.communeId,
                commune_name_kh: commune?.commune_name_kh || null,
                commune_name_en: commune?.commune_name_en || null,
                commune_code: commune?.commune_code || null,
                villageId: school.place.villageId,
                village_name_kh: village?.village_name_kh || null,
                village_name_en: village?.village_name_en || null,
                village_code: village?.village_code || null,
            };
        }
        return {
            ...school,
            place: placeData,
        };
    }
    async create(createSchoolDto) {
        const { place, ...schoolData } = createSchoolDto;
        const school = this.schoolRepository.create(schoolData);
        const savedSchool = await this.schoolRepository.save(school);
        if (place) {
            const schoolPlace = this.schoolPlaceRepository.create({
                schoolId: savedSchool.schoolId,
                provinceId: place.provinceId,
                districtId: place.districtId,
                communeId: place.communeId,
                villageId: place.villageId,
            });
            await this.schoolPlaceRepository.save(schoolPlace);
        }
        return this.findOne(savedSchool.schoolId);
    }
    async update(id, updateSchoolDto) {
        const school = await this.schoolRepository.findOne({
            where: { schoolId: id },
        });
        if (!school) {
            throw new common_1.NotFoundException(`School with ID ${id} not found`);
        }
        const { place, ...schoolData } = updateSchoolDto;
        Object.assign(school, schoolData);
        await this.schoolRepository.save(school);
        if (place) {
            const existingPlace = await this.schoolPlaceRepository.findOne({
                where: { schoolId: id },
            });
            if (existingPlace) {
                Object.assign(existingPlace, place);
                await this.schoolPlaceRepository.save(existingPlace);
            }
            else {
                const schoolPlace = this.schoolPlaceRepository.create({
                    schoolId: id,
                    provinceId: place.provinceId,
                    districtId: place.districtId,
                    communeId: place.communeId,
                    villageId: place.villageId,
                });
                await this.schoolPlaceRepository.save(schoolPlace);
            }
        }
        return this.findOne(id);
    }
    async remove(id) {
        const result = await this.schoolRepository.delete({ schoolId: id });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`School with ID ${id} not found`);
        }
    }
    async activate(id) {
        const school = await this.findOne(id);
        school.status = status_enum_1.Status.ACTIVE;
        return this.schoolRepository.save(school);
    }
    async deactivate(id) {
        const school = await this.findOne(id);
        school.status = status_enum_1.Status.INACTIVE;
        return this.schoolRepository.save(school);
    }
    async findByDistrict(districtId) {
        const schoolPlaces = await this.schoolPlaceRepository.find({
            where: { districtId },
            relations: ['school'],
        });
        return Promise.all(schoolPlaces.map(async (schoolPlace) => {
            return this.findOne(schoolPlace.schoolId);
        }));
    }
    async findByProvince(provinceId) {
        const schoolPlaces = await this.schoolPlaceRepository.find({
            where: { provinceId },
            relations: ['school'],
        });
        return Promise.all(schoolPlaces.map(async (schoolPlace) => {
            return this.findOne(schoolPlace.schoolId);
        }));
    }
    async findByCommune(communeId) {
        const schoolPlaces = await this.schoolPlaceRepository.find({
            where: { communeId },
            relations: ['school'],
        });
        return Promise.all(schoolPlaces.map(async (schoolPlace) => {
            return this.findOne(schoolPlace.schoolId);
        }));
    }
    async findByVillage(villageId) {
        const schoolPlaces = await this.schoolPlaceRepository.find({
            where: { villageId },
            relations: ['school'],
        });
        return Promise.all(schoolPlaces.map(async (schoolPlace) => {
            return this.findOne(schoolPlace.schoolId);
        }));
    }
    async uploadProfile(id, file) {
        const school = await this.schoolRepository.findOne({
            where: { schoolId: id },
        });
        if (!school) {
            throw new common_1.NotFoundException(`School with ID ${id} not found`);
        }
        const fs = require('fs');
        const path = require('path');
        const fileExtension = path.extname(file.originalname);
        const newFileName = `${school.code}${fileExtension}`;
        const newFilePath = path.join(process.cwd(), 'uploads', 'school_profile', newFileName);
        const tempFilePath = file.path;
        const profileDir = path.join(process.cwd(), 'uploads', 'school_profile');
        if (fs.existsSync(profileDir)) {
            const files = fs.readdirSync(profileDir);
            const existingFiles = files.filter((f) => f.startsWith(school.code + '.'));
            existingFiles.forEach((existingFile) => {
                const existingFilePath = path.join(profileDir, existingFile);
                if (fs.existsSync(existingFilePath)) {
                    fs.unlinkSync(existingFilePath);
                }
            });
        }
        fs.renameSync(tempFilePath, newFilePath);
        school.profile = `school_profile/${newFileName}`;
        await this.schoolRepository.save(school);
        return { profile: `/uploads/school_profile/${newFileName}` };
    }
};
exports.SchoolsService = SchoolsService;
exports.SchoolsService = SchoolsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(school_entity_1.School)),
    __param(1, (0, typeorm_1.InjectRepository)(school_place_entity_1.SchoolPlace)),
    __param(2, (0, typeorm_1.InjectRepository)(province_entity_1.Province)),
    __param(3, (0, typeorm_1.InjectRepository)(district_entity_1.District)),
    __param(4, (0, typeorm_1.InjectRepository)(commune_entity_1.Commune)),
    __param(5, (0, typeorm_1.InjectRepository)(village_entity_1.Village)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SchoolsService);
//# sourceMappingURL=schools.service.js.map