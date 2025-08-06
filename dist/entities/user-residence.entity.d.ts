import { User } from './user.entity';
import { Province } from './province.entity';
import { District } from './district.entity';
import { Commune } from './commune.entity';
import { Village } from './village.entity';
export declare class UserResidence {
    id: number;
    userId: number;
    user: User;
    provinceId?: number;
    province?: Province;
    districtId?: number;
    district?: District;
    communeId?: number;
    commune?: Commune;
    villageId?: number;
    village?: Village;
    fullAddress?: string;
    createdAt: Date;
    updatedAt: Date;
}
