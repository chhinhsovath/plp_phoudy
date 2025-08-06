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
exports.QuestionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const question_entity_1 = require("../../entities/question.entity");
const question_type_entity_1 = require("../../entities/question-type.entity");
const question_explanation_entity_1 = require("../../entities/question-explanation.entity");
const lesson_activity_entity_1 = require("../../entities/lesson-activity.entity");
const status_enum_1 = require("../../entities/enums/status.enum");
let QuestionsService = class QuestionsService {
    questionRepository;
    questionTypeRepository;
    questionExplanationRepository;
    lessonActivityRepository;
    constructor(questionRepository, questionTypeRepository, questionExplanationRepository, lessonActivityRepository) {
        this.questionRepository = questionRepository;
        this.questionTypeRepository = questionTypeRepository;
        this.questionExplanationRepository = questionExplanationRepository;
        this.lessonActivityRepository = lessonActivityRepository;
    }
    async findAll() {
        const questions = await this.questionRepository.find({
            relations: [
                'questionType',
                'lessonActivity',
                'lessonActivity.lesson',
                'lessonActivity.lesson.subject',
                'explanation',
            ],
        });
        return questions.map((question) => this.formatQuestionResponse(question));
    }
    async findAllByOrderByCreatedAtDesc() {
        const questions = await this.questionRepository.find({
            relations: [
                'questionType',
                'lessonActivity',
                'lessonActivity.lesson',
                'lessonActivity.lesson.subject',
                'explanation',
            ],
            order: { createdAt: 'DESC' },
        });
        return questions.map((question) => this.formatQuestionResponse(question));
    }
    async findAllByOrderByQuestionOrderAsc() {
        const questions = await this.questionRepository.find({
            relations: [
                'questionType',
                'lessonActivity',
                'lessonActivity.lesson',
                'lessonActivity.lesson.subject',
                'explanation',
            ],
            order: { createdAt: 'ASC' },
        });
        return questions.map((question) => this.formatQuestionResponse(question));
    }
    async findOne(id) {
        const question = await this.questionRepository.findOne({
            where: { id },
            relations: [
                'questionType',
                'lessonActivity',
                'lessonActivity.lesson',
                'lessonActivity.lesson.subject',
                'explanation',
            ],
        });
        if (!question) {
            throw new common_1.NotFoundException(`Question with ID ${id} not found`);
        }
        return this.formatQuestionResponse(question);
    }
    async findOneWithAnswers(id) {
        const question = await this.questionRepository.findOne({
            where: { id },
            relations: ['questionType', 'lessonActivity', 'answers'],
        });
        if (!question) {
            throw new common_1.NotFoundException(`Question with ID ${id} not found`);
        }
        const answers = question.answers.map((answer) => ({
            answer_text: answer.answerText || '',
            answer_image_url: answer.answerFile || '',
            answer_audio_url: '',
            answer_video_url: '',
            match_key: answer.matchKey || '',
            match_value: answer.matchValue || '',
            is_correct: answer.isCorrect,
            order_index: answer.orderIndex,
            display_order: answer.displayOrder,
        }));
        return {
            id: question.id,
            question_type: question.questionType?.typeKey || '',
            introduction: question.introduction,
            question_text: question.questionText,
            question_audio: question.questionAudio,
            difficulty_level: question.difficultyLevel || '',
            grade_level: 1,
            lesson_number: 1,
            lesson_title: '',
            activity_title: question.lessonActivity?.title || '',
            subject: question.questionType?.label || '',
            subjectId: 1,
            usage_type: question.usageType || question_entity_1.QuestionUsage.LEARN,
            random_answers: question.randomAnswers || false,
            answers,
        };
    }
    async findByQuestionTypeId(questionTypeId) {
        const questions = await this.questionRepository.find({
            where: { questionTypeId },
            relations: [
                'questionType',
                'lessonActivity',
                'lessonActivity.lesson',
                'lessonActivity.lesson.subject',
                'explanation',
            ],
        });
        return questions.map((question) => this.formatQuestionResponse(question));
    }
    async findByDifficultyLevel(level) {
        const questions = await this.questionRepository.find({
            where: { difficultyLevel: level },
            relations: [
                'questionType',
                'lessonActivity',
                'lessonActivity.lesson',
                'lessonActivity.lesson.subject',
                'explanation',
            ],
        });
        return questions.map((question) => this.formatQuestionResponse(question));
    }
    async findByLessonActivityId(lessonActivitiesId) {
        const questions = await this.questionRepository.find({
            where: { lessonActivitiesId },
            relations: [
                'questionType',
                'lessonActivity',
                'lessonActivity.lesson',
                'lessonActivity.lesson.subject',
                'explanation',
            ],
            order: { createdAt: 'ASC' },
        });
        return questions.map((question) => this.formatQuestionResponse(question));
    }
    async findByLessonActivityIdAndUsageType(lessonActivitiesId, usageType) {
        let usageTypes;
        if (usageType === question_entity_1.QuestionUsage.BOTH) {
            usageTypes = [
                question_entity_1.QuestionUsage.EXAM,
                question_entity_1.QuestionUsage.LEARN,
                question_entity_1.QuestionUsage.BOTH,
            ];
        }
        else {
            usageTypes = [usageType, question_entity_1.QuestionUsage.BOTH];
        }
        const questions = await this.questionRepository.find({
            where: {
                lessonActivitiesId,
                usageType: (0, typeorm_2.In)(usageTypes),
            },
            relations: [
                'questionType',
                'lessonActivity',
                'lessonActivity.lesson',
                'lessonActivity.lesson.subject',
                'explanation',
            ],
            order: { createdAt: 'ASC' },
        });
        return questions.map((question) => this.formatQuestionResponse(question));
    }
    async findByUsageType(usageType) {
        const questions = await this.questionRepository.find({
            where: { usageType },
            relations: [
                'questionType',
                'lessonActivity',
                'lessonActivity.lesson',
                'lessonActivity.lesson.subject',
                'explanation',
            ],
        });
        return questions.map((question) => this.formatQuestionResponse(question));
    }
    async findByStatus(status) {
        const questions = await this.questionRepository.find({
            where: { status },
            relations: [
                'questionType',
                'lessonActivity',
                'lessonActivity.lesson',
                'lessonActivity.lesson.subject',
                'explanation',
            ],
        });
        return questions.map((question) => this.formatQuestionResponse(question));
    }
    async findByLessonActivityIdAndStatus(lessonActivitiesId, status) {
        const questions = await this.questionRepository.find({
            where: { lessonActivitiesId, status },
            relations: [
                'questionType',
                'lessonActivity',
                'lessonActivity.lesson',
                'lessonActivity.lesson.subject',
                'explanation',
            ],
            order: { createdAt: 'ASC' },
        });
        return questions.map((question) => this.formatQuestionResponse(question));
    }
    async create(createQuestionDto) {
        const questionType = await this.questionTypeRepository.findOne({
            where: { id: createQuestionDto.questionTypeId },
        });
        if (!questionType) {
            throw new common_1.NotFoundException(`Question type with ID ${createQuestionDto.questionTypeId} not found`);
        }
        const question = new question_entity_1.Question();
        question.introduction = createQuestionDto.introduction || '';
        question.questionText = createQuestionDto.questionText || '';
        question.questionTypeId = createQuestionDto.questionTypeId;
        question.difficultyLevel = createQuestionDto.difficultyLevel || '';
        question.lessonActivitiesId = createQuestionDto.lessonActivitiesId || null;
        question.questionImage = createQuestionDto.questionImage || '';
        question.questionAudio = createQuestionDto.questionAudio || '';
        question.status =
            createQuestionDto.status === 'INACTIVE' ? status_enum_1.Status.INACTIVE : status_enum_1.Status.ACTIVE;
        question.usageType = createQuestionDto.usageType || question_entity_1.QuestionUsage.LEARN;
        question.randomAnswers = createQuestionDto.randomAnswers || false;
        question.questionType = questionType;
        if (createQuestionDto.lessonActivitiesId) {
            const lessonActivity = await this.lessonActivityRepository.findOne({
                where: { id: createQuestionDto.lessonActivitiesId },
            });
            if (!lessonActivity) {
                throw new common_1.NotFoundException(`Lesson Activity with ID ${createQuestionDto.lessonActivitiesId} not found`);
            }
            question.lessonActivity = lessonActivity;
        }
        let savedQuestion;
        try {
            savedQuestion = await this.questionRepository.save(question);
        }
        catch (error) {
            if (error instanceof typeorm_2.QueryFailedError &&
                error.message.includes('duplicate key')) {
                await this.fixSequenceIssue();
                savedQuestion = await this.questionRepository.save(question);
            }
            else {
                throw error;
            }
        }
        const questionWithRelations = await this.questionRepository.findOne({
            where: { id: savedQuestion.id },
            relations: [
                'questionType',
                'lessonActivity',
                'lessonActivity.lesson',
                'lessonActivity.lesson.subject',
                'explanation',
            ],
        });
        return this.formatQuestionResponse(questionWithRelations);
    }
    async update(id, updateQuestionDto) {
        const existingQuestion = await this.questionRepository.findOne({
            where: { id },
            relations: ['questionType', 'lessonActivity'],
        });
        if (!existingQuestion) {
            throw new common_1.NotFoundException(`Question with ID ${id} not found`);
        }
        if (updateQuestionDto.questionTypeId) {
            const questionType = await this.questionTypeRepository.findOne({
                where: { id: updateQuestionDto.questionTypeId },
            });
            if (!questionType) {
                throw new common_1.NotFoundException(`Question type with ID ${updateQuestionDto.questionTypeId} not found`);
            }
            existingQuestion.questionType = questionType;
            existingQuestion.questionTypeId = updateQuestionDto.questionTypeId;
        }
        if (updateQuestionDto.lessonActivitiesId) {
            const lessonActivity = await this.lessonActivityRepository.findOne({
                where: { id: updateQuestionDto.lessonActivitiesId },
            });
            if (!lessonActivity) {
                throw new common_1.NotFoundException(`Lesson Activity with ID ${updateQuestionDto.lessonActivitiesId} not found`);
            }
            existingQuestion.lessonActivity = lessonActivity;
            existingQuestion.lessonActivitiesId =
                updateQuestionDto.lessonActivitiesId;
        }
        else if (updateQuestionDto.lessonActivitiesId === null) {
            existingQuestion.lessonActivity = null;
            existingQuestion.lessonActivitiesId = null;
        }
        if (updateQuestionDto.introduction !== undefined) {
            existingQuestion.introduction = updateQuestionDto.introduction || '';
        }
        if (updateQuestionDto.questionText !== undefined) {
            existingQuestion.questionText = updateQuestionDto.questionText || '';
        }
        if (updateQuestionDto.difficultyLevel) {
            existingQuestion.difficultyLevel = updateQuestionDto.difficultyLevel;
        }
        if (updateQuestionDto.questionImage !== undefined) {
            existingQuestion.questionImage = updateQuestionDto.questionImage || '';
        }
        if (updateQuestionDto.questionAudio !== undefined) {
            existingQuestion.questionAudio = updateQuestionDto.questionAudio || '';
        }
        if (updateQuestionDto.status) {
            existingQuestion.status =
                updateQuestionDto.status === 'INACTIVE'
                    ? status_enum_1.Status.INACTIVE
                    : status_enum_1.Status.ACTIVE;
        }
        if (updateQuestionDto.usageType) {
            existingQuestion.usageType = updateQuestionDto.usageType;
        }
        if (updateQuestionDto.randomAnswers !== undefined) {
            existingQuestion.randomAnswers = updateQuestionDto.randomAnswers;
        }
        const savedQuestion = await this.questionRepository.save(existingQuestion);
        const questionWithRelations = await this.questionRepository.findOne({
            where: { id: savedQuestion.id },
            relations: [
                'questionType',
                'lessonActivity',
                'lessonActivity.lesson',
                'lessonActivity.lesson.subject',
                'explanation',
            ],
        });
        return this.formatQuestionResponse(questionWithRelations);
    }
    async updateStatus(id, status) {
        const question = await this.questionRepository.findOne({
            where: { id },
        });
        if (!question) {
            throw new common_1.NotFoundException(`Question with ID ${id} not found`);
        }
        question.status = status;
        await this.questionRepository.save(question);
        return this.findOne(id);
    }
    async remove(id) {
        const result = await this.questionRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Question with ID ${id} not found`);
        }
    }
    async removeAll(ids) {
        await this.questionRepository.delete(ids);
    }
    async updateQuestionOrder(id, order) {
        return this.findOne(id);
    }
    async updateQuestionOrders(questionOrders) {
        return;
    }
    async fixSequenceIssue() {
        try {
            await this.questionRepository.query(`SELECT setval('questions_id_seq', (SELECT MAX(id) FROM questions))`);
        }
        catch (error) {
            console.error('Failed to fix sequence:', error);
            throw new common_1.InternalServerErrorException('Database sequence error');
        }
    }
    async findExplanation(questionId) {
        const explanation = await this.questionExplanationRepository.findOne({
            where: { questionId },
            relations: ['question'],
        });
        if (!explanation) {
            throw new common_1.NotFoundException(`Explanation for question with ID ${questionId} not found`);
        }
        return {
            questionId: explanation.questionId,
            explanation: explanation.explanation,
            createdAt: explanation.createdAt,
        };
    }
    async createOrUpdateExplanation(questionId, explanationText) {
        const question = await this.questionRepository.findOne({
            where: { id: questionId },
        });
        if (!question) {
            throw new common_1.NotFoundException(`Question with ID ${questionId} not found`);
        }
        let explanation = await this.questionExplanationRepository.findOne({
            where: { questionId },
        });
        if (explanation) {
            explanation.explanation = explanationText;
            await this.questionExplanationRepository.save(explanation);
        }
        else {
            explanation = this.questionExplanationRepository.create({
                questionId,
                explanation: explanationText,
            });
            await this.questionExplanationRepository.save(explanation);
        }
        return {
            questionId: explanation.questionId,
            explanation: explanation.explanation,
            createdAt: explanation.createdAt,
        };
    }
    async removeExplanation(questionId) {
        const result = await this.questionExplanationRepository.delete({
            questionId,
        });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Explanation for question with ID ${questionId} not found`);
        }
    }
    formatQuestionResponse(question) {
        return {
            id: question.id,
            introduction: question.introduction,
            questionText: question.questionText,
            difficultyLevel: question.difficultyLevel,
            questionTypeId: question.questionTypeId,
            questionTypeKey: question.questionType?.typeKey || '',
            questionTypeLabel: question.questionType?.label || '',
            lessonActivitiesId: question.lessonActivitiesId,
            lessonActivity: question.lessonActivitiesId,
            lessonId: question.lessonActivity?.lessonId || null,
            lessonTitle: question.lessonActivity?.lesson?.title || '',
            gradeLevel: question.lessonActivity?.lesson?.grade_level || null,
            subjectId: question.lessonActivity?.lesson?.subjectId || null,
            subjectNameEn: question.lessonActivity?.lesson?.subject?.name || null,
            subjectNameKh: question.lessonActivity?.lesson?.subject?.khmer_name || null,
            questionImage: question.questionImage,
            questionAudio: question.questionAudio,
            explanation: question.explanation?.explanation || null,
            usageType: question.usageType,
            randomAnswers: question.randomAnswers,
            status: question.status,
            createdAt: question.createdAt,
            updatedAt: question.updatedAt,
        };
    }
};
exports.QuestionsService = QuestionsService;
exports.QuestionsService = QuestionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(question_entity_1.Question)),
    __param(1, (0, typeorm_1.InjectRepository)(question_type_entity_1.QuestionType)),
    __param(2, (0, typeorm_1.InjectRepository)(question_explanation_entity_1.QuestionExplanation)),
    __param(3, (0, typeorm_1.InjectRepository)(lesson_activity_entity_1.LessonActivity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], QuestionsService);
//# sourceMappingURL=questions.service.js.map