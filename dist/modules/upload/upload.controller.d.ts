import { UploadService } from './upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadImage(files: Express.Multer.File[], folderPath?: string): Promise<{
        url: string;
        filename: string;
        originalName: string;
        size: number;
        width: number;
        height: number;
        path: string;
        id: number;
    }>;
    getFiles(path?: string): Promise<{
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
    createFolder(path: string | undefined, name: string): {
        name: string;
        path: string;
        type: string;
        created: Date;
    };
    deleteFolder(path: string): {
        message: string;
        path: string;
    };
    renameFolder(oldPath: string, newName: string): {
        message: string;
        oldPath: string;
        newPath: string;
        newName: string;
    };
    updateImageMetadata(filename: string, tags: string[], description?: string, altText?: string, originalName?: string): Promise<{
        message: string;
        metadata: import("../../entities/image-metadata.entity").ImageMetadata;
    }>;
    searchImages(tags?: string, description?: string, path?: string, q?: string, tagSearch?: string): Promise<{
        total: number;
        images: import("../../entities/image-metadata.entity").ImageMetadata[];
    }>;
    deleteImage(filename: string): Promise<{
        message: string;
        filename: string;
        path: string;
    }>;
    getAudioFiles(path?: string): Promise<{
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
    deleteAudio(filename: string): Promise<{
        success: boolean;
        message: string;
    }>;
    updateAudioMetadata(filename: string, originalName?: string, tags?: string[], description?: string, altText?: string): Promise<{
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
    searchAudioFiles(tagSearch?: string, description?: string, path?: string): Promise<{
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
}
