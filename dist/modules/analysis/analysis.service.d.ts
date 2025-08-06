import { Repository } from 'typeorm';
import { Class } from '../../entities/class.entity';
import { Student } from '../../entities/student.entity';
import { UserResponse } from '../../entities/user-response.entity';
import { User } from '../../entities/user.entity';
import { Teacher } from '../../entities/teacher.entity';
import { Question } from '../../entities/question.entity';
import { Lesson } from '../../entities/lesson.entity';
import { LessonActivity } from '../../entities/lesson-activity.entity';
import { ClassAnalysisResponseDto } from './dto/class-analysis-response.dto';
export declare class AnalysisService {
    private classRepository;
    private studentRepository;
    private userResponseRepository;
    private userRepository;
    private teacherRepository;
    private questionRepository;
    private lessonRepository;
    private lessonActivityRepository;
    private readonly logger;
    constructor(classRepository: Repository<Class>, studentRepository: Repository<Student>, userResponseRepository: Repository<UserResponse>, userRepository: Repository<User>, teacherRepository: Repository<Teacher>, questionRepository: Repository<Question>, lessonRepository: Repository<Lesson>, lessonActivityRepository: Repository<LessonActivity>);
    getClassAnalysis(classId: number, studentId?: number, gradeLevel?: string, subjectId?: number, lessonNumbers?: number[]): Promise<ClassAnalysisResponseDto>;
    private transformClassAnalysisData;
}
