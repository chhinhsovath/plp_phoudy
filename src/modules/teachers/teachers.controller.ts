import {
  Controller,
  Get,
  Param,
  UseGuards,
  Logger,
  HttpException,
  HttpStatus,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TeachersService } from './teachers.service';
import { TeacherDto } from './dto/teacher.dto';
import { TeacherClassDto } from './dto/teacher-class.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Teachers')
@Controller('teachers')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class TeachersController {
  private readonly logger = new Logger(TeachersController.name);

  constructor(private readonly teachersService: TeachersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all teachers' })
  @ApiResponse({
    status: 200,
    description: 'Return all teachers',
    type: [TeacherDto],
  })
  @Roles('ADMIN')
  async findAll(): Promise<TeacherDto[]> {
    try {
      this.logger.log('Handling GET /teachers request');
      return await this.teachersService.findAll();
    } catch (error) {
      this.logger.error(`Error in findAll: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current teacher information' })
  @ApiResponse({
    status: 200,
    description: 'Return current teacher information',
    type: TeacherDto,
  })
  @ApiResponse({ status: 404, description: 'Teacher not found' })
  @Roles('TEACHER')
  async findMe(@Request() req): Promise<TeacherDto> {
    try {
      this.logger.log(
        `Handling GET /teachers/me request for user ${req.user.id}`,
      );
      return await this.teachersService.findByUserId(req.user.id);
    } catch (error) {
      this.logger.error(`Error in findMe: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a teacher by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the teacher',
    type: TeacherDto,
  })
  @ApiResponse({ status: 404, description: 'Teacher not found' })
  @Roles('ADMIN', 'TEACHER', 'STUDENT')
  async findOne(@Param('id') id: string): Promise<TeacherDto> {
    try {
      this.logger.log(`Handling GET /teachers/${id} request`);
      const parsedId = parseInt(id, 10);

      if (isNaN(parsedId)) {
        throw new HttpException(
          `Invalid teacher ID: ${id}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.teachersService.findOne(parsedId);
    } catch (error) {
      this.logger.error(`Error in findOne: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Get(':id/classes')
  @ApiOperation({ summary: 'Get all classes for a teacher' })
  @ApiResponse({
    status: 200,
    description: 'Return all classes for the teacher',
    type: [TeacherClassDto],
  })
  @ApiResponse({ status: 404, description: 'Teacher not found' })
  @Roles('ADMIN', 'TEACHER')
  async findClassesByTeacherId(
    @Param('id') id: string,
  ): Promise<TeacherClassDto[]> {
    try {
      this.logger.log(`Handling GET /teachers/${id}/classes request`);
      const parsedId = parseInt(id, 10);

      if (isNaN(parsedId)) {
        throw new HttpException(
          `Invalid teacher ID: ${id}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.teachersService.findClassesByTeacherId(parsedId);
    } catch (error) {
      this.logger.error(
        `Error in findClassesByTeacherId: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Get('me/classes')
  @ApiOperation({ summary: 'Get all classes for the current teacher' })
  @ApiResponse({
    status: 200,
    description: 'Return all classes for the current teacher',
    type: [TeacherClassDto],
  })
  @ApiResponse({ status: 404, description: 'Teacher not found' })
  @Roles('TEACHER')
  async findMyClasses(@Request() req): Promise<TeacherClassDto[]> {
    try {
      this.logger.log(
        `Handling GET /teachers/me/classes request for user ${req.user.id}`,
      );

      // First get the teacher info to get teacherId
      const teacher = await this.teachersService.findByUserId(req.user.id);

      return await this.teachersService.findClassesByTeacherId(
        teacher.teacherId,
      );
    } catch (error) {
      this.logger.error(
        `Error in findMyClasses: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
