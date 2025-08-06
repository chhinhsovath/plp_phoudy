import { IntentType } from '../config/gemini.constants';
export declare class IntentDetector {
    private static readonly patterns;
    static detectIntent(message: string): IntentType;
    static getConfidenceScore(message: string, intent: IntentType): number;
    static getAlternativeIntents(message: string, limit?: number): Array<{
        intent: IntentType;
        score: number;
    }>;
    static requiresRealData(intent: IntentType): boolean;
}
