import { Repository } from 'typeorm';
import { Chat } from '../../entities/chat.entity';
import { Message } from '../../entities/message.entity';
import { CreateChatDto, UpdateChatDto } from './dto/chat.dto';
export declare class ChatsService {
    private chatRepository;
    private messageRepository;
    constructor(chatRepository: Repository<Chat>, messageRepository: Repository<Message>);
    findAll(): Promise<Chat[]>;
    findAllForUser(username: string): Promise<Chat[]>;
    findAllForUserPaginated(username: string, page: number, size: number): Promise<[Chat[], number]>;
    findOne(id: string): Promise<Chat>;
    findOneWithMessages(id: string): Promise<Chat>;
    create(createChatDto: CreateChatDto): Promise<Chat>;
    update(id: string, updateChatDto: UpdateChatDto): Promise<Chat>;
    remove(id: string): Promise<void>;
    removeAllForUser(username: string): Promise<void>;
}
