import { PromptQuestionsService } from './prompt-questions.service';
import { PromptQuestion } from '../../entities/prompt-question.entity';
import { MarkAsSuggestionDto, SuggestedPromptResponseDto } from './dto/prompt-question.dto';
export declare class PromptQuestionsController {
    private readonly promptQuestionsService;
    private readonly logger;
    constructor(promptQuestionsService: PromptQuestionsService);
    searchQuestions(content: string, limit?: number): Promise<any>;
    private calculateRelevanceScore;
    private categorizeQuestion;
    private calculateConfidenceScore;
    getSuggestedPrompts(limit?: number): Promise<{
        suggestions: SuggestedPromptResponseDto[];
    }>;
    markAsSuggestion(id: number, markAsSuggestionDto: MarkAsSuggestionDto): Promise<PromptQuestion>;
    getAllQuestions(): Promise<PromptQuestion[]>;
    deleteQuestion(id: number): Promise<void>;
}
