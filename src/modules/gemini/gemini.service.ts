import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { StudentsService } from '../students/students.service';
import { AnalysisService } from '../analysis/analysis.service';
import { GEMINI_CONFIG, IntentType } from './config/gemini.constants';
import { PromptTemplate } from './templates/prompt-template';
import { DataValidator } from './validators/data-validator';
import { GeminiErrorHandler } from './utils/error-handler';
import { TextProcessor } from './utils/text-processor';
import { IntentDetector } from './utils/intent-detector';
import { DataProcessor } from './processors/data-processor';

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);
  private readonly geminiApiKey: string;
  private readonly geminiApiUrl = GEMINI_CONFIG.API.GEMINI_URL;

  constructor(
    private configService: ConfigService,
    private studentsService: StudentsService,
    private analysisService: AnalysisService,
  ) {
    // Get API key from environment or fallback to hardcoded for testing
    this.geminiApiKey =
      this.configService.get<string>('GEMINI_API_KEY') ||
      'AIzaSyD_alkGPOHmYhNebSm5zkcNOwmhbZglpqE';
    this.logger.log('Gemini service initialized with API key');
  }

  async sendMessageToGemini(
    message: string,
    teacherTitle: string,
    isFirstInteraction: boolean,
    studentData?: unknown,
    classData?: unknown,
    teacherUserId?: number,
    classId?: number,
  ): Promise<string> {
    const startTime = Date.now();
    let intent: IntentType = 'general'; // Initialize intent variable
    const context = {
      operation: 'sendMessageToGemini',
      classId,
      teacherUserId,
    };

    try {
      // Validate inputs
      DataValidator.validateMessage(message);
      DataValidator.validateTeacherTitle(teacherTitle);

      // Detect intent
      intent = IntentDetector.detectIntent(message);
      this.logger.log(`Detected intent: ${intent}`);

      // Process and validate data
      const { validStudentData, validClassData, errors } =
        DataProcessor.validateAndCleanData(studentData, classData);

      if (errors.length > 0) {
        this.logger.warn('Data validation warnings:', errors);
        // Continue processing but ensure we handle potential data quality issues
        // These warnings help identify data inconsistencies but don't break the flow
      }

      // Fetch real data if needed
      let realStudentData = validStudentData;
      let realClassData = validClassData;

      if (
        (classId || teacherUserId) &&
        (IntentDetector.requiresRealData(intent) || intent === 'general')
      ) {
        try {
          if (classId) {
            this.logger.log(
              `Fetching comprehensive analysis for classId: ${classId}`,
            );
            const analysisData =
              await this.analysisService.getClassAnalysis(classId);
            this.logger.log(
              `Found class analysis with ${analysisData.students.length} students`,
            );

            const processedData =
              DataProcessor.processAnalysisData(analysisData);
            realStudentData = processedData.studentData;
            realClassData = processedData.classData;

            this.logger.log(
              'Real comprehensive analysis data processed successfully',
            );
          } else if (teacherUserId) {
            this.logger.log(
              `Fetching data for teacherUserId: ${teacherUserId}`,
            );
            const students =
              await this.studentsService.findByTeacherUserId(teacherUserId);
            this.logger.log(`Found ${students.length} students`);

            const processedData = DataProcessor.processFallbackData(
              teacherUserId,
              students,
            );
            realStudentData = processedData.studentData;
            realClassData = processedData.classData;

            this.logger.log('Real data set successfully from teacherUserId');
          }
        } catch (error: any) {
          const errorResult = GeminiErrorHandler.handleDataFetchError({
            ...context,
            intent,
            originalError: error,
          });

          if (errorResult.shouldContinue) {
            this.logger.warn(errorResult.fallbackMessage);
          }
        }
      }

      // Build optimized prompt
      const promptWithInstructions = PromptTemplate.create({
        message,
        teacherTitle,
        isFirstInteraction,
        intent,
        studentData: realStudentData,
        classData: realClassData,
      });

      const optimizedPrompt = TextProcessor.optimizePrompt(
        promptWithInstructions,
      );

      // Create request body
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: optimizedPrompt,
              },
            ],
          },
        ],
        generationConfig: GEMINI_CONFIG.API.GENERATION_CONFIG,
      };

      // Make API call
      const url = `${this.geminiApiUrl}?key=${this.geminiApiKey}`;
      this.logger.log('Calling Gemini API...');

      try {
        const response = await axios.post(url, requestBody);

        // Validate response structure
        GeminiErrorHandler.validateApiResponse(response, {
          ...context,
          intent,
        });

        let aiResponse: string =
          response.data.candidates[0].content.parts[0].text;

        // Process response
        aiResponse = TextProcessor.replaceVietnameseWords(aiResponse);
        aiResponse = TextProcessor.validateSVGContent(aiResponse);
        aiResponse = TextProcessor.normalizeText(aiResponse);

        GeminiErrorHandler.logPerformanceMetrics(
          context.operation,
          startTime,
          true,
        );
        return aiResponse;
      } catch (apiError: any) {
        GeminiErrorHandler.handleApiError(apiError, { ...context, intent });
      }
    } catch (error: any) {
      GeminiErrorHandler.logPerformanceMetrics(
        context.operation,
        startTime,
        false,
      );

      // Return fallback response for processing errors
      if (error instanceof Error && !error.message.includes('HttpException')) {
        this.logger.error('Unexpected error in sendMessageToGemini:', error);
        return GeminiErrorHandler.createFallbackResponse({
          ...context,
          intent,
        });
      }

      throw error;
    }
  }
}
