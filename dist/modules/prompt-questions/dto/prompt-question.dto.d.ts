export declare class PromptQuestionDto {
    id?: number;
    grade?: string;
    domain?: string;
    topic?: string;
    bloom_level?: string;
    skills_knowledge?: string;
    tarl_level?: string;
    difficulty?: string;
    question_title: string;
    question_content: string;
    response?: string;
    tags?: string;
    source_file?: string;
    is_suggestion?: boolean;
    created_at?: Date;
}
export declare class SearchPromptQuestionDto {
    content: string;
}
export declare class MarkAsSuggestionDto {
    is_suggestion: boolean;
}
export declare class SuggestedPromptResponseDto {
    id: number;
    question_title: string;
    question_content: string;
    response?: string;
    source_file?: string;
    tags?: string;
    is_suggestion: boolean;
}
