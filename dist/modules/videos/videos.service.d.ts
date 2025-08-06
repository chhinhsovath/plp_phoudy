import { Repository } from 'typeorm';
import { Video, Status } from '../../entities/video.entity';
import { CreateVideoDto, UpdateVideoDto } from './dto/video.dto';
export declare class VideosService {
    private videoRepository;
    constructor(videoRepository: Repository<Video>);
    findAll(): Promise<Video[]>;
    findById(id: number): Promise<Video>;
    create(createVideoDto: CreateVideoDto): Promise<Video>;
    update(id: number, updateVideoDto: UpdateVideoDto): Promise<Video>;
    remove(id: number): Promise<void>;
    removeMany(ids: number[]): Promise<void>;
    findByStatus(status: Status): Promise<Video[]>;
    findByLessonTitleContaining(lessonTitle: string): Promise<Video[]>;
    findBySubject(subject: string): Promise<Video[]>;
    findByGrade(grade: string): Promise<Video[]>;
    findByTeacherName(teacherName: string): Promise<Video[]>;
    findAllSubjects(): Promise<string[]>;
    findAllGrades(): Promise<string[]>;
    findAllLessonTitles(): Promise<string[]>;
    findAllTeacherNames(): Promise<string[]>;
}
