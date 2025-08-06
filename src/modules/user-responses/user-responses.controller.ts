import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
  Logger,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { UserResponsesService } from './user-responses.service';
import {
  UserResponseDto,
  CreateUserResponseDto,
  UpdateUserResponseDto,
  BulkDeleteDto,
} from './dto/user-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('User Responses')
@Controller('user-responses')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class UserResponsesController {
  private readonly logger = new Logger(UserResponsesController.name);

  constructor(private readonly userResponsesService: UserResponsesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all user responses' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of all user responses',
    type: [UserResponseDto],
  })
  async findAll(): Promise<UserResponseDto[]> {
    this.logger.log('Handling GET /user-responses request');
    return this.userResponsesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user response by ID' })
  @ApiParam({ name: 'id', description: 'User response ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the user response',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User response not found',
  })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    this.logger.log(`Handling GET /user-responses/${id} request`);
    return this.userResponsesService.findById(id);
  }

  @Get('question/:questionId')
  @ApiOperation({ summary: 'Get all user responses for a specific question' })
  @ApiParam({ name: 'questionId', description: 'Question ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns user responses for the given question',
    type: [UserResponseDto],
  })
  async findByQuestionId(
    @Param('questionId', ParseIntPipe) questionId: number,
  ): Promise<UserResponseDto[]> {
    this.logger.log(
      `Handling GET /user-responses/question/${questionId} request`,
    );
    return this.userResponsesService.findByQuestionId(questionId);
  }

  @Get('question/:questionId/correct')
  @ApiOperation({
    summary: 'Get correct user responses for a specific question',
  })
  @ApiParam({ name: 'questionId', description: 'Question ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns correct user responses for the given question',
    type: [UserResponseDto],
  })
  async findCorrectByQuestionId(
    @Param('questionId', ParseIntPipe) questionId: number,
  ): Promise<UserResponseDto[]> {
    this.logger.log(
      `Handling GET /user-responses/question/${questionId}/correct request`,
    );
    return this.userResponsesService.findByQuestionIdAndIsCorrect(
      questionId,
      true,
    );
  }

  @Get('question/:questionId/fastest')
  @ApiOperation({
    summary: 'Get fastest user responses for a specific question',
  })
  @ApiParam({ name: 'questionId', description: 'Question ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns user responses ordered by fastest time',
    type: [UserResponseDto],
  })
  async findFastestByQuestionId(
    @Param('questionId', ParseIntPipe) questionId: number,
  ): Promise<UserResponseDto[]> {
    this.logger.log(
      `Handling GET /user-responses/question/${questionId}/fastest request`,
    );
    return this.userResponsesService.findByQuestionIdOrderByTimeSpentAsc(
      questionId,
    );
  }

  @Get('question/:questionId/highest-impact')
  @ApiOperation({
    summary: 'Get highest impact user responses for a specific question',
  })
  @ApiParam({ name: 'questionId', description: 'Question ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns user responses ordered by highest score impact',
    type: [UserResponseDto],
  })
  async findHighestImpactByQuestionId(
    @Param('questionId', ParseIntPipe) questionId: number,
  ): Promise<UserResponseDto[]> {
    this.logger.log(
      `Handling GET /user-responses/question/${questionId}/highest-impact request`,
    );
    return this.userResponsesService.findByQuestionIdOrderByScoreImpactDesc(
      questionId,
    );
  }

  @Get('user/:userId')
  @ApiOperation({
    summary: 'Get all user responses for a specific user',
    description:
      'Retrieve all responses submitted by a specific user, ordered by creation date (newest first)',
  })
  @ApiParam({
    name: 'userId',
    description: 'User ID',
    example: 1,
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns all user responses for the specified user',
    type: [UserResponseDto],
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          userId: { type: 'number', example: 1 },
          questionId: { type: 'number', example: 5 },
          userAnswer: { type: 'string', example: 'A' },
          userAnswerFile: { type: 'string', example: null },
          isCorrect: { type: 'boolean', example: true },
          timeSpent: { type: 'number', example: 45 },
          scoreImpact: { type: 'number', example: 10 },
          streakCount: { type: 'number', example: 3 },
          hintsUsed: { type: 'number', example: 0 },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          user: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
            },
          },
          question: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              title: { type: 'string' },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found or no responses found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'No responses found for user' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async findByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserResponseDto[]> {
    this.logger.log(`Handling GET /user-responses/user/${userId} request`);
    return this.userResponsesService.findByUserId(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user response' })
  @ApiBody({ type: CreateUserResponseDto })
  @ApiResponse({
    status: 201,
    description: 'The user response has been successfully created',
    type: UserResponseDto,
  })
  async create(
    @Body() createUserResponseDto: CreateUserResponseDto,
  ): Promise<UserResponseDto> {
    this.logger.log('Handling POST /user-responses request');
    return this.userResponsesService.create(createUserResponseDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user response' })
  @ApiParam({ name: 'id', description: 'User response ID' })
  @ApiBody({ type: UpdateUserResponseDto })
  @ApiResponse({
    status: 200,
    description: 'The user response has been successfully updated',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User response not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserResponseDto: UpdateUserResponseDto,
  ): Promise<UserResponseDto> {
    this.logger.log(`Handling PUT /user-responses/${id} request`);
    return this.userResponsesService.update(id, updateUserResponseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user response' })
  @ApiParam({ name: 'id', description: 'User response ID' })
  @ApiResponse({
    status: 200,
    description: 'The user response has been successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'User response not found' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    this.logger.log(`Handling DELETE /user-responses/${id} request`);
    return this.userResponsesService.remove(id);
  }

  @Delete('bulk')
  @ApiOperation({ summary: 'Bulk delete user responses' })
  @ApiBody({ type: BulkDeleteDto })
  @ApiResponse({
    status: 200,
    description: 'The user responses have been successfully deleted',
  })
  async bulkDelete(@Body() bulkDeleteDto: BulkDeleteDto): Promise<void> {
    this.logger.log(
      `Handling DELETE /user-responses/bulk request for IDs: ${bulkDeleteDto.ids.join(', ')}`,
    );
    return this.userResponsesService.bulkRemove(bulkDeleteDto.ids);
  }
}
