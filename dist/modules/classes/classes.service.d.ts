import { Repository } from 'typeorm';
import { Class, GradeLevelType } from '../../entities/class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ClassStudentDto } from './dto/class-student.dto';
export declare class ClassesService {
    private classRepository;
    private readonly logger;
    constructor(classRepository: Repository<Class>);
    create(createClassDto: CreateClassDto): Promise<Class>;
    findAll(): Promise<Class[]>;
    findByGradeLevel(gradeLevel: GradeLevelType): Promise<Class[]>;
    findOne(id: number): Promise<Class>;
    update(id: number, updateClassDto: UpdateClassDto): Promise<Class>;
    remove(id: number): Promise<void>;
    findStudentsByClassId(classId: number): Promise<ClassStudentDto[]>;
    findStudentsInfoByClassId(classId: number): Promise<{
        class_id: number;
        students: never[];
        total_students: number;
        class_name?: undefined;
        class_grade_level?: undefined;
    } | {
        class_id: number;
        class_name: any;
        class_grade_level: any;
        students: any;
        total_students: any;
    }>;
}
