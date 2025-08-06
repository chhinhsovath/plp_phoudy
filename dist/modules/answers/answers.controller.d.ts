import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from '../../entities/answer.entity';
export declare class AnswersController {
    private readonly answersService;
    constructor(answersService: AnswersService);
    create(createAnswerDto: CreateAnswerDto): Promise<Answer>;
    createAll(createAnswerDtos: CreateAnswerDto[]): Promise<Answer[]>;
    findAll(): Promise<Answer[]>;
    findOne(id: number): Promise<Answer>;
    findByQuestionId(questionId: number): Promise<any>;
    findAnswersByQuestionId(questionId: number): Promise<Answer[]>;
    findByQuestionIdOrdered(questionId: number): Promise<Answer[]>;
    findByQuestionIdDisplayOrdered(questionId: number): Promise<Answer[]>;
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
}
