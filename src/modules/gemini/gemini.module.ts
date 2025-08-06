import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { GeminiController } from './gemini.controller';
import { GeminiService } from './gemini.service';
import { StudentsModule } from '../students/students.module';
import { ClassesModule } from '../classes/classes.module';
import { AnalysisModule } from '../analysis/analysis.module';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    StudentsModule,
    ClassesModule,
    AnalysisModule,
  ],
  controllers: [GeminiController],
  providers: [GeminiService],
  exports: [GeminiService],
})
export class GeminiModule {}
