"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var GeminiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
const students_service_1 = require("../students/students.service");
const analysis_service_1 = require("../analysis/analysis.service");
const gemini_constants_1 = require("./config/gemini.constants");
const prompt_template_1 = require("./templates/prompt-template");
const data_validator_1 = require("./validators/data-validator");
const error_handler_1 = require("./utils/error-handler");
const text_processor_1 = require("./utils/text-processor");
const intent_detector_1 = require("./utils/intent-detector");
const data_processor_1 = require("./processors/data-processor");
let GeminiService = GeminiService_1 = class GeminiService {
    configService;
    studentsService;
    analysisService;
    logger = new common_1.Logger(GeminiService_1.name);
    geminiApiKey;
    geminiApiUrl = gemini_constants_1.GEMINI_CONFIG.API.GEMINI_URL;
    constructor(configService, studentsService, analysisService) {
        this.configService = configService;
        this.studentsService = studentsService;
        this.analysisService = analysisService;
        this.geminiApiKey =
            this.configService.get('GEMINI_API_KEY') ||
                'AIzaSyD_alkGPOHmYhNebSm5zkcNOwmhbZglpqE';
        this.logger.log('Gemini service initialized with API key');
    }
    async sendMessageToGemini(message, teacherTitle, isFirstInteraction, studentData, classData, teacherUserId, classId) {
        const startTime = Date.now();
        let intent = 'general';
        const context = {
            operation: 'sendMessageToGemini',
            classId,
            teacherUserId,
        };
        try {
            data_validator_1.DataValidator.validateMessage(message);
            data_validator_1.DataValidator.validateTeacherTitle(teacherTitle);
            intent = intent_detector_1.IntentDetector.detectIntent(message);
            this.logger.log(`Detected intent: ${intent}`);
            const { validStudentData, validClassData, errors } = data_processor_1.DataProcessor.validateAndCleanData(studentData, classData);
            if (errors.length > 0) {
                this.logger.warn('Data validation warnings:', errors);
            }
            let realStudentData = validStudentData;
            let realClassData = validClassData;
            if ((classId || teacherUserId) &&
                (intent_detector_1.IntentDetector.requiresRealData(intent) || intent === 'general')) {
                try {
                    if (classId) {
                        this.logger.log(`Fetching comprehensive analysis for classId: ${classId}`);
                        const analysisData = await this.analysisService.getClassAnalysis(classId);
                        this.logger.log(`Found class analysis with ${analysisData.students.length} students`);
                        const processedData = data_processor_1.DataProcessor.processAnalysisData(analysisData);
                        realStudentData = processedData.studentData;
                        realClassData = processedData.classData;
                        this.logger.log('Real comprehensive analysis data processed successfully');
                    }
                    else if (teacherUserId) {
                        this.logger.log(`Fetching data for teacherUserId: ${teacherUserId}`);
                        const students = await this.studentsService.findByTeacherUserId(teacherUserId);
                        this.logger.log(`Found ${students.length} students`);
                        const processedData = data_processor_1.DataProcessor.processFallbackData(teacherUserId, students);
                        realStudentData = processedData.studentData;
                        realClassData = processedData.classData;
                        this.logger.log('Real data set successfully from teacherUserId');
                    }
                }
                catch (error) {
                    const errorResult = error_handler_1.GeminiErrorHandler.handleDataFetchError({
                        ...context,
                        intent,
                        originalError: error,
                    });
                    if (errorResult.shouldContinue) {
                        this.logger.warn(errorResult.fallbackMessage);
                    }
                }
            }
            const promptWithInstructions = prompt_template_1.PromptTemplate.create({
                message,
                teacherTitle,
                isFirstInteraction,
                intent,
                studentData: realStudentData,
                classData: realClassData,
            });
            const optimizedPrompt = text_processor_1.TextProcessor.optimizePrompt(promptWithInstructions);
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
                generationConfig: gemini_constants_1.GEMINI_CONFIG.API.GENERATION_CONFIG,
            };
            const url = `${this.geminiApiUrl}?key=${this.geminiApiKey}`;
            this.logger.log('Calling Gemini API...');
            try {
                const response = await axios_1.default.post(url, requestBody);
                error_handler_1.GeminiErrorHandler.validateApiResponse(response, {
                    ...context,
                    intent,
                });
                let aiResponse = response.data.candidates[0].content.parts[0].text;
                aiResponse = text_processor_1.TextProcessor.replaceVietnameseWords(aiResponse);
                aiResponse = text_processor_1.TextProcessor.validateSVGContent(aiResponse);
                aiResponse = text_processor_1.TextProcessor.normalizeText(aiResponse);
                error_handler_1.GeminiErrorHandler.logPerformanceMetrics(context.operation, startTime, true);
                return aiResponse;
            }
            catch (apiError) {
                error_handler_1.GeminiErrorHandler.handleApiError(apiError, { ...context, intent });
            }
        }
        catch (error) {
            error_handler_1.GeminiErrorHandler.logPerformanceMetrics(context.operation, startTime, false);
            if (error instanceof Error && !error.message.includes('HttpException')) {
                this.logger.error('Unexpected error in sendMessageToGemini:', error);
                return error_handler_1.GeminiErrorHandler.createFallbackResponse({
                    ...context,
                    intent,
                });
            }
            throw error;
        }
    }
};
exports.GeminiService = GeminiService;
exports.GeminiService = GeminiService = GeminiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        students_service_1.StudentsService,
        analysis_service_1.AnalysisService])
], GeminiService);
//# sourceMappingURL=gemini.service.js.map