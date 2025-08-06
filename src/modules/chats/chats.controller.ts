import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Query,
  ParseUUIDPipe,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { ChatsService } from './chats.service';
import { CreateChatDto, UpdateChatDto, ChatResponseDto } from './dto/chat.dto';
import { Chat } from '../../entities/chat.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../../decorators/user.decorator';

@ApiTags('Chats')
@Controller('chats')
@UseGuards(JwtAuthGuard)
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  private checkUserAuthorization(username: string, user: any): void {
    if (!user || (user.username !== username && user.role !== 'ADMIN')) {
      throw new ForbiddenException(
        'You are not authorized to access this resource',
      );
    }
  }

  @Get('test')
  @ApiOperation({ summary: 'Test endpoint for Chat API' })
  @ApiResponse({ status: 200, description: 'API is working' })
  @ApiBearerAuth()
  testEndpoint(): { status: string; message: string } {
    return {
      status: 'ok',
      message: 'Chat API is working',
    };
  }

  @Get('admin/user/:username')
  @ApiOperation({ summary: 'Get all chats for a user (admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Return all chats for the user',
    type: [ChatResponseDto],
  })
  @ApiBearerAuth()
  async getAdminChatsForUser(
    @Param('username') username: string,
    @User() user: any,
  ): Promise<Chat[]> {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can access this endpoint');
    }
    return this.chatsService.findAllForUser(username);
  }

  @Get('admin/user/:username/paginated')
  @ApiOperation({ summary: 'Get paginated chats for a user (admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Return paginated chats for the user',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (0-indexed)',
  })
  @ApiQuery({
    name: 'size',
    required: false,
    type: Number,
    description: 'Page size',
  })
  @ApiBearerAuth()
  async getAdminChatsForUserPaginated(
    @Param('username') username: string,
    @Query('page') page = 0,
    @Query('size') size = 20,
    @User() user: any,
  ): Promise<{ data: Chat[]; total: number; page: number; size: number }> {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can access this endpoint');
    }
    const [chats, total] = await this.chatsService.findAllForUserPaginated(
      username,
      page,
      size,
    );
    return { data: chats, total, page, size };
  }

  @Post()
  @ApiOperation({ summary: 'Create a chat' })
  @ApiResponse({
    status: 201,
    description: 'Chat created successfully',
    type: ChatResponseDto,
  })
  @ApiBearerAuth()
  async createChat(
    @Body() createChatDto: CreateChatDto,
    @User() user: any,
  ): Promise<Chat> {
    this.checkUserAuthorization(createChatDto.username, user);

    if (!createChatDto.timestamp) {
      createChatDto.timestamp = new Date();
    }

    if (createChatDto.id && typeof createChatDto.id === 'string') {
      const uuidPattern =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidPattern.test(createChatDto.id)) {
        createChatDto.id = null; // Service generates new UUID
      }
    }

    return this.chatsService.create(createChatDto);
  }

  @Get('user/:username')
  @ApiOperation({ summary: 'Get all chats for a user' })
  @ApiResponse({
    status: 200,
    description: 'Return all chats for the user',
    type: [ChatResponseDto],
  })
  @ApiBearerAuth()
  async getAllChatsForUser(
    @Param('username') username: string,
    @User() user: any,
  ): Promise<Chat[]> {
    this.checkUserAuthorization(username, user);
    return this.chatsService.findAllForUser(username);
  }

  @Get('user/:username/paginated')
  @ApiOperation({ summary: 'Get paginated chats for a user' })
  @ApiResponse({
    status: 200,
    description: 'Return paginated chats for the user',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (0-indexed)',
  })
  @ApiQuery({
    name: 'size',
    required: false,
    type: Number,
    description: 'Page size',
  })
  @ApiBearerAuth()
  async getAllChatsForUserPaginated(
    @Param('username') username: string,
    @Query('page') page = 0,
    @Query('size') size = 20,
    @User() user: any,
  ): Promise<{ data: Chat[]; total: number; page: number; size: number }> {
    this.checkUserAuthorization(username, user);
    const [chats, total] = await this.chatsService.findAllForUserPaginated(
      username,
      page,
      size,
    );
    return { data: chats, total, page, size };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a chat by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the chat',
    type: ChatResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Chat not found' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiBearerAuth()
  async getChatById(
    @Param('id', ParseUUIDPipe) id: string,
    @User() user: any,
  ): Promise<Chat> {
    const chat = await this.chatsService.findOne(id);
    this.checkUserAuthorization(chat.username, user);
    return chat;
  }

  @Get(':id/with-messages')
  @ApiOperation({ summary: 'Get a chat by ID including messages' })
  @ApiResponse({
    status: 200,
    description: 'Return the chat with messages',
    type: ChatResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Chat not found' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiBearerAuth()
  async getChatWithMessages(
    @Param('id', ParseUUIDPipe) id: string,
    @User() user: any,
  ): Promise<Chat> {
    const chat = await this.chatsService.findOneWithMessages(id);
    this.checkUserAuthorization(chat.username, user);
    return chat;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a chat' })
  @ApiResponse({
    status: 200,
    description: 'Chat updated successfully',
    type: ChatResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Chat not found' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiBearerAuth()
  async updateChat(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateChatDto: UpdateChatDto,
    @User() user: any,
  ): Promise<Chat> {
    const chat = await this.chatsService.findOne(id);
    this.checkUserAuthorization(chat.username, user);
    return this.chatsService.update(id, updateChatDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a chat' })
  @ApiResponse({ status: 200, description: 'Chat deleted successfully' })
  @ApiResponse({ status: 404, description: 'Chat not found' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiBearerAuth()
  async deleteChat(
    @Param('id', ParseUUIDPipe) id: string,
    @User() user: any,
  ): Promise<void> {
    const chat = await this.chatsService.findOne(id);
    this.checkUserAuthorization(chat.username, user);
    await this.chatsService.remove(id);
  }

  @Delete('user/:username')
  @ApiOperation({ summary: 'Delete all chats for a user' })
  @ApiResponse({ status: 200, description: 'All chats deleted successfully' })
  @ApiBearerAuth()
  async deleteAllChatsForUser(
    @Param('username') username: string,
    @User() user: any,
  ): Promise<void> {
    this.checkUserAuthorization(username, user);
    await this.chatsService.removeAllForUser(username);
  }
}
