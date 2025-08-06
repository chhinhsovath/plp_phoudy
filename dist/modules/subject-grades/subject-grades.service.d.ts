import { Repository } from 'typeorm';
import { SubjectGrade } from '../../entities/subject-grade.entity';
import { Subject } from '../../entities/subject.entity';
import { CreateSubjectGradeDto } from './dto/create-subject-grade.dto';
import { UpdateSubjectGradeDto } from './dto/update-subject-grade.dto';
export declare class SubjectGradesService {
    private subjectGradeRepository;
    private subjectRepository;
    constructor(subjectGradeRepository: Repository<SubjectGrade>, subjectRepository: Repository<Subject>);
    findAll(): Promise<SubjectGrade[]>;
    findByGradeLevel(gradeLevel: number): Promise<SubjectGrade[]>;
    findBySubjectId(subjectId: number): Promise<SubjectGrade[]>;
    findSubjectsByGradeLevel(gradeLevel: number): Promise<Subject[]>;
    findGradesBySubjectId(subjectId: number): Promise<number[]>;
    findOne(id: number): Promise<SubjectGrade>;
    create(createSubjectGradeDto: CreateSubjectGradeDto): Promise<SubjectGrade>;
    update(id: number, updateSubjectGradeDto: UpdateSubjectGradeDto): Promise<SubjectGrade>;
    remove(id: number): Promise<void>;
    findAllSubjectsByGrades(): Promise<any[]>;
}
