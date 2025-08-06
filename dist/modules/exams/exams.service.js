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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const exam_entity_1 = require("../../entities/exam.entity");
const exam_questions_service_1 = require("../exam-questions/exam-questions.service");
let ExamsService = class ExamsService {
    examRepository;
    examQuestionsService;
    constructor(examRepository, examQuestionsService) {
        this.examRepository = examRepository;
        this.examQuestionsService = examQuestionsService;
    }
    async findAll(includeQuestions = false) {
        const exams = await this.examRepository.find({
            relations: [
                'examinationCategory',
                'examinationCategory.subject',
                'examinationCategory.subSubject',
                'examinationCategory.subSubject.subject',
            ],
        });
        if (includeQuestions) {
            const examsWithQuestions = await Promise.all(exams.map(async (exam) => {
                const examQuestions = await this.examQuestionsService.findByExam(exam.id);
                return {
                    ...this.formatExamResponse(exam),
                    questions: examQuestions,
                    totalQuestions: examQuestions.length,
                    totalPoints: examQuestions.reduce((sum, q) => sum + (q.points || 0), 0),
                };
            }));
            return examsWithQuestions;
        }
        return exams.map((exam) => this.formatExamResponse(exam));
    }
    async findBySubject(subjectId, includeQuestions = false) {
        const exams = await this.examRepository.find({
            where: [
                { examinationCategory: { subjectId } },
                { examinationCategory: { subSubject: { subjectId } } },
            ],
            relations: [
                'examinationCategory',
                'examinationCategory.subject',
                'examinationCategory.subSubject',
                'examinationCategory.subSubject.subject',
            ],
        });
        if (includeQuestions) {
            const examsWithQuestions = await Promise.all(exams.map(async (exam) => {
                const examQuestions = await this.examQuestionsService.findByExam(exam.id);
                return {
                    ...this.formatExamResponse(exam),
                    questions: examQuestions,
                    totalQuestions: examQuestions.length,
                    totalPoints: examQuestions.reduce((sum, q) => sum + (q.points || 0), 0),
                };
            }));
            return examsWithQuestions;
        }
        return exams.map((exam) => this.formatExamResponse(exam));
    }
    async findByGradeLevel(gradeLevel, includeQuestions = false) {
        const exams = await this.examRepository.find({
            where: { examinationCategory: { grade: gradeLevel } },
            relations: [
                'examinationCategory',
                'examinationCategory.subject',
                'examinationCategory.subSubject',
                'examinationCategory.subSubject.subject',
            ],
        });
        if (includeQuestions) {
            const examsWithQuestions = await Promise.all(exams.map(async (exam) => {
                const examQuestions = await this.examQuestionsService.findByExam(exam.id);
                return {
                    ...this.formatExamResponse(exam),
                    questions: examQuestions,
                    totalQuestions: examQuestions.length,
                    totalPoints: examQuestions.reduce((sum, q) => sum + (q.points || 0), 0),
                };
            }));
            return examsWithQuestions;
        }
        return exams.map((exam) => this.formatExamResponse(exam));
    }
    async findOne(id) {
        if (isNaN(id) || id <= 0) {
            throw new common_1.NotFoundException(`Invalid exam ID: ${id}`);
        }
        const exam = await this.examRepository.findOne({
            where: { id },
            relations: [
                'examinationCategory',
                'examinationCategory.subject',
                'examinationCategory.subSubject',
                'examinationCategory.subSubject.subject',
            ],
        });
        if (!exam) {
            throw new common_1.NotFoundException(`Exam with ID ${id} not found`);
        }
        const examQuestions = await this.examQuestionsService.findByExam(id);
        return {
            ...this.formatExamResponse(exam),
            questions: examQuestions,
            totalQuestions: examQuestions.length,
            totalPoints: examQuestions.reduce((sum, q) => sum + (q.points || 0), 0),
        };
    }
    async create(createExamDto) {
        const totalPoints = Object.values(createExamDto.questionPoints).reduce((sum, points) => sum + points, 0);
        if (totalPoints !== 100) {
            throw new common_1.BadRequestException(`Total question points must equal 100, but got ${totalPoints}`);
        }
        const selectedQuestionIds = this.extractQuestionIdsFromPoints(createExamDto);
        if (selectedQuestionIds.length === 0) {
            throw new common_1.BadRequestException('At least one question must be selected for the exam');
        }
        if (createExamDto.responseCount > selectedQuestionIds.length) {
            throw new common_1.BadRequestException(`Response count (${createExamDto.responseCount}) cannot exceed total selected questions (${selectedQuestionIds.length})`);
        }
        const exam = new exam_entity_1.Exam();
        exam.title = createExamDto.title;
        exam.timeLimit = createExamDto.timeLimit;
        exam.passingScore = createExamDto.passingScore;
        exam.responseCount = createExamDto.responseCount;
        exam.questionsPerBatch = createExamDto.questionsPerBatch || null;
        exam.examinationCategoryId = createExamDto.examinationCategoryId;
        exam.status = createExamDto.status || 'ACTIVE';
        if (createExamDto.timeSpent !== undefined) {
            exam.timeSpent = createExamDto.timeSpent;
        }
        if (createExamDto.averagePoint !== undefined) {
            exam.averagePoint = createExamDto.averagePoint;
        }
        const savedExam = await this.examRepository.save(exam);
        const examQuestions = selectedQuestionIds.map((questionId) => {
            const pointsKey = this.findPointsKey(createExamDto, questionId);
            const points = createExamDto.questionPoints[pointsKey];
            return {
                examId: savedExam.id,
                questionId: parseInt(questionId),
                points: points,
            };
        });
        await this.examQuestionsService.createMultiple(examQuestions);
        const examWithCategory = await this.examRepository.findOne({
            where: { id: savedExam.id },
            relations: [
                'examinationCategory',
                'examinationCategory.subject',
                'examinationCategory.subSubject',
                'examinationCategory.subSubject.subject',
            ],
        });
        if (!examWithCategory) {
            throw new common_1.NotFoundException(`Exam with ID ${savedExam.id} not found`);
        }
        return this.formatExamResponse(examWithCategory);
    }
    extractQuestionIds(createExamDto) {
        const questionIds = [];
        for (const [activityId, questionIdArray] of Object.entries(createExamDto.selectedQuestions)) {
            questionIds.push(...questionIdArray);
        }
        return questionIds;
    }
    extractQuestionIdsFromPoints(createExamDto) {
        const questionIds = [];
        for (const [activityId, questionIdArray] of Object.entries(createExamDto.selectedQuestions)) {
            questionIds.push(...questionIdArray);
        }
        if (questionIds.length === 0) {
            for (const key of Object.keys(createExamDto.questionPoints)) {
                if (key.startsWith('existing-')) {
                    const questionId = key.replace('existing-', '');
                    questionIds.push(questionId);
                }
                else if (key.includes('-')) {
                    const parts = key.split('-');
                    const questionId = parts[parts.length - 1];
                    questionIds.push(questionId);
                }
            }
        }
        return questionIds;
    }
    findActivityQuestionKey(createExamDto, questionId) {
        for (const [activityId, questionIdArray] of Object.entries(createExamDto.selectedQuestions)) {
            if (questionIdArray.includes(questionId)) {
                return `${activityId}-${questionId}`;
            }
        }
        throw new common_1.BadRequestException(`Question ID ${questionId} not found in selectedQuestions`);
    }
    findPointsKey(createExamDto, questionId) {
        const existingKey = `existing-${questionId}`;
        if (createExamDto.questionPoints[existingKey] !== undefined) {
            return existingKey;
        }
        try {
            return this.findActivityQuestionKey(createExamDto, questionId);
        }
        catch {
            for (const key of Object.keys(createExamDto.questionPoints)) {
                if (key.endsWith(`-${questionId}`)) {
                    return key;
                }
            }
            throw new common_1.BadRequestException(`Question ID ${questionId} not found in questionPoints`);
        }
    }
    async update(id, updateExamDto) {
        const exam = await this.examRepository.findOne({
            where: { id },
            relations: [
                'examinationCategory',
                'examinationCategory.subject',
                'examinationCategory.subSubject',
                'examinationCategory.subSubject.subject',
            ],
        });
        if (!exam) {
            throw new common_1.NotFoundException(`Exam with ID ${id} not found`);
        }
        if (updateExamDto.title !== undefined) {
            exam.title = updateExamDto.title;
        }
        if (updateExamDto.timeLimit !== undefined) {
            exam.timeLimit = updateExamDto.timeLimit;
        }
        if (updateExamDto.passingScore !== undefined) {
            exam.passingScore = updateExamDto.passingScore;
        }
        if (updateExamDto.responseCount !== undefined) {
            exam.responseCount = updateExamDto.responseCount;
        }
        if (updateExamDto.questionsPerBatch !== undefined) {
            exam.questionsPerBatch = updateExamDto.questionsPerBatch;
        }
        if (updateExamDto.timeSpent !== undefined) {
            exam.timeSpent = updateExamDto.timeSpent;
        }
        if (updateExamDto.averagePoint !== undefined) {
            exam.averagePoint = updateExamDto.averagePoint;
        }
        if (updateExamDto.examinationCategoryId !== undefined) {
            exam.examinationCategoryId = updateExamDto.examinationCategoryId;
        }
        const savedExam = await this.examRepository.save(exam);
        const examWithCategory = await this.examRepository.findOne({
            where: { id: savedExam.id },
            relations: [
                'examinationCategory',
                'examinationCategory.subject',
                'examinationCategory.subSubject',
                'examinationCategory.subSubject.subject',
            ],
        });
        if (!examWithCategory) {
            throw new common_1.NotFoundException(`Exam with ID ${savedExam.id} not found`);
        }
        return this.formatExamResponse(examWithCategory);
    }
    async remove(id) {
        const result = await this.examRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Exam with ID ${id} not found`);
        }
    }
    formatExamResponse(exam) {
        return {
            id: exam.id,
            title: exam.title,
            timeSpent: exam.timeSpent,
            timeLimit: exam.timeLimit,
            averagePoint: exam.averagePoint,
            passingScore: exam.passingScore,
            responseCount: exam.responseCount,
            questionsPerBatch: exam.questionsPerBatch,
            status: exam.status,
            examinationCategoryId: exam.examinationCategoryId,
            examinationCategoryTitle: exam.examinationCategory?.title || null,
            subjectId: exam.examinationCategory?.subjectId || null,
            subjectNameEn: exam.examinationCategory?.subject?.name || null,
            subjectNameKh: exam.examinationCategory?.subject?.khmer_name || null,
            subSubjectId: exam.examinationCategory?.subSubjectId || null,
            subSubjectName: exam.examinationCategory?.subSubject?.name || null,
            subSubjectKhmerName: exam.examinationCategory?.subSubject?.khmerName || null,
            subSubjectParentSubjectId: exam.examinationCategory?.subSubject?.subjectId || null,
            subSubjectParentNameEn: exam.examinationCategory?.subSubject?.subject?.name || null,
            subSubjectParentNameKh: exam.examinationCategory?.subSubject?.subject?.khmer_name || null,
            grade: exam.examinationCategory?.grade || null,
            type: exam.examinationCategory?.type || null,
            createdAt: exam.created_at,
        };
    }
};
exports.ExamsService = ExamsService;
exports.ExamsService = ExamsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(exam_entity_1.Exam)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        exam_questions_service_1.ExamQuestionsService])
], ExamsService);
//# sourceMappingURL=exams.service.js.map