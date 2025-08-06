import { ConfigService } from '@nestjs/config';
export declare class FileStorageService {
    private configService;
    private readonly uploadDir;
    constructor(configService: ConfigService);
    storeFile(file: any, isImage?: boolean, subDirectory?: string): Promise<string>;
    deleteFile(fileName: string): Promise<void>;
}
