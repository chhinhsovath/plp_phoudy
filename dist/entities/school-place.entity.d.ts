import { School } from './school.entity';
import { Province } from './province.entity';
import { District } from './district.entity';
import { Commune } from './commune.entity';
import { Village } from './village.entity';
export declare class SchoolPlace {
    id: number;
    schoolId: number;
    school: School;
    provinceId: number;
    province: Province;
    districtId: number;
    district: District;
    communeId: number;
    commune: Commune;
    villageId: number;
    village: Village;
    createdAt: Date;
    updatedAt: Date;
}
