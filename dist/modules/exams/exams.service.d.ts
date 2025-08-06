import { Repository } from 'typeorm';
import { Exam } from '../../entities/exam.entity';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { GradeLevelType } from '../../entities/class.entity';
import { ExamQuestionsService } from '../exam-questions/exam-questions.service';
export declare class ExamsService {
    private examRepository;
    private examQuestionsService;
    constructor(examRepository: Repository<Exam>, examQuestionsService: ExamQuestionsService);
    findAll(includeQuestions?: boolean): Promise<any[]>;
    findBySubject(subjectId: number, includeQuestions?: boolean): Promise<any[]>;
    findByGradeLevel(gradeLevel: GradeLevelType, includeQuestions?: boolean): Promise<any[]>;
    findOne(id: number): Promise<any>;
    create(createExamDto: CreateExamDto): Promise<any>;
    private extractQuestionIds;
    private extractQuestionIdsFromPoints;
    private findActivityQuestionKey;
    private findPointsKey;
    update(id: number, updateExamDto: UpdateExamDto): Promise<any>;
    remove(id: number): Promise<void>;
    private formatExamResponse;
}
