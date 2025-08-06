import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from '../../entities/school.entity';
import { SchoolPlace } from '../../entities/school-place.entity';
import { Province } from '../../entities/province.entity';
import { District } from '../../entities/district.entity';
import { Commune } from '../../entities/commune.entity';
import { Village } from '../../entities/village.entity';
import { Status } from '../../entities/enums/status.enum';
import { CreateSchoolDto } from './dto/create-school.dto';
import { PaginationResult } from '../../common/pagination.interface';

@Injectable()
export class SchoolsService {
  constructor(
    @InjectRepository(School)
    private schoolRepository: Repository<School>,
    @InjectRepository(SchoolPlace)
    private schoolPlaceRepository: Repository<SchoolPlace>,
    @InjectRepository(Province)
    private provinceRepository: Repository<Province>,
    @InjectRepository(District)
    private districtRepository: Repository<District>,
    @InjectRepository(Commune)
    private communeRepository: Repository<Commune>,
    @InjectRepository(Village)
    private villageRepository: Repository<Village>,
  ) {}

  async findAll(
    limit?: number,
    offset?: number,
  ): Promise<PaginationResult<any>> {
    const [schools, total] = await this.schoolRepository.findAndCount({
      relations: ['place'],
      take: limit,
      skip: offset,
    });

    // Manually fetch location data for each school
    const schoolsWithLocationData = await Promise.all(
      schools.map(async (school) => {
        let placeData: any = null;

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
            // school.place.communeId ? this.communeRepository.findOne({ where: { commune_code: school.place.communeId.toString() } }) : null,
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
      }),
    );

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

  async findOne(id: number): Promise<any> {
    const school = await this.schoolRepository.findOne({
      where: { schoolId: id },
      relations: ['place'],
    });

    if (!school) {
      throw new NotFoundException(`School with ID ${id} not found`);
    }

    let placeData: any = null;

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

  async create(createSchoolDto: CreateSchoolDto): Promise<any> {
    const { place, ...schoolData } = createSchoolDto;

    // Create school first
    const school = this.schoolRepository.create(schoolData);
    const savedSchool = await this.schoolRepository.save(school);

    // Create school place if provided
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

  async update(
    id: number,
    updateSchoolDto: Partial<CreateSchoolDto>,
  ): Promise<any> {
    const school = await this.schoolRepository.findOne({
      where: { schoolId: id },
    });

    if (!school) {
      throw new NotFoundException(`School with ID ${id} not found`);
    }

    const { place, ...schoolData } = updateSchoolDto;

    // Update school data
    Object.assign(school, schoolData);
    await this.schoolRepository.save(school);

    // Update school place if provided
    if (place) {
      const existingPlace = await this.schoolPlaceRepository.findOne({
        where: { schoolId: id },
      });

      if (existingPlace) {
        Object.assign(existingPlace, place);
        await this.schoolPlaceRepository.save(existingPlace);
      } else {
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

  async remove(id: number): Promise<void> {
    const result = await this.schoolRepository.delete({ schoolId: id });

    if (result.affected === 0) {
      throw new NotFoundException(`School with ID ${id} not found`);
    }
  }

  async activate(id: number): Promise<School> {
    const school = await this.findOne(id);
    school.status = Status.ACTIVE;
    return this.schoolRepository.save(school);
  }

  async deactivate(id: number): Promise<School> {
    const school = await this.findOne(id);
    school.status = Status.INACTIVE;
    return this.schoolRepository.save(school);
  }

  async findByDistrict(districtId: number): Promise<any[]> {
    const schoolPlaces = await this.schoolPlaceRepository.find({
      where: { districtId },
      relations: ['school'],
    });

    return Promise.all(
      schoolPlaces.map(async (schoolPlace) => {
        return this.findOne(schoolPlace.schoolId);
      }),
    );
  }

  async findByProvince(provinceId: number): Promise<any[]> {
    const schoolPlaces = await this.schoolPlaceRepository.find({
      where: { provinceId },
      relations: ['school'],
    });

    return Promise.all(
      schoolPlaces.map(async (schoolPlace) => {
        return this.findOne(schoolPlace.schoolId);
      }),
    );
  }

  async findByCommune(communeId: number): Promise<any[]> {
    const schoolPlaces = await this.schoolPlaceRepository.find({
      where: { communeId },
      relations: ['school'],
    });

    return Promise.all(
      schoolPlaces.map(async (schoolPlace) => {
        return this.findOne(schoolPlace.schoolId);
      }),
    );
  }

  async findByVillage(villageId: number): Promise<any[]> {
    const schoolPlaces = await this.schoolPlaceRepository.find({
      where: { villageId },
      relations: ['school'],
    });

    return Promise.all(
      schoolPlaces.map(async (schoolPlace) => {
        return this.findOne(schoolPlace.schoolId);
      }),
    );
  }

  async uploadProfile(
    id: number,
    file: Express.Multer.File,
  ): Promise<{ profile: string }> {
    const school = await this.schoolRepository.findOne({
      where: { schoolId: id },
    });

    if (!school) {
      throw new NotFoundException(`School with ID ${id} not found`);
    }

    const fs = require('fs');
    const path = require('path');

    // Create the new filename based on school code
    const fileExtension = path.extname(file.originalname);
    const newFileName = `${school.code}${fileExtension}`;
    const newFilePath = path.join(
      process.cwd(),
      'uploads',
      'school_profile',
      newFileName,
    );
    const tempFilePath = file.path;

    // Delete any existing profile for this school (with any extension)
    const profileDir = path.join(process.cwd(), 'uploads', 'school_profile');
    if (fs.existsSync(profileDir)) {
      const files = fs.readdirSync(profileDir);
      const existingFiles = files.filter((f) =>
        f.startsWith(school.code + '.'),
      );
      existingFiles.forEach((existingFile) => {
        const existingFilePath = path.join(profileDir, existingFile);
        if (fs.existsSync(existingFilePath)) {
          fs.unlinkSync(existingFilePath);
        }
      });
    }

    // Move and rename the temp file to the final location
    fs.renameSync(tempFilePath, newFilePath);

    // Update school with new profile filename (relative path)
    school.profile = `school_profile/${newFileName}`;
    await this.schoolRepository.save(school);

    return { profile: `/uploads/school_profile/${newFileName}` };
  }
}
