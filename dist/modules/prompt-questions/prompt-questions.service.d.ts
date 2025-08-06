import { Repository } from 'typeorm';
import { PromptQuestion } from '../../entities/prompt-question.entity';
import { SuggestedPromptResponseDto } from './dto/prompt-question.dto';
export declare class PromptQuestionsService {
    private promptQuestionRepository;
    private readonly logger;
    constructor(promptQuestionRepository: Repository<PromptQuestion>);
    searchQuestions(content: string): Promise<PromptQuestion[]>;
    getSuggestedPrompts(limit?: number): Promise<SuggestedPromptResponseDto[]>;
    markAsSuggestion(id: number, isSuggestion: boolean): Promise<PromptQuestion>;
    getAllQuestions(): Promise<PromptQuestion[]>;
    deleteQuestion(id: number): Promise<void>;
}
