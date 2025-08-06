import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';
import { Class } from '../../entities/class.entity';
import { Student } from '../../entities/student.entity';
import { UserResponse } from '../../entities/user-response.entity';
import { User } from '../../entities/user.entity';
import { Teacher } from '../../entities/teacher.entity';
import { Question } from '../../entities/question.entity';
import { Lesson } from '../../entities/lesson.entity';
import { LessonActivity } from '../../entities/lesson-activity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Class,
      Student,
      UserResponse,
      User,
      Teacher,
      Question,
      Lesson,
      LessonActivity,
    ]),
  ],
  controllers: [AnalysisController],
  providers: [AnalysisService],
  exports: [AnalysisService],
})
export class AnalysisModule {}
