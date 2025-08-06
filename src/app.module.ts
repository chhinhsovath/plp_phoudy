import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { SchoolsModule } from './modules/schools/schools.module';
import { LessonsModule } from './modules/lessons/lessons.module';
import { SubjectsModule } from './modules/subjects/subjects.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { AnswersModule } from './modules/answers/answers.module';
import { BooksModule } from './modules/books/books.module';
import { BookCategoriesModule } from './modules/book-categories/book-categories.module';
import { FileStorageModule } from './modules/file-storage/file-storage.module';
import { MenusModule } from './modules/menus/menus.module';
import { GeminiModule } from './modules/gemini/gemini.module';
import { GemmaModule } from './modules/gemma/gemma.module';
import { ChatsModule } from './modules/chats/chats.module';
import { PromptQuestionsModule } from './modules/prompt-questions/prompt-questions.module';
import { VideosModule } from './modules/videos/videos.module';
import { ForumsModule } from './modules/forums/forums.module';
import { StudentsModule } from './modules/students/students.module';
import { TeachersModule } from './modules/teachers/teachers.module';
import { ClassesModule } from './modules/classes/classes.module';
import { UserResponsesModule } from './modules/user-responses/user-responses.module';
import { AnalysisModule } from './modules/analysis/analysis.module';
import { User } from './entities/user.entity';
import { UserResidence } from './entities/user-residence.entity';
import { UserPob } from './entities/user-pob.entity';
import { School } from './entities/school.entity';
import { SchoolPlace } from './entities/school-place.entity';
import { Subject } from './entities/subject.entity';
import { SubjectGrade } from './entities/subject-grade.entity';
import { Lesson } from './entities/lesson.entity';
import { LessonActivity } from './entities/lesson-activity.entity';
import { Question } from './entities/question.entity';
import { Answer } from './entities/answer.entity';
import { Book } from './entities/book.entity';
import { BookCategory } from './entities/book-category.entity';
import { Teacher } from './entities/teacher.entity';
import { Class } from './entities/class.entity';
import { Student } from './entities/student.entity';
import { Parent } from './entities/parent.entity';
import { MenuItem } from './entities/menu-item.entity';
import { UserMenuPermission } from './entities/user-menu-permission.entity';
import { Chat } from './entities/chat.entity';
import { Message } from './entities/message.entity';
import { PromptQuestion } from './entities/prompt-question.entity';
import { Video } from './entities/video.entity';
import { Forum } from './entities/forum.entity';
import { UserResponse } from './entities/user-response.entity';
import { Homework } from './entities/homework.entity';
import { HomeworkModule } from './modules/homework/homework.module';
import { HomeworkSubmission } from './entities/homework-submission.entity';
import { SubmissionFile } from './entities/submission-files.entity';
import { HomeworkSubmissionModule } from './modules/homework-submission/homework-submission.module';
import { Analysis } from './entities/analysis.entity';
import { LessonActivitiesModule } from './modules/lesson-activities/lesson-activities.module';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { ForumSave } from './entities/forum-save.entity';
import { ForumLike } from './entities/forum-like.entity';
import { ForumComment } from './entities/forum-comment.entity';
import { LocationsModule } from './modules/locations/locations.module';
import { Province } from './entities/province.entity';
import { District } from './entities/district.entity';
import { Commune } from './entities/commune.entity';
import { Village } from './entities/village.entity';
import { Role } from './entities/role.entity';
import { Website } from './entities/website.entity';
import { WebsiteRolePermission } from './entities/website-role-permission.entity';
import { WebsitesModule } from './modules/websites/websites.module';
import { ExamsModule } from './modules/exams/exams.module';
import { Exam } from './entities/exam.entity';
import { ExamQuestionsModule } from './modules/exam-questions/exam-questions.module';
import { ExaminationCategoriesModule } from './modules/examination-categories/examination-categories.module';
import { ExamQuestion } from './entities/exam-question.entity';
import { QuestionType } from './entities/question-type.entity';
import { QuestionExplanation } from './entities/question-explanation.entity';
import { QuestionTypesModule } from './modules/question-types/question-types.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { UploadModule } from './modules/upload/upload.module';
import { ImageMetadata } from './entities/image-metadata.entity';
import { SoundMetadata } from './entities/sound-metadata.entity';
import { AudioMetadata } from './entities/audio-metadata.entity';
import { ExaminationCategory } from './entities/examination-category.entity';
import { SubSubject } from './entities/sub-subject.entity';
import { SubSubjectsModule } from './modules/sub-subjects/sub-subjects.module';
import { SubjectGradesModule } from './modules/subject-grades/subject-grades.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppConfigService } from './config/config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
      serveStaticOptions: {
        index: false, // do NOT serve index.html by default
        // You can add other options here if needed
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        logging: true,
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: +configService.get('DB_PORT', '5432'),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', '1234'),
        database: configService.get('DB_DATABASE', 'plp_edtech_db'),
        // synchronize: true,
        entities: [
          User,
          UserResidence,
          UserPob,
          Role,
          School,
          SchoolPlace,
          Subject,
          SubjectGrade,
          Lesson,
          LessonActivity,
          Question,
          Answer,
          Book,
          BookCategory,
          Teacher,
          Class,
          Student,
          Parent,
          MenuItem,
          UserMenuPermission,
          Chat,
          Message,
          PromptQuestion,
          Video,
          Forum,
          UserResponse,
          Homework,
          HomeworkSubmission,
          SubmissionFile,
          Analysis,
          ForumSave,
          ForumLike,
          ForumComment,
          Province,
          District,
          Commune,
          Village,
          Website,
          WebsiteRolePermission,
          Exam,
          ExamQuestion,
          QuestionType,
          QuestionExplanation,
          ImageMetadata,
          SoundMetadata,
          AudioMetadata,
          ExaminationCategory,
          SubSubject,
        ],
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    SchoolsModule,
    LessonsModule,
    SubjectsModule,
    QuestionsModule,
    AnswersModule,
    BooksModule,
    BookCategoriesModule,
    FileStorageModule,
    MenusModule,
    GeminiModule,
    GemmaModule,
    ChatsModule,
    PromptQuestionsModule,
    VideosModule,
    ForumsModule,
    StudentsModule,
    TeachersModule,
    ClassesModule,
    HomeworkModule,
    HomeworkSubmissionModule,
    LessonActivitiesModule,
    UserResponsesModule,
    AnalysisModule,
    LocationsModule,
    WebsitesModule,
    ExamsModule,
    ExamQuestionsModule,
    ExaminationCategoriesModule,
    QuestionTypesModule,
    StatisticsModule,
    UploadModule,
    SubSubjectsModule,
    SubjectGradesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppConfigService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
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
          return new BadRequestException(messages);
        },
      }),
    },
  ],
  exports: [AppConfigService],
})
export class AppModule {}
