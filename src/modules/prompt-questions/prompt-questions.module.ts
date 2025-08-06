import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromptQuestionsController } from './prompt-questions.controller';
import { PromptQuestionsService } from './prompt-questions.service';
import { PromptQuestion } from '../../entities/prompt-question.entity';
import { GemmaModule } from '../gemma/gemma.module';

@Module({
  imports: [TypeOrmModule.forFeature([PromptQuestion]), GemmaModule],
  controllers: [PromptQuestionsController],
  providers: [PromptQuestionsService],
  exports: [PromptQuestionsService],
})
export class PromptQuestionsModule {}
