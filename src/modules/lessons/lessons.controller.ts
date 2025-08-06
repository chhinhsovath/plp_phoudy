import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
  Query,
  Patch,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from '../../entities/lesson.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { LessonActivityDto } from './dto/lesson-activity.dto';
import { LessonResponseDto } from './dto/lesson-response.dto';
import { LessonActivitiesService } from '../lesson-activities/lesson-activities.service';
import { UpdateLessonActivityDto } from '../lesson-activities/dto/update-lesson-activity.dto';
import { LessonActivity } from '../../entities/lesson-activity.entity';

@ApiTags('Lessons')
@Controller('lessons')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LessonsController {
  constructor(
    private readonly lessonsService: LessonsService,
    private readonly lessonActivitiesService: LessonActivitiesService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all lessons' })
  @ApiResponse({ status: 200, description: 'Return all lessons' })
  @ApiBearerAuth()
  async findAll(): Promise<Lesson[]> {
    return this.lessonsService.findAll();
  }

  @Get('simplified')
  @ApiOperation({
    summary: 'Get lessons in simplified format with optional filtering',
  })
  @ApiResponse({
    status: 200,
    description: 'Return lessons in simplified format',
  })
  @ApiQuery({
    name: 'subjectId',
    required: false,
    type: 'number',
    description: 'Filter by subject ID',
  })
  @ApiQuery({
    name: 'gradeLevel',
    required: false,
    type: 'number',
    description: 'Filter by grade level',
  })
  @ApiBearerAuth()
  async findAllSimplified(
    @Query('subjectId') subjectId?: number,
    @Query('gradeLevel') gradeLevel?: number,
  ): Promise<any[]> {
    return this.lessonsService.findAllSimplified(subjectId, gradeLevel);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a lesson by ID' })
  @ApiResponse({ status: 200, description: 'Return the lesson' })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  @ApiBearerAuth()
  async findOne(@Param('id') id: number): Promise<Lesson> {
    return this.lessonsService.findOne(id);
  }

  @Get('subject/:subjectId/grade/:gradeLevel')
  @ApiOperation({ summary: 'Get active lessons by subject and grade' })
  @ApiResponse({ status: 200, description: 'Return lessons' })
  @ApiBearerAuth()
  async getLessonsBySubjectAndGrade(
    @Param('subjectId') subjectId: number,
    @Param('gradeLevel') gradeLevel: number,
  ): Promise<Lesson[]> {
    return this.lessonsService.findActiveBySubjectAndGrade(
      subjectId,
      gradeLevel,
    );
  }

  @Get('subject/:subjectId/grade/:gradeLevel/all')
  @ApiOperation({ summary: 'Get all lessons by subject and grade' })
  @ApiResponse({ status: 200, description: 'Return lessons' })
  @ApiBearerAuth()
  async getAllLessonsBySubjectAndGrade(
    @Param('subjectId') subjectId: number,
    @Param('gradeLevel') gradeLevel: number,
  ): Promise<Lesson[]> {
    return this.lessonsService.findBySubjectAndGrade(subjectId, gradeLevel);
  }

  @Get('subject/:subjectId/grade/:gradeLevel/ordered')
  @ApiOperation({
    summary: 'Get active lessons by subject and grade ordered by lesson number',
  })
  @ApiResponse({ status: 200, description: 'Return lessons' })
  @ApiBearerAuth()
  async getLessonsBySubjectAndGradeOrdered(
    @Param('subjectId') subjectId: number,
    @Param('gradeLevel') gradeLevel: number,
  ): Promise<Lesson[]> {
    return this.lessonsService.findActiveBySubjectAndGradeOrderByLessonNumber(
      subjectId,
      gradeLevel,
    );
  }

  @Get('subject/:subjectId/grade/:gradeLevel/all/ordered')
  @ApiOperation({
    summary: 'Get all lessons by subject and grade ordered by lesson number',
  })
  @ApiResponse({ status: 200, description: 'Return lessons' })
  @ApiBearerAuth()
  async getAllLessonsBySubjectAndGradeOrdered(
    @Param('subjectId') subjectId: number,
    @Param('gradeLevel') gradeLevel: number,
  ): Promise<Lesson[]> {
    return this.lessonsService.findBySubjectAndGradeOrderByLessonNumber(
      subjectId,
      gradeLevel,
    );
  }

  @Post()
  @Roles('ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Create a new lesson' })
  @ApiResponse({ status: 201, description: 'Lesson successfully created' })
  @ApiBearerAuth()
  async create(
    @Body() createLessonDto: CreateLessonDto,
    @Request() req,
  ): Promise<Lesson> {
    return this.lessonsService.create(createLessonDto, req.user.id);
  }

  @Put(':id')
  @Roles('ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Update a lesson' })
  @ApiResponse({ status: 200, description: 'Lesson successfully updated' })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  @ApiBearerAuth()
  async update(
    @Param('id') id: number,
    @Body() updateLessonDto: UpdateLessonDto,
  ): Promise<Lesson> {
    return this.lessonsService.update(id, updateLessonDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Delete a lesson' })
  @ApiResponse({ status: 200, description: 'Lesson successfully deleted' })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  @ApiBearerAuth()
  async remove(@Param('id') id: number): Promise<void> {
    return this.lessonsService.remove(id);
  }

  @Get('activities/subject/:subjectId/grade/:gradeLevel')
  @ApiOperation({ summary: 'Get lesson activities by subject and grade' })
  @ApiResponse({ status: 200, description: 'Return lesson activities' })
  @ApiBearerAuth()
  async getLessonActivitiesBySubjectAndGrade(
    @Param('subjectId') subjectId: number,
    @Param('gradeLevel') gradeLevel: number,
  ): Promise<LessonActivityDto[]> {
    return this.lessonsService.findLessonActivitiesBySubjectAndGrade(
      subjectId,
      gradeLevel,
    );
  }

  @Get('activities/subject/:subjectId/grade/:gradeLevel/ordered')
  @ApiOperation({
    summary: 'Get lesson activities by subject and grade ordered',
  })
  @ApiResponse({ status: 200, description: 'Return lesson activities' })
  @ApiBearerAuth()
  async getLessonActivitiesBySubjectAndGradeOrdered(
    @Param('subjectId') subjectId: number,
    @Param('gradeLevel') gradeLevel: number,
  ): Promise<LessonActivityDto[]> {
    return this.lessonsService.findLessonActivitiesBySubjectAndGradeOrdered(
      subjectId,
      gradeLevel,
    );
  }

  @Get('activities/lesson/:lessonId')
  @ApiOperation({ summary: 'Get lesson activities by lesson ID' })
  @ApiResponse({ status: 200, description: 'Return lesson activities' })
  @ApiBearerAuth()
  async getLessonActivitiesByLessonId(
    @Param('lessonId') lessonId: number,
  ): Promise<LessonActivityDto[]> {
    return this.lessonsService.findLessonActivitiesByLessonId(lessonId);
  }

  @Patch('activities/:id')
  @ApiOperation({ summary: 'Update a lesson activity' })
  @ApiResponse({
    status: 200,
    description: 'The lesson activity has been successfully updated',
    type: LessonActivity,
  })
  @ApiBearerAuth()
  async updateActivity(
    @Param('id') id: number,
    @Body() updateLessonActivityDto: UpdateLessonActivityDto,
  ): Promise<LessonActivity> {
    return this.lessonActivitiesService.update(id, updateLessonActivityDto);
  }

  @Get('subject/:subjectId/grade/:gradeLevel/simplified')
  @ApiOperation({
    summary: 'Get simplified active lessons by subject and grade',
  })
  @ApiResponse({ status: 200, description: 'Return simplified lessons' })
  @ApiBearerAuth()
  async getSimplifiedLessonsBySubjectAndGrade(
    @Param('subjectId') subjectId: number,
    @Param('gradeLevel') gradeLevel: number,
  ): Promise<any[]> {
    return this.lessonsService.findSimplifiedBySubjectAndGrade(
      subjectId,
      gradeLevel,
    );
  }

  @Get('subject/:name')
  @ApiOperation({ summary: 'Get all lessons for a subject by name' })
  @ApiResponse({
    status: 200,
    description: 'Returns all lessons for the specified subject',
    type: [LessonResponseDto],
  })
  @ApiParam({
    name: 'name',
    description: 'Subject name (e.g., MATHEMATICS)',
    example: 'MATHEMATICS',
  })
  async getLessonsBySubject(
    @Param('name') subjectName: string,
  ): Promise<LessonResponseDto[]> {
    return this.lessonsService.findBySubjectName(subjectName);
  }

  @Get('subject/:name/active')
  @ApiOperation({ summary: 'Get active lessons for a subject by name' })
  @ApiResponse({
    status: 200,
    description: 'Returns active lessons for the specified subject',
    type: [LessonResponseDto],
  })
  @ApiParam({
    name: 'name',
    description: 'Subject name (e.g., MATHEMATICS)',
    example: 'MATHEMATICS',
  })
  async getActiveLessonsBySubject(
    @Param('name') subjectName: string,
  ): Promise<LessonResponseDto[]> {
    return this.lessonsService.findActiveBySubjectName(subjectName);
  }
}
