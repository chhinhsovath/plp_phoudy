import { LocationsService } from './locations.service';
import { Province } from '../../entities/province.entity';
import { District } from '../../entities/district.entity';
import { Commune } from '../../entities/commune.entity';
import { Village } from '../../entities/village.entity';
export declare class LocationsController {
    private readonly locationsService;
    constructor(locationsService: LocationsService);
    getProvinces(): Promise<Province[]>;
    getProvince(id: number): Promise<any>;
    getDistricts(provinceId?: number): Promise<District[]>;
    getDistrict(id: number): Promise<any>;
    getCommunes(districtCode?: string, provinceId?: number): Promise<Commune[]>;
    getCommune(id: number): Promise<any>;
    getVillages(communeCode?: string, districtCode?: string, provinceId?: number): Promise<Village[]>;
    getVillage(id: number): Promise<any>;
}
