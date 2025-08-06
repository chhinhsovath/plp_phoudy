import { QuestionsService } from '../questions/questions.service';
import { AnswersService } from '../answers/answers.service';
import { ConfigService } from '@nestjs/config';
import { LessonActivitiesService } from './lesson-activities.service';
import { QuestionWithAnswers } from './interfaces/question-with-answers.interface';
import { CreateLessonActivityDto } from './dto/create-lesson-activity.dto';
import { UpdateLessonActivityDto } from './dto/update-lesson-activity.dto';
import { LessonActivity } from '../../entities/lesson-activity.entity';
import { Status } from '../../entities/enums/status.enum';
export declare class LessonActivitiesController {
    private readonly questionsService;
    private readonly answersService;
    private readonly configService;
    private readonly lessonActivitiesService;
    private readonly logger;
    private readonly baseUrl;
    constructor(questionsService: QuestionsService, answersService: AnswersService, configService: ConfigService, lessonActivitiesService: LessonActivitiesService);
    findAllLessonActivities(): Promise<any[]>;
    getLessonActivityWithQuestionsAndAnswers(subjectId: number, gradeLevel: number, lessonId: number, activity?: string, lessonActivitiesId?: number, lessonActivityId?: number, status?: Status): Promise<QuestionWithAnswers[]>;
    findByGradeLevelAndSubjectId(gradeLevel: number, subjectId: number): Promise<any[]>;
    create(createLessonActivityDto: CreateLessonActivityDto): Promise<LessonActivity>;
    update(id: number, updateLessonActivityDto: UpdateLessonActivityDto): Promise<LessonActivity>;
    private convertAnswerToObject;
}
