import { ExamQuestionsService } from './exam-questions.service';
import { CreateExamQuestionDto } from './dto/create-exam-question.dto';
import { UpdateExamQuestionDto } from './dto/update-exam-question.dto';
export declare class ExamQuestionsController {
    private readonly examQuestionsService;
    constructor(examQuestionsService: ExamQuestionsService);
    create(createExamQuestionDto: CreateExamQuestionDto): Promise<any>;
    findAll(): Promise<any[]>;
    findByExam(examId: number): Promise<any[]>;
    findOne(id: number): Promise<any>;
    update(id: number, updateExamQuestionDto: UpdateExamQuestionDto): Promise<any>;
    remove(id: number): Promise<void>;
}
