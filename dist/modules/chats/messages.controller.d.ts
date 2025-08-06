import { MessagesService } from './messages.service';
import { ChatsService } from './chats.service';
import { CreateMessageDto, UpdateMessageDto } from './dto/message.dto';
import { Message } from '../../entities/message.entity';
export declare class MessagesController {
    private readonly messagesService;
    private readonly chatsService;
    constructor(messagesService: MessagesService, chatsService: ChatsService);
    private checkUserAuthorization;
    testEndpoint(): {
        status: string;
        message: string;
    };
    getAdminMessagesForChat(chatId: string, user: any): Promise<Message[]>;
    getAllMessagesForChat(chatId: string, user: any): Promise<Message[]>;
    getMessageById(id: string, user: any): Promise<Message>;
    createMessage(createMessageDto: CreateMessageDto, user: any): Promise<Message>;
    updateMessage(id: string, updateMessageDto: UpdateMessageDto, user: any): Promise<Message>;
    deleteMessage(id: string, user: any): Promise<void>;
}
