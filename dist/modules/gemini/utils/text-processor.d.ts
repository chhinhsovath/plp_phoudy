export declare class TextProcessor {
    static replaceVietnameseWords(text: string): string;
    static optimizePrompt(prompt: string): string;
    static compressInstructions(instructions: string): string;
    static truncateForTokenLimit(text: string, maxLength?: number): string;
    static normalizeText(text: string): string;
    static extractKeyInfo(data: any): string;
    static validateSVGContent(text: string): string;
}
