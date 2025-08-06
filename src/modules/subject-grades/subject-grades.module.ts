import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectGradesController } from './subject-grades.controller';
import { SubjectGradesService } from './subject-grades.service';
import { SubjectGrade } from '../../entities/subject-grade.entity';
import { Subject } from '../../entities/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubjectGrade, Subject])],
  controllers: [SubjectGradesController],
  providers: [SubjectGradesService],
  exports: [SubjectGradesService],
})
export class SubjectGradesModule {}
