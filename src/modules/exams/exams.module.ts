import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamsController } from './exams.controller';
import { ExamsService } from './exams.service';
import { Exam } from '../../entities/exam.entity';
import { ExamQuestionsModule } from '../exam-questions/exam-questions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Exam]), ExamQuestionsModule],
  controllers: [ExamsController],
  providers: [ExamsService],
  exports: [ExamsService],
})
export class ExamsModule {}
