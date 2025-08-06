import { Repository } from 'typeorm';
import { QuestionType } from '../../entities/question-type.entity';
import { CreateQuestionTypeDto } from './dto/create-question-type.dto';
import { UpdateQuestionTypeDto } from './dto/update-question-type.dto';
export declare class QuestionTypesService {
    private questionTypeRepository;
    constructor(questionTypeRepository: Repository<QuestionType>);
    create(createQuestionTypeDto: CreateQuestionTypeDto): Promise<QuestionType>;
    findAll(page?: number, limit?: number): Promise<any>;
    findOne(id: number): Promise<QuestionType>;
    findByTypeKey(typeKey: string): Promise<QuestionType | null>;
    update(id: number, updateQuestionTypeDto: UpdateQuestionTypeDto): Promise<QuestionType>;
    remove(id: number): Promise<void>;
    findActive(): Promise<QuestionType[]>;
}
