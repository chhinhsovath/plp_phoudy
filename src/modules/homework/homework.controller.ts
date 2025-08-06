import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  ParseIntPipe,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreateHomeworkDto } from './dto/homework.dto';
import { HomeworkService } from './homework.service';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiTags,
  ApiParam,
  ApiQuery,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { SearchHomeworkDto } from './dto/searchHomework.dto';
import { BadRequestException } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('Homeworks')
@Controller('homeworks')
export class HomeworkController {
  constructor(private readonly service: HomeworkService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new homework' })
  @ApiResponse({
    status: 201,
    description: 'Homework created successfully',
  })
  @ApiBearerAuth()
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
        title: { type: 'string' },
        description: { type: 'string' },
        classId: { type: 'number' },
        subjectId: { type: 'number' },
        lessonId: { type: 'number' },
        teacherId: { type: 'number' },
        dueDate: { type: 'string', format: 'date-time' },
        status: { type: 'string' },
        allowResubmit: {
          type: 'boolean',
          default: false,
          description: 'Allow resubmission of homework',
        },
      },
      required: [
        'title',
        'classId',
        'subjectId',
        'lessonId',
        'teacherId',
        'dueDate',
        'status',
      ],
    },
  })
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      storage: diskStorage({
        destination: './uploads/homeworks',
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
    @Body() dto: CreateHomeworkDto,
  ) {
    try {
      // REMOVE 'files' property from dto if present (fixes the error)
      if (dto && typeof dto === 'object' && 'files' in dto) {
        delete dto['files'];
      }
      // Map uploaded files to DTO format
      const homeworkFiles = files?.map((file) => ({
        name: file.originalname,
        size: file.size,
        type: file.mimetype,
        url: `/uploads/homeworks/${file.filename}`,
      }));
      return await this.service.create({ ...dto, homeworkFiles });
    } catch (error) {
      console.error('Create homework error:', error);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all homeworks' })
  @ApiResponse({
    status: 200,
    description: 'Return all homeworks',
  })
  @ApiBearerAuth()
  findAll() {
    return this.service.findAll();
  }
  @Get('search')
  @ApiOperation({
    summary:
      'Search homeworks by title or description with pagination and filters',
  })
  @ApiResponse({ status: 200, description: 'Filtered homeworks list' })
  @ApiQuery({
    name: 'query',
    required: false,
    type: String,
    description: 'Search keyword (title or description)',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of results per page (default: 5)',
  })
  @ApiQuery({ name: 'teacherId', required: false, type: Number })
  @ApiQuery({ name: 'classId', required: false, type: Number })
  @ApiQuery({ name: 'subjectId', required: false, type: Number })
  @ApiQuery({ name: 'lessonId', required: false, type: Number })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ['DRAFT', 'ACTIVE', 'CLOSED'],
    description: 'Status of homework',
  })
  @ApiQuery({
    name: 'overdue',
    required: false,
    type: String,
    enum: ['true', 'false'],
    description: 'Whether homework is overdue or not (string boolean)',
  })
  @ApiQuery({
    name: 'studentId',
    required: false,
    type: Number,
    description: "Filter homework based on this student's submission status",
  })
  @ApiQuery({
    name: 'hasSubmission',
    required: false,
    enum: ['true', 'false'],
    description:
      'Filter by whether the student has submitted (requires studentId)',
  })
  @ApiQuery({
    name: 'createdFrom',
    required: false,
    schema: {
      type: 'string',
      format: 'date',
      example: '2024-01-01',
    },
    description: 'Filter homeworks created from this date (YYYY-MM-DD format)',
  })
  @ApiQuery({
    name: 'createdTo',
    required: false,
    schema: {
      type: 'string',
      format: 'date',
      example: '2024-12-31',
    },
    description: 'Filter homeworks created up to this date (YYYY-MM-DD format)',
  })
  @ApiQuery({
    name: 'dueFrom',
    required: false,
    schema: {
      type: 'string',
      format: 'date',
      example: '2024-02-01',
    },
    description:
      'Filter homeworks with due date from this date (YYYY-MM-DD format)',
  })
  @ApiQuery({
    name: 'dueTo',
    required: false,
    schema: {
      type: 'string',
      format: 'date',
      example: '2024-02-29',
    },
    description:
      'Filter homeworks with due date up to this date (YYYY-MM-DD format)',
  })
  @ApiQuery({
    name: 'submittedFrom',
    required: false,
    schema: {
      type: 'string',
      format: 'date',
      example: '2024-01-15',
    },
    description:
      'Filter homeworks submitted from this date (YYYY-MM-DD format)',
  })
  @ApiQuery({
    name: 'submittedTo',
    required: false,
    schema: {
      type: 'string',
      format: 'date',
      example: '2024-01-20',
    },
    description:
      'Filter homeworks submitted up to this date (YYYY-MM-DD format)',
  })
  @ApiBearerAuth()
  async search(@Query() searchDto: SearchHomeworkDto) {
    return this.service.search(searchDto);
  }

  @ApiQuery({ name: 'teacherId', required: false, type: Number })
  @ApiBearerAuth()
  @Get('count/active')
  async getHomeworkCounts(
    @Query('teacherId') teacherIdStr?: string,
    @Query('classId') classIdStr?: string,
  ) {
    let teacherId: number | undefined;
    let classId: number | undefined;

    if (teacherIdStr !== undefined) {
      teacherId = parseInt(teacherIdStr, 10);
      if (isNaN(teacherId)) {
        throw new BadRequestException('Invalid teacherId');
      }
    }

    if (classIdStr !== undefined) {
      classId = parseInt(classIdStr, 10);
      if (isNaN(classId)) {
        throw new BadRequestException('Invalid classId');
      }
    }

    return this.service.getHomeworkCountsActiveByTeacher(teacherId, classId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a homework by ID' })
  @ApiResponse({ status: 200, description: 'Return the homework' })
  @ApiResponse({ status: 404, description: 'Homework not found' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'number' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a homework' })
  @ApiResponse({
    status: 200,
    description: 'Homework updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Homework not found' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'number' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        filesToDelete: {
          type: 'array',
          items: { type: 'string' },
          nullable: true,
        },
        title: { type: 'string' },
        description: { type: 'string' },
        classId: { type: 'number' },
        subjectId: { type: 'number' },
        lessonId: { type: 'number' },
        teacherId: { type: 'number' },
        dueDate: { type: 'string', format: 'date-time' },
        status: { type: 'string' },
        newFiles: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
          nullable: true,
        },
        allowResubmit: {
          type: 'boolean',
          default: false,
          description: 'Allow resubmission of homework',
        },
      },
      required: [
        'title',
        'classId',
        'subjectId',
        'lessonId',
        'teacherId',
        'dueDate',
        'status',
      ],
    },
  })
  @UseInterceptors(
    FilesInterceptor('newFiles', 5, {
      storage: diskStorage({
        destination: './uploads/homeworks',
        filename: (_req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max per file
    }),
  )
  async update(
    @Param('id') id: string,
    @UploadedFiles() newFiles: Express.Multer.File[],
    @Body() body: any,
  ) {
    let filesToDelete = body.filesToDelete;
    if (filesToDelete && !Array.isArray(filesToDelete)) {
      filesToDelete = [filesToDelete];
    }
    // Remove any 'files' or 'newFiles' property from body to avoid validation issues
    if ('files' in body) delete body.files;
    if ('newFiles' in body) delete body.newFiles;
    // Map uploaded files to your DTO format
    const homeworkFiles = newFiles?.map((file) => ({
      name: file.originalname,
      size: file.size,
      type: file.mimetype,
      url: `/uploads/homeworks/${file.filename}`,
    }));

    // Combine uploaded files with DTO
    const updateDto = {
      ...body,
      filesToDelete,
      homeworkFiles,
    };

    // Coerce allowResubmit to boolean if present
    if ('allowResubmit' in updateDto) {
      updateDto.allowResubmit =
        updateDto.allowResubmit === true || updateDto.allowResubmit === 'true';
    }

    try {
      return await this.service.update(+id, updateDto);
    } catch (error) {
      console.error('Update error:', error);
      throw error;
    }
  }

  // Soft delete endpoint turnign status to active for restore function
  @Delete('soft/:id')
  @ApiOperation({ summary: 'Soft delete a homework (set status to DELETED)' })
  @ApiResponse({
    status: 200,
    description: 'Homework soft deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Homework not found' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'number' })
  async softDelete(@Param('id') id: string) {
    await this.service.softDelete(+id);
    return { message: 'Homework soft deleted successfully' };
  }

  //delete from database
  @Delete('hard/:id')
  @ApiOperation({ summary: 'Hard delete a homework (remove from DB)' })
  @ApiResponse({
    status: 200,
    description: 'Homework hard deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Homework not found' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'number' })
  async hardDelete(@Param('id') id: string) {
    await this.service.hardDelete(+id);
    return { message: 'Homework hard deleted successfully' };
  }

  @Get('teacher/:teacherId')
  @ApiOperation({ summary: 'Get homeworks by teacher ID' })
  @ApiResponse({
    status: 200,
    description: 'Return homeworks for the given teacher',
  })
  @ApiBearerAuth()
  @ApiParam({ name: 'teacherId', type: 'number' })
  findByTeacher(@Param('teacherId') teacherId: string) {
    return this.service.findByTeacherId(+teacherId);
  }

  @Get('class/:classId')
  @ApiOperation({ summary: 'Get homeworks by class ID' })
  @ApiResponse({
    status: 200,
    description: 'Return homeworks for the given class',
  })
  @ApiBearerAuth()
  @ApiParam({ name: 'classId', type: 'number' })
  findByClass(@Param('classId') classId: string) {
    return this.service.findByClassId(+classId);
  }

  @Get('subject/:subjectId')
  @ApiOperation({ summary: 'Get homeworks by subject ID' })
  @ApiResponse({
    status: 200,
    description: 'Return homeworks for the given subject',
  })
  @ApiBearerAuth()
  @ApiParam({ name: 'subjectId', type: 'number' })
  findBySubject(@Param('subjectId') subjectId: string) {
    return this.service.findBySubjectId(+subjectId);
  }

  @Get('lesson/:lessonId')
  @ApiOperation({ summary: 'Get homeworks by lesson ID' })
  @ApiResponse({
    status: 200,
    description: 'Return homeworks for the given lessonId',
  })
  @ApiBearerAuth()
  @ApiParam({ name: 'lessonId', type: 'number' })
  findByLesson(@Param('lessonId') lessonId: string) {
    return this.service.findByLessonId(+lessonId);
  }
}
