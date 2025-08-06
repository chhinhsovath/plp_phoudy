import { Repository } from 'typeorm';
import { Teacher } from '../../entities/teacher.entity';
import { Class } from '../../entities/class.entity';
import { TeacherDto } from './dto/teacher.dto';
import { TeacherClassDto } from './dto/teacher-class.dto';
export declare class TeachersService {
    private teacherRepository;
    private classRepository;
    private readonly logger;
    constructor(teacherRepository: Repository<Teacher>, classRepository: Repository<Class>);
    findOne(id: number): Promise<TeacherDto>;
    findByUserId(userId: number): Promise<TeacherDto>;
    findClassesByTeacherId(teacherId: number): Promise<TeacherClassDto[]>;
    findAll(): Promise<TeacherDto[]>;
}
