import { Repository } from 'typeorm';
import { Answer } from '../../entities/answer.entity';
import { Question } from '../../entities/question.entity';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
export declare class AnswersService {
    private answerRepository;
    private questionRepository;
    constructor(answerRepository: Repository<Answer>, questionRepository: Repository<Question>);
    findAll(): Promise<Answer[]>;
    findOne(id: number): Promise<Answer>;
    findByQuestionId(questionId: number): Promise<Answer[]>;
    findQuestionWithAnswers(questionId: number): Promise<any>;
    findByQuestionIdAndIsCorrect(questionId: number, isCorrect: boolean): Promise<Answer[]>;
    findByQuestionIdOrderByOrderIndex(questionId: number): Promise<Answer[]>;
    findByQuestionIdOrderByDisplayOrder(questionId: number): Promise<Answer[]>;
    create(createAnswerDto: CreateAnswerDto): Promise<Answer>;
    createAll(createAnswerDtos: CreateAnswerDto[]): Promise<Answer[]>;
    update(id: number, updateAnswerDto: UpdateAnswerDto): Promise<Answer>;
    updateAnswerOrders(questionId: number, answerIds: number[], displayOrder: boolean): Promise<void>;
    remove(id: number): Promise<void>;
    removeByQuestionId(questionId: number): Promise<void>;
    removeAll(ids: number[]): Promise<void>;
    checkMultipleChoiceAnswer(questionId: number, submittedAnswerIds: number[]): Promise<boolean>;
    checkMultipleSelectAnswer(questionId: number, submittedAnswerIds: number[]): Promise<boolean>;
    checkTrueFalseAnswer(questionId: number, submittedAnswerId: number): Promise<boolean>;
    checkMatchingAnswer(questionId: number, submittedMatches: {
        key: string;
        value: string;
    }[]): Promise<boolean>;
    checkOrderingAnswer(questionId: number, submittedAnswerIds: number[]): Promise<boolean>;
    checkDragAndDropAnswer(questionId: number, submittedAnswerIds: number[]): Promise<boolean>;
    private cleanMetadata;
}
