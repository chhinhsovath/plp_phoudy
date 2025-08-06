export interface ErrorContext {
    operation: string;
    classId?: number;
    teacherUserId?: number;
    intent?: string;
    originalError?: Error;
}
export declare class GeminiErrorHandler {
    private static readonly logger;
    static handleDataFetchError(context: ErrorContext): {
        shouldContinue: boolean;
        fallbackMessage?: string;
    };
    static handleApiError(error: any, context: ErrorContext): never;
    static handleResponseProcessingError(error: any, context: ErrorContext): never;
    static validateApiResponse(response: any, context: ErrorContext): void;
    static createFallbackResponse(context: ErrorContext): string;
    static logPerformanceMetrics(operation: string, startTime: number, success: boolean): void;
}
