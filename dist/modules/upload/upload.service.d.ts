import { Repository } from 'typeorm';
import { FileStorageService } from '../file-storage/file-storage.service';
import { ImageMetadata } from '../../entities/image-metadata.entity';
import { AudioMetadata } from '../../entities/audio-metadata.entity';
export declare class UploadService {
    private readonly fileStorageService;
    private readonly imageMetadataRepository;
    private readonly audioMetadataRepository;
    constructor(fileStorageService: FileStorageService, imageMetadataRepository: Repository<ImageMetadata>, audioMetadataRepository: Repository<AudioMetadata>);
    uploadImage(file: Express.Multer.File, folderPath?: string): Promise<{
        url: string;
        filename: string;
        originalName: string;
        size: number;
        width: number;
        height: number;
        path: string;
        id: number;
    }>;
    getFileExplorer(folderPath?: string): Promise<{
        currentPath: string;
        folders: {
            name: string;
            path: string;
            type: string;
            created: Date;
            modified: Date;
        }[];
        images: {
            id?: number;
            filename: string;
            original_name: string;
            name: string;
            path: string;
            file_path: string;
            url: string;
            size: number;
            mime_type: string;
            tags: string[];
            description?: string;
            alt_text?: string;
            width: number;
            height: number;
            type: string;
            created: Date;
            modified: Date;
            created_at?: Date;
            updated_at?: Date;
        }[];
        totalFolders: number;
        totalImages: number;
    }>;
    createFolder(folderPath: string, folderName: string): {
        name: string;
        path: string;
        type: string;
        created: Date;
    };
    deleteFolder(folderPath: string): {
        message: string;
        path: string;
    };
    private sanitizeFolderPath;
    renameFolder(oldPath: string, newName: string): {
        message: string;
        oldPath: string;
        newPath: string;
        newName: string;
    };
    updateImageMetadata(filename: string, metadata: {
        tags?: string[];
        description?: string;
        altText?: string;
        originalName?: string;
    }): Promise<{
        message: string;
        metadata: ImageMetadata;
    }>;
    searchImages(criteria: {
        tags?: string[];
        description?: string;
        path?: string;
        q?: string;
        tagSearch?: string;
    }): Promise<{
        total: number;
        images: ImageMetadata[];
    }>;
    deleteImage(filename: string): Promise<{
        message: string;
        filename: string;
        path: string;
    }>;
    private resizeImage;
    private isImageFile;
    uploadAudio(file: Express.Multer.File, folderPath?: string): Promise<{
        success: boolean;
        data: {
            filename: string;
            original_name: string;
            url: string;
            size: number;
            duration: number;
            path: string;
        };
    }>;
    getAudioFiles(folderPath?: string): Promise<{
        success: boolean;
        data: {
            folders: {
                name: string;
                path: string;
                modified: string;
            }[];
            audios: any[];
            totalFolders: number;
            totalAudios: number;
            currentPath: string;
        };
    }>;
    deleteAudio(filename: string): Promise<{
        success: boolean;
        message: string;
    }>;
    updateAudioMetadata(filename: string, metadata: {
        original_name?: string;
        tags?: string[];
        description?: string;
        alt_text?: string;
    }): Promise<{
        success: boolean;
        message: string;
        data: {
            filename: string;
            original_name: string;
            tags: string[];
            description: string;
            alt_text: string;
        };
    }>;
    searchAudioFiles(criteria: {
        tagSearch?: string;
        description?: string;
        path?: string;
    }): Promise<{
        success: boolean;
        data: {
            total: number;
            audios: {
                name: string;
                original_name: string;
                url: string;
                path: string;
                size: number;
                duration: number;
                modified: string;
                tags: string[];
                description: string;
            }[];
        };
    }>;
    private isAudioFile;
    private getAudioDuration;
}
