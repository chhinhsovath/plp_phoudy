export class AnswerDto {
  answer_text: string;
  answer_image_url: string | null;
  answer_audio_url: string | null;
  answer_video_url: string | null;
  match_key: string | null;
  match_value: string | null;
  is_correct: boolean;
  order_index: number;
  display_order: number;
}

export class QuestionWithAnswersDto {
  id: number;
  question_type: string;
  introduction: string;
  question_text: string;
  question_audio: string | null;
  difficulty_level: string;
  grade_level: number;
  lesson_number: number;
  lesson_title: string;
  activity_title: string;
  subject: string;
  subjectId: number;
  usage_type: string;
  random_answers: boolean;
  answers: AnswerDto[];
}
