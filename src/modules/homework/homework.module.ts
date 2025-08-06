import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeworkService } from './homework.service';
import { HomeworkController } from './homework.controller';
import { Homework } from 'src/entities/homework.entity';
import { HomeworkSubmission } from 'src/entities/homework-submission.entity';
import { SubmissionFile } from 'src/entities/submission-files.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Homework, SubmissionFile])],
  controllers: [HomeworkController],
  providers: [HomeworkService, HomeworkSubmission],
})
export class HomeworkModule {}
