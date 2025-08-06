import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { Chat } from '../../entities/chat.entity';
import { Message } from '../../entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, Message])],
  controllers: [ChatsController, MessagesController],
  providers: [ChatsService, MessagesService],
  exports: [ChatsService, MessagesService],
})
export class ChatsModule {}
