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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AnalysisController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const analysis_service_1 = require("./analysis.service");
const class_analysis_response_dto_1 = require("./dto/class-analysis-response.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let AnalysisController = AnalysisController_1 = class AnalysisController {
    analysisService;
    logger = new common_1.Logger(AnalysisController_1.name);
    constructor(analysisService) {
        this.analysisService = analysisService;
    }
    async getClassAnalysis(classId, studentId, gradeLevel, subjectId, lessonNumbers) {
        this.logger.log(`Handling GET /analysis/class/${classId} request with filters: studentId=${studentId || 'none'}, gradeLevel=${gradeLevel || 'none'}, subjectId=${subjectId || 'none'}, lessonNumbers=${lessonNumbers || 'none'}`);
        const parsedLessonNumbers = lessonNumbers
            ? lessonNumbers.split(',').map((num) => parseInt(num.trim(), 10))
            : undefined;
        try {
            return await this.analysisService.getClassAnalysis(classId, studentId, gradeLevel, subjectId, parsedLessonNumbers);
        }
        catch (error) {
            this.logger.error(`Error in getClassAnalysis: ${error.message}`, error.stack);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.NotFoundException('Failed to retrieve class analysis data');
        }
    }
};
exports.AnalysisController = AnalysisController;
__decorate([
    (0, common_1.Get)('class/:classId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get analysis data for a specific class' }),
    (0, swagger_1.ApiParam)({ name: 'classId', description: 'Class ID', type: Number }),
    (0, swagger_1.ApiQuery)({
        name: 'studentId',
        required: false,
        description: 'Filter by student ID',
        type: Number,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'gradeLevel',
        required: false,
        description: 'Filter by grade level',
        type: String,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'subjectId',
        required: false,
        description: 'Filter by subject ID',
        type: Number,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'lessonNumbers',
        required: false,
        description: 'Filter by lesson numbers, comma-separated',
        example: '1,2,3',
        type: String,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns analysis data for the class with students grouped',
        type: class_analysis_response_dto_1.ClassAnalysisResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'No analysis data found' }),
    (0, roles_decorator_1.Roles)('TEACHER', 'ADMIN'),
    __param(0, (0, common_1.Param)('classId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('studentId')),
    __param(2, (0, common_1.Query)('gradeLevel')),
    __param(3, (0, common_1.Query)('subjectId')),
    __param(4, (0, common_1.Query)('lessonNumbers')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, Number, String]),
    __metadata("design:returntype", Promise)
], AnalysisController.prototype, "getClassAnalysis", null);
exports.AnalysisController = AnalysisController = AnalysisController_1 = __decorate([
    (0, swagger_1.ApiTags)('Analysis'),
    (0, common_1.Controller)('analysis'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [analysis_service_1.AnalysisService])
], AnalysisController);
//# sourceMappingURL=analysis.controller.js.map