"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../../decorators/public.decorator");
const forum_entity_1 = require("../../entities/forum.entity");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const forum_comment_dto_1 = require("./dto/forum-comment.dto");
const forum_dto_1 = require("./dto/forum.dto");
const forums_service_1 = require("./forums.service");
let ForumsController = class ForumsController {
    forumsService;
    constructor(forumsService) {
        this.forumsService = forumsService;
    }
    async getForums(audience, subjectId, search, page = 1, limit = 10) {
        return this.forumsService.getFilteredForums({
            audience,
            subjectId,
            search,
            page,
            limit,
        });
    }
    async getMyForums(audience, subjectId, search, page = 1, limit = 10, req) {
        return this.forumsService.getFilteredForums({
            audience,
            subjectId,
            search,
            page,
            limit,
            userId: req.user.id,
        });
    }
    async findOne(id, req) {
        return await this.forumsService.findOne(id, req.user.id);
    }
    async findOnePublic(id, req) {
        return await this.forumsService.findOne(id, req.user.id);
    }
    async findBySubjectId(subjectId) {
        return await this.forumsService.findBySubjectId(subjectId);
    }
    async togglerSaveForum(forumId, req) {
        const userId = req.user?.id;
        return this.forumsService.togglerSaveForum(forumId, userId);
    }
    async togglerLikeForum(forumId, req) {
        const userId = req.user?.id;
        return this.forumsService.togglerLikeForum(forumId, userId);
    }
    async findByUserId(userId) {
        return await this.forumsService.findByUserId(userId);
    }
    async create(createForumDto, req) {
        return await this.forumsService.create(createForumDto, req.user.id);
    }
    async update(id, updateForumDto, req) {
        const forum = await this.forumsService.findOne(id);
        if (forum.usersId !== req.user.id && req.user.role?.nameEn !== 'ADMIN') {
            throw new common_1.HttpException('You are not authorized to update this forum', common_1.HttpStatus.FORBIDDEN);
        }
        return await this.forumsService.update(id, updateForumDto);
    }
    async incrementViewCount(id) {
        return await this.forumsService.incrementViewCount(id);
    }
    async remove(id, req) {
        const forum = await this.forumsService.findOne(id);
        if (forum.usersId !== req.user.id && req.user.role?.nameEn !== 'ADMIN') {
            throw new common_1.HttpException('You are not authorized to delete this forum', common_1.HttpStatus.FORBIDDEN);
        }
        await this.forumsService.remove(id);
    }
    createComment(dto, req) {
        return this.forumsService.creatComment(dto, req.user.id);
    }
    updateComment(id, dto, req) {
        return this.forumsService.updateComment(id, dto, req.user.id);
    }
    async removeComment(id, req) {
        return this.forumsService.removeComment(id, req.user.id);
    }
    getForumComments(forumId) {
        return this.forumsService.getForumComments(forumId);
    }
};
exports.ForumsController = ForumsController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('public'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get public forums with filtering and pagination',
        description: 'Retrieve public forums with optional filtering by audience, subject, and search terms. Supports pagination.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'audience',
        required: false,
        enum: forum_entity_1.Audience,
        description: 'Filter by audience type (PUBLIC, PRIVATE, etc.)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'subjectId',
        required: false,
        type: Number,
        description: 'Filter by subject ID',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        required: false,
        type: String,
        description: 'Search term for forum title',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        example: 1,
        description: 'Page number for pagination',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        example: 10,
        description: 'Number of items per page',
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    __param(0, (0, common_1.Query)('audience')),
    __param(1, (0, common_1.Query)('subjectId')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('page')),
    __param(4, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, String, Object, Object]),
    __metadata("design:returntype", Promise)
], ForumsController.prototype, "getForums", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get user forums with filtering and pagination',
        description: 'Retrieve forums for the authenticated user with optional filtering by audience, subject, and search terms. Supports pagination.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'audience',
        required: false,
        enum: forum_entity_1.Audience,
        description: 'Filter by audience type (YOUR, SAVE, CLASS, etc.)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'subjectId',
        required: false,
        type: Number,
        description: 'Filter by subject ID',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        required: false,
        type: String,
        description: 'Search term for forum title',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        example: 1,
        description: 'Page number for pagination',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        example: 10,
        description: 'Number of items per page',
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    __param(0, (0, common_1.Query)('audience')),
    __param(1, (0, common_1.Query)('subjectId')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('page')),
    __param(4, (0, common_1.Query)('limit')),
    __param(5, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, String, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ForumsController.prototype, "getMyForums", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get a forum by ID',
        description: 'Retrieve a specific forum by its ID. Returns forum details with like/save status for the authenticated user.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'Forum ID',
        example: 1,
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ForumsController.prototype, "findOne", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('public/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get a public forum by ID',
        description: 'Retrieve a specific public forum by its ID. No authentication required.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'Forum ID',
        example: 1,
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ForumsController.prototype, "findOnePublic", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('by-subject/:subjectId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get forums by subject ID',
        description: 'Retrieve all forums for a specific subject ID.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'subjectId',
        type: 'number',
        description: 'Subject ID',
        example: 1,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully retrieved forums by subject',
        type: [forum_dto_1.ForumResponseDto],
    }),
    __param(0, (0, common_1.Param)('subjectId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ForumsController.prototype, "findBySubjectId", null);
__decorate([
    (0, common_1.Post)('/save/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Toggle save/unsave a forum',
        description: 'Save or unsave a forum post. If already saved, it will be unsaved and vice versa.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: Number,
        description: 'Forum ID to save/unsave',
        example: 1,
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ForumsController.prototype, "togglerSaveForum", null);
__decorate([
    (0, common_1.Post)('/like/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Toggle like/unlike a forum',
        description: 'Like or unlike a forum post. If already liked, it will be unliked and vice versa.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: Number,
        description: 'Forum ID to like/unlike',
        example: 1,
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ForumsController.prototype, "togglerLikeForum", null);
__decorate([
    (0, common_1.Get)('by-user/:userId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get forums by user ID',
        description: 'Retrieve all forums created by a specific user ID.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully retrieved forums by user',
        type: [forum_dto_1.ForumResponseDto],
    }),
    (0, swagger_1.ApiParam)({
        name: 'userId',
        type: 'number',
        description: 'User ID',
        example: 1,
    }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ForumsController.prototype, "findByUserId", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new forum',
        description: 'Create a new forum post with the provided data. Content will be encrypted before storage.',
    }),
    (0, swagger_1.ApiBody)({
        type: forum_dto_1.CreateForumDto,
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Forum created successfully',
        type: forum_dto_1.ForumResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forum_dto_1.CreateForumDto, Object]),
    __metadata("design:returntype", Promise)
], ForumsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update a forum',
        description: 'Update an existing forum. Only the forum owner or admin can update the forum.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'Forum ID to update',
        example: 1,
    }),
    (0, swagger_1.ApiBody)({
        type: forum_dto_1.UpdateForumDto,
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Forum updated successfully',
        type: forum_dto_1.ForumResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, forum_dto_1.UpdateForumDto, Object]),
    __metadata("design:returntype", Promise)
], ForumsController.prototype, "update", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Patch)(':id/view'),
    (0, swagger_1.ApiOperation)({
        summary: 'Increment view count for a forum',
        description: "Increment the view count for a forum. This endpoint is public and doesn't require authentication.",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'View count incremented successfully',
        type: forum_dto_1.ForumResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'Forum ID to increment view count',
        example: 1,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ForumsController.prototype, "incrementViewCount", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a forum',
        description: 'Delete a forum. Only the forum owner or admin can delete the forum.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Forum deleted successfully',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Forum deleted successfully' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'Forum ID to delete',
        example: 1,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ForumsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('/comment/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a comment for a forum',
        description: 'Create a new comment for a specific forum. Content will be encrypted before storage.',
    }),
    (0, swagger_1.ApiBody)({
        type: forum_comment_dto_1.CreateCommentDto,
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
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 401 },
                message: { type: 'string', example: 'Unauthorized' },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forum_comment_dto_1.CreateCommentDto, Object]),
    __metadata("design:returntype", void 0)
], ForumsController.prototype, "createComment", null);
__decorate([
    (0, common_1.Patch)('/comment/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update a comment by ID',
        description: 'Update an existing comment. Only the comment owner or admin can update the comment.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'Comment ID to update',
        example: 1,
    }),
    (0, swagger_1.ApiBody)({
        type: forum_comment_dto_1.UpdateCommentDto,
        description: 'Comment update data',
        examples: {
            example1: {
                summary: 'Update comment content',
                value: {
                    content: 'Updated comment content...',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, forum_comment_dto_1.UpdateCommentDto, Object]),
    __metadata("design:returntype", void 0)
], ForumsController.prototype, "updateComment", null);
__decorate([
    (0, common_1.Delete)('/comment/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a comment by ID',
        description: 'Delete an existing comment. Only the comment owner or admin can delete the comment.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'Comment ID to delete',
        example: 1,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Comment deleted successfully',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Comment deleted successfully' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ForumsController.prototype, "removeComment", null);
__decorate([
    (0, common_1.Get)(':id/comments'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all comments for a forum',
        description: 'Retrieve all comments for a specific forum ID.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'Forum ID',
        example: 1,
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ForumsController.prototype, "getForumComments", null);
exports.ForumsController = ForumsController = __decorate([
    (0, swagger_1.ApiTags)('Forums'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('forums'),
    __metadata("design:paramtypes", [forums_service_1.ForumsService])
], ForumsController);
//# sourceMappingURL=forums.controller.js.map