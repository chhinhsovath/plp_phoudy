import { Message } from './message.entity';
export declare class Chat {
    id: string;
    username: string;
    timestamp: Date;
    preview: string;
    messages: Message[];
    message_count: number | null;
    user_message_count: number | null;
    ai_message_count: number | null;
    is_training_candidate: boolean;
    training_status: string;
    training_notes: string | null;
    language_detected: string | null;
    topic_category: string | null;
    created_at: Date;
    updated_at: Date;
}
