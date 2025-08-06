import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { Question } from '../../entities/question.entity';
import { QuestionType } from '../../entities/question-type.entity';
import { QuestionExplanation } from '../../entities/question-explanation.entity';
import { LessonActivity } from '../../entities/lesson-activity.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Question,
      QuestionType,
      QuestionExplanation,
      LessonActivity,
    ]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/questions',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            file.fieldname + '-' + uniqueSuffix + extname(file.originalname),
          );
        },
      }),
    }),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
