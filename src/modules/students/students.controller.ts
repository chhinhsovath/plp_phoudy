import {
  Controller,
  Get,
  Param,
  UseGuards,
  Logger,
  HttpException,
  HttpStatus,
  Request,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { StudentDto } from './dto/student.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { QuestionStatisticsDTO } from './dto/question-statistics.dto';

@ApiTags('Students')
@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class StudentsController {
  private readonly logger = new Logger(StudentsController.name);

  constructor(private readonly studentsService: StudentsService) {}

  @Get('my-students')
  @ApiOperation({
    summary:
      'Get all students for the authenticated teacher with performance data',
  })
  @ApiResponse({
    status: 200,
    description:
      'Return all students for the authenticated teacher with scores and statistics',
    type: [StudentDto],
  })
  @ApiResponse({
    status: 404,
    description: 'No students found for the teacher',
  })
  @Roles('TEACHER')
  async findMyStudents(@Request() req): Promise<StudentDto[]> {
    try {
      this.logger.log(
        `Handling GET /students/my-students request for user ${req.user.id}`,
      );
      return await this.studentsService.findByTeacherUserId(req.user.id);
    } catch (error) {
      this.logger.error(
        `Error in findMyStudents: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a student by ID with score data' })
  @ApiResponse({
    status: 200,
    description: 'Return the student with scores and statistics',
    type: StudentDto,
  })
  @ApiResponse({ status: 404, description: 'Student not found' })
  @Roles('ADMIN', 'TEACHER')
  async findOne(@Param('id') id: string): Promise<StudentDto> {
    try {
      this.logger.log(`Handling GET /students/${id} request`);
      const parsedId = parseInt(id, 10);

      if (isNaN(parsedId)) {
        throw new HttpException(
          `Invalid student ID: ${id}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.studentsService.findOne(parsedId);
    } catch (error) {
      this.logger.error(`Error in findOne: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Get('questions/statistics')
  @ApiOperation({ summary: 'Get statistics for all questions' })
  @ApiResponse({
    status: 200,
    description: 'Return statistics for all questions',
    type: [QuestionStatisticsDTO],
  })
  @ApiQuery({ name: 'grade', required: false, type: String })
  @ApiQuery({ name: 'subjectId', required: false, type: Number })
  @ApiQuery({ name: 'lessonTitle', required: false, type: String })
  @ApiQuery({ name: 'lessonNumber', required: false, type: Number })
  @Roles('TEACHER', 'ADMIN')
  async getQuestionsStatistics(
    @Query('grade') grade?: string,
    @Query('subjectId') subjectId?: number,
    @Query('lessonTitle') lessonTitle?: string,
    @Query('lessonNumber') lessonNumber?: number,
  ): Promise<QuestionStatisticsDTO[]> {
    try {
      this.logger.log(
        `Handling GET /students/questions/statistics request with grade: ${grade}, subjectId: ${subjectId}, lessonTitle: ${lessonTitle}, lessonNumber: ${lessonNumber}`,
      );
      return await this.studentsService.getQuestionsStatistics(
        grade,
        subjectId,
        lessonTitle,
        lessonNumber,
      );
    } catch (error) {
      this.logger.error(
        `Error in getQuestionsStatistics: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
