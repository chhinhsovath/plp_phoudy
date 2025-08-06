import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { Student } from '../../entities/student.entity';
import { Teacher } from '../../entities/teacher.entity';
import { UserResponse } from '../../entities/user-response.entity';
import { Question } from '../../entities/question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Teacher, UserResponse, Question]),
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}
