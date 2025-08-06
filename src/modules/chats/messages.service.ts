import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../../entities/message.entity';
import { CreateMessageDto, UpdateMessageDto } from './dto/message.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  private isPromptQuestionResponse(content: string): boolean {
    const promptQuestionResponses = [
      'ខ្ញុំ​ជា​គំរូ​ភាសា​ដ៏​ធំ​មួយ ដែល​បាន​បង្កើត​ឡើង​ដោយ ថ្នាលបឋម (PLP EdTech)។',
    ];
    return promptQuestionResponses.includes(content);
  }

  async findAllForChat(chatId: string): Promise<Message[]> {
    return await this.messageRepository.find({
      where: { chat_id: chatId },
      order: { created_at: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Message> {
    const message = await this.messageRepository.findOne({
      where: { id },
    });

    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }

    return message;
  }

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const message = new Message();
    message.id = createMessageDto.id || uuidv4();
    message.chat_id = createMessageDto.chat_id;
    message.role = createMessageDto.role;
    message.content = createMessageDto.content;

    if (createMessageDto.role === 'user') {
      message.model = 'user';
    } else if (createMessageDto.role === 'assistant') {
      if (createMessageDto.model) {
        message.model = createMessageDto.model;
      } else if (createMessageDto.metadata) {
        if (createMessageDto.metadata.source === 'prompt-questions') {
          message.model = 'system';
        } else if (createMessageDto.metadata.source === 'gemini') {
          message.model = 'gemini-2.0-flash';
        } else if (this.isPromptQuestionResponse(createMessageDto.content)) {
          message.model = 'system';
        } else {
          message.model = 'gemini-2.0-flash';
        }
      } else if (this.isPromptQuestionResponse(createMessageDto.content)) {
        message.model = 'system';
      } else {
        message.model = 'gemini-2.0-flash';
      }
    } else if (createMessageDto.role === 'system') {
      message.model = 'system';
    } else {
      message.model = createMessageDto.model || null;
    }

    message.metadata = createMessageDto.metadata || null;

    return await this.messageRepository.save(message);
  }

  async createMany(createMessageDtos: CreateMessageDto[]): Promise<Message[]> {
    const messages = createMessageDtos.map((dto) => {
      const message = new Message();
      message.id = dto.id || uuidv4();
      message.chat_id = dto.chat_id;
      message.role = dto.role;
      message.content = dto.content;

      if (dto.role === 'user') {
        message.model = 'user';
      } else if (dto.role === 'assistant') {
        if (dto.model) {
          message.model = dto.model;
        } else if (dto.metadata) {
          if (dto.metadata.source === 'prompt-questions') {
            message.model = 'system';
          } else if (dto.metadata.source === 'gemini') {
            message.model = 'gemini-2.0-flash';
          } else if (this.isPromptQuestionResponse(dto.content)) {
            message.model = 'system';
          } else {
            message.model = 'gemini-2.0-flash';
          }
        } else if (this.isPromptQuestionResponse(dto.content)) {
          message.model = 'system';
        } else {
          message.model = 'gemini-2.0-flash';
        }
      } else if (dto.role === 'system') {
        message.model = 'system';
      } else {
        message.model = dto.model || null;
      }

      message.metadata = dto.metadata || null;
      return message;
    });

    return await this.messageRepository.save(messages);
  }

  async update(
    id: string,
    updateMessageDto: UpdateMessageDto,
  ): Promise<Message> {
    const message = await this.findOne(id);

    if (updateMessageDto.role !== undefined) {
      message.role = updateMessageDto.role;
    }

    if (updateMessageDto.content !== undefined) {
      message.content = updateMessageDto.content;
    }

    if (updateMessageDto.model !== undefined) {
      message.model = updateMessageDto.model;
    }

    if (updateMessageDto.metadata !== undefined) {
      message.metadata = updateMessageDto.metadata;
    }

    return await this.messageRepository.save(message);
  }

  async remove(id: string): Promise<void> {
    const message = await this.findOne(id);
    await this.messageRepository.remove(message);
  }

  async removeAllForChat(chatId: string): Promise<void> {
    const messages = await this.findAllForChat(chatId);
    await this.messageRepository.remove(messages);
  }
}
