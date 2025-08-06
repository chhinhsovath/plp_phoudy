import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Put,
  Delete,
  Body,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiTags,
  ApiQuery,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { SubmissionStatus, CheckedStatus } from './dto/homework-submission.dto';
import { CreateStudentSubmissionDto } from './dto/homework-submission-student.dto';
import { UpdateTeacherFeedbackDto } from './dto/homework-submission-teacher.dto';
import { HomeworkSubmissionService } from './homework-submission.service';
import { CountHomeworkSubmissionDto } from './dto/homework-submission-count.dto';
import { unlinkSync } from 'fs';

@ApiTags('Homework Submissions')
@Controller('homework-submissions')
export class HomeworkSubmissionController {
  constructor(private readonly service: HomeworkSubmissionService) {}

  @Get('search')
  @ApiOperation({ summary: 'Search submissions with filters and pagination' })
  @ApiQuery({ name: 'studentId', required: false, type: Number })
  @ApiQuery({ name: 'homeworkId', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, enum: SubmissionStatus })
  @ApiQuery({ name: 'checkedStatus', required: false, enum: CheckedStatus })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'overdue', required: false, type: Boolean })
  search(
    @Query('studentId') studentId?: number,
    @Query('homeworkId') homeworkId?: number,
    @Query('status') status?: SubmissionStatus,
    @Query('checkedStatus') checkedStatus?: CheckedStatus,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('overdue') overdue?: string,
  ) {
    const overdueBool =
      overdue === 'true' ? true : overdue === 'false' ? false : undefined;
    return this.service.searchSubmissions({
      studentId,
      homeworkId,
      status,
      checkedStatus,
      page,
      limit,
      overdue: overdueBool,
    });
  }

  @Get('count')
  @ApiOperation({ summary: 'Count homework submissions with optional filters' })
  @ApiQuery({ name: 'studentId', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, enum: SubmissionStatus })
  @ApiQuery({ name: 'checkedStatus', required: false, enum: CheckedStatus })
  countSubmissions(@Query() filter: CountHomeworkSubmissionDto) {
    return this.service.countSubmissions(filter);
  }

  @Get()
  @ApiOperation({ summary: 'Get all homework submissions' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a submission by ID' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Get('homework/:homeworkId')
  @ApiOperation({ summary: 'Get submissions by homework ID' })
  @ApiParam({ name: 'homeworkId', type: Number })
  findByHomeworkId(@Param('homeworkId') homeworkId: number) {
    return this.service.findByHomeworkId(homeworkId);
  }

  @Get('student/:studentId')
  @ApiOperation({ summary: 'Get submissions by student ID' })
  @ApiParam({ name: 'studentId', type: Number })
  findByStudentId(@Param('studentId') studentId: number) {
    return this.service.findByStudentId(studentId);
  }

  @Post()
  @ApiOperation({ summary: 'Student submits homework with optional files' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
          nullable: true,
        },
        homeworkId: { type: 'number' },
        studentId: { type: 'number' },
        submissionText: { type: 'string' },
      },
      required: ['homeworkId', 'studentId'],
    },
  })
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      storage: diskStorage({
        destination: './uploads/students',
        filename: (_req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max per file
    }),
  )
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body()
    body: CreateStudentSubmissionDto & {
      homeworkId: number;
      studentId: number;
      submissionText?: string;
    },
  ) {
    if (!body.homeworkId || !body.studentId) {
      throw new BadRequestException('homeworkId and studentId are required');
    }

    // Map uploaded files to DTO format
    const submissionFiles = files?.map((file) => ({
      name: file.originalname,
      size: file.size,
      type: file.mimetype,
      url: `/uploads/students/${file.filename}`,
    }));

    const submissionDto = {
      ...body,
      submissionFiles,
    };

    return this.service.create(submissionDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Teacher updates feedback and score' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Submission updated' })
  update(@Param('id') id: number, @Body() dto: UpdateTeacherFeedbackDto) {
    return this.service.update(id, dto, { isTeacher: true });
  }

  @Put('student/:id')
  @ApiOperation({
    summary: 'Student updates their own submission (if allowed)',
  })
  @ApiParam({ name: 'id', type: Number })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
          nullable: true,
        },
        studentId: { type: 'number' },
        submissionText: { type: 'string' },
        filesToDelete: {
          type: 'array',
          items: { type: 'number' },
          nullable: true,
        },
      },
      required: ['studentId'],
    },
  })
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      storage: diskStorage({
        destination: './uploads/students',
        filename: (_req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max per file
    }),
  )
  async studentUpdate(
    @Param('id') id: number,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: any,
  ) {
    // Map uploaded files to DTO format
    const submissionFiles = files?.map((file) => ({
      name: file.originalname,
      size: file.size,
      type: file.mimetype,
      url: `/uploads/students/${file.filename}`,
    }));
    let filesToDelete = body.filesToDelete;
    if (filesToDelete && !Array.isArray(filesToDelete)) {
      filesToDelete = [filesToDelete];
    }
    // Convert string IDs to numbers
    if (filesToDelete) {
      filesToDelete = filesToDelete
        .map((id: any) => (typeof id === 'string' ? parseInt(id, 10) : id))
        .filter((id: any) => !isNaN(id));
    }
    const updateDto = {
      ...body,
      submissionFiles,
      filesToDelete,
    };
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a homework submission' })
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }

  @Delete('student/:id')
  @ApiOperation({
    summary: 'Student deletes their own submission (if allowed)',
  })
  @ApiParam({ name: 'id', type: Number })
  async studentRemove(
    @Param('id') id: number,
    @Body() body: { studentId: number },
  ) {
    // Optionally, add authentication/authorization here
    // You could check that the studentId matches the submission owner
    return this.service.remove(id);
  }
}
