import { Status } from '../../../entities/enums/status.enum';
export declare class QuestionDto {
    id: number;
    introduction?: string | null;
    question_text: string;
    question_type: string;
    question_type_id?: number | null;
    question_type_name?: string | null;
    sound_id?: number | null;
    sound_file_location?: string | null;
    difficulty_level: string;
    question_order?: number | null;
    grade_level: number;
    lessonId?: number | null;
    lesson_number?: number | null;
    lessonActivitiesId?: number | null;
    question_image?: string | null;
    originalQuestionImage?: string | null;
    solution_explanation?: string | null;
    subjectId: number;
    status: Status;
    created_at: Date;
    updated_at: Date;
}
export declare class AnswerDto {
    id: number;
    answerText: string;
    isCorrect: boolean;
    orderIndex?: number;
    displayOrder?: number;
    answerImageUrl?: string;
    answerAudioUrl?: string;
    answerVideoUrl?: string;
    matchKey?: string;
    matchValue?: string;
    questionId: number;
    createdAt: Date;
    updatedAt: Date;
    answer_image_url?: string;
    originalAnswerImageUrl?: string;
}
export declare class QuestionWithAnswers {
    id: number;
    introduction?: string | null;
    questionText: string;
    questionType: string;
    questionTypeId?: number | null;
    questionTypeName?: string | null;
    soundId?: number | null;
    soundFileLocation?: string;
    difficultyLevel?: string;
    questionOrder?: number;
    gradeLevel?: number;
    lessonId?: number;
    lessonNumber?: number;
    lessonActivitiesId?: number;
    questionImage?: string;
    solutionExplanation?: string;
    subjectId?: number;
    status: Status;
    answers: AnswerDto[];
    createdAt: Date;
    updatedAt: Date;
}
