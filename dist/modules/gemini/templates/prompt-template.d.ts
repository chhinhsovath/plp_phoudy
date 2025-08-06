import { IntentType } from '../config/gemini.constants';
export interface PromptTemplateOptions {
    message: string;
    teacherTitle: string;
    isFirstInteraction: boolean;
    intent: IntentType;
    studentData?: unknown;
    classData?: unknown;
}
export declare class PromptTemplate {
    private options;
    constructor(options: PromptTemplateOptions);
    build(): string;
    private getSystemPrompt;
    private buildGeneralTemplate;
    private getContextAndMessage;
    static create(options: PromptTemplateOptions): string;
}
