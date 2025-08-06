export declare class ProvinceDto {
    id: number;
    province_name_kh: string;
    province_name_en: string;
    province_code: string;
    created_at: Date;
    updated_at: Date;
}
export declare class DistrictDto {
    id: number;
    district_name_kh: string;
    district_name_en: string;
    district_code: string;
    province_id: number;
    created_at: Date;
    updated_at: Date;
}
export declare class CommuneDto {
    id: number;
    commune_name_kh: string;
    commune_name_en: string;
    commune_code: string;
    district_code: string;
    province_id: number;
    created_at: Date;
    updated_at: Date;
}
export declare class VillageDto {
    id: number;
    village_name_kh: string;
    village_name_en: string;
    village_code: string;
    commune_code: string;
    district_code: string;
    province_id: number;
    created_at: Date;
    updated_at: Date;
}
