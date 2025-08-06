import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from '../../entities/chat.entity';
import { Message } from '../../entities/message.entity';
import { CreateChatDto, UpdateChatDto } from './dto/chat.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async findAll(): Promise<Chat[]> {
    return this.chatRepository.find();
  }

  async findAllForUser(username: string): Promise<Chat[]> {
    return this.chatRepository.find({
      where: { username },
      order: { timestamp: 'DESC' },
    });
  }

  async findAllForUserPaginated(
    username: string,
    page: number,
    size: number,
  ): Promise<[Chat[], number]> {
    return this.chatRepository.findAndCount({
      where: { username },
      order: { timestamp: 'DESC' },
      skip: page * size,
      take: size,
    });
  }

  async findOne(id: string): Promise<Chat> {
    const chat = await this.chatRepository.findOne({ where: { id } });

    if (!chat) {
      throw new NotFoundException(`Chat with ID ${id} not found`);
    }

    return chat;
  }

  async findOneWithMessages(id: string): Promise<Chat> {
    const chat = await this.chatRepository.findOne({
      where: { id },
      relations: ['messages'],
    });

    if (!chat) {
      throw new NotFoundException(`Chat with ID ${id} not found`);
    }

    if (chat.messages) {
      chat.messages.sort(
        (a, b) => a.created_at.getTime() - b.created_at.getTime(),
      );
    }

    return chat;
  }

  async create(createChatDto: CreateChatDto): Promise<Chat> {
    const chat = new Chat();

    if (createChatDto.id) {
      const uuidPattern =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      chat.id = uuidPattern.test(createChatDto.id)
        ? createChatDto.id
        : uuidv4();
    } else {
      chat.id = uuidv4();
    }

    chat.username = createChatDto.username;
    chat.preview = createChatDto.preview;
    chat.timestamp = createChatDto.timestamp || new Date();
    chat.message_count = 0;
    chat.user_message_count = 0;
    chat.ai_message_count = 0;
    chat.is_training_candidate = createChatDto.isTrainingCandidate ?? false;
    chat.training_status = createChatDto.training_status || 'UNPROCESSED';
    chat.training_notes = createChatDto.trainingNotes || null;
    chat.language_detected = createChatDto.language_detected || 'km';
    chat.topic_category = createChatDto.topicCategory || null;

    const savedChat = await this.chatRepository.save(chat);

    if (createChatDto.messages?.length) {
      let messageCount = 0;
      let userMessageCount = 0;
      let aiMessageCount = 0;

      const messages = createChatDto.messages.map((msgDto) => {
        const message = new Message();
        message.id = msgDto.id || uuidv4();
        message.chat_id = savedChat.id;
        message.role = msgDto.role;
        message.content = msgDto.content;
        message.model = msgDto.model || null;
        message.metadata = msgDto.metadata || null;

        messageCount++;
        if (msgDto.role === 'user') userMessageCount++;
        if (msgDto.role === 'assistant') aiMessageCount++;

        return message;
      });

      await this.messageRepository.save(messages);

      await this.chatRepository.update(savedChat.id, {
        message_count: messageCount,
        user_message_count: userMessageCount,
        ai_message_count: aiMessageCount,
      });

      return this.findOne(savedChat.id);
    }

    return savedChat;
  }

  async update(id: string, updateChatDto: UpdateChatDto): Promise<Chat> {
    const chat = await this.findOne(id);

    if (updateChatDto.username !== undefined) {
      chat.username = updateChatDto.username;
    }

    if (updateChatDto.preview !== undefined) {
      chat.preview = updateChatDto.preview;
    }

    chat.timestamp = updateChatDto.timestamp ?? new Date();

    if (updateChatDto.message_count !== undefined) {
      chat.message_count = updateChatDto.message_count;
    }

    if (updateChatDto.user_message_count !== undefined) {
      chat.user_message_count = updateChatDto.user_message_count;
    }

    if (updateChatDto.ai_message_count !== undefined) {
      chat.ai_message_count = updateChatDto.ai_message_count;
    }

    if (updateChatDto.isTrainingCandidate !== undefined) {
      chat.is_training_candidate = updateChatDto.isTrainingCandidate;
    }

    if (updateChatDto.training_status !== undefined) {
      chat.training_status = updateChatDto.training_status;
    }

    if (updateChatDto.trainingNotes !== undefined) {
      chat.training_notes = updateChatDto.trainingNotes;
    }

    if (updateChatDto.language_detected !== undefined) {
      chat.language_detected = updateChatDto.language_detected;
    }

    if (updateChatDto.topicCategory !== undefined) {
      chat.topic_category = updateChatDto.topicCategory;
    }

    const savedChat = await this.chatRepository.save(chat);

    if (updateChatDto.messages?.length) {
      const newMessages = updateChatDto.messages
        .filter((msgDto) => !msgDto.id)
        .map((msgDto) => {
          const message = new Message();
          message.id = uuidv4();
          message.chat_id = savedChat.id;
          message.role = msgDto.role;
          message.content = msgDto.content;
          message.model = msgDto.model || null;
          message.metadata = msgDto.metadata || null;
          return message;
        });

      if (newMessages.length > 0) {
        await this.messageRepository.save(newMessages);

        const messages = await this.messageRepository.find({
          where: { chat_id: savedChat.id },
        });

        const userMessageCount = messages.filter(
          (msg) => msg.role === 'user',
        ).length;

        const aiMessageCount = messages.filter(
          (msg) => msg.role === 'assistant',
        ).length;

        await this.chatRepository.update(savedChat.id, {
          message_count: messages.length,
          user_message_count: userMessageCount,
          ai_message_count: aiMessageCount,
        });

        return this.findOne(savedChat.id);
      }
    }

    return savedChat;
  }

  async remove(id: string): Promise<void> {
    const chat = await this.findOne(id);
    await this.messageRepository.delete({ chat_id: chat.id });
    await this.chatRepository.remove(chat);
  }

  async removeAllForUser(username: string): Promise<void> {
    const chats = await this.findAllForUser(username);

    for (const chat of chats) {
      await this.messageRepository.delete({ chat_id: chat.id });
    }

    await this.chatRepository.remove(chats);
  }
}
