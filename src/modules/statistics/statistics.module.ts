import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from '../../entities/question.entity';
import { Student } from '../../entities/student.entity';
import { Teacher } from '../../entities/teacher.entity';
import { School } from '../../entities/school.entity';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Student, Teacher, School])],
  controllers: [StatisticsController],
  providers: [StatisticsService],
  exports: [StatisticsService],
})
export class StatisticsModule {}
