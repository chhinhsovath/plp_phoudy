export declare class BasePrompts {
    static getCorePrinciples(teacherTitle: string): string;
    static getMathInstructions(teacherTitle: string): string;
    static getMathTopics(): string;
    static getSVGInstructions(): string;
    static getDateInstructions(currentDate: string): string;
    static getContextualInstructions(isFirstInteraction: boolean): string;
}
