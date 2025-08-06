import { ChatsService } from './chats.service';
import { CreateChatDto, UpdateChatDto } from './dto/chat.dto';
import { Chat } from '../../entities/chat.entity';
export declare class ChatsController {
    private readonly chatsService;
    constructor(chatsService: ChatsService);
    private checkUserAuthorization;
    testEndpoint(): {
        status: string;
        message: string;
    };
    getAdminChatsForUser(username: string, user: any): Promise<Chat[]>;
    getAdminChatsForUserPaginated(username: string, page: number | undefined, size: number | undefined, user: any): Promise<{
        data: Chat[];
        total: number;
        page: number;
        size: number;
    }>;
    createChat(createChatDto: CreateChatDto, user: any): Promise<Chat>;
    getAllChatsForUser(username: string, user: any): Promise<Chat[]>;
    getAllChatsForUserPaginated(username: string, page: number | undefined, size: number | undefined, user: any): Promise<{
        data: Chat[];
        total: number;
        page: number;
        size: number;
    }>;
    getChatById(id: string, user: any): Promise<Chat>;
    getChatWithMessages(id: string, user: any): Promise<Chat>;
    updateChat(id: string, updateChatDto: UpdateChatDto, user: any): Promise<Chat>;
    deleteChat(id: string, user: any): Promise<void>;
    deleteAllChatsForUser(username: string, user: any): Promise<void>;
}
