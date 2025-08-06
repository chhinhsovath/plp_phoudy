import { Status } from './enums/status.enum';
import { LessonActivity } from './lesson-activity.entity';
import { QuestionType } from './question-type.entity';
import { QuestionExplanation } from './question-explanation.entity';
export declare enum QuestionUsage {
    EXAM = "exam",
    LEARN = "learn",
    BOTH = "both"
}
export declare class Question {
    id: number;
    introduction: string;
    questionText: string;
    difficultyLevel: string;
    questionTypeId: number;
    questionType: QuestionType;
    lessonActivitiesId: number | null;
    lessonActivity: LessonActivity | null;
    questionImage: string;
    questionAudio: string;
    explanation: QuestionExplanation;
    status: Status;
    usageType: QuestionUsage;
    randomAnswers: boolean;
    answers: any[];
    createdAt: Date;
    updatedAt: Date;
}
