export declare class CreateMessageDto {
    id?: string;
    chat_id: string;
    role: string;
    content: string;
    model?: string | null;
    metadata?: any;
}
export declare class UpdateMessageDto extends CreateMessageDto {
}
export declare class MessageResponseDto {
    id: string;
    chat_id: string;
    role: string;
    content: string;
    created_at: Date;
    model: string | null;
    metadata: any;
}
