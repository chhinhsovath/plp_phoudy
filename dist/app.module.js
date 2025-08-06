"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const roles_module_1 = require("./modules/roles/roles.module");
const schools_module_1 = require("./modules/schools/schools.module");
const lessons_module_1 = require("./modules/lessons/lessons.module");
const subjects_module_1 = require("./modules/subjects/subjects.module");
const questions_module_1 = require("./modules/questions/questions.module");
const answers_module_1 = require("./modules/answers/answers.module");
const books_module_1 = require("./modules/books/books.module");
const book_categories_module_1 = require("./modules/book-categories/book-categories.module");
const file_storage_module_1 = require("./modules/file-storage/file-storage.module");
const menus_module_1 = require("./modules/menus/menus.module");
const gemini_module_1 = require("./modules/gemini/gemini.module");
const gemma_module_1 = require("./modules/gemma/gemma.module");
const chats_module_1 = require("./modules/chats/chats.module");
const prompt_questions_module_1 = require("./modules/prompt-questions/prompt-questions.module");
const videos_module_1 = require("./modules/videos/videos.module");
const forums_module_1 = require("./modules/forums/forums.module");
const students_module_1 = require("./modules/students/students.module");
const teachers_module_1 = require("./modules/teachers/teachers.module");
const classes_module_1 = require("./modules/classes/classes.module");
const user_responses_module_1 = require("./modules/user-responses/user-responses.module");
const analysis_module_1 = require("./modules/analysis/analysis.module");
const user_entity_1 = require("./entities/user.entity");
const user_residence_entity_1 = require("./entities/user-residence.entity");
const user_pob_entity_1 = require("./entities/user-pob.entity");
const school_entity_1 = require("./entities/school.entity");
const school_place_entity_1 = require("./entities/school-place.entity");
const subject_entity_1 = require("./entities/subject.entity");
const subject_grade_entity_1 = require("./entities/subject-grade.entity");
const lesson_entity_1 = require("./entities/lesson.entity");
const lesson_activity_entity_1 = require("./entities/lesson-activity.entity");
const question_entity_1 = require("./entities/question.entity");
const answer_entity_1 = require("./entities/answer.entity");
const book_entity_1 = require("./entities/book.entity");
const book_category_entity_1 = require("./entities/book-category.entity");
const teacher_entity_1 = require("./entities/teacher.entity");
const class_entity_1 = require("./entities/class.entity");
const student_entity_1 = require("./entities/student.entity");
const parent_entity_1 = require("./entities/parent.entity");
const menu_item_entity_1 = require("./entities/menu-item.entity");
const user_menu_permission_entity_1 = require("./entities/user-menu-permission.entity");
const chat_entity_1 = require("./entities/chat.entity");
const message_entity_1 = require("./entities/message.entity");
const prompt_question_entity_1 = require("./entities/prompt-question.entity");
const video_entity_1 = require("./entities/video.entity");
const forum_entity_1 = require("./entities/forum.entity");
const user_response_entity_1 = require("./entities/user-response.entity");
const homework_entity_1 = require("./entities/homework.entity");
const homework_module_1 = require("./modules/homework/homework.module");
const homework_submission_entity_1 = require("./entities/homework-submission.entity");
const submission_files_entity_1 = require("./entities/submission-files.entity");
const homework_submission_module_1 = require("./modules/homework-submission/homework-submission.module");
const analysis_entity_1 = require("./entities/analysis.entity");
const lesson_activities_module_1 = require("./modules/lesson-activities/lesson-activities.module");
const core_1 = require("@nestjs/core");
const common_2 = require("@nestjs/common");
const forum_save_entity_1 = require("./entities/forum-save.entity");
const forum_like_entity_1 = require("./entities/forum-like.entity");
const forum_comment_entity_1 = require("./entities/forum-comment.entity");
const locations_module_1 = require("./modules/locations/locations.module");
const province_entity_1 = require("./entities/province.entity");
const district_entity_1 = require("./entities/district.entity");
const commune_entity_1 = require("./entities/commune.entity");
const village_entity_1 = require("./entities/village.entity");
const role_entity_1 = require("./entities/role.entity");
const website_entity_1 = require("./entities/website.entity");
const website_role_permission_entity_1 = require("./entities/website-role-permission.entity");
const websites_module_1 = require("./modules/websites/websites.module");
const exams_module_1 = require("./modules/exams/exams.module");
const exam_entity_1 = require("./entities/exam.entity");
const exam_questions_module_1 = require("./modules/exam-questions/exam-questions.module");
const examination_categories_module_1 = require("./modules/examination-categories/examination-categories.module");
const exam_question_entity_1 = require("./entities/exam-question.entity");
const question_type_entity_1 = require("./entities/question-type.entity");
const question_explanation_entity_1 = require("./entities/question-explanation.entity");
const question_types_module_1 = require("./modules/question-types/question-types.module");
const statistics_module_1 = require("./modules/statistics/statistics.module");
const upload_module_1 = require("./modules/upload/upload.module");
const image_metadata_entity_1 = require("./entities/image-metadata.entity");
const sound_metadata_entity_1 = require("./entities/sound-metadata.entity");
const audio_metadata_entity_1 = require("./entities/audio-metadata.entity");
const examination_category_entity_1 = require("./entities/examination-category.entity");
const sub_subject_entity_1 = require("./entities/sub-subject.entity");
const sub_subjects_module_1 = require("./modules/sub-subjects/sub-subjects.module");
const subject_grades_module_1 = require("./modules/subject-grades/subject-grades.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const config_service_1 = require("./config/config.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(process.cwd(), 'uploads'),
                serveRoot: '/uploads',
                serveStaticOptions: {
                    index: false,
                },
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    logging: true,
                    type: 'postgres',
                    host: configService.get('DB_HOST', 'localhost'),
                    port: +configService.get('DB_PORT', '5432'),
                    username: configService.get('DB_USERNAME', 'postgres'),
                    password: configService.get('DB_PASSWORD', '1234'),
                    database: configService.get('DB_DATABASE', 'plp_edtech_db'),
                    entities: [
                        user_entity_1.User,
                        user_residence_entity_1.UserResidence,
                        user_pob_entity_1.UserPob,
                        role_entity_1.Role,
                        school_entity_1.School,
                        school_place_entity_1.SchoolPlace,
                        subject_entity_1.Subject,
                        subject_grade_entity_1.SubjectGrade,
                        lesson_entity_1.Lesson,
                        lesson_activity_entity_1.LessonActivity,
                        question_entity_1.Question,
                        answer_entity_1.Answer,
                        book_entity_1.Book,
                        book_category_entity_1.BookCategory,
                        teacher_entity_1.Teacher,
                        class_entity_1.Class,
                        student_entity_1.Student,
                        parent_entity_1.Parent,
                        menu_item_entity_1.MenuItem,
                        user_menu_permission_entity_1.UserMenuPermission,
                        chat_entity_1.Chat,
                        message_entity_1.Message,
                        prompt_question_entity_1.PromptQuestion,
                        video_entity_1.Video,
                        forum_entity_1.Forum,
                        user_response_entity_1.UserResponse,
                        homework_entity_1.Homework,
                        homework_submission_entity_1.HomeworkSubmission,
                        submission_files_entity_1.SubmissionFile,
                        analysis_entity_1.Analysis,
                        forum_save_entity_1.ForumSave,
                        forum_like_entity_1.ForumLike,
                        forum_comment_entity_1.ForumComment,
                        province_entity_1.Province,
                        district_entity_1.District,
                        commune_entity_1.Commune,
                        village_entity_1.Village,
                        website_entity_1.Website,
                        website_role_permission_entity_1.WebsiteRolePermission,
                        exam_entity_1.Exam,
                        exam_question_entity_1.ExamQuestion,
                        question_type_entity_1.QuestionType,
                        question_explanation_entity_1.QuestionExplanation,
                        image_metadata_entity_1.ImageMetadata,
                        sound_metadata_entity_1.SoundMetadata,
                        audio_metadata_entity_1.AudioMetadata,
                        examination_category_entity_1.ExaminationCategory,
                        sub_subject_entity_1.SubSubject,
                    ],
                }),
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            schools_module_1.SchoolsModule,
            lessons_module_1.LessonsModule,
            subjects_module_1.SubjectsModule,
            questions_module_1.QuestionsModule,
            answers_module_1.AnswersModule,
            books_module_1.BooksModule,
            book_categories_module_1.BookCategoriesModule,
            file_storage_module_1.FileStorageModule,
            menus_module_1.MenusModule,
            gemini_module_1.GeminiModule,
            gemma_module_1.GemmaModule,
            chats_module_1.ChatsModule,
            prompt_questions_module_1.PromptQuestionsModule,
            videos_module_1.VideosModule,
            forums_module_1.ForumsModule,
            students_module_1.StudentsModule,
            teachers_module_1.TeachersModule,
            classes_module_1.ClassesModule,
            homework_module_1.HomeworkModule,
            homework_submission_module_1.HomeworkSubmissionModule,
            lesson_activities_module_1.LessonActivitiesModule,
            user_responses_module_1.UserResponsesModule,
            analysis_module_1.AnalysisModule,
            locations_module_1.LocationsModule,
            websites_module_1.WebsitesModule,
            exams_module_1.ExamsModule,
            exam_questions_module_1.ExamQuestionsModule,
            examination_categories_module_1.ExaminationCategoriesModule,
            question_types_module_1.QuestionTypesModule,
            statistics_module_1.StatisticsModule,
            upload_module_1.UploadModule,
            sub_subjects_module_1.SubSubjectsModule,
            subject_grades_module_1.SubjectGradesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            config_service_1.AppConfigService,
            {
                provide: core_1.APP_PIPE,
                useValue: new common_2.ValidationPipe({
                    whitelist: true,
                    transform: true,
                    forbidNonWhitelisted: true,
                    transformOptions: {
                        enableImplicitConversion: true,
                    },
                    validationError: { target: false, value: false },
                    exceptionFactory: (errors) => {
                        const messages = errors
                            .map((error) => {
                            if (error.constraints) {
                                return Object.values(error.constraints).join(', ');
                            }
                            return `Validation failed on ${error.property}`;
                        })
                            .join('; ');
                        return new common_2.BadRequestException(messages);
                    },
                }),
            },
        ],
        exports: [config_service_1.AppConfigService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map