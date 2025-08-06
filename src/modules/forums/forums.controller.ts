/* eslint-disable @typescript-eslint/no-unsafe-argument */

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';
import { Public } from '../../decorators/public.decorator';
import { Audience, Forum } from '../../entities/forum.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateCommentDto, UpdateCommentDto } from './dto/forum-comment.dto';
import {
  CreateForumDto,
  FilterOptions,
  ForumResponseDto,
  UpdateForumDto,
} from './dto/forum.dto';
import { ForumsService } from './forums.service';

@ApiTags('Forums')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('forums')
export class ForumsController {
  constructor(private readonly forumsService: ForumsService) {}

  @Public()
  @Get('public')
  @ApiOperation({
    summary: 'Get public forums with filtering and pagination',
    description:
      'Retrieve public forums with optional filtering by audience, subject, and search terms. Supports pagination.',
  })
  @ApiQuery({
    name: 'audience',
    required: false,
    enum: Audience,
    description: 'Filter by audience type (PUBLIC, PRIVATE, etc.)',
  })
  @ApiQuery({
    name: 'subjectId',
    required: false,
    type: Number,
    description: 'Filter by subject ID',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search term for forum title',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 1,
    description: 'Page number for pagination',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 10,
    description: 'Number of items per page',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved forums',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              title: { type: 'string', example: 'Sample Forum Title' },
              content: { type: 'string', example: 'Forum content here...' },
              audience: {
                type: 'string',
                enum: ['PUBLIC', 'PRIVATE', 'CLASS', 'DRAFT'],
              },
              grade: { type: 'string', example: 'Grade 10' },
              status: { type: 'string', example: 'ACTIVE' },
              likesCount: { type: 'number', example: 5 },
              commentsCount: { type: 'number', example: 3 },
              savesCount: { type: 'number', example: 2 },
              viewCount: { type: 'number', example: 25 },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
              user: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  name: { type: 'string' },
                },
              },
              subject: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  name: { type: 'string' },
                },
              },
            },
          },
        },
        total: { type: 'number', example: 50 },
        page: { type: 'number', example: 1 },
        limit: { type: 'number', example: 10 },
        totalPages: { type: 'number', example: 5 },
      },
    },
  })
  async getForums(
    @Query('audience') audience?: FilterOptions['audience'],
    @Query('subjectId') subjectId?: number,
    @Query('search') search?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.forumsService.getFilteredForums({
      audience,
      subjectId,
      search,
      page,
      limit,
    });
  }

  @Get('/')
  @ApiOperation({
    summary: 'Get user forums with filtering and pagination',
    description:
      'Retrieve forums for the authenticated user with optional filtering by audience, subject, and search terms. Supports pagination.',
  })
  @ApiQuery({
    name: 'audience',
    required: false,
    enum: Audience,
    description: 'Filter by audience type (YOUR, SAVE, CLASS, etc.)',
  })
  @ApiQuery({
    name: 'subjectId',
    required: false,
    type: Number,
    description: 'Filter by subject ID',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search term for forum title',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 1,
    description: 'Page number for pagination',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 10,
    description: 'Number of items per page',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved user forums',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              title: { type: 'string', example: 'Sample Forum Title' },
              content: { type: 'string', example: 'Forum content here...' },
              audience: {
                type: 'string',
                enum: ['PUBLIC', 'PRIVATE', 'CLASS', 'DRAFT'],
              },
              grade: { type: 'string', example: 'Grade 10' },
              status: { type: 'string', example: 'ACTIVE' },
              likesCount: { type: 'number', example: 5 },
              commentsCount: { type: 'number', example: 3 },
              savesCount: { type: 'number', example: 2 },
              viewCount: { type: 'number', example: 25 },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
              user: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  name: { type: 'string' },
                },
              },
              subject: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  name: { type: 'string' },
                },
              },
            },
          },
        },
        total: { type: 'number', example: 50 },
        page: { type: 'number', example: 1 },
        limit: { type: 'number', example: 10 },
        totalPages: { type: 'number', example: 5 },
      },
    },
  })
  async getMyForums(
    @Query('audience') audience?: FilterOptions['audience'],
    @Query('subjectId') subjectId?: number,
    @Query('search') search?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Request() req?,
  ) {
    return this.forumsService.getFilteredForums({
      audience,
      subjectId,
      search,
      page,
      limit,
      userId: req.user.id,
    });
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a forum by ID',
    description:
      'Retrieve a specific forum by its ID. Returns forum details with like/save status for the authenticated user.',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Forum ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved forum',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        title: { type: 'string', example: 'Sample Forum Title' },
        content: { type: 'string', example: 'Forum content here...' },
        audience: {
          type: 'string',
          enum: ['PUBLIC', 'PRIVATE', 'CLASS', 'DRAFT'],
        },
        grade: { type: 'string', example: 'Grade 10' },
        status: { type: 'string', example: 'ACTIVE' },
        likesCount: { type: 'number', example: 5 },
        commentsCount: { type: 'number', example: 3 },
        savesCount: { type: 'number', example: 2 },
        viewCount: { type: 'number', example: 25 },
        isLiked: { type: 'boolean', example: true },
        isSaved: { type: 'boolean', example: false },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
          },
        },
        subject: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Forum not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Forum with ID 1 not found' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return await this.forumsService.findOne(id, req.user.id);
  }

  @Public()
  @Get('public/:id')
  @ApiOperation({
    summary: 'Get a public forum by ID',
    description:
      'Retrieve a specific public forum by its ID. No authentication required.',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Forum ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved public forum',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        title: { type: 'string', example: 'Sample Forum Title' },
        content: { type: 'string', example: 'Forum content here...' },
        audience: {
          type: 'string',
          enum: ['PUBLIC', 'PRIVATE', 'CLASS', 'DRAFT'],
        },
        grade: { type: 'string', example: 'Grade 10' },
        status: { type: 'string', example: 'ACTIVE' },
        likesCount: { type: 'number', example: 5 },
        commentsCount: { type: 'number', example: 3 },
        savesCount: { type: 'number', example: 2 },
        viewCount: { type: 'number', example: 25 },
        isLiked: { type: 'boolean', example: true },
        isSaved: { type: 'boolean', example: false },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
          },
        },
        subject: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Forum not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Forum with ID 1 not found' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async findOnePublic(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return await this.forumsService.findOne(id, req.user.id);
  }

  @Public()
  @Get('by-subject/:subjectId')
  @ApiOperation({
    summary: 'Get forums by subject ID',
    description: 'Retrieve all forums for a specific subject ID.',
  })
  @ApiParam({
    name: 'subjectId',
    type: 'number',
    description: 'Subject ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved forums by subject',
    type: [ForumResponseDto],
  })
  async findBySubjectId(
    @Param('subjectId', ParseIntPipe) subjectId: number,
  ): Promise<Forum[]> {
    return await this.forumsService.findBySubjectId(subjectId);
  }

  @Post('/save/:id')
  @ApiOperation({
    summary: 'Toggle save/unsave a forum',
    description:
      'Save or unsave a forum post. If already saved, it will be unsaved and vice versa.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Forum ID to save/unsave',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Forum save status toggled successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'Forum saved successfully.' },
        forum: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            title: { type: 'string', example: 'Sample Forum Title' },
          },
        },
      },
    },
  })
  async togglerSaveForum(@Param('id') forumId: number, @Request() req: any) {
    const userId = req.user?.id;
    return this.forumsService.togglerSaveForum(forumId, userId);
  }

  @Post('/like/:id')
  @ApiOperation({
    summary: 'Toggle like/unlike a forum',
    description:
      'Like or unlike a forum post. If already liked, it will be unliked and vice versa.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Forum ID to like/unlike',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Forum like status toggled successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'Forum liked successfully.' },
        forum: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            title: { type: 'string', example: 'Sample Forum Title' },
          },
        },
      },
    },
  })
  async togglerLikeForum(@Param('id') forumId: number, @Request() req: any) {
    const userId = req.user?.id;
    return this.forumsService.togglerLikeForum(forumId, userId);
  }

  @Get('by-user/:userId')
  @ApiOperation({
    summary: 'Get forums by user ID',
    description: 'Retrieve all forums created by a specific user ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved forums by user',
    type: [ForumResponseDto],
  })
  @ApiParam({
    name: 'userId',
    type: 'number',
    description: 'User ID',
    example: 1,
  })
  async findByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Forum[]> {
    return await this.forumsService.findByUserId(userId);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new forum',
    description:
      'Create a new forum post with the provided data. Content will be encrypted before storage.',
  })
  @ApiBody({
    type: CreateForumDto,
    description: 'Forum creation data',
    examples: {
      example1: {
        summary: 'Basic forum creation',
        value: {
          title: 'Sample Forum Title',
          content: 'This is the forum content...',
          audience: 'PUBLIC',
          grade: 'Grade 10',
          subjectId: 1,
          status: 'ACTIVE',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Forum created successfully',
    type: ForumResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation error',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'array', items: { type: 'string' } },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  async create(
    @Body() createForumDto: CreateForumDto,
    @Request() req,
  ): Promise<Forum> {
    return await this.forumsService.create(createForumDto, req.user.id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a forum',
    description:
      'Update an existing forum. Only the forum owner or admin can update the forum.',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Forum ID to update',
    example: 1,
  })
  @ApiBody({
    type: UpdateForumDto,
    description: 'Forum update data',
    examples: {
      example1: {
        summary: 'Update forum title and content',
        value: {
          title: 'Updated Forum Title',
          content: 'Updated forum content...',
          audience: 'PUBLIC',
          grade: 'Grade 11',
          subjectId: 2,
          status: 'ACTIVE',
        },
      },
      example2: {
        summary: 'Update forum subject only',
        value: {
          subjectId: 3,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Forum updated successfully',
    type: ForumResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Forum not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Forum with ID 1 not found' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - not authorized to update this forum',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 403 },
        message: {
          type: 'string',
          example: 'You are not authorized to update this forum',
        },
        error: { type: 'string', example: 'Forbidden' },
      },
    },
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateForumDto: UpdateForumDto,
    @Request() req,
  ): Promise<Forum> {
    const forum = await this.forumsService.findOne(id);
    if (forum.usersId !== req.user.id && req.user.role?.nameEn !== 'ADMIN') {
      throw new HttpException(
        'You are not authorized to update this forum',
        HttpStatus.FORBIDDEN,
      );
    }
    return await this.forumsService.update(id, updateForumDto);
  }

  @Public()
  @Patch(':id/view')
  @ApiOperation({
    summary: 'Increment view count for a forum',
    description:
      "Increment the view count for a forum. This endpoint is public and doesn't require authentication.",
  })
  @ApiResponse({
    status: 200,
    description: 'View count incremented successfully',
    type: ForumResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Forum not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Forum with ID 1 not found' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Forum ID to increment view count',
    example: 1,
  })
  async incrementViewCount(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Forum> {
    return await this.forumsService.incrementViewCount(id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a forum',
    description:
      'Delete a forum. Only the forum owner or admin can delete the forum.',
  })
  @ApiResponse({
    status: 200,
    description: 'Forum deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Forum deleted successfully' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Forum not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Forum with ID 1 not found' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - not authorized to delete this forum',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 403 },
        message: {
          type: 'string',
          example: 'You are not authorized to delete this forum',
        },
        error: { type: 'string', example: 'Forbidden' },
      },
    },
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Forum ID to delete',
    example: 1,
  })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<void> {
    const forum = await this.forumsService.findOne(id);
    if (forum.usersId !== req.user.id && req.user.role?.nameEn !== 'ADMIN') {
      throw new HttpException(
        'You are not authorized to delete this forum',
        HttpStatus.FORBIDDEN,
      );
    }
    await this.forumsService.remove(id);
  }

  @Post('/comment/:id')
  @ApiOperation({
    summary: 'Create a comment for a forum',
    description:
      'Create a new comment for a specific forum. Content will be encrypted before storage.',
  })
  @ApiBody({
    type: CreateCommentDto,
    description: 'Comment creation data',
    examples: {
      example1: {
        summary: 'Create a comment',
        value: {
          content: 'This is a great forum post!',
          forumId: 1,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Comment created successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        content: { type: 'string', example: 'This is a great forum post!' },
        forumId: { type: 'number', example: 1 },
        userId: { type: 'number', example: 1 },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Unauthorized' },
      },
    },
  })
  createComment(@Body() dto: CreateCommentDto, @Request() req) {
    return this.forumsService.creatComment(dto, req.user.id);
  }

  @Patch('/comment/:id')
  @ApiOperation({
    summary: 'Update a comment by ID',
    description:
      'Update an existing comment. Only the comment owner or admin can update the comment.',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Comment ID to update',
    example: 1,
  })
  @ApiBody({
    type: UpdateCommentDto,
    description: 'Comment update data',
    examples: {
      example1: {
        summary: 'Update comment content',
        value: {
          content: 'Updated comment content...',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Comment updated successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        content: { type: 'string', example: 'Updated comment content...' },
        forumId: { type: 'number', example: 1 },
        userId: { type: 'number', example: 1 },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden: Not owner or admin',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 403 },
        message: {
          type: 'string',
          example: 'You are not authorized to update this comment',
        },
        error: { type: 'string', example: 'Forbidden' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Comment not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Comment with ID 1 not found' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  updateComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCommentDto,
    @Request() req,
  ) {
    return this.forumsService.updateComment(id, dto, req.user.id);
  }

  @Delete('/comment/:id')
  @ApiOperation({
    summary: 'Delete a comment by ID',
    description:
      'Delete an existing comment. Only the comment owner or admin can delete the comment.',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Comment ID to delete',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Comment deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Comment deleted successfully' },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden: Not owner or admin',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 403 },
        message: {
          type: 'string',
          example: 'You are not authorized to delete this comment',
        },
        error: { type: 'string', example: 'Forbidden' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Comment not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Comment with ID 1 not found' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async removeComment(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.forumsService.removeComment(id, req.user.id);
  }

  @Get(':id/comments')
  @ApiOperation({
    summary: 'Get all comments for a forum',
    description: 'Retrieve all comments for a specific forum ID.',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Forum ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Comments retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          content: { type: 'string', example: 'This is a comment...' },
          forumId: { type: 'number', example: 1 },
          userId: { type: 'number', example: 1 },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          user: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Forum not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Forum with ID 1 not found' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  getForumComments(@Param('id', ParseIntPipe) forumId: number) {
    return this.forumsService.getForumComments(forumId);
  }
}
