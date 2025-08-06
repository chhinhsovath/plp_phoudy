import { QuestionUsage } from '../../../entities/question.entity';
export declare class CreateQuestionDto {
    introduction?: string;
    questionText?: string;
    difficultyLevel?: string;
    lessonActivitiesId?: number;
    questionImage?: string;
    questionAudio?: string;
    status?: string;
    questionTypeId: number;
    usageType?: QuestionUsage;
    randomAnswers?: boolean;
}
