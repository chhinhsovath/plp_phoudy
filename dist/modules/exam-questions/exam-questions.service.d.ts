import { Repository } from 'typeorm';
import { ExamQuestion } from '../../entities/exam-question.entity';
import { CreateExamQuestionDto } from './dto/create-exam-question.dto';
import { UpdateExamQuestionDto } from './dto/update-exam-question.dto';
export declare class ExamQuestionsService {
    private examQuestionRepository;
    constructor(examQuestionRepository: Repository<ExamQuestion>);
    findAll(): Promise<any[]>;
    findByExam(examId: number): Promise<any[]>;
    findOne(id: number): Promise<any>;
    create(createExamQuestionDto: CreateExamQuestionDto): Promise<any>;
    update(id: number, updateExamQuestionDto: UpdateExamQuestionDto): Promise<any>;
    remove(id: number): Promise<void>;
    createMultiple(examQuestions: CreateExamQuestionDto[]): Promise<any[]>;
    private formatExamQuestionResponse;
}
