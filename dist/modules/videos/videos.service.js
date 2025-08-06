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
exports.VideosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const video_entity_1 = require("../../entities/video.entity");
let VideosService = class VideosService {
    videoRepository;
    constructor(videoRepository) {
        this.videoRepository = videoRepository;
    }
    async findAll() {
        return this.videoRepository.find();
    }
    async findById(id) {
        const video = await this.videoRepository.findOne({ where: { id } });
        if (!video) {
            throw new common_1.NotFoundException(`Video with ID ${id} not found`);
        }
        return video;
    }
    async create(createVideoDto) {
        const video = this.videoRepository.create(createVideoDto);
        return this.videoRepository.save(video);
    }
    async update(id, updateVideoDto) {
        const video = await this.findById(id);
        Object.assign(video, updateVideoDto);
        return this.videoRepository.save(video);
    }
    async remove(id) {
        const result = await this.videoRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Video with ID ${id} not found`);
        }
    }
    async removeMany(ids) {
        await this.videoRepository.delete(ids);
    }
    async findByStatus(status) {
        return this.videoRepository.find({ where: { status } });
    }
    async findByLessonTitleContaining(lessonTitle) {
        return this.videoRepository.find({
            where: { lessonTitle: (0, typeorm_2.Like)(`%${lessonTitle}%`) },
        });
    }
    async findBySubject(subject) {
        return this.videoRepository.find({ where: { subject } });
    }
    async findByGrade(grade) {
        return this.videoRepository.find({ where: { grade } });
    }
    async findByTeacherName(teacherName) {
        return this.videoRepository.find({ where: { teacherName } });
    }
    async findAllSubjects() {
        const videos = await this.videoRepository.find();
        const subjects = new Set();
        videos.forEach((video) => subjects.add(video.subject));
        return Array.from(subjects);
    }
    async findAllGrades() {
        const videos = await this.videoRepository.find();
        const grades = new Set();
        videos.forEach((video) => grades.add(video.grade));
        return Array.from(grades);
    }
    async findAllLessonTitles() {
        const videos = await this.videoRepository.find();
        const lessonTitles = new Set();
        videos.forEach((video) => lessonTitles.add(video.lessonTitle));
        return Array.from(lessonTitles);
    }
    async findAllTeacherNames() {
        const videos = await this.videoRepository.find();
        const teacherNames = new Set();
        videos.forEach((video) => teacherNames.add(video.teacherName));
        return Array.from(teacherNames);
    }
};
exports.VideosService = VideosService;
exports.VideosService = VideosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(video_entity_1.Video)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VideosService);
//# sourceMappingURL=videos.service.js.map