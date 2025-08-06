import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { QuestionTypesService } from './question-types.service';
import { CreateQuestionTypeDto } from './dto/create-question-type.dto';
import { UpdateQuestionTypeDto } from './dto/update-question-type.dto';
import { QuestionTypeResponseDto } from './dto/question-type-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Question Types')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('question-types')
export class QuestionTypesController {
  constructor(private readonly questionTypesService: QuestionTypesService) {}

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Create a new question type' })
  @ApiResponse({
    status: 201,
    description: 'Question type created successfully',
    type: QuestionTypeResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Question type with this key already exists',
  })
  async create(@Body() createQuestionTypeDto: CreateQuestionTypeDto) {
    return await this.questionTypesService.create(createQuestionTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all question types with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({
    status: 200,
    description: 'List of question types with pagination',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/QuestionTypeResponseDto' },
        },
        pagination: {
          type: 'object',
          properties: {
            page: { type: 'number', example: 1 },
            limit: { type: 'number', example: 10 },
            total: { type: 'number', example: 50 },
            pages: { type: 'number', example: 5 },
          },
        },
      },
    },
  })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return await this.questionTypesService.findAll(page, limit);
  }

  @Get('active')
  @ApiOperation({ summary: 'Get all active question types' })
  @ApiResponse({
    status: 200,
    description: 'List of active question types',
    type: [QuestionTypeResponseDto],
  })
  async findActive() {
    return await this.questionTypesService.findActive();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a question type by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Question type ID' })
  @ApiResponse({
    status: 200,
    description: 'Question type details',
    type: QuestionTypeResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Question type not found',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.questionTypesService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update a question type' })
  @ApiParam({ name: 'id', type: 'number', description: 'Question type ID' })
  @ApiResponse({
    status: 200,
    description: 'Question type updated successfully',
    type: QuestionTypeResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Question type not found',
  })
  @ApiResponse({
    status: 409,
    description: 'Question type with this key already exists',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuestionTypeDto: UpdateQuestionTypeDto,
  ) {
    return await this.questionTypesService.update(id, updateQuestionTypeDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Delete a question type' })
  @ApiParam({ name: 'id', type: 'number', description: 'Question type ID' })
  @ApiResponse({
    status: 200,
    description: 'Question type deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Question type not found',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.questionTypesService.remove(id);
    return { message: 'Question type deleted successfully' };
  }
}
