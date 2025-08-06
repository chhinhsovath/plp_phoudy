import { VideosService } from './videos.service';
import { CreateVideoDto, UpdateVideoDto } from './dto/video.dto';
import { Video } from '../../entities/video.entity';
export declare class VideosController {
    private readonly videosService;
    constructor(videosService: VideosService);
    getAllVideos(status?: string, lessonTitle?: string, subject?: string, grade?: string, teacherName?: string): Promise<Video[]>;
    getVideoById(id: number): Promise<Video>;
    createVideo(createVideoDto: CreateVideoDto): Promise<Video>;
    updateVideo(id: number, updateVideoDto: UpdateVideoDto): Promise<Video>;
    deleteVideo(id: number): Promise<void>;
    deleteVideos(ids: number[]): Promise<void>;
    getVideosBySubject(subject: string): Promise<Video[]>;
    getVideosByGrade(grade: string): Promise<Video[]>;
    getVideosByTeacher(teacherName: string): Promise<Video[]>;
    getAvailableSubjects(): Promise<{
        subject: string;
    }[]>;
    getAvailableGrades(): Promise<{
        grade: string;
    }[]>;
    getAvailableLessons(): Promise<{
        lesson: string;
    }[]>;
    getAvailableTeachers(): Promise<{
        teacher: string;
    }[]>;
}
