import { BaseEntity } from './base.entity';
export declare class SoundMetadata extends BaseEntity {
    filename: string;
    original_name: string;
    file_path: string;
    url: string;
    size: number;
    mime_type: string;
    tags: string[];
    description?: string;
    duration?: number;
    bitrate?: number;
    sample_rate?: number;
}
