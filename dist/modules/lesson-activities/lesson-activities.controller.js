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
var LessonActivitiesController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonActivitiesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const questions_service_1 = require("../questions/questions.service");
const answers_service_1 = require("../answers/answers.service");
const config_1 = require("@nestjs/config");
const lesson_activities_service_1 = require("./lesson-activities.service");
const common_2 = require("@nestjs/common");
const question_with_answers_interface_1 = require("./interfaces/question-with-answers.interface");
const create_lesson_activity_dto_1 = require("./dto/create-lesson-activity.dto");
const update_lesson_activity_dto_1 = require("./dto/update-lesson-activity.dto");
const lesson_activity_entity_1 = require("../../entities/lesson-activity.entity");
const status_enum_1 = require("../../entities/enums/status.enum");
let LessonActivitiesController = LessonActivitiesController_1 = class LessonActivitiesController {
    questionsService;
    answersService;
    configService;
    lessonActivitiesService;
    logger = new common_2.Logger(LessonActivitiesController_1.name);
    baseUrl;
    constructor(questionsService, answersService, configService, lessonActivitiesService) {
        this.questionsService = questionsService;
        this.answersService = answersService;
        this.configService = configService;
        this.lessonActivitiesService = lessonActivitiesService;
        this.baseUrl = this.configService.get('APP_BASE_URL', 'http://192.168.0.144:8080');
    }
    async findAllLessonActivities() {
        return this.lessonActivitiesService.findAll();
    }
    async getLessonActivityWithQuestionsAndAnswers(subjectId, gradeLevel, lessonId, activity, lessonActivitiesId, lessonActivityId, status) {
        const effectiveActivityId = lessonActivitiesId ?? lessonActivityId;
        this.logger.debug(`Fetching questions for subject=${subjectId}, grade=${gradeLevel}, lesson=${lessonId}, activity=${activity}, activityId=${effectiveActivityId}`);
        let rawQuestions;
        if (effectiveActivityId) {
            if (status) {
                rawQuestions =
                    await this.questionsService.findByLessonActivityIdAndStatus(effectiveActivityId, status);
                this.logger.debug(`Found ${rawQuestions.length} questions for activity ID ${effectiveActivityId} with status ${status}`);
            }
            else {
                rawQuestions =
                    await this.questionsService.findByLessonActivityId(effectiveActivityId);
                this.logger.debug(`Found ${rawQuestions.length} questions for activity ID ${effectiveActivityId}`);
            }
        }
        else {
            if (status) {
                rawQuestions = await this.questionsService.findByStatus(status);
                this.logger.debug(`Found ${rawQuestions.length} questions with status ${status}`);
            }
            else {
                rawQuestions = await this.questionsService.findAll();
                this.logger.debug(`Found ${rawQuestions.length} total questions as fallback`);
            }
        }
        const questions = rawQuestions.map((q) => ({
            id: q.id,
            introduction: q.introduction,
            question_text: q.questionText,
            question_type: q.questionTypeKey || '',
            question_type_id: q.questionTypeId || null,
            question_type_name: q.questionTypeLabel || '',
            sound_id: null,
            difficulty_level: q.difficultyLevel,
            question_order: null,
            grade_level: q.gradeLevel || 1,
            lessonActivitiesId: q.lessonActivitiesId,
            question_image: q.questionImage,
            subjectId: q.subjectId || 1,
            status: q.status,
            created_at: q.createdAt,
            updated_at: q.updatedAt,
        }));
        const questionsWithAnswers = await Promise.all(questions.map(async (question) => {
            const answers = await this.answersService.findByQuestionIdOrderByOrderIndex(question.id);
            const answersWithFullImagePaths = answers.map((answer) => this.convertAnswerToObject(answer));
            const questionWithAnswers = new question_with_answers_interface_1.QuestionWithAnswers();
            questionWithAnswers.id = question.id;
            questionWithAnswers.introduction = question.introduction || undefined;
            questionWithAnswers.questionText = question.question_text;
            questionWithAnswers.questionType = question.question_type;
            questionWithAnswers.questionTypeId =
                question.question_type_id || undefined;
            questionWithAnswers.questionTypeName =
                question.question_type_name || undefined;
            questionWithAnswers.soundId = question.sound_id || undefined;
            questionWithAnswers.soundFileLocation = question.sound_file_location
                ? `${this.baseUrl}/uploads/${question.sound_file_location}`
                : undefined;
            questionWithAnswers.difficultyLevel =
                question.difficulty_level || undefined;
            questionWithAnswers.questionOrder =
                question.question_order || undefined;
            questionWithAnswers.gradeLevel = question.grade_level || undefined;
            questionWithAnswers.lessonId = question.lessonId || undefined;
            questionWithAnswers.lessonNumber = question.lesson_number || undefined;
            questionWithAnswers.lessonActivitiesId =
                question.lessonActivitiesId || undefined;
            questionWithAnswers.questionImage = question.question_image
                ? question.question_image.startsWith('http')
                    ? question.question_image
                    : `${this.baseUrl}/uploads/${question.question_image}`
                : undefined;
            questionWithAnswers.solutionExplanation =
                question.solution_explanation || undefined;
            questionWithAnswers.subjectId = question.subjectId || undefined;
            questionWithAnswers.status = question.status;
            questionWithAnswers.answers = answersWithFullImagePaths;
            questionWithAnswers.createdAt = question.created_at;
            questionWithAnswers.updatedAt = question.updated_at;
            return questionWithAnswers;
        }));
        this.logger.debug(`Returning ${questionsWithAnswers.length} questions with answers`);
        return questionsWithAnswers;
    }
    async findByGradeLevelAndSubjectId(gradeLevel, subjectId) {
        return this.lessonActivitiesService.findByGradeLevelAndSubjectId(gradeLevel, subjectId);
    }
    async create(createLessonActivityDto) {
        this.logger.debug(`Creating lesson activity: ${JSON.stringify(createLessonActivityDto)}`);
        return this.lessonActivitiesService.create(createLessonActivityDto);
    }
    async update(id, updateLessonActivityDto) {
        this.logger.debug(`Updating lesson activity ${id}: ${JSON.stringify(updateLessonActivityDto)}`);
        return this.lessonActivitiesService.update(id, updateLessonActivityDto);
    }
    convertAnswerToObject(answer) {
        const answerDto = {
            id: answer.id,
            answerText: answer.answerText || '',
            isCorrect: answer.isCorrect,
            orderIndex: answer.orderIndex,
            displayOrder: answer.displayOrder,
            answerImageUrl: answer.answerFile || undefined,
            answerAudioUrl: undefined,
            answerVideoUrl: undefined,
            matchKey: answer.matchKey || undefined,
            matchValue: answer.matchValue || undefined,
            questionId: answer.questionId,
            createdAt: answer.createdAt,
            updatedAt: answer.updatedAt,
        };
        if (answer.answerFile) {
            answerDto.answer_image_url = `${this.baseUrl}/uploads/${answer.answerFile}`;
            answerDto.originalAnswerImageUrl = answer.answerFile;
        }
        return answerDto;
    }
};
exports.LessonActivitiesController = LessonActivitiesController;
__decorate([
    (0, common_1.Get)('all'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all lesson activities' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return all lesson activities',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LessonActivitiesController.prototype, "findAllLessonActivities", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get lesson activity with questions and answers' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return questions with answers',
        type: [question_with_answers_interface_1.QuestionWithAnswers],
    }),
    (0, swagger_1.ApiQuery)({ name: 'subjectId', required: true, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'gradeLevel', required: true, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'lessonId', required: true, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'activity', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'lessonActivitiesId', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'lessonActivityId', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        required: false,
        enum: status_enum_1.Status,
        description: 'Filter questions by status (ACTIVE, INACTIVE, SUSPENDED)',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)('subjectId')),
    __param(1, (0, common_1.Query)('gradeLevel')),
    __param(2, (0, common_1.Query)('lessonId')),
    __param(3, (0, common_1.Query)('activity')),
    __param(4, (0, common_1.Query)('lessonActivitiesId')),
    __param(5, (0, common_1.Query)('lessonActivityId')),
    __param(6, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, String, Number, Number, String]),
    __metadata("design:returntype", Promise)
], LessonActivitiesController.prototype, "getLessonActivityWithQuestionsAndAnswers", null);
__decorate([
    (0, common_1.Get)('by-grade-and-subject'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get lesson activities by grade level and subject ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return lesson activities filtered by grade level and subject ID',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)('grade_level')),
    __param(1, (0, common_1.Query)('subjectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], LessonActivitiesController.prototype, "findByGradeLevelAndSubjectId", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new lesson activity' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The lesson activity has been successfully created',
        type: lesson_activity_entity_1.LessonActivity,
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lesson_activity_dto_1.CreateLessonActivityDto]),
    __metadata("design:returntype", Promise)
], LessonActivitiesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a lesson activity' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The lesson activity has been successfully updated',
        type: lesson_activity_entity_1.LessonActivity,
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_lesson_activity_dto_1.UpdateLessonActivityDto]),
    __metadata("design:returntype", Promise)
], LessonActivitiesController.prototype, "update", null);
exports.LessonActivitiesController = LessonActivitiesController = LessonActivitiesController_1 = __decorate([
    (0, swagger_1.ApiTags)('Lesson Activities'),
    (0, common_1.Controller)('lesson-activities'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [questions_service_1.QuestionsService,
        answers_service_1.AnswersService,
        config_1.ConfigService,
        lesson_activities_service_1.LessonActivitiesService])
], LessonActivitiesController);
//# sourceMappingURL=lesson-activities.controller.js.map