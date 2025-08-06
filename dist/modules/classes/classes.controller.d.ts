import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ClassStudentDto } from './dto/class-student.dto';
export declare class ClassesController {
    private readonly classesService;
    private readonly logger;
    constructor(classesService: ClassesService);
    create(createClassDto: CreateClassDto): Promise<import("../../entities/class.entity").Class>;
    findAll(): Promise<import("../../entities/class.entity").Class[]>;
    findByGradeLevel(gradeLevel: string): Promise<import("../../entities/class.entity").Class[]>;
    findStudentsByClassId(id: string): Promise<ClassStudentDto[]>;
    findStudentsInfoByClassId(id: string): Promise<{
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
    private getGradeLevelEnum;
    findOne(id: string): Promise<import("../../entities/class.entity").Class>;
    update(id: string, updateClassDto: UpdateClassDto): Promise<import("../../entities/class.entity").Class>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
