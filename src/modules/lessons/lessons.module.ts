import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { Lesson } from '../../entities/lesson.entity';
import { LessonActivity } from '../../entities/lesson-activity.entity';
import { Subject } from '../../entities/subject.entity';
import { User } from '../../entities/user.entity';
import { LessonActivitiesModule } from '../lesson-activities/lesson-activities.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lesson, LessonActivity, Subject, User]),
    LessonActivitiesModule,
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
  exports: [LessonsService],
})
export class LessonsModule {}
