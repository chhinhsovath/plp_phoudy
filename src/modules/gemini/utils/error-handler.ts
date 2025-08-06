import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export interface ErrorContext {
  operation: string;
  classId?: number;
  teacherUserId?: number;
  intent?: string;
  originalError?: Error;
}

export class GeminiErrorHandler {
  private static readonly logger = new Logger('GeminiErrorHandler');

  static handleDataFetchError(context: ErrorContext): {
    shouldContinue: boolean;
    fallbackMessage?: string;
  } {
    const { operation, classId, teacherUserId, originalError } = context;

    this.logger.warn(
      `Data fetch failed for ${operation}. ClassId: ${classId}, TeacherUserId: ${teacherUserId}`,
      originalError?.stack,
    );

    // Always continue with fallback data for now
    return {
      shouldContinue: true,
      fallbackMessage: 'Using provided fallback data due to data fetch error',
    };
  }

  static handleApiError(error: any, context: ErrorContext): never {
    this.logger.error(
      `Gemini API error in ${context.operation}`,
      error?.response?.data || error?.message || error,
    );

    if (error?.response?.status === 429) {
      throw new HttpException(
        'Rate limit exceeded. Please try again later.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    if (error?.response?.status === 401 || error?.response?.status === 403) {
      throw new HttpException(
        'Authentication failed with Gemini API',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (error?.code === 'ECONNREFUSED' || error?.code === 'ENOTFOUND') {
      throw new HttpException(
        'Unable to connect to Gemini API. Please check your connection.',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    // Generic API error
    throw new HttpException(
      'External service error. Please try again later.',
      HttpStatus.BAD_GATEWAY,
    );
  }

  static handleResponseProcessingError(
    error: any,
    context: ErrorContext,
  ): never {
    this.logger.error(
      `Response processing error in ${context.operation}`,
      error?.message || error,
    );

    throw new HttpException(
      'Failed to process AI response. Please try again.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  static validateApiResponse(response: any, context: ErrorContext): void {
    if (!response?.data) {
      throw new Error('No data in API response');
    }

    const candidates = response.data?.candidates;
    if (!candidates || !Array.isArray(candidates) || candidates.length === 0) {
      throw new Error('No response candidates from API');
    }

    const firstCandidate = candidates[0];
    if (!firstCandidate?.content) {
      throw new Error('No content in API response candidate');
    }

    const parts = firstCandidate.content.parts;
    if (!parts || !Array.isArray(parts) || parts.length === 0) {
      throw new Error('No parts in API response content');
    }

    if (!parts[0]?.text) {
      throw new Error('No text in API response part');
    }
  }

  static createFallbackResponse(context: ErrorContext): string {
    const { intent } = context;

    const fallbackResponses: Record<string, string> = {
      student_analysis:
        'សូមអភ័យទោសលោកគ្រូ! បច្ចុប្បន្នមិនអាចវិភាគទិន្នន័យសិស្សបានទេ។ សូមព្យាយាមម្តងទៀត។',
      class_summary:
        'សូមអភ័យទោសលោកគ្រូ! បច្ចុប្បន្នមិនអាចបង្កើតរបាយការណ៍ថ្នាក់បានទេ។ សូមព្យាយាមម្តងទៀត។',
      math_performance:
        'សូមអភ័យទោសលោកគ្រូ! បច្ចុប្បន្នមិនអាចវិភាគសមត្ថភាពគណិតបានទេ។ សូមព្យាយាមម្តងទៀត។',
      general:
        'សូមអភ័យទោសលោកគ្រូ! ខ្ញុំមានបញ្ហាបច្ចេកទេសបន្តិច។ សូមព្យាយាមសួរសំណួរម្តងទៀត។',
    };

    return fallbackResponses[intent || 'general'] || fallbackResponses.general;
  }

  static logPerformanceMetrics(
    operation: string,
    startTime: number,
    success: boolean,
  ): void {
    const duration = Date.now() - startTime;
    const status = success ? 'SUCCESS' : 'FAILED';

    this.logger.log(`${operation} completed in ${duration}ms - ${status}`);

    // Log warning for slow operations
    if (duration > 10000) {
      // 10 seconds
      this.logger.warn(
        `Slow operation detected: ${operation} took ${duration}ms`,
      );
    }
  }
}
