import { AnalysisService } from './analysis.service';
import { ClassAnalysisResponseDto } from './dto/class-analysis-response.dto';
export declare class AnalysisController {
    private readonly analysisService;
    private readonly logger;
    constructor(analysisService: AnalysisService);
    getClassAnalysis(classId: number, studentId?: number, gradeLevel?: string, subjectId?: number, lessonNumbers?: string): Promise<ClassAnalysisResponseDto>;
}
