import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
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
import { SubjectGradesService } from './subject-grades.service';
import { CreateSubjectGradeDto } from './dto/create-subject-grade.dto';
import { UpdateSubjectGradeDto } from './dto/update-subject-grade.dto';
import { SubjectGrade } from '../../entities/subject-grade.entity';
import { Subject } from '../../entities/subject.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../../decorators/public.decorator';

@ApiTags('Subject Grades')
@Controller('subject-grades')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class SubjectGradesController {
  private readonly logger = new Logger(SubjectGradesController.name);

  constructor(private readonly subjectGradesService: SubjectGradesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all subject grades' })
  @ApiResponse({ status: 200, description: 'Return all subject grades' })
  async findAll(): Promise<SubjectGrade[]> {
    this.logger.log('Handling GET /subject-grades request');
    return this.subjectGradesService.findAll();
  }

  @Public()
  @Get('all-subjects-by-grades')
  @ApiOperation({ summary: 'Get all subjects grouped by grade levels' })
  @ApiResponse({
    status: 200,
    description: 'Return all active subjects grouped by grade levels',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          grade_level: { type: 'number' },
          subjects: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                khmer_name: { type: 'string' },
                status: { type: 'string' },
                is_student: { type: 'boolean' },
                path: { type: 'string' },
                subject_type: { type: 'string' },
              },
            },
          },
        },
      },
    },
  })
  async findAllSubjectsByGrades(): Promise<any[]> {
    this.logger.log(
      'Handling GET /subject-grades/all-subjects-by-grades request',
    );
    return this.subjectGradesService.findAllSubjectsByGrades();
  }

  @Get('grade/:gradeLevel')
  @ApiOperation({ summary: 'Get subject grades by grade level' })
  @ApiResponse({
    status: 200,
    description: 'Return subject grades for the specified grade level',
  })
  async findByGradeLevel(
    @Param('gradeLevel') gradeLevel: string,
  ): Promise<SubjectGrade[]> {
    this.logger.log(`Handling GET /subject-grades/grade/${gradeLevel} request`);
    const parsedGradeLevel = parseInt(gradeLevel, 10);

    if (isNaN(parsedGradeLevel)) {
      throw new HttpException(
        `Invalid grade level: ${gradeLevel}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.subjectGradesService.findByGradeLevel(parsedGradeLevel);
  }

  @Get('subject/:subjectId')
  @ApiOperation({ summary: 'Get subject grades by subject ID' })
  @ApiResponse({
    status: 200,
    description: 'Return subject grades for the specified subject',
  })
  async findBySubjectId(
    @Param('subjectId') subjectId: string,
  ): Promise<SubjectGrade[]> {
    this.logger.log(
      `Handling GET /subject-grades/subject/${subjectId} request`,
    );
    const parsedSubjectId = parseInt(subjectId, 10);

    if (isNaN(parsedSubjectId)) {
      throw new HttpException(
        `Invalid subject ID: ${subjectId}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.subjectGradesService.findBySubjectId(parsedSubjectId);
  }

  @Get('subjects/grade/:gradeLevel')
  @ApiOperation({ summary: 'Get subjects by grade level' })
  @ApiResponse({
    status: 200,
    description: 'Return subjects for the specified grade level',
  })
  async findSubjectsByGradeLevel(
    @Param('gradeLevel') gradeLevel: string,
  ): Promise<Subject[]> {
    this.logger.log(
      `Handling GET /subject-grades/subjects/grade/${gradeLevel} request`,
    );
    const parsedGradeLevel = parseInt(gradeLevel, 10);

    if (isNaN(parsedGradeLevel)) {
      throw new HttpException(
        `Invalid grade level: ${gradeLevel}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.subjectGradesService.findSubjectsByGradeLevel(parsedGradeLevel);
  }

  @Get('grades/subject/:subjectId')
  @ApiOperation({ summary: 'Get grade levels by subject ID' })
  @ApiResponse({
    status: 200,
    description: 'Return grade levels for the specified subject',
  })
  async findGradesBySubjectId(
    @Param('subjectId') subjectId: string,
  ): Promise<number[]> {
    this.logger.log(
      `Handling GET /subject-grades/grades/subject/${subjectId} request`,
    );
    const parsedSubjectId = parseInt(subjectId, 10);

    if (isNaN(parsedSubjectId)) {
      throw new HttpException(
        `Invalid subject ID: ${subjectId}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.subjectGradesService.findGradesBySubjectId(parsedSubjectId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a subject grade by ID' })
  @ApiResponse({ status: 200, description: 'Return the subject grade' })
  @ApiResponse({ status: 404, description: 'Subject grade not found' })
  async findOne(@Param('id') id: string): Promise<SubjectGrade> {
    this.logger.log(`Handling GET /subject-grades/${id} request`);
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      throw new HttpException(
        `Invalid subject grade ID: ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.subjectGradesService.findOne(parsedId);
  }

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Create a new subject grade' })
  @ApiResponse({
    status: 201,
    description: 'Subject grade successfully created',
  })
  async create(
    @Body() createSubjectGradeDto: CreateSubjectGradeDto,
  ): Promise<SubjectGrade> {
    this.logger.log('Handling POST /subject-grades request');
    return this.subjectGradesService.create(createSubjectGradeDto);
  }

  @Put(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update a subject grade' })
  @ApiResponse({
    status: 200,
    description: 'Subject grade successfully updated',
  })
  @ApiResponse({ status: 404, description: 'Subject grade not found' })
  async update(
    @Param('id') id: string,
    @Body() updateSubjectGradeDto: UpdateSubjectGradeDto,
  ): Promise<SubjectGrade> {
    this.logger.log(`Handling PUT /subject-grades/${id} request`);
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      throw new HttpException(
        `Invalid subject grade ID: ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.subjectGradesService.update(parsedId, updateSubjectGradeDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Delete a subject grade' })
  @ApiResponse({
    status: 200,
    description: 'Subject grade successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Subject grade not found' })
  async remove(@Param('id') id: string): Promise<void> {
    this.logger.log(`Handling DELETE /subject-grades/${id} request`);
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      throw new HttpException(
        `Invalid subject grade ID: ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.subjectGradesService.remove(parsedId);
  }
}
