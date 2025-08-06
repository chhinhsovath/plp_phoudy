import { ConfigService } from '@nestjs/config';
import { StudentsService } from '../students/students.service';
import { AnalysisService } from '../analysis/analysis.service';
export declare class GeminiService {
    private configService;
    private studentsService;
    private analysisService;
    private readonly logger;
    private readonly geminiApiKey;
    private readonly geminiApiUrl;
    constructor(configService: ConfigService, studentsService: StudentsService, analysisService: AnalysisService);
    sendMessageToGemini(message: string, teacherTitle: string, isFirstInteraction: boolean, studentData?: unknown, classData?: unknown, teacherUserId?: number, classId?: number): Promise<string>;
}
