import { Status } from '../../../entities/enums/status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class QuestionDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: false })
  introduction?: string | null;

  @ApiProperty()
  question_text: string;

  @ApiProperty()
  question_type: string;

  @ApiProperty({ required: false })
  question_type_id?: number | null;

  @ApiProperty({ required: false })
  question_type_name?: string | null;

  @ApiProperty({ required: false })
  sound_id?: number | null;

  @ApiProperty({ required: false })
  sound_file_location?: string | null;

  @ApiProperty()
  difficulty_level: string;

  @ApiProperty({ required: false })
  question_order?: number | null;

  @ApiProperty()
  grade_level: number;

  @ApiProperty({ required: false })
  lessonId?: number | null;

  @ApiProperty({ required: false })
  lesson_number?: number | null;

  @ApiProperty({ required: false })
  lessonActivitiesId?: number | null;

  @ApiProperty({ required: false })
  question_image?: string | null;

  @ApiProperty({ required: false })
  originalQuestionImage?: string | null;

  @ApiProperty({ required: false })
  solution_explanation?: string | null;

  @ApiProperty()
  subjectId: number;

  @ApiProperty()
  status: Status;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}

export class AnswerDto {
  @ApiProperty({ description: 'Answer ID' })
  id: number;

  @ApiProperty({ description: 'Answer text' })
  answerText: string;

  @ApiProperty({ description: 'Whether the answer is correct' })
  isCorrect: boolean;

  @ApiProperty({ description: 'Order index for sorting', required: false })
  orderIndex?: number;

  @ApiProperty({ description: 'Display order for UI', required: false })
  displayOrder?: number;

  @ApiProperty({ description: 'Image URL', required: false })
  answerImageUrl?: string;

  @ApiProperty({ description: 'Audio URL', required: false })
  answerAudioUrl?: string;

  @ApiProperty({ description: 'Video URL', required: false })
  answerVideoUrl?: string;

  @ApiProperty({
    description: 'Match key for matching questions',
    required: false,
  })
  matchKey?: string;

  @ApiProperty({
    description: 'Match value for matching questions',
    required: false,
  })
  matchValue?: string;

  @ApiProperty({ description: 'Question ID' })
  questionId: number;

  @ApiProperty({ description: 'Created at timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated at timestamp' })
  updatedAt: Date;

  @ApiProperty({ description: 'Full URL for answer image', required: false })
  answer_image_url?: string;

  @ApiProperty({
    description: 'Original answer image filename',
    required: false,
  })
  originalAnswerImageUrl?: string;
}

export class QuestionWithAnswers {
  @ApiProperty({ description: 'Question ID' })
  id: number;

  @ApiProperty({ description: 'Introduction text', required: false })
  introduction?: string | null;

  @ApiProperty({ description: 'Question text' })
  questionText: string;

  @ApiProperty({ description: 'Question type' })
  questionType: string;

  @ApiProperty({ description: 'Question type ID', required: false })
  questionTypeId?: number | null;

  @ApiProperty({ description: 'Question type name', required: false })
  questionTypeName?: string | null;

  @ApiProperty({ description: 'Sound ID', required: false })
  soundId?: number | null;

  @ApiProperty({ description: 'Sound file location', required: false })
  soundFileLocation?: string;

  @ApiProperty({ description: 'Difficulty level', required: false })
  difficultyLevel?: string;

  @ApiProperty({ description: 'Question order', required: false })
  questionOrder?: number;

  @ApiProperty({ description: 'Grade level', required: false })
  gradeLevel?: number;

  @ApiProperty({ description: 'Lesson ID', required: false })
  lessonId?: number;

  @ApiProperty({ description: 'Lesson number', required: false })
  lessonNumber?: number;

  @ApiProperty({ description: 'Lesson activities ID', required: false })
  lessonActivitiesId?: number;

  @ApiProperty({ description: 'Question image', required: false })
  questionImage?: string;

  @ApiProperty({ description: 'Solution explanation', required: false })
  solutionExplanation?: string;

  @ApiProperty({ description: 'Subject ID', required: false })
  subjectId?: number;

  @ApiProperty({ description: 'Question status', enum: Status })
  status: Status;

  @ApiProperty({ description: 'Answers', type: [AnswerDto] })
  answers: AnswerDto[];

  @ApiProperty({ description: 'Created at timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated at timestamp' })
  updatedAt: Date;
}
