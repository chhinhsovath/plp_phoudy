import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamQuestion } from '../../entities/exam-question.entity';
import { ExamQuestionsService } from './exam-questions.service';
import { ExamQuestionsController } from './exam-questions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ExamQuestion])],
  controllers: [ExamQuestionsController],
  providers: [ExamQuestionsService],
  exports: [ExamQuestionsService],
})
export class ExamQuestionsModule {}
