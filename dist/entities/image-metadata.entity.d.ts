import { BaseEntity } from './base.entity';
export declare class ImageMetadata extends BaseEntity {
    filename: string;
    original_name: string;
    file_path: string;
    url: string;
    size: number;
    mime_type: string;
    tags: string[];
    description?: string;
    alt_text?: string;
    width?: number;
    height?: number;
}
