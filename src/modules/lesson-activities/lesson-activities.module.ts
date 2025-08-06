import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonActivitiesController } from './lesson-activities.controller';
import { LessonActivitiesService } from './lesson-activities.service';
import { QuestionsModule } from '../questions/questions.module';
import { AnswersModule } from '../answers/answers.module';
import { ConfigModule } from '@nestjs/config';
import { LessonActivity } from '../../entities/lesson-activity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LessonActivity]),
    QuestionsModule,
    AnswersModule,
    ConfigModule,
  ],
  controllers: [LessonActivitiesController],
  providers: [LessonActivitiesService],
  exports: [LessonActivitiesService],
})
export class LessonActivitiesModule {}
