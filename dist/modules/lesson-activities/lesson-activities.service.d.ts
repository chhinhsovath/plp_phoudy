import { Repository } from 'typeorm';
import { LessonActivity } from '../../entities/lesson-activity.entity';
import { CreateLessonActivityDto } from './dto/create-lesson-activity.dto';
import { UpdateLessonActivityDto } from './dto/update-lesson-activity.dto';
export declare class LessonActivitiesService {
    private lessonActivityRepository;
    constructor(lessonActivityRepository: Repository<LessonActivity>);
    findAll(): Promise<any[]>;
    findByGradeLevelAndSubjectId(gradeLevel: number, subjectId: number): Promise<any[]>;
    create(createLessonActivityDto: CreateLessonActivityDto): Promise<LessonActivity>;
    findById(id: number): Promise<LessonActivity>;
    update(id: number, updateLessonActivityDto: UpdateLessonActivityDto): Promise<LessonActivity>;
}
