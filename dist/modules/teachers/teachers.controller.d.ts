import { TeachersService } from './teachers.service';
import { TeacherDto } from './dto/teacher.dto';
import { TeacherClassDto } from './dto/teacher-class.dto';
export declare class TeachersController {
    private readonly teachersService;
    private readonly logger;
    constructor(teachersService: TeachersService);
    findAll(): Promise<TeacherDto[]>;
    findMe(req: any): Promise<TeacherDto>;
    findOne(id: string): Promise<TeacherDto>;
    findClassesByTeacherId(id: string): Promise<TeacherClassDto[]>;
    findMyClasses(req: any): Promise<TeacherClassDto[]>;
}
