import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from '../../entities/subject.entity';
import { SubjectContentDto } from './dto/subject-content.dto';
export declare class SubjectsController {
    private readonly subjectsService;
    private readonly logger;
    constructor(subjectsService: SubjectsService);
    findAll(): Promise<Subject[]>;
    findActive(): Promise<Subject[]>;
    findStudentSubjects(): Promise<Subject[]>;
    findSpecialSubjects(): Promise<Subject[]>;
    findNormalSubjects(): Promise<Subject[]>;
    healthCheck(): Promise<{
        status: string;
        message: string;
    }>;
    getGrades(): Promise<any[]>;
    findByGradeLevel(gradeLevel: number): Promise<Subject[]>;
    findActiveByGradeLevel(gradeLevel: number): Promise<Subject[]>;
    findByPath(path: string): Promise<Subject>;
    findOne(id: number): Promise<Subject>;
    findSubjectContent(id: number): Promise<SubjectContentDto[]>;
    create(createSubjectDto: CreateSubjectDto): Promise<Subject>;
    update(id: number, updateSubjectDto: UpdateSubjectDto): Promise<Subject>;
    updatePatch(id: number, updateSubjectDto: UpdateSubjectDto): Promise<Subject>;
    remove(id: number): Promise<void>;
    activate(id: number): Promise<Subject>;
    deactivate(id: number): Promise<Subject>;
    findGradesBySubjectId(id: string): Promise<any[]>;
    findActiveForDropdown(): Promise<Subject[]>;
}
