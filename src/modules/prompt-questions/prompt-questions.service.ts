import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PromptQuestion } from '../../entities/prompt-question.entity';
import { SuggestedPromptResponseDto } from './dto/prompt-question.dto';

@Injectable()
export class PromptQuestionsService {
  private readonly logger = new Logger(PromptQuestionsService.name);

  constructor(
    @InjectRepository(PromptQuestion)
    private promptQuestionRepository: Repository<PromptQuestion>,
  ) {}

  async searchQuestions(content: string): Promise<PromptQuestion[]> {
    this.logger.log(`Searching for prompt questions with content: ${content}`);

    const query = `
      SELECT * FROM prompt_questions
      WHERE to_tsvector('simple', coalesce(question_title,'') || ' ' || coalesce(question_content,''))
      @@ plainto_tsquery('simple', $1)
      ORDER BY created_at DESC
    `;

    return await this.promptQuestionRepository.query(query, [content]);
  }

  async getSuggestedPrompts(
    limit: number = 10,
  ): Promise<SuggestedPromptResponseDto[]> {
    this.logger.log(`Getting suggested prompts with limit: ${limit}`);

    const suggestions = await this.promptQuestionRepository.find({
      where: { is_suggestion: true },
      order: { created_at: 'DESC' },
      take: limit,
      select: [
        'id',
        'question_title',
        'question_content',
        'response',
        'source_file',
        'tags',
        'is_suggestion',
      ],
    });

    return suggestions.map((suggestion) => ({
      id: suggestion.id,
      question_title: suggestion.question_title,
      question_content: suggestion.question_content,
      response: suggestion.response,
      source_file: suggestion.source_file,
      tags: suggestion.tags,
      is_suggestion: suggestion.is_suggestion,
    }));
  }

  async markAsSuggestion(
    id: number,
    isSuggestion: boolean,
  ): Promise<PromptQuestion> {
    this.logger.log(
      `Marking prompt question ${id} as suggestion: ${isSuggestion}`,
    );

    const question = await this.promptQuestionRepository.findOne({
      where: { id },
    });

    if (!question) {
      this.logger.warn(`Prompt question with ID ${id} not found`);
      throw new NotFoundException(`Prompt question with ID ${id} not found`);
    }

    question.is_suggestion = isSuggestion;
    return await this.promptQuestionRepository.save(question);
  }

  async getAllQuestions(): Promise<PromptQuestion[]> {
    this.logger.log('Getting all prompt questions');
    return await this.promptQuestionRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  async deleteQuestion(id: number): Promise<void> {
    this.logger.log(`Deleting prompt question with ID: ${id}`);

    const question = await this.promptQuestionRepository.findOne({
      where: { id },
    });

    if (!question) {
      this.logger.warn(`Prompt question with ID ${id} not found`);
      throw new NotFoundException(`Prompt question with ID ${id} not found`);
    }

    await this.promptQuestionRepository.remove(question);
  }
}
