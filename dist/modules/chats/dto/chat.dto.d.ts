import { CreateMessageDto, MessageResponseDto } from './message.dto';
export declare class CreateChatDto {
    id?: string | null;
    username: string;
    timestamp?: Date;
    preview: string;
    messages?: CreateMessageDto[] | null;
    message_count?: number | null;
    user_message_count?: number | null;
    ai_message_count?: number | null;
    isTrainingCandidate?: boolean;
    training_status?: string;
    trainingNotes?: string | null;
    language_detected?: string | null;
    topicCategory?: string | null;
}
export declare class UpdateChatDto extends CreateChatDto {
}
export declare class ChatResponseDto {
    id: string;
    username: string;
    timestamp: Date;
    preview: string;
    messages: MessageResponseDto[] | null;
    message_count?: number | null;
    user_message_count?: number | null;
    ai_message_count?: number | null;
    is_training_candidate?: boolean;
    training_status?: string;
    training_notes?: string | null;
    language_detected?: string | null;
    topic_category?: string | null;
    created_at: Date;
    updated_at: Date;
}
