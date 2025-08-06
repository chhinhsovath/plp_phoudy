import { Repository } from 'typeorm';
import { School } from '../../entities/school.entity';
import { SchoolPlace } from '../../entities/school-place.entity';
import { Province } from '../../entities/province.entity';
import { District } from '../../entities/district.entity';
import { Commune } from '../../entities/commune.entity';
import { Village } from '../../entities/village.entity';
import { CreateSchoolDto } from './dto/create-school.dto';
import { PaginationResult } from '../../common/pagination.interface';
export declare class SchoolsService {
    private schoolRepository;
    private schoolPlaceRepository;
    private provinceRepository;
    private districtRepository;
    private communeRepository;
    private villageRepository;
    constructor(schoolRepository: Repository<School>, schoolPlaceRepository: Repository<SchoolPlace>, provinceRepository: Repository<Province>, districtRepository: Repository<District>, communeRepository: Repository<Commune>, villageRepository: Repository<Village>);
    findAll(limit?: number, offset?: number): Promise<PaginationResult<any>>;
    findOne(id: number): Promise<any>;
    create(createSchoolDto: CreateSchoolDto): Promise<any>;
    update(id: number, updateSchoolDto: Partial<CreateSchoolDto>): Promise<any>;
    remove(id: number): Promise<void>;
    activate(id: number): Promise<School>;
    deactivate(id: number): Promise<School>;
    findByDistrict(districtId: number): Promise<any[]>;
    findByProvince(provinceId: number): Promise<any[]>;
    findByCommune(communeId: number): Promise<any[]>;
    findByVillage(villageId: number): Promise<any[]>;
    uploadProfile(id: number, file: Express.Multer.File): Promise<{
        profile: string;
    }>;
}
