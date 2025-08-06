import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubSubjectsService } from './sub-subjects.service';
import { SubSubjectsController } from './sub-subjects.controller';
import { SubSubject } from '../../entities/sub-subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubSubject])],
  controllers: [SubSubjectsController],
  providers: [SubSubjectsService],
  exports: [SubSubjectsService],
})
export class SubSubjectsModule {}
