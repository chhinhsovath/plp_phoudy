import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GradeLevelType } from '../../entities/class.entity';
import { ClassStudentDto } from './dto/class-student.dto';

@ApiTags('Classes')
@Controller('classes')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ClassesController {
  private readonly logger = new Logger(ClassesController.name);

  constructor(private readonly classesService: ClassesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new class' })
  @ApiResponse({
    status: 201,
    description: 'The class has been successfully created.',
  })
  @Roles('ADMIN')
  async create(@Body() createClassDto: CreateClassDto) {
    try {
      this.logger.log('Creating new class');
      return await this.classesService.create(createClassDto);
    } catch (error) {
      this.logger.error(`Error creating class: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all classes' })
  @ApiResponse({ status: 200, description: 'Return all classes.' })
  @Roles('ADMIN', 'TEACHER')
  async findAll() {
    try {
      this.logger.log('Getting all classes');
      return await this.classesService.findAll();
    } catch (error) {
      this.logger.error(`Error getting classes: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Get('grade/:gradeLevel')
  @ApiOperation({ summary: 'Get classes by grade level' })
  @ApiResponse({
    status: 200,
    description: 'Return classes for the specified grade.',
  })
  @Roles('ADMIN', 'TEACHER')
  async findByGradeLevel(@Param('gradeLevel') gradeLevel: string) {
    try {
      this.logger.log(`Getting classes for grade level ${gradeLevel}`);
      const parsedGradeLevel = parseInt(gradeLevel, 10);

      if (isNaN(parsedGradeLevel)) {
        throw new HttpException(
          `Invalid grade level: ${gradeLevel}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      // Convert numeric grade level to GradeLevelType enum
      const gradeLevelEnum = this.getGradeLevelEnum(parsedGradeLevel);
      if (!gradeLevelEnum) {
        throw new HttpException(
          `Invalid grade level: ${parsedGradeLevel}. Must be between 1 and 6.`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.classesService.findByGradeLevel(gradeLevelEnum);
    } catch (error) {
      this.logger.error(
        `Error getting classes by grade: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Get(':id/students')
  @ApiOperation({ summary: 'Get all students of a class by class ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns all students in the specified class',
    type: [ClassStudentDto],
  })
  @ApiResponse({ status: 404, description: 'Class not found' })
  @Roles('ADMIN', 'TEACHER')
  async findStudentsByClassId(
    @Param('id') id: string,
  ): Promise<ClassStudentDto[]> {
    try {
      this.logger.log(`Getting students for class ID ${id}`);
      const parsedId = parseInt(id, 10);

      if (isNaN(parsedId)) {
        throw new HttpException(
          `Invalid class ID: ${id}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.classesService.findStudentsByClassId(parsedId);
    } catch (error) {
      this.logger.error(
        `Error getting students for class: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Get(':id/students-info')
  @ApiOperation({
    summary: 'Get detailed information of all students in a class',
  })
  @ApiResponse({
    status: 200,
    description:
      'Returns detailed information of all students in the specified class',
  })
  @ApiResponse({ status: 404, description: 'Class not found' })
  @Roles('ADMIN', 'TEACHER')
  async findStudentsInfoByClassId(@Param('id') id: string) {
    try {
      this.logger.log(`Getting detailed student info for class ID ${id}`);
      const parsedId = parseInt(id, 10);

      if (isNaN(parsedId)) {
        throw new HttpException(
          `Invalid class ID: ${id}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.classesService.findStudentsInfoByClassId(parsedId);
    } catch (error) {
      this.logger.error(
        `Error getting detailed student info for class: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  private getGradeLevelEnum(grade: number): GradeLevelType | null {
    switch (grade) {
      case 1:
        return GradeLevelType.GRADE_1;
      case 2:
        return GradeLevelType.GRADE_2;
      case 3:
        return GradeLevelType.GRADE_3;
      case 4:
        return GradeLevelType.GRADE_4;
      case 5:
        return GradeLevelType.GRADE_5;
      case 6:
        return GradeLevelType.GRADE_6;
      default:
        return null;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a class by id' })
  @ApiResponse({ status: 200, description: 'Return the class.' })
  @ApiResponse({ status: 404, description: 'Class not found.' })
  @Roles('ADMIN', 'TEACHER')
  async findOne(@Param('id') id: string) {
    try {
      this.logger.log(`Getting class with id ${id}`);
      const parsedId = parseInt(id, 10);

      if (isNaN(parsedId)) {
        throw new HttpException(
          `Invalid class ID: ${id}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.classesService.findOne(parsedId);
    } catch (error) {
      this.logger.error(`Error getting class: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a class' })
  @ApiResponse({
    status: 200,
    description: 'The class has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Class not found.' })
  @Roles('ADMIN')
  async update(
    @Param('id') id: string,
    @Body() updateClassDto: UpdateClassDto,
  ) {
    try {
      this.logger.log(`Updating class with id ${id}`);
      const parsedId = parseInt(id, 10);

      if (isNaN(parsedId)) {
        throw new HttpException(
          `Invalid class ID: ${id}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.classesService.update(parsedId, updateClassDto);
    } catch (error) {
      this.logger.error(`Error updating class: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a class' })
  @ApiResponse({
    status: 200,
    description: 'The class has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Class not found.' })
  @Roles('ADMIN')
  async remove(@Param('id') id: string) {
    try {
      this.logger.log(`Deleting class with id ${id}`);
      const parsedId = parseInt(id, 10);

      if (isNaN(parsedId)) {
        throw new HttpException(
          `Invalid class ID: ${id}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.classesService.remove(parsedId);
      return { message: 'Class deleted successfully' };
    } catch (error) {
      this.logger.error(`Error deleting class: ${error.message}`, error.stack);
      throw error;
    }
  }
}
