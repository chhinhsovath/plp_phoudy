import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  ForbiddenException,
  HttpException,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { ChatsService } from './chats.service';
import {
  CreateMessageDto,
  UpdateMessageDto,
  MessageResponseDto,
} from './dto/message.dto';
import { Message } from '../../entities/message.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../../decorators/user.decorator';

@ApiTags('Messages')
@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly chatsService: ChatsService,
  ) {}

  private async checkUserAuthorization(
    chatId: string,
    user: any,
  ): Promise<void> {
    const chat = await this.chatsService.findOne(chatId);
    if (!user || (user.username !== chat.username && user.role !== 'ADMIN')) {
      throw new ForbiddenException(
        'You are not authorized to access this resource',
      );
    }
  }

  @Get('test')
  @ApiOperation({ summary: 'Test endpoint for Messages API' })
  @ApiResponse({ status: 200, description: 'API is working' })
  @ApiBearerAuth()
  testEndpoint(): { status: string; message: string } {
    return {
      status: 'ok',
      message: 'Messages API is working',
    };
  }

  @Get('admin/chat/:chatId')
  @ApiOperation({ summary: 'Get all messages for a chat (admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Return all messages for the chat',
    type: [MessageResponseDto],
  })
  @ApiParam({ name: 'chatId', type: 'string', format: 'uuid' })
  @ApiBearerAuth()
  async getAdminMessagesForChat(
    @Param('chatId', ParseUUIDPipe) chatId: string,
    @User() user: any,
  ): Promise<Message[]> {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can access this endpoint');
    }

    return await this.messagesService.findAllForChat(chatId);
  }

  @Get('chat/:chatId')
  @ApiOperation({ summary: 'Get all messages for a chat' })
  @ApiResponse({
    status: 200,
    description: 'Return all messages for the chat',
    type: [MessageResponseDto],
  })
  @ApiParam({ name: 'chatId', type: 'string', format: 'uuid' })
  @ApiBearerAuth()
  async getAllMessagesForChat(
    @Param('chatId', ParseUUIDPipe) chatId: string,
    @User() user: any,
  ): Promise<Message[]> {
    await this.checkUserAuthorization(chatId, user);
    return await this.messagesService.findAllForChat(chatId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a message by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the message',
    type: MessageResponseDto,
  })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiBearerAuth()
  async getMessageById(
    @Param('id', ParseUUIDPipe) id: string,
    @User() user: any,
  ): Promise<Message> {
    const message = await this.messagesService.findOne(id);
    await this.checkUserAuthorization(message.chat_id, user);
    return message;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new message' })
  @ApiResponse({
    status: 201,
    description: 'Message created successfully',
    type: MessageResponseDto,
  })
  @ApiBearerAuth()
  async createMessage(
    @Body() createMessageDto: CreateMessageDto,
    @User() user: any,
  ): Promise<Message> {
    const uuidPattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (
      !createMessageDto.chat_id ||
      !uuidPattern.test(createMessageDto.chat_id)
    ) {
      throw new HttpException(
        'Invalid chat_id: must be a valid UUID',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (createMessageDto.id && !uuidPattern.test(createMessageDto.id)) {
      createMessageDto.id = undefined;
    }

    await this.checkUserAuthorization(createMessageDto.chat_id, user);
    return await this.messagesService.create(createMessageDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a message' })
  @ApiResponse({
    status: 200,
    description: 'Message updated successfully',
    type: MessageResponseDto,
  })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiBearerAuth()
  async updateMessage(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMessageDto: UpdateMessageDto,
    @User() user: any,
  ): Promise<Message> {
    const message = await this.messagesService.findOne(id);
    await this.checkUserAuthorization(message.chat_id, user);
    return await this.messagesService.update(id, updateMessageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a message' })
  @ApiResponse({ status: 200, description: 'Message deleted successfully' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiBearerAuth()
  async deleteMessage(
    @Param('id', ParseUUIDPipe) id: string,
    @User() user: any,
  ): Promise<void> {
    const message = await this.messagesService.findOne(id);
    await this.checkUserAuthorization(message.chat_id, user);
    await this.messagesService.remove(id);
  }
}
