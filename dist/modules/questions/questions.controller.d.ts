import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionWithAnswersDto } from './dto/question-with-answers.dto';
import { CreateQuestionExplanationDto, QuestionExplanationResponseDto } from './dto/question-explanation.dto';
import { Question, QuestionUsage } from '../../entities/question.entity';
import { Status } from '../../entities/enums/status.enum';
export declare class QuestionsController {
    private readonly questionsService;
    constructor(questionsService: QuestionsService);
    getLatestQuestions(): Promise<any[]>;
    getOrderedQuestions(): Promise<any[]>;
    getQuestions(questionTypeId?: string, difficultyLevel?: string, usageType?: string): Promise<any[]>;
    getQuestionById(id: number): Promise<any>;
    getQuestionWithAnswers(id: number): Promise<QuestionWithAnswersDto>;
    create(createQuestionDto: CreateQuestionDto, file?: Express.Multer.File): Promise<Question>;
    update(id: number, updateQuestionDto: UpdateQuestionDto, file?: Express.Multer.File): Promise<Question>;
    updatePatch(id: number, updateQuestionDto: UpdateQuestionDto): Promise<Question>;
    updateQuestionStatus(id: number, status: Status): Promise<Question>;
    remove(id: number): Promise<void>;
    removeQuestions(ids: number[]): Promise<void>;
    updateQuestionOrder(id: number, order: number): Promise<Question>;
    updateQuestionOrders(questionOrders: Record<string, number>): Promise<void>;
    getQuestionsByLessonActivity(lessonActivityId: number): Promise<Question[]>;
    getQuestionsByLessonActivityAndUsageType(lessonActivityId: number, usageType: QuestionUsage): Promise<Question[]>;
    getQuestionExplanation(id: number): Promise<QuestionExplanationResponseDto>;
    createOrUpdateExplanation(id: number, explanationDto: CreateQuestionExplanationDto): Promise<QuestionExplanationResponseDto>;
    deleteExplanation(id: number): Promise<void>;
    fixSequence(): Promise<{
        message: string;
    }>;
}
