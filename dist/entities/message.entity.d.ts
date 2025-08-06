import { Chat } from './chat.entity';
export declare class Message {
    id: string;
    chat_id: string;
    chat: Chat;
    role: string;
    content: string;
    created_at: Date;
    model: string | null;
    metadata: any;
}
