import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Patch,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiConsumes,
} from '@nestjs/swagger';
import { SchoolsService } from './schools.service';
import { School } from '../../entities/school.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateSchoolDto } from './dto/create-school.dto';
import { PaginationResult } from '../../common/pagination.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

const multerOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = './uploads/school_profile';
      // Create directory if it doesn't exist
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      // Will be set in the service method after getting school code
      cb(null, `temp-${Date.now()}${extname(file.originalname)}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
};

@ApiTags('Schools')
@Controller('schools')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all schools with pagination' })
  @ApiResponse({ status: 200, description: 'Return paginated schools' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Number of items to skip',
  })
  @ApiBearerAuth()
  async findAll(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ): Promise<PaginationResult<School>> {
    return this.schoolsService.findAll(limit, offset);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a school by ID' })
  @ApiResponse({ status: 200, description: 'Return the school' })
  @ApiResponse({ status: 404, description: 'School not found' })
  @ApiBearerAuth()
  async findOne(@Param('id') id: number): Promise<School> {
    return this.schoolsService.findOne(id);
  }

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Create a new school' })
  @ApiResponse({ status: 201, description: 'School successfully created' })
  @ApiBearerAuth()
  async create(@Body() createSchoolDto: CreateSchoolDto): Promise<School> {
    return this.schoolsService.create(createSchoolDto);
  }

  @Put(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update a school' })
  @ApiResponse({ status: 200, description: 'School successfully updated' })
  @ApiResponse({ status: 404, description: 'School not found' })
  @ApiBearerAuth()
  async update(
    @Param('id') id: number,
    @Body() updateSchoolDto: Partial<CreateSchoolDto>,
  ): Promise<School> {
    return this.schoolsService.update(id, updateSchoolDto);
  }

  @Get('district/:districtId')
  @ApiOperation({ summary: 'Get schools by district' })
  @ApiResponse({ status: 200, description: 'Return schools in the district' })
  @ApiBearerAuth()
  async findByDistrict(
    @Param('districtId') districtId: number,
  ): Promise<School[]> {
    return this.schoolsService.findByDistrict(districtId);
  }

  @Get('province/:provinceId')
  @ApiOperation({ summary: 'Get schools by province' })
  @ApiResponse({ status: 200, description: 'Return schools in the province' })
  @ApiBearerAuth()
  async findByProvince(
    @Param('provinceId') provinceId: number,
  ): Promise<School[]> {
    return this.schoolsService.findByProvince(provinceId);
  }

  @Get('commune/:communeId')
  @ApiOperation({ summary: 'Get schools by commune' })
  @ApiResponse({ status: 200, description: 'Return schools in the commune' })
  @ApiBearerAuth()
  async findByCommune(
    @Param('communeId') communeId: number,
  ): Promise<School[]> {
    return this.schoolsService.findByCommune(communeId);
  }

  @Get('village/:villageId')
  @ApiOperation({ summary: 'Get schools by village' })
  @ApiResponse({ status: 200, description: 'Return schools in the village' })
  @ApiBearerAuth()
  async findByVillage(
    @Param('villageId') villageId: number,
  ): Promise<School[]> {
    return this.schoolsService.findByVillage(villageId);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Delete a school' })
  @ApiResponse({ status: 200, description: 'School successfully deleted' })
  @ApiResponse({ status: 404, description: 'School not found' })
  @ApiBearerAuth()
  async remove(@Param('id') id: number): Promise<void> {
    return this.schoolsService.remove(id);
  }

  @Patch(':id/activate')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Activate a school' })
  @ApiResponse({ status: 200, description: 'School successfully activated' })
  @ApiResponse({ status: 404, description: 'School not found' })
  @ApiBearerAuth()
  async activate(@Param('id') id: number): Promise<School> {
    return this.schoolsService.activate(id);
  }

  @Patch(':id/deactivate')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Deactivate a school' })
  @ApiResponse({ status: 200, description: 'School successfully deactivated' })
  @ApiResponse({ status: 404, description: 'School not found' })
  @ApiBearerAuth()
  async deactivate(@Param('id') id: number): Promise<School> {
    return this.schoolsService.deactivate(id);
  }

  @Post(':id/upload-profile')
  @Roles('ADMIN')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload school profile picture' })
  @ApiResponse({
    status: 200,
    description: 'Profile picture uploaded successfully',
  })
  @ApiResponse({ status: 404, description: 'School not found' })
  async uploadProfile(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ profile: string }> {
    return this.schoolsService.uploadProfile(id, file);
  }
}
