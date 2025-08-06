"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionWithAnswersDto = exports.AnswerDto = void 0;
class AnswerDto {
    answer_text;
    answer_image_url;
    answer_audio_url;
    answer_video_url;
    match_key;
    match_value;
    is_correct;
    order_index;
    display_order;
}
exports.AnswerDto = AnswerDto;
class QuestionWithAnswersDto {
    id;
    question_type;
    introduction;
    question_text;
    question_audio;
    difficulty_level;
    grade_level;
    lesson_number;
    lesson_title;
    activity_title;
    subject;
    subjectId;
    usage_type;
    random_answers;
    answers;
}
exports.QuestionWithAnswersDto = QuestionWithAnswersDto;
//# sourceMappingURL=question-with-answers.dto.js.map