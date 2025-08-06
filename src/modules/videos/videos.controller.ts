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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { VideosService } from './videos.service';
import {
  CreateVideoDto,
  UpdateVideoDto,
  VideoResponseDto,
} from './dto/video.dto';
import { Video } from '../../entities/video.entity';

@ApiTags('Videos')
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  @ApiOperation({ summary: 'Get all videos with optional filters' })
  @ApiResponse({
    status: 200,
    description: 'Return all videos',
    type: [VideoResponseDto],
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filter by status',
  })
  @ApiQuery({
    name: 'lessonTitle',
    required: false,
    description: 'Filter by lesson title',
  })
  @ApiQuery({
    name: 'subject',
    required: false,
    description: 'Filter by subject',
  })
  @ApiQuery({ name: 'grade', required: false, description: 'Filter by grade' })
  @ApiQuery({
    name: 'teacherName',
    required: false,
    description: 'Filter by teacher name',
  })
  async getAllVideos(
    @Query('status') status?: string,
    @Query('lessonTitle') lessonTitle?: string,
    @Query('subject') subject?: string,
    @Query('grade') grade?: string,
    @Query('teacherName') teacherName?: string,
  ): Promise<Video[]> {
    if (status && status !== 'all') {
      const videoStatus = status.toUpperCase();
      return this.videosService.findByStatus(videoStatus as any);
    } else if (lessonTitle) {
      return this.videosService.findByLessonTitleContaining(lessonTitle);
    } else if (subject) {
      return this.videosService.findBySubject(subject);
    } else if (grade) {
      return this.videosService.findByGrade(grade);
    } else if (teacherName) {
      return this.videosService.findByTeacherName(teacherName);
    } else {
      return this.videosService.findAll();
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a video by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the video',
    type: VideoResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Video not found' })
  @ApiParam({ name: 'id', type: 'number' })
  async getVideoById(@Param('id', ParseIntPipe) id: number): Promise<Video> {
    return this.videosService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new video' })
  @ApiResponse({
    status: 201,
    description: 'Video created successfully',
    type: VideoResponseDto,
  })
  async createVideo(@Body() createVideoDto: CreateVideoDto): Promise<Video> {
    return this.videosService.create(createVideoDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a video' })
  @ApiResponse({
    status: 200,
    description: 'Video updated successfully',
    type: VideoResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Video not found' })
  @ApiParam({ name: 'id', type: 'number' })
  async updateVideo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVideoDto: UpdateVideoDto,
  ): Promise<Video> {
    return this.videosService.update(id, updateVideoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a video' })
  @ApiResponse({ status: 200, description: 'Video deleted successfully' })
  @ApiResponse({ status: 404, description: 'Video not found' })
  @ApiParam({ name: 'id', type: 'number' })
  async deleteVideo(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.videosService.remove(id);
  }

  @Delete('bulk')
  @ApiOperation({ summary: 'Delete multiple videos' })
  @ApiResponse({ status: 200, description: 'Videos deleted successfully' })
  async deleteVideos(@Body() ids: number[]): Promise<void> {
    await this.videosService.removeMany(ids);
  }

  @Get('by-subject/:subject')
  @ApiOperation({ summary: 'Get videos by subject' })
  @ApiResponse({
    status: 200,
    description: 'Return videos by subject',
    type: [VideoResponseDto],
  })
  @ApiParam({ name: 'subject', type: 'string' })
  async getVideosBySubject(
    @Param('subject') subject: string,
  ): Promise<Video[]> {
    return this.videosService.findBySubject(subject);
  }

  @Get('by-grade/:grade')
  @ApiOperation({ summary: 'Get videos by grade' })
  @ApiResponse({
    status: 200,
    description: 'Return videos by grade',
    type: [VideoResponseDto],
  })
  @ApiParam({ name: 'grade', type: 'string' })
  async getVideosByGrade(@Param('grade') grade: string): Promise<Video[]> {
    return this.videosService.findByGrade(grade);
  }

  @Get('by-teacher/:teacherName')
  @ApiOperation({ summary: 'Get videos by teacher name' })
  @ApiResponse({
    status: 200,
    description: 'Return videos by teacher name',
    type: [VideoResponseDto],
  })
  @ApiParam({ name: 'teacherName', type: 'string' })
  async getVideosByTeacher(
    @Param('teacherName') teacherName: string,
  ): Promise<Video[]> {
    return this.videosService.findByTeacherName(teacherName);
  }

  @Get('subjects')
  @ApiOperation({ summary: 'Get all available subjects' })
  @ApiResponse({ status: 200, description: 'Return all subjects' })
  async getAvailableSubjects(): Promise<{ subject: string }[]> {
    const subjects = await this.videosService.findAllSubjects();
    return subjects.map((subject) => ({ subject }));
  }

  @Get('grades')
  @ApiOperation({ summary: 'Get all available grades' })
  @ApiResponse({ status: 200, description: 'Return all grades' })
  async getAvailableGrades(): Promise<{ grade: string }[]> {
    const grades = await this.videosService.findAllGrades();
    return grades.map((grade) => ({ grade }));
  }

  @Get('lessons')
  @ApiOperation({ summary: 'Get all available lesson titles' })
  @ApiResponse({ status: 200, description: 'Return all lesson titles' })
  async getAvailableLessons(): Promise<{ lesson: string }[]> {
    const lessons = await this.videosService.findAllLessonTitles();
    return lessons.map((lesson) => ({ lesson }));
  }

  @Get('teachers')
  @ApiOperation({ summary: 'Get all available teacher names' })
  @ApiResponse({ status: 200, description: 'Return all teacher names' })
  async getAvailableTeachers(): Promise<{ teacher: string }[]> {
    const teachers = await this.videosService.findAllTeacherNames();
    return teachers.map((teacher) => ({ teacher }));
  }
}
