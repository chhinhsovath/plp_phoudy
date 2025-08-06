import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ParseArrayPipe,
  ParseBoolPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from '../../entities/answer.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('answers')
@Controller('answers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post()
  @Roles('ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Create a new answer' })
  @ApiResponse({
    status: 201,
    description: 'The answer has been successfully created.',
    type: Answer,
  })
  create(@Body() createAnswerDto: CreateAnswerDto): Promise<Answer> {
    return this.answersService.create(createAnswerDto);
  }

  @Post('bulk')
  @Roles('ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Create multiple answers' })
  @ApiResponse({
    status: 201,
    description: 'The answers have been successfully created.',
    type: [Answer],
  })
  createAll(@Body() createAnswerDtos: CreateAnswerDto[]): Promise<Answer[]> {
    return this.answersService.createAll(createAnswerDtos);
  }

  @Get()
  @ApiOperation({ summary: 'Get all answers' })
  @ApiResponse({
    status: 200,
    description: 'Return all answers.',
    type: [Answer],
  })
  findAll(): Promise<Answer[]> {
    return this.answersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an answer by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the answer.',
    type: Answer,
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Answer> {
    return this.answersService.findOne(id);
  }

  @Get('question/:questionId')
  @ApiOperation({ summary: 'Get answers by question id' })
  @ApiResponse({
    status: 200,
    description: 'Return question with answers.',
  })
  async findByQuestionId(
    @Param('questionId', ParseIntPipe) questionId: number,
  ): Promise<any> {
    return this.answersService.findQuestionWithAnswers(questionId);
  }

  @Get('question/:questionId/list')
  @ApiOperation({ summary: 'Get answers array by question id' })
  @ApiResponse({
    status: 200,
    description: 'Return answers array for the question.',
    type: [Answer],
  })
  findAnswersByQuestionId(
    @Param('questionId', ParseIntPipe) questionId: number,
  ): Promise<Answer[]> {
    return this.answersService.findByQuestionId(questionId);
  }

  @Get('question/:questionId/ordered')
  @ApiOperation({
    summary: 'Get answers by question id ordered by order index',
  })
  @ApiResponse({
    status: 200,
    description: 'Return ordered answers for the question.',
    type: [Answer],
  })
  findByQuestionIdOrdered(
    @Param('questionId', ParseIntPipe) questionId: number,
  ): Promise<Answer[]> {
    return this.answersService.findByQuestionIdOrderByOrderIndex(questionId);
  }

  @Get('question/:questionId/display-ordered')
  @ApiOperation({
    summary: 'Get answers by question id ordered by display order',
  })
  @ApiResponse({
    status: 200,
    description: 'Return display ordered answers for the question.',
    type: [Answer],
  })
  findByQuestionIdDisplayOrdered(
    @Param('questionId', ParseIntPipe) questionId: number,
  ): Promise<Answer[]> {
    return this.answersService.findByQuestionIdOrderByDisplayOrder(questionId);
  }

  @Patch(':id')
  @Roles('ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Update an answer' })
  @ApiResponse({
    status: 200,
    description: 'The answer has been successfully updated.',
    type: Answer,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAnswerDto: UpdateAnswerDto,
  ): Promise<Answer> {
    return this.answersService.update(id, updateAnswerDto);
  }

  @Patch('question/:questionId/order')
  @Roles('ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Update answer orders for a question' })
  @ApiResponse({
    status: 200,
    description: 'The answer orders have been successfully updated.',
  })
  updateAnswerOrders(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Body('answerIds', new ParseArrayPipe({ items: Number }))
    answerIds: number[],
    @Body('displayOrder', ParseBoolPipe) displayOrder: boolean,
  ): Promise<void> {
    return this.answersService.updateAnswerOrders(
      questionId,
      answerIds,
      displayOrder,
    );
  }

  @Delete(':id')
  @Roles('ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Delete an answer' })
  @ApiResponse({
    status: 200,
    description: 'The answer has been successfully deleted.',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.answersService.remove(id);
  }

  @Delete('question/:questionId')
  @Roles('ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Delete all answers for a question' })
  @ApiResponse({
    status: 200,
    description: 'The answers have been successfully deleted.',
  })
  removeByQuestionId(
    @Param('questionId', ParseIntPipe) questionId: number,
  ): Promise<void> {
    return this.answersService.removeByQuestionId(questionId);
  }

  @Delete()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Delete multiple answers' })
  @ApiResponse({
    status: 200,
    description: 'The answers have been successfully deleted.',
  })
  removeAll(
    @Body('ids', new ParseArrayPipe({ items: Number })) ids: number[],
  ): Promise<void> {
    return this.answersService.removeAll(ids);
  }

  @Post('check/multiple-choice/:questionId')
  @ApiOperation({ summary: 'Check multiple choice answer' })
  @ApiResponse({
    status: 200,
    description: 'Return whether the answer is correct.',
    type: Boolean,
  })
  checkMultipleChoiceAnswer(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Body('submittedAnswerIds', new ParseArrayPipe({ items: Number }))
    submittedAnswerIds: number[],
  ): Promise<boolean> {
    return this.answersService.checkMultipleChoiceAnswer(
      questionId,
      submittedAnswerIds,
    );
  }

  @Post('check/multiple-select/:questionId')
  @ApiOperation({ summary: 'Check multiple select answer' })
  @ApiResponse({
    status: 200,
    description: 'Return whether the answer is correct.',
    type: Boolean,
  })
  checkMultipleSelectAnswer(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Body('submittedAnswerIds', new ParseArrayPipe({ items: Number }))
    submittedAnswerIds: number[],
  ): Promise<boolean> {
    return this.answersService.checkMultipleSelectAnswer(
      questionId,
      submittedAnswerIds,
    );
  }

  @Post('check/true-false/:questionId')
  @ApiOperation({ summary: 'Check true/false answer' })
  @ApiResponse({
    status: 200,
    description: 'Return whether the answer is correct.',
    type: Boolean,
  })
  checkTrueFalseAnswer(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Body('submittedAnswerId', ParseIntPipe) submittedAnswerId: number,
  ): Promise<boolean> {
    return this.answersService.checkTrueFalseAnswer(
      questionId,
      submittedAnswerId,
    );
  }

  @Post('check/matching/:questionId')
  @ApiOperation({ summary: 'Check matching answer' })
  @ApiResponse({
    status: 200,
    description: 'Return whether the answer is correct.',
    type: Boolean,
  })
  checkMatchingAnswer(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Body('submittedMatches')
    submittedMatches: { key: string; value: string }[],
  ): Promise<boolean> {
    return this.answersService.checkMatchingAnswer(
      questionId,
      submittedMatches,
    );
  }

  @Post('check/ordering/:questionId')
  @ApiOperation({ summary: 'Check ordering answer' })
  @ApiResponse({
    status: 200,
    description: 'Return whether the answer is correct.',
    type: Boolean,
  })
  checkOrderingAnswer(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Body('submittedAnswerIds', new ParseArrayPipe({ items: Number }))
    submittedAnswerIds: number[],
  ): Promise<boolean> {
    return this.answersService.checkOrderingAnswer(
      questionId,
      submittedAnswerIds,
    );
  }

  @Post('check/drag-and-drop/:questionId')
  @ApiOperation({ summary: 'Check drag and drop answer' })
  @ApiResponse({
    status: 200,
    description: 'Return whether the answer is correct.',
    type: Boolean,
  })
  checkDragAndDropAnswer(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Body('submittedAnswerIds', new ParseArrayPipe({ items: Number }))
    submittedAnswerIds: number[],
  ): Promise<boolean> {
    return this.answersService.checkDragAndDropAnswer(
      questionId,
      submittedAnswerIds,
    );
  }
}
