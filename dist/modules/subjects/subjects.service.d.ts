import { Repository } from 'typeorm';
import { Subject } from '../../entities/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { SubjectContentDto } from './dto/subject-content.dto';
export declare class SubjectsService {
    private subjectRepository;
    constructor(subjectRepository: Repository<Subject>);
    findAll(): Promise<Subject[]>;
    findActive(): Promise<Subject[]>;
    findStudentSubjects(): Promise<Subject[]>;
    findByGradeLevel(gradeLevel: number): Promise<Subject[]>;
    findActiveByGradeLevel(gradeLevel: number): Promise<Subject[]>;
    findOne(id: number): Promise<Subject>;
    findByPath(path: string): Promise<Subject>;
    findSpecialSubjects(): Promise<Subject[]>;
    findSubjectContent(): SubjectContentDto[];
    create(createSubjectDto: CreateSubjectDto): Promise<Subject>;
    update(id: number, updateSubjectDto: UpdateSubjectDto): Promise<Subject>;
    remove(id: number): Promise<void>;
    activate(id: number): Promise<Subject>;
    deactivate(id: number): Promise<Subject>;
    findNormalSubjects(): Promise<Subject[]>;
    findAllGradesWithSubjects(): Promise<any[]>;
    findGradesBySubjectId(subjectId: number): Promise<any[]>;
    findActiveForDropdown(): Promise<Subject[]>;
}
