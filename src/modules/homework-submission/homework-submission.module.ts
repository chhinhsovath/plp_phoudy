import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Homework } from 'src/entities/homework.entity';
import { HomeworkSubmission } from 'src/entities/homework-submission.entity';
import { HomeworkService } from '../homework/homework.service';
import { HomeworkSubmissionController } from './homework-submission.controller';
import { HomeworkSubmissionService } from './homework-submission.service';
import { SubmissionFile } from 'src/entities/submission-files.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Homework, HomeworkSubmission, SubmissionFile]),
  ],
  controllers: [HomeworkSubmissionController],
  providers: [HomeworkService, HomeworkSubmissionService],
})
export class HomeworkSubmissionModule {}
