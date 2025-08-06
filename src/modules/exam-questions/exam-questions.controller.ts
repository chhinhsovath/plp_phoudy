import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExamQuestionsService } from './exam-questions.service';
import { CreateExamQuestionDto } from './dto/create-exam-question.dto';
import { UpdateExamQuestionDto } from './dto/update-exam-question.dto';

@ApiTags('exam-questions')
@Controller('exam-questions')
export class ExamQuestionsController {
  constructor(private readonly examQuestionsService: ExamQuestionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new exam question' })
  @ApiResponse({
    status: 201,
    description: 'Exam question created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createExamQuestionDto: CreateExamQuestionDto) {
    return this.examQuestionsService.create(createExamQuestionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all exam questions' })
  @ApiResponse({ status: 200, description: 'List of exam questions' })
  findAll() {
    return this.examQuestionsService.findAll();
  }

  @Get('exam/:examId')
  @ApiOperation({ summary: 'Get exam questions by exam ID' })
  @ApiResponse({
    status: 200,
    description: 'List of exam questions for the exam',
  })
  findByExam(@Param('examId', ParseIntPipe) examId: number) {
    return this.examQuestionsService.findByExam(examId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get exam question by ID' })
  @ApiResponse({ status: 200, description: 'Exam question found' })
  @ApiResponse({ status: 404, description: 'Exam question not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.examQuestionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update exam question' })
  @ApiResponse({
    status: 200,
    description: 'Exam question updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Exam question not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExamQuestionDto: UpdateExamQuestionDto,
  ) {
    return this.examQuestionsService.update(id, updateExamQuestionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete exam question' })
  @ApiResponse({
    status: 204,
    description: 'Exam question deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Exam question not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.examQuestionsService.remove(id);
  }
}
