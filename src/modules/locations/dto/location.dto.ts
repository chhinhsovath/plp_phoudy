import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class ProvinceDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  province_name_kh: string;

  @ApiProperty()
  @IsString()
  province_name_en: string;

  @ApiProperty()
  @IsString()
  province_code: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}

export class DistrictDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  district_name_kh: string;

  @ApiProperty()
  @IsString()
  district_name_en: string;

  @ApiProperty()
  @IsString()
  district_code: string;

  @ApiProperty()
  @IsNumber()
  province_id: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}

export class CommuneDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  commune_name_kh: string;

  @ApiProperty()
  @IsString()
  commune_name_en: string;

  @ApiProperty()
  @IsString()
  commune_code: string;

  @ApiProperty()
  @IsString()
  district_code: string;

  @ApiProperty()
  @IsNumber()
  province_id: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}

export class VillageDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  village_name_kh: string;

  @ApiProperty()
  @IsString()
  village_name_en: string;

  @ApiProperty()
  @IsString()
  village_code: string;

  @ApiProperty()
  @IsString()
  commune_code: string;

  @ApiProperty()
  @IsString()
  district_code: string;

  @ApiProperty()
  @IsNumber()
  province_id: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
