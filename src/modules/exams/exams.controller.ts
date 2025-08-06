import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
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
import { ExamsService } from './exams.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { ExamDto } from './dto/exam.dto';
import { Exam } from '../../entities/exam.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GradeLevelType } from '../../entities/class.entity';

@ApiTags('Exams')
@Controller('exams')
export class ExamsController {
  private readonly logger = new Logger(ExamsController.name);

  constructor(private readonly examsService: ExamsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all exams' })
  @ApiResponse({
    status: 200,
    description: 'Return all exams',
    type: [ExamDto],
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  async findAll(
    @Query('includeQuestions') includeQuestions?: string,
  ): Promise<any[]> {
    this.logger.log('Handling GET /exams request');
    const shouldIncludeQuestions = includeQuestions === 'true';
    return this.examsService.findAll(shouldIncludeQuestions);
  }

  @Get('subject/:subjectId')
  @ApiOperation({ summary: 'Get exams by subject' })
  @ApiResponse({
    status: 200,
    description: 'Return exams for the specified subject',
    type: [ExamDto],
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  async findBySubject(
    @Param('subjectId') subjectId: string,
    @Query('includeQuestions') includeQuestions?: string,
  ): Promise<any[]> {
    this.logger.log(`Handling GET /exams/subject/${subjectId} request`);
    const parsedSubjectId = parseInt(subjectId, 10);

    if (isNaN(parsedSubjectId)) {
      throw new HttpException(
        `Invalid subject ID: ${subjectId}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const shouldIncludeQuestions = includeQuestions === 'true';
    const exams = await this.examsService.findBySubject(
      parsedSubjectId,
      shouldIncludeQuestions,
    );
    this.logger.log(
      `Successfully retrieved ${exams.length} exams for subject ID ${parsedSubjectId}`,
    );
    return exams;
  }

  @Get('grade/:gradeLevel')
  @ApiOperation({ summary: 'Get exams by grade level' })
  @ApiResponse({
    status: 200,
    description: 'Return exams for the specified grade level',
    type: [ExamDto],
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  async findByGradeLevel(
    @Param('gradeLevel') gradeLevel: string,
    @Query('includeQuestions') includeQuestions?: string,
  ): Promise<any[]> {
    this.logger.log(`Handling GET /exams/grade/${gradeLevel} request`);

    if (!Object.values(GradeLevelType).includes(gradeLevel as GradeLevelType)) {
      throw new HttpException(
        `Invalid grade level: ${gradeLevel}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const shouldIncludeQuestions = includeQuestions === 'true';
    const exams = await this.examsService.findByGradeLevel(
      gradeLevel as GradeLevelType,
      shouldIncludeQuestions,
    );
    this.logger.log(
      `Successfully retrieved ${exams.length} exams for grade level ${gradeLevel}`,
    );
    return exams;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an exam by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the exam',
    type: ExamDto,
  })
  @ApiResponse({ status: 404, description: 'Exam not found' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: string): Promise<any> {
    this.logger.log(`Handling GET /exams/${id} request`);
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      throw new HttpException(`Invalid exam ID: ${id}`, HttpStatus.BAD_REQUEST);
    }

    return await this.examsService.findOne(parsedId);
  }

  @Post()
  @Roles('ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Create a new exam' })
  @ApiResponse({
    status: 201,
    description: 'Exam successfully created',
    type: ExamDto,
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  async create(@Body() createExamDto: CreateExamDto): Promise<any> {
    this.logger.log('Handling POST /exams request');
    const exam = await this.examsService.create(createExamDto);
    this.logger.log(`Successfully created exam with ID ${exam.id}`);
    return exam;
  }

  @Put(':id')
  @Roles('ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Update an exam' })
  @ApiResponse({
    status: 200,
    description: 'Exam successfully updated',
    type: ExamDto,
  })
  @ApiResponse({ status: 404, description: 'Exam not found' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateExamDto: UpdateExamDto,
  ): Promise<any> {
    this.logger.log(`Handling PUT /exams/${id} request`);
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      throw new HttpException(`Invalid exam ID: ${id}`, HttpStatus.BAD_REQUEST);
    }

    const exam = await this.examsService.update(parsedId, updateExamDto);
    this.logger.log(`Successfully updated exam with ID ${parsedId}`);
    return exam;
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Delete an exam' })
  @ApiResponse({ status: 200, description: 'Exam successfully deleted' })
  @ApiResponse({ status: 404, description: 'Exam not found' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string): Promise<void> {
    this.logger.log(`Handling DELETE /exams/${id} request`);
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      throw new HttpException(`Invalid exam ID: ${id}`, HttpStatus.BAD_REQUEST);
    }

    await this.examsService.remove(parsedId);
    this.logger.log(`Successfully deleted exam with ID ${parsedId}`);
  }
}
