import { Repository } from 'typeorm';
import { Message } from '../../entities/message.entity';
import { CreateMessageDto, UpdateMessageDto } from './dto/message.dto';
export declare class MessagesService {
    private messageRepository;
    constructor(messageRepository: Repository<Message>);
    private isPromptQuestionResponse;
    findAllForChat(chatId: string): Promise<Message[]>;
    findOne(id: string): Promise<Message>;
    create(createMessageDto: CreateMessageDto): Promise<Message>;
    createMany(createMessageDtos: CreateMessageDto[]): Promise<Message[]>;
    update(id: string, updateMessageDto: UpdateMessageDto): Promise<Message>;
    remove(id: string): Promise<void>;
    removeAllForChat(chatId: string): Promise<void>;
}
