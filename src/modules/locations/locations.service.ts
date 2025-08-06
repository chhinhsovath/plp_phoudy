import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Province } from '../../entities/province.entity';
import { District } from '../../entities/district.entity';
import { Commune } from '../../entities/commune.entity';
import { Village } from '../../entities/village.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Province)
    private provinceRepository: Repository<Province>,
    @InjectRepository(District)
    private districtRepository: Repository<District>,
    @InjectRepository(Commune)
    private communeRepository: Repository<Commune>,
    @InjectRepository(Village)
    private villageRepository: Repository<Village>,
  ) {}

  async getProvinces(): Promise<Province[]> {
    return this.provinceRepository.find({
      order: { province_name_en: 'ASC' },
    });
  }

  async getProvince(id: number): Promise<any> {
    const province = await this.provinceRepository.findOne({
      where: { id },
    });
    if (!province) {
      throw new NotFoundException(`Province with ID ${id} not found`);
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

  async getDistricts(provinceId?: number): Promise<District[]> {
    const where = provinceId ? { province_id: provinceId } : {};
    return this.districtRepository.find({
      where,
      order: { district_name_en: 'ASC' },
    });
  }

  async getDistrict(id: number): Promise<any> {
    const district = await this.districtRepository.findOne({
      where: { id },
    });
    if (!district) {
      throw new NotFoundException(`District with ID ${id} not found`);
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

  async getCommunes(
    districtCode?: string,
    provinceId?: number,
  ): Promise<Commune[]> {
    const where: any = {};
    if (districtCode) where.district_code = districtCode;
    if (provinceId) where.province_id = provinceId;

    return this.communeRepository.find({
      where,
      order: { commune_name_en: 'ASC' },
    });
  }

  async getCommune(id: number): Promise<any> {
    const commune = await this.communeRepository.findOne({
      where: { id },
    });
    if (!commune) {
      throw new NotFoundException(`Commune with ID ${id} not found`);
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

  async getVillages(
    communeCode?: string,
    districtCode?: string,
    provinceId?: number,
  ): Promise<Village[]> {
    const where: any = {};
    if (communeCode) where.commune_code = communeCode;
    if (districtCode) where.district_code = districtCode;
    if (provinceId) where.province_id = provinceId;

    return this.villageRepository.find({
      where,
      order: { village_name_en: 'ASC' },
    });
  }

  async getVillage(id: number): Promise<any> {
    const village = await this.villageRepository.findOne({
      where: { id },
    });
    if (!village) {
      throw new NotFoundException(`Village with ID ${id} not found`);
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
}
