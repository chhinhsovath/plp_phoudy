import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  Logger,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { AnalysisService } from './analysis.service';
import { ClassAnalysisResponseDto } from './dto/class-analysis-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Analysis')
@Controller('analysis')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class AnalysisController {
  private readonly logger = new Logger(AnalysisController.name);

  constructor(private readonly analysisService: AnalysisService) {}

  @Get('class/:classId')
  @ApiOperation({ summary: 'Get analysis data for a specific class' })
  @ApiParam({ name: 'classId', description: 'Class ID', type: Number })
  @ApiQuery({
    name: 'studentId',
    required: false,
    description: 'Filter by student ID',
    type: Number,
  })
  @ApiQuery({
    name: 'gradeLevel',
    required: false,
    description: 'Filter by grade level',
    type: String,
  })
  @ApiQuery({
    name: 'subjectId',
    required: false,
    description: 'Filter by subject ID',
    type: Number,
  })
  @ApiQuery({
    name: 'lessonNumbers',
    required: false,
    description: 'Filter by lesson numbers, comma-separated',
    example: '1,2,3',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns analysis data for the class with students grouped',
    type: ClassAnalysisResponseDto,
  })
  @ApiResponse({ status: 404, description: 'No analysis data found' })
  @Roles('TEACHER', 'ADMIN')
  async getClassAnalysis(
    @Param('classId', ParseIntPipe) classId: number,
    @Query('studentId') studentId?: number,
    @Query('gradeLevel') gradeLevel?: string,
    @Query('subjectId') subjectId?: number,
    @Query('lessonNumbers') lessonNumbers?: string,
  ): Promise<ClassAnalysisResponseDto> {
    this.logger.log(
      `Handling GET /analysis/class/${classId} request with filters: studentId=${studentId || 'none'}, gradeLevel=${gradeLevel || 'none'}, subjectId=${subjectId || 'none'}, lessonNumbers=${lessonNumbers || 'none'}`,
    );

    // Parse lesson numbers from comma-separated string
    const parsedLessonNumbers = lessonNumbers
      ? lessonNumbers.split(',').map((num) => parseInt(num.trim(), 10))
      : undefined;

    try {
      return await this.analysisService.getClassAnalysis(
        classId,
        studentId,
        gradeLevel,
        subjectId,
        parsedLessonNumbers,
      );
    } catch (error) {
      this.logger.error(
        `Error in getClassAnalysis: ${error.message}`,
        error.stack,
      );
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException('Failed to retrieve class analysis data');
    }
  }
}
