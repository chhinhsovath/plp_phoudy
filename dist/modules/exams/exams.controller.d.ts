import { ExamsService } from './exams.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
export declare class ExamsController {
    private readonly examsService;
    private readonly logger;
    constructor(examsService: ExamsService);
    findAll(includeQuestions?: string): Promise<any[]>;
    findBySubject(subjectId: string, includeQuestions?: string): Promise<any[]>;
    findByGradeLevel(gradeLevel: string, includeQuestions?: string): Promise<any[]>;
    findOne(id: string): Promise<any>;
    create(createExamDto: CreateExamDto): Promise<any>;
    update(id: string, updateExamDto: UpdateExamDto): Promise<any>;
    remove(id: string): Promise<void>;
}
