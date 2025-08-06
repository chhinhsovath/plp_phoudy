"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideosController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const videos_service_1 = require("./videos.service");
const video_dto_1 = require("./dto/video.dto");
let VideosController = class VideosController {
    videosService;
    constructor(videosService) {
        this.videosService = videosService;
    }
    async getAllVideos(status, lessonTitle, subject, grade, teacherName) {
        if (status && status !== 'all') {
            const videoStatus = status.toUpperCase();
            return this.videosService.findByStatus(videoStatus);
        }
        else if (lessonTitle) {
            return this.videosService.findByLessonTitleContaining(lessonTitle);
        }
        else if (subject) {
            return this.videosService.findBySubject(subject);
        }
        else if (grade) {
            return this.videosService.findByGrade(grade);
        }
        else if (teacherName) {
            return this.videosService.findByTeacherName(teacherName);
        }
        else {
            return this.videosService.findAll();
        }
    }
    async getVideoById(id) {
        return this.videosService.findById(id);
    }
    async createVideo(createVideoDto) {
        return this.videosService.create(createVideoDto);
    }
    async updateVideo(id, updateVideoDto) {
        return this.videosService.update(id, updateVideoDto);
    }
    async deleteVideo(id) {
        await this.videosService.remove(id);
    }
    async deleteVideos(ids) {
        await this.videosService.removeMany(ids);
    }
    async getVideosBySubject(subject) {
        return this.videosService.findBySubject(subject);
    }
    async getVideosByGrade(grade) {
        return this.videosService.findByGrade(grade);
    }
    async getVideosByTeacher(teacherName) {
        return this.videosService.findByTeacherName(teacherName);
    }
    async getAvailableSubjects() {
        const subjects = await this.videosService.findAllSubjects();
        return subjects.map((subject) => ({ subject }));
    }
    async getAvailableGrades() {
        const grades = await this.videosService.findAllGrades();
        return grades.map((grade) => ({ grade }));
    }
    async getAvailableLessons() {
        const lessons = await this.videosService.findAllLessonTitles();
        return lessons.map((lesson) => ({ lesson }));
    }
    async getAvailableTeachers() {
        const teachers = await this.videosService.findAllTeacherNames();
        return teachers.map((teacher) => ({ teacher }));
    }
};
exports.VideosController = VideosController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all videos with optional filters' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return all videos',
        type: [video_dto_1.VideoResponseDto],
    }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        required: false,
        description: 'Filter by status',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'lessonTitle',
        required: false,
        description: 'Filter by lesson title',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'subject',
        required: false,
        description: 'Filter by subject',
    }),
    (0, swagger_1.ApiQuery)({ name: 'grade', required: false, description: 'Filter by grade' }),
    (0, swagger_1.ApiQuery)({
        name: 'teacherName',
        required: false,
        description: 'Filter by teacher name',
    }),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('lessonTitle')),
    __param(2, (0, common_1.Query)('subject')),
    __param(3, (0, common_1.Query)('grade')),
    __param(4, (0, common_1.Query)('teacherName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "getAllVideos", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a video by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return the video',
        type: video_dto_1.VideoResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Video not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "getVideoById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new video' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Video created successfully',
        type: video_dto_1.VideoResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [video_dto_1.CreateVideoDto]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "createVideo", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a video' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Video updated successfully',
        type: video_dto_1.VideoResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Video not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, video_dto_1.UpdateVideoDto]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "updateVideo", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a video' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Video deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Video not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "deleteVideo", null);
__decorate([
    (0, common_1.Delete)('bulk'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete multiple videos' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Videos deleted successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "deleteVideos", null);
__decorate([
    (0, common_1.Get)('by-subject/:subject'),
    (0, swagger_1.ApiOperation)({ summary: 'Get videos by subject' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return videos by subject',
        type: [video_dto_1.VideoResponseDto],
    }),
    (0, swagger_1.ApiParam)({ name: 'subject', type: 'string' }),
    __param(0, (0, common_1.Param)('subject')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "getVideosBySubject", null);
__decorate([
    (0, common_1.Get)('by-grade/:grade'),
    (0, swagger_1.ApiOperation)({ summary: 'Get videos by grade' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return videos by grade',
        type: [video_dto_1.VideoResponseDto],
    }),
    (0, swagger_1.ApiParam)({ name: 'grade', type: 'string' }),
    __param(0, (0, common_1.Param)('grade')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "getVideosByGrade", null);
__decorate([
    (0, common_1.Get)('by-teacher/:teacherName'),
    (0, swagger_1.ApiOperation)({ summary: 'Get videos by teacher name' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return videos by teacher name',
        type: [video_dto_1.VideoResponseDto],
    }),
    (0, swagger_1.ApiParam)({ name: 'teacherName', type: 'string' }),
    __param(0, (0, common_1.Param)('teacherName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "getVideosByTeacher", null);
__decorate([
    (0, common_1.Get)('subjects'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all available subjects' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all subjects' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "getAvailableSubjects", null);
__decorate([
    (0, common_1.Get)('grades'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all available grades' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all grades' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "getAvailableGrades", null);
__decorate([
    (0, common_1.Get)('lessons'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all available lesson titles' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all lesson titles' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "getAvailableLessons", null);
__decorate([
    (0, common_1.Get)('teachers'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all available teacher names' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all teacher names' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "getAvailableTeachers", null);
exports.VideosController = VideosController = __decorate([
    (0, swagger_1.ApiTags)('Videos'),
    (0, common_1.Controller)('videos'),
    __metadata("design:paramtypes", [videos_service_1.VideosService])
], VideosController);
//# sourceMappingURL=videos.controller.js.map