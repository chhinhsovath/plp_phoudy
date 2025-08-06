import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExaminationCategoriesController } from './examination-categories.controller';
import { ExaminationCategoriesService } from './examination-categories.service';
import { ExaminationCategory } from '../../entities/examination-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExaminationCategory])],
  controllers: [ExaminationCategoriesController],
  providers: [ExaminationCategoriesService],
  exports: [ExaminationCategoriesService],
})
export class ExaminationCategoriesModule {}
