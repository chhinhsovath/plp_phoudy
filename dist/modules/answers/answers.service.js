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
exports.AnswersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const answer_entity_1 = require("../../entities/answer.entity");
const question_entity_1 = require("../../entities/question.entity");
let AnswersService = class AnswersService {
    answerRepository;
    questionRepository;
    constructor(answerRepository, questionRepository) {
        this.answerRepository = answerRepository;
        this.questionRepository = questionRepository;
    }
    async findAll() {
        return this.answerRepository.find({ relations: ['question'] });
    }
    async findOne(id) {
        const answer = await this.answerRepository.findOne({
            where: { id },
            relations: ['question'],
        });
        if (!answer) {
            throw new common_1.NotFoundException(`Answer with ID ${id} not found`);
        }
        return answer;
    }
    async findByQuestionId(questionId) {
        return this.answerRepository.find({
            where: { questionId },
            relations: ['question'],
        });
    }
    async findQuestionWithAnswers(questionId) {
        const answers = await this.answerRepository.find({
            where: { questionId },
            relations: [
                'question',
                'question.questionType',
                'question.lessonActivity',
                'question.lessonActivity.lesson',
                'question.lessonActivity.lesson.subject',
            ],
            order: { orderIndex: 'ASC' },
        });
        if (answers.length === 0) {
            throw new common_1.NotFoundException(`No answers found for question ID ${questionId}`);
        }
        const question = answers[0].question;
        let lessonId = null;
        let lessonTitle = null;
        let lessonNumber = null;
        let subjectId = null;
        let subjectKhmerName = null;
        if (question.lessonActivity && question.lessonActivity.lesson) {
            lessonId = question.lessonActivity.lesson.id;
            lessonTitle = question.lessonActivity.lesson.title;
            lessonNumber = question.lessonActivity.lesson.lesson_number;
            if (question.lessonActivity.lesson.subject) {
                subjectId = question.lessonActivity.lesson.subject.id;
                subjectKhmerName = question.lessonActivity.lesson.subject.khmer_name;
            }
        }
        return {
            question: {
                id: question.id,
                introduction: question.introduction,
                questionText: question.questionText,
                difficultyLevel: question.difficultyLevel,
                questionTypeId: question.questionTypeId,
                questionTypeKey: question.questionType?.typeKey || null,
                questionTypeLabel: question.questionType?.label || null,
                lessonActivitiesId: question.lessonActivitiesId,
                lessonActivities: question.lessonActivity?.title || null,
                lessonId,
                lessonTitle,
                lessonNumber,
                subjectId,
                subjectKhmerName,
                questionImage: question.questionImage,
                questionAudio: question.questionAudio,
                status: question.status,
                usageType: question.usageType,
                answers: answers.map((answer) => ({
                    id: answer.id,
                    answerText: answer.answerText,
                    answerFile: answer.answerFile,
                    isCorrect: answer.isCorrect,
                    matchKey: answer.matchKey,
                    matchValue: answer.matchValue,
                    orderIndex: answer.orderIndex,
                    displayOrder: answer.displayOrder,
                    metadata: answer.metadata,
                })),
            },
        };
    }
    async findByQuestionIdAndIsCorrect(questionId, isCorrect) {
        return this.answerRepository.find({
            where: { questionId, isCorrect: isCorrect },
            relations: ['question'],
        });
    }
    async findByQuestionIdOrderByOrderIndex(questionId) {
        return this.answerRepository.find({
            where: { questionId },
            relations: ['question'],
            order: { orderIndex: 'ASC' },
        });
    }
    async findByQuestionIdOrderByDisplayOrder(questionId) {
        return this.answerRepository.find({
            where: { questionId },
            relations: ['question'],
            order: { displayOrder: 'ASC' },
        });
    }
    async create(createAnswerDto) {
        const question = await this.questionRepository.findOne({
            where: { id: createAnswerDto.questionId },
        });
        if (!question) {
            throw new common_1.NotFoundException(`Question with ID ${createAnswerDto.questionId} not found`);
        }
        const answer = new answer_entity_1.Answer();
        answer.answerText = createAnswerDto.answerText || null;
        answer.answerFile = createAnswerDto.answerFile || null;
        answer.isCorrect = createAnswerDto.isCorrect;
        answer.matchKey = createAnswerDto.matchKey || null;
        answer.matchValue = createAnswerDto.matchValue || null;
        answer.orderIndex = createAnswerDto.orderIndex;
        answer.displayOrder = createAnswerDto.displayOrder;
        answer.metadata = this.cleanMetadata(createAnswerDto.metadata);
        answer.questionId = createAnswerDto.questionId;
        answer.question = question;
        return this.answerRepository.save(answer);
    }
    async createAll(createAnswerDtos) {
        const answers = [];
        for (const dto of createAnswerDtos) {
            const answer = await this.create(dto);
            answers.push(answer);
        }
        return answers;
    }
    async update(id, updateAnswerDto) {
        const answer = await this.answerRepository.findOne({ where: { id } });
        if (!answer) {
            throw new common_1.NotFoundException(`Answer with ID ${id} not found`);
        }
        if (updateAnswerDto.answerText !== undefined) {
            answer.answerText = updateAnswerDto.answerText;
        }
        if (updateAnswerDto.answerFile !== undefined) {
            answer.answerFile = updateAnswerDto.answerFile;
        }
        if (updateAnswerDto.isCorrect !== undefined) {
            answer.isCorrect = updateAnswerDto.isCorrect;
        }
        if (updateAnswerDto.matchKey !== undefined) {
            answer.matchKey = updateAnswerDto.matchKey;
        }
        if (updateAnswerDto.matchValue !== undefined) {
            answer.matchValue = updateAnswerDto.matchValue;
        }
        if (updateAnswerDto.orderIndex !== undefined) {
            answer.orderIndex = updateAnswerDto.orderIndex;
        }
        if (updateAnswerDto.displayOrder !== undefined) {
            answer.displayOrder = updateAnswerDto.displayOrder;
        }
        if (updateAnswerDto.metadata !== undefined) {
            answer.metadata = this.cleanMetadata(updateAnswerDto.metadata);
        }
        return this.answerRepository.save(answer);
    }
    async updateAnswerOrders(questionId, answerIds, displayOrder) {
        const answers = await this.findByQuestionId(questionId);
        for (let i = 0; i < answerIds.length; i++) {
            const answerId = answerIds[i];
            const answer = answers.find((a) => a.id === answerId);
            if (answer) {
                if (displayOrder) {
                    answer.displayOrder = i + 1;
                }
                else {
                    answer.orderIndex = i + 1;
                }
                await this.answerRepository.save(answer);
            }
        }
    }
    async remove(id) {
        await this.answerRepository.delete(id);
    }
    async removeByQuestionId(questionId) {
        await this.answerRepository.delete({ questionId });
    }
    async removeAll(ids) {
        await this.answerRepository.delete(ids);
    }
    async checkMultipleChoiceAnswer(questionId, submittedAnswerIds) {
        const answers = await this.answerRepository.find({
            where: { questionId, isCorrect: true },
        });
        if (answers.length !== submittedAnswerIds.length) {
            return false;
        }
        const correctAnswerIds = answers.map((answer) => answer.id);
        return submittedAnswerIds.every((id) => correctAnswerIds.includes(id));
    }
    async checkMultipleSelectAnswer(questionId, submittedAnswerIds) {
        const answers = await this.answerRepository.find({
            where: { questionId, isCorrect: true },
        });
        const correctAnswerIds = answers.map((answer) => answer.id);
        return (submittedAnswerIds.length === correctAnswerIds.length &&
            submittedAnswerIds.every((id) => correctAnswerIds.includes(id)));
    }
    async checkTrueFalseAnswer(questionId, submittedAnswerId) {
        const answer = await this.answerRepository.findOne({
            where: { id: submittedAnswerId, questionId },
        });
        return answer?.isCorrect || false;
    }
    async checkMatchingAnswer(questionId, submittedMatches) {
        const answers = await this.findByQuestionId(questionId);
        if (answers.length !== submittedMatches.length) {
            return false;
        }
        return submittedMatches.every((match) => answers.some((answer) => answer.matchKey === match.key && answer.matchValue === match.value));
    }
    async checkOrderingAnswer(questionId, submittedAnswerIds) {
        const answers = await this.findByQuestionIdOrderByOrderIndex(questionId);
        const correctOrder = answers.map((answer) => answer.id);
        return (submittedAnswerIds.length === correctOrder.length &&
            submittedAnswerIds.every((id, index) => id === correctOrder[index]));
    }
    async checkDragAndDropAnswer(questionId, submittedAnswerIds) {
        const answers = await this.answerRepository.find({
            where: { questionId },
            order: { orderIndex: 'ASC' },
        });
        if (answers.length !== submittedAnswerIds.length) {
            return false;
        }
        return answers.every((answer, index) => answer.id === submittedAnswerIds[index]);
    }
    cleanMetadata(metadata) {
        if (!metadata || typeof metadata !== 'object') {
            return metadata;
        }
        const cleanedMetadata = { ...metadata };
        delete cleanedMetadata.explanation;
        delete cleanedMetadata.explanationText;
        delete cleanedMetadata.answerExplanation;
        delete cleanedMetadata.reason;
        delete cleanedMetadata.rationale;
        return Object.keys(cleanedMetadata).length > 0 ? cleanedMetadata : null;
    }
};
exports.AnswersService = AnswersService;
exports.AnswersService = AnswersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(answer_entity_1.Answer)),
    __param(1, (0, typeorm_1.InjectRepository)(question_entity_1.Question)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AnswersService);
//# sourceMappingURL=answers.service.js.map