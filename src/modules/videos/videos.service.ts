import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Video, Status } from '../../entities/video.entity';
import { CreateVideoDto, UpdateVideoDto } from './dto/video.dto';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
  ) {}

  async findAll(): Promise<Video[]> {
    return this.videoRepository.find();
  }

  async findById(id: number): Promise<Video> {
    const video = await this.videoRepository.findOne({ where: { id } });
    if (!video) {
      throw new NotFoundException(`Video with ID ${id} not found`);
    }
    return video;
  }

  async create(createVideoDto: CreateVideoDto): Promise<Video> {
    const video = this.videoRepository.create(createVideoDto);
    return this.videoRepository.save(video);
  }

  async update(id: number, updateVideoDto: UpdateVideoDto): Promise<Video> {
    const video = await this.findById(id);
    // Update video properties
    Object.assign(video, updateVideoDto);
    return this.videoRepository.save(video);
  }

  async remove(id: number): Promise<void> {
    const result = await this.videoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Video with ID ${id} not found`);
    }
  }

  async removeMany(ids: number[]): Promise<void> {
    await this.videoRepository.delete(ids);
  }

  async findByStatus(status: Status): Promise<Video[]> {
    return this.videoRepository.find({ where: { status } });
  }

  async findByLessonTitleContaining(lessonTitle: string): Promise<Video[]> {
    return this.videoRepository.find({
      where: { lessonTitle: Like(`%${lessonTitle}%`) },
    });
  }

  async findBySubject(subject: string): Promise<Video[]> {
    return this.videoRepository.find({ where: { subject } });
  }

  async findByGrade(grade: string): Promise<Video[]> {
    return this.videoRepository.find({ where: { grade } });
  }

  async findByTeacherName(teacherName: string): Promise<Video[]> {
    return this.videoRepository.find({ where: { teacherName } });
  }

  async findAllSubjects(): Promise<string[]> {
    const videos = await this.videoRepository.find();
    const subjects = new Set<string>();
    videos.forEach((video) => subjects.add(video.subject));
    return Array.from(subjects);
  }

  async findAllGrades(): Promise<string[]> {
    const videos = await this.videoRepository.find();
    const grades = new Set<string>();
    videos.forEach((video) => grades.add(video.grade));
    return Array.from(grades);
  }

  async findAllLessonTitles(): Promise<string[]> {
    const videos = await this.videoRepository.find();
    const lessonTitles = new Set<string>();
    videos.forEach((video) => lessonTitles.add(video.lessonTitle));
    return Array.from(lessonTitles);
  }

  async findAllTeacherNames(): Promise<string[]> {
    const videos = await this.videoRepository.find();
    const teacherNames = new Set<string>();
    videos.forEach((video) => teacherNames.add(video.teacherName));
    return Array.from(teacherNames);
  }
}
