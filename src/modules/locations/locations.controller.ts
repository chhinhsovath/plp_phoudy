import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { LocationsService } from './locations.service';
import { Province } from '../../entities/province.entity';
import { District } from '../../entities/district.entity';
import { Commune } from '../../entities/commune.entity';
import { Village } from '../../entities/village.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Locations')
@Controller('locations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get('provinces')
  @ApiOperation({ summary: 'Get all provinces' })
  @ApiResponse({ status: 200, description: 'Return all provinces' })
  async getProvinces(): Promise<Province[]> {
    return this.locationsService.getProvinces();
  }

  @Get('provinces/:id')
  @ApiOperation({ summary: 'Get province by ID' })
  @ApiResponse({ status: 200, description: 'Return province' })
  @ApiResponse({ status: 404, description: 'Province not found' })
  async getProvince(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.locationsService.getProvince(id);
  }

  @Get('districts')
  @ApiOperation({ summary: 'Get all districts or districts by province' })
  @ApiQuery({ name: 'province_id', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Return districts' })
  async getDistricts(
    @Query('province_id', new ParseIntPipe({ optional: true }))
    provinceId?: number,
  ): Promise<District[]> {
    return this.locationsService.getDistricts(provinceId);
  }

  @Get('districts/:id')
  @ApiOperation({ summary: 'Get district by ID' })
  @ApiResponse({ status: 200, description: 'Return district' })
  @ApiResponse({ status: 404, description: 'District not found' })
  async getDistrict(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.locationsService.getDistrict(id);
  }

  @Get('communes')
  @ApiOperation({
    summary: 'Get all communes or communes by district/province',
  })
  @ApiQuery({ name: 'district_code', required: false, type: String })
  @ApiQuery({ name: 'province_id', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Return communes' })
  async getCommunes(
    @Query('district_code') districtCode?: string,
    @Query('province_id', new ParseIntPipe({ optional: true }))
    provinceId?: number,
  ): Promise<Commune[]> {
    return this.locationsService.getCommunes(districtCode, provinceId);
  }

  @Get('communes/:id')
  @ApiOperation({ summary: 'Get commune by ID' })
  @ApiResponse({ status: 200, description: 'Return commune' })
  @ApiResponse({ status: 404, description: 'Commune not found' })
  async getCommune(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.locationsService.getCommune(id);
  }

  @Get('villages')
  @ApiOperation({
    summary: 'Get all villages or villages by commune/district/province',
  })
  @ApiQuery({ name: 'commune_code', required: false, type: String })
  @ApiQuery({ name: 'district_code', required: false, type: String })
  @ApiQuery({ name: 'province_id', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Return villages' })
  async getVillages(
    @Query('commune_code') communeCode?: string,
    @Query('district_code') districtCode?: string,
    @Query('province_id', new ParseIntPipe({ optional: true }))
    provinceId?: number,
  ): Promise<Village[]> {
    return this.locationsService.getVillages(
      communeCode,
      districtCode,
      provinceId,
    );
  }

  @Get('villages/:id')
  @ApiOperation({ summary: 'Get village by ID' })
  @ApiResponse({ status: 200, description: 'Return village' })
  @ApiResponse({ status: 404, description: 'Village not found' })
  async getVillage(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.locationsService.getVillage(id);
  }
}
