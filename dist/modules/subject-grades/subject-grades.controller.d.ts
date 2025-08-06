import { SubjectGradesService } from './subject-grades.service';
import { CreateSubjectGradeDto } from './dto/create-subject-grade.dto';
import { UpdateSubjectGradeDto } from './dto/update-subject-grade.dto';
import { SubjectGrade } from '../../entities/subject-grade.entity';
import { Subject } from '../../entities/subject.entity';
export declare class SubjectGradesController {
    private readonly subjectGradesService;
    private readonly logger;
    constructor(subjectGradesService: SubjectGradesService);
    findAll(): Promise<SubjectGrade[]>;
    findAllSubjectsByGrades(): Promise<any[]>;
    findByGradeLevel(gradeLevel: string): Promise<SubjectGrade[]>;
    findBySubjectId(subjectId: string): Promise<SubjectGrade[]>;
    findSubjectsByGradeLevel(gradeLevel: string): Promise<Subject[]>;
    findGradesBySubjectId(subjectId: string): Promise<number[]>;
    findOne(id: string): Promise<SubjectGrade>;
    create(createSubjectGradeDto: CreateSubjectGradeDto): Promise<SubjectGrade>;
    update(id: string, updateSubjectGradeDto: UpdateSubjectGradeDto): Promise<SubjectGrade>;
    remove(id: string): Promise<void>;
}
