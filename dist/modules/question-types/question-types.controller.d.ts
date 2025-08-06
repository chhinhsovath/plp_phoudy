import { QuestionTypesService } from './question-types.service';
import { CreateQuestionTypeDto } from './dto/create-question-type.dto';
import { UpdateQuestionTypeDto } from './dto/update-question-type.dto';
export declare class QuestionTypesController {
    private readonly questionTypesService;
    constructor(questionTypesService: QuestionTypesService);
    create(createQuestionTypeDto: CreateQuestionTypeDto): Promise<import("../../entities/question-type.entity").QuestionType>;
    findAll(page?: number, limit?: number): Promise<any>;
    findActive(): Promise<import("../../entities/question-type.entity").QuestionType[]>;
    findOne(id: number): Promise<import("../../entities/question-type.entity").QuestionType>;
    update(id: number, updateQuestionTypeDto: UpdateQuestionTypeDto): Promise<import("../../entities/question-type.entity").QuestionType>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
