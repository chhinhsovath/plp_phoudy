import { SchoolsService } from './schools.service';
import { School } from '../../entities/school.entity';
import { CreateSchoolDto } from './dto/create-school.dto';
import { PaginationResult } from '../../common/pagination.interface';
export declare class SchoolsController {
    private readonly schoolsService;
    constructor(schoolsService: SchoolsService);
    findAll(limit?: number, offset?: number): Promise<PaginationResult<School>>;
    findOne(id: number): Promise<School>;
    create(createSchoolDto: CreateSchoolDto): Promise<School>;
    update(id: number, updateSchoolDto: Partial<CreateSchoolDto>): Promise<School>;
    findByDistrict(districtId: number): Promise<School[]>;
    findByProvince(provinceId: number): Promise<School[]>;
    findByCommune(communeId: number): Promise<School[]>;
    findByVillage(villageId: number): Promise<School[]>;
    remove(id: number): Promise<void>;
    activate(id: number): Promise<School>;
    deactivate(id: number): Promise<School>;
    uploadProfile(id: number, file: Express.Multer.File): Promise<{
        profile: string;
    }>;
}
