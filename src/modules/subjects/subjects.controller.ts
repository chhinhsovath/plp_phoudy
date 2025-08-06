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
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from '../../entities/subject.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { SubjectContentDto } from './dto/subject-content.dto';
import { Public } from '../../decorators/public.decorator';

@ApiTags('Subjects')
@Controller('subjects')
export class SubjectsController {
  private readonly logger = new Logger(SubjectsController.name);

  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all subjects' })
  @ApiResponse({ status: 200, description: 'Return all subjects' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  async findAll(): Promise<Subject[]> {
    return this.subjectsService.findAll();
  }

  @Public()
  @Get('active')
  @ApiOperation({ summary: 'Get all active subjects' })
  @ApiResponse({ status: 200, description: 'Return all active subjects' })
  async findActive(): Promise<Subject[]> {
    this.logger.log('Handling GET /subjects/active request');
    return await this.subjectsService.findActive();
  }

  @Public()
  @Get('student')
  @ApiOperation({ summary: 'Get all student subjects' })
  @ApiResponse({ status: 200, description: 'Return all student subjects' })
  async findStudentSubjects(): Promise<Subject[]> {
    this.logger.log('Handling GET /subjects/student request');
    return await this.subjectsService.findStudentSubjects();
  }

  @Public()
  @Get('special')
  @ApiOperation({ summary: 'Get special subjects' })
  @ApiResponse({ status: 200, description: 'Return special subjects' })
  async findSpecialSubjects(): Promise<Subject[]> {
    this.logger.log('Handling GET /subjects/special request');
    return await this.subjectsService.findSpecialSubjects();
  }

  @Public()
  @Get('normal')
  @ApiOperation({ summary: 'Get normal subjects' })
  @ApiResponse({ status: 200, description: 'Return normal subjects' })
  async findNormalSubjects(): Promise<Subject[]> {
    this.logger.log('Handling GET /subjects/normal request');
    const subjects = await this.subjectsService.findNormalSubjects();
    this.logger.log(
      `Successfully retrieved ${subjects.length} normal subjects`,
    );
    return subjects;
  }

  @Public()
  @Get('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ status: 200, description: 'API is healthy' })
  healthCheck(): Promise<{ status: string; message: string }> {
    this.logger.log('Health check endpoint called');
    return Promise.resolve({
      status: 'ok',
      message: 'Subjects API is healthy',
    });
  }

  @Public()
  @Get('grades')
  @ApiOperation({ summary: 'Get all grades with their subjects' })
  @ApiResponse({
    status: 200,
    description: 'Return all grades with their subjects',
  })
  async getGrades(): Promise<any[]> {
    this.logger.log('Getting all grades with their subjects');
    return this.subjectsService.findAllGradesWithSubjects();
  }

  @Public()
  @Get('grade/:gradeLevel')
  @ApiOperation({ summary: 'Get subjects by grade level' })
  @ApiResponse({
    status: 200,
    description: 'Return subjects for the specified grade level',
  })
  async findByGradeLevel(
    @Param('gradeLevel') gradeLevel: number,
  ): Promise<Subject[]> {
    this.logger.log(`Handling GET /subjects/grade/${gradeLevel} request`);
    const subjects = await this.subjectsService.findByGradeLevel(gradeLevel);
    this.logger.log(
      `Successfully retrieved ${subjects.length} subjects for grade level ${gradeLevel}`,
    );
    return subjects;
  }

  @Public()
  @Get('grade/:gradeLevel/active')
  @ApiOperation({ summary: 'Get active subjects by grade level' })
  @ApiResponse({
    status: 200,
    description: 'Return active subjects for the specified grade level',
  })
  async findActiveByGradeLevel(
    @Param('gradeLevel') gradeLevel: number,
  ): Promise<Subject[]> {
    this.logger.log(
      `Handling GET /subjects/grade/${gradeLevel}/active request`,
    );
    const subjects =
      await this.subjectsService.findActiveByGradeLevel(gradeLevel);
    this.logger.log(
      `Successfully retrieved ${subjects.length} active subjects for grade level ${gradeLevel}`,
    );
    return subjects;
  }

  @Public()
  @Get('path/:path')
  @ApiOperation({ summary: 'Get a subject by path' })
  @ApiResponse({ status: 200, description: 'Return the subject' })
  @ApiResponse({ status: 404, description: 'Subject not found' })
  async findByPath(@Param('path') path: string): Promise<Subject> {
    this.logger.log(`Handling GET /subjects/path/${path} request`);
    return await this.subjectsService.findByPath(path);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a subject by ID' })
  @ApiResponse({ status: 200, description: 'Return the subject' })
  @ApiResponse({ status: 404, description: 'Subject not found' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: number): Promise<Subject> {
    this.logger.log(`Handling GET /subjects/${id} request`);
    const parsedId = parseInt(id.toString(), 10);

    if (isNaN(parsedId)) {
      throw new HttpException(
        `Invalid subject ID: ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.subjectsService.findOne(parsedId);
  }

  @Get(':id/content')
  @ApiOperation({ summary: 'Get content for a subject' })
  @ApiResponse({ status: 200, description: 'Return the subject content' })
  @ApiResponse({ status: 404, description: 'Subject not found' })
  findSubjectContent(@Param('id') id: number): Promise<SubjectContentDto[]> {
    return Promise.resolve(this.subjectsService.findSubjectContent());
  }

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Create a new subject' })
  @ApiResponse({ status: 201, description: 'Subject successfully created' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  async create(@Body() createSubjectDto: CreateSubjectDto): Promise<Subject> {
    return this.subjectsService.create(createSubjectDto);
  }

  @Put(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update a subject' })
  @ApiResponse({ status: 200, description: 'Subject successfully updated' })
  @ApiResponse({ status: 404, description: 'Subject not found' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: number,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ): Promise<Subject> {
    return this.subjectsService.update(id, updateSubjectDto);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update a subject (PATCH method)' })
  @ApiResponse({ status: 200, description: 'Subject successfully updated' })
  @ApiResponse({ status: 404, description: 'Subject not found' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  async updatePatch(
    @Param('id') id: number,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ): Promise<Subject> {
    return this.subjectsService.update(id, updateSubjectDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Delete a subject' })
  @ApiResponse({ status: 200, description: 'Subject successfully deleted' })
  @ApiResponse({ status: 404, description: 'Subject not found' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: number): Promise<void> {
    return this.subjectsService.remove(id);
  }

  @Patch(':id/activate')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Activate a subject' })
  @ApiResponse({ status: 200, description: 'Subject successfully activated' })
  @ApiResponse({ status: 404, description: 'Subject not found' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  async activate(@Param('id') id: number): Promise<Subject> {
    return this.subjectsService.activate(id);
  }

  @Patch(':id/deactivate')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Deactivate a subject' })
  @ApiResponse({ status: 200, description: 'Subject successfully deactivated' })
  @ApiResponse({ status: 404, description: 'Subject not found' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  async deactivate(@Param('id') id: number): Promise<Subject> {
    return this.subjectsService.deactivate(id);
  }

  @Public()
  @Get(':id/grades')
  @ApiOperation({ summary: 'Get all grades for a specific subject' })
  @ApiResponse({
    status: 200,
    description: 'Return all grades for the specified subject',
  })
  @ApiResponse({ status: 404, description: 'Subject not found' })
  async findGradesBySubjectId(@Param('id') id: string): Promise<any[]> {
    this.logger.log(`Handling GET /subjects/${id}/grades request`);
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      throw new HttpException(
        `Invalid subject ID: ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const grades = await this.subjectsService.findGradesBySubjectId(parsedId);
    this.logger.log(
      `Successfully retrieved ${grades.length} grades for subject ID ${parsedId}`,
    );
    return grades;
  }

  @Public()
  @Get('active/specific')
  @ApiOperation({
    summary: 'Get active subjects for dropdown (name, khmer_name, path only)',
  })
  @ApiResponse({
    status: 200,
    description: 'Return active subjects with minimal fields',
  })
  async findActiveForDropdown() {
    this.logger.log('Handling GET /subjects/active/dropdown request');
    return await this.subjectsService.findActiveForDropdown();
  }
}
