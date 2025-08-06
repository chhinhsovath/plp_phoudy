"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const file_storage_service_1 = require("../file-storage/file-storage.service");
const image_metadata_entity_1 = require("../../entities/image-metadata.entity");
const audio_metadata_entity_1 = require("../../entities/audio-metadata.entity");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
let UploadService = class UploadService {
    fileStorageService;
    imageMetadataRepository;
    audioMetadataRepository;
    constructor(fileStorageService, imageMetadataRepository, audioMetadataRepository) {
        this.fileStorageService = fileStorageService;
        this.imageMetadataRepository = imageMetadataRepository;
        this.audioMetadataRepository = audioMetadataRepository;
    }
    async uploadImage(file, folderPath = '') {
        const allowedTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/gif',
            'image/webp',
        ];
        if (!allowedTypes.includes(file.mimetype)) {
            throw new common_1.BadRequestException('Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.');
        }
        const resizedImageInfo = await this.resizeImage(file.buffer, 250);
        const resizedFile = {
            ...file,
            buffer: resizedImageInfo.buffer,
            size: resizedImageInfo.size,
        };
        const sanitizedPath = this.sanitizeFolderPath(folderPath);
        const targetSubDir = sanitizedPath ? `images/${sanitizedPath}` : 'images';
        const filename = await this.fileStorageService.storeFile(resizedFile, true, targetSubDir);
        const urlPath = sanitizedPath
            ? `images/${sanitizedPath}/${filename}`
            : `images/${filename}`;
        const imageMetadata = this.imageMetadataRepository.create({
            filename: filename,
            original_name: file.originalname,
            file_path: sanitizedPath,
            url: `/uploads/${urlPath}`,
            size: resizedImageInfo.size,
            mime_type: file.mimetype,
            width: resizedImageInfo.width,
            height: resizedImageInfo.height,
            tags: [],
        });
        await this.imageMetadataRepository.save(imageMetadata);
        return {
            url: `/uploads/${urlPath}`,
            filename: filename,
            originalName: file.originalname,
            size: resizedImageInfo.size,
            width: resizedImageInfo.width,
            height: resizedImageInfo.height,
            path: sanitizedPath,
            id: imageMetadata.id,
        };
    }
    async getFileExplorer(folderPath = '') {
        const imagesDir = path.join(process.cwd(), 'uploads', 'images');
        const targetPath = path.join(imagesDir, folderPath);
        if (!targetPath.startsWith(imagesDir)) {
            throw new common_1.BadRequestException('Invalid path');
        }
        if (!fs.existsSync(targetPath)) {
            throw new common_1.BadRequestException('Folder not found');
        }
        const items = fs.readdirSync(targetPath);
        const folders = [];
        const images = [];
        const imageMetadataList = await this.imageMetadataRepository.find({
            where: { file_path: folderPath },
        });
        const metadataMap = new Map(imageMetadataList.map((meta) => [meta.filename, meta]));
        for (const item of items) {
            const itemPath = path.join(targetPath, item);
            const stat = fs.statSync(itemPath);
            const relativePath = path.join(folderPath, item).replace(/\\/g, '/');
            if (stat.isDirectory()) {
                folders.push({
                    name: item,
                    path: relativePath,
                    type: 'folder',
                    created: stat.birthtime,
                    modified: stat.mtime,
                });
            }
            else if (this.isImageFile(item)) {
                const metadata = metadataMap.get(item);
                images.push({
                    id: metadata?.id,
                    filename: item,
                    original_name: metadata?.original_name || item,
                    name: item,
                    path: relativePath,
                    file_path: folderPath,
                    url: `/uploads/images/${relativePath}`,
                    size: stat.size,
                    mime_type: metadata?.mime_type || 'image/unknown',
                    tags: metadata?.tags || [],
                    description: metadata?.description,
                    alt_text: metadata?.alt_text,
                    width: metadata?.width || 0,
                    height: metadata?.height || 0,
                    type: 'image',
                    created: stat.birthtime,
                    modified: stat.mtime,
                    created_at: metadata?.created_at,
                    updated_at: metadata?.updated_at,
                });
            }
        }
        return {
            currentPath: folderPath,
            folders: folders.sort((a, b) => a.name.localeCompare(b.name)),
            images: images.sort((a, b) => b.modified.getTime() - a.modified.getTime()),
            totalFolders: folders.length,
            totalImages: images.length,
        };
    }
    createFolder(folderPath, folderName) {
        const imagesDir = path.join(process.cwd(), 'uploads', 'images');
        const targetPath = path.join(imagesDir, folderPath);
        const newFolderPath = path.join(targetPath, folderName);
        if (!targetPath.startsWith(imagesDir) ||
            !newFolderPath.startsWith(imagesDir)) {
            throw new common_1.BadRequestException('Invalid path');
        }
        if (!fs.existsSync(targetPath)) {
            throw new common_1.BadRequestException('Parent folder not found');
        }
        if (fs.existsSync(newFolderPath)) {
            throw new common_1.BadRequestException('Folder already exists');
        }
        if (!/^[a-zA-Z0-9_-]+$/.test(folderName)) {
            throw new common_1.BadRequestException('Invalid folder name. Use only letters, numbers, hyphens, and underscores.');
        }
        fs.mkdirSync(newFolderPath);
        const relativePath = path.join(folderPath, folderName).replace(/\\/g, '/');
        return {
            name: folderName,
            path: relativePath,
            type: 'folder',
            created: new Date(),
        };
    }
    deleteFolder(folderPath) {
        const imagesDir = path.join(process.cwd(), 'uploads', 'images');
        const targetPath = path.join(imagesDir, folderPath);
        if (!targetPath.startsWith(imagesDir)) {
            throw new common_1.BadRequestException('Invalid path');
        }
        if (!fs.existsSync(targetPath)) {
            throw new common_1.BadRequestException('Folder not found');
        }
        if (!fs.statSync(targetPath).isDirectory()) {
            throw new common_1.BadRequestException('Path is not a folder');
        }
        const items = fs.readdirSync(targetPath);
        if (items.length > 0) {
            throw new common_1.BadRequestException('Folder is not empty');
        }
        fs.rmdirSync(targetPath);
        return {
            message: 'Folder deleted successfully',
            path: folderPath,
        };
    }
    sanitizeFolderPath(folderPath) {
        if (!folderPath)
            return '';
        const sanitized = folderPath.replace(/^\/+|\/+$/g, '').replace(/\\/g, '/');
        if (sanitized.includes('..') || sanitized.includes('./')) {
            throw new common_1.BadRequestException('Invalid folder path');
        }
        return sanitized;
    }
    renameFolder(oldPath, newName) {
        const imagesDir = path.join(process.cwd(), 'uploads', 'images');
        const oldFullPath = path.join(imagesDir, oldPath);
        const parentDir = path.dirname(oldFullPath);
        const newFullPath = path.join(parentDir, newName);
        if (!oldFullPath.startsWith(imagesDir) ||
            !newFullPath.startsWith(imagesDir)) {
            throw new common_1.BadRequestException('Invalid path');
        }
        if (!fs.existsSync(oldFullPath)) {
            throw new common_1.BadRequestException('Folder not found');
        }
        if (!fs.statSync(oldFullPath).isDirectory()) {
            throw new common_1.BadRequestException('Path is not a folder');
        }
        if (fs.existsSync(newFullPath)) {
            throw new common_1.BadRequestException('A folder with this name already exists');
        }
        if (!/^[a-zA-Z0-9_-]+$/.test(newName)) {
            throw new common_1.BadRequestException('Invalid folder name. Use only letters, numbers, hyphens, and underscores.');
        }
        fs.renameSync(oldFullPath, newFullPath);
        const newRelativePath = path
            .relative(imagesDir, newFullPath)
            .replace(/\\/g, '/');
        return {
            message: 'Folder renamed successfully',
            oldPath: oldPath,
            newPath: newRelativePath,
            newName: newName,
        };
    }
    async updateImageMetadata(filename, metadata) {
        const imageMetadata = await this.imageMetadataRepository.findOne({
            where: { filename },
        });
        if (!imageMetadata) {
            throw new common_1.BadRequestException('Image not found in database');
        }
        if (metadata.tags) {
            imageMetadata.tags = metadata.tags;
        }
        if (metadata.description !== undefined) {
            imageMetadata.description = metadata.description;
        }
        if (metadata.altText !== undefined) {
            imageMetadata.alt_text = metadata.altText;
        }
        if (metadata.originalName !== undefined) {
            imageMetadata.original_name = metadata.originalName;
        }
        await this.imageMetadataRepository.save(imageMetadata);
        return {
            message: 'Image metadata updated successfully',
            metadata: imageMetadata,
        };
    }
    async searchImages(criteria) {
        const queryBuilder = this.imageMetadataRepository.createQueryBuilder('img');
        if (criteria.tags && criteria.tags.length > 0) {
            queryBuilder.andWhere('img.tags && :tags', { tags: criteria.tags });
        }
        if (criteria.description) {
            queryBuilder.andWhere('(img.description ILIKE :description OR :descriptionTag = ANY(img.tags))', {
                description: `%${criteria.description}%`,
                descriptionTag: criteria.description,
            });
        }
        if (criteria.path) {
            queryBuilder.andWhere('img.file_path ILIKE :path', {
                path: `%${criteria.path}%`,
            });
        }
        if (criteria.q) {
            queryBuilder.andWhere('(img.description ILIKE :q OR img.original_name ILIKE :q OR img.filename ILIKE :q OR :qTag = ANY(img.tags))', {
                q: `%${criteria.q}%`,
                qTag: criteria.q,
            });
        }
        if (criteria.tagSearch) {
            queryBuilder.andWhere('EXISTS (SELECT 1 FROM unnest(img.tags) as tag WHERE tag ILIKE :tagSearch)', {
                tagSearch: `%${criteria.tagSearch}%`,
            });
        }
        queryBuilder.orderBy('img.created_at', 'DESC');
        const images = await queryBuilder.getMany();
        return {
            total: images.length,
            images: images,
        };
    }
    async deleteImage(filename) {
        const imageMetadata = await this.imageMetadataRepository.findOne({
            where: { filename },
        });
        if (!imageMetadata) {
            throw new common_1.BadRequestException('Image not found in database');
        }
        const imagesDir = path.join(process.cwd(), 'uploads', 'images');
        const filePath = path.join(imagesDir, imageMetadata.file_path, filename);
        if (!filePath.startsWith(imagesDir)) {
            throw new common_1.BadRequestException('Invalid file path');
        }
        if (fs.existsSync(filePath)) {
            try {
                fs.unlinkSync(filePath);
            }
            catch (error) {
                throw new common_1.BadRequestException(`Failed to delete file: ${error.message}`);
            }
        }
        await this.imageMetadataRepository.remove(imageMetadata);
        return {
            message: 'Image deleted successfully',
            filename: filename,
            path: imageMetadata.file_path,
        };
    }
    async resizeImage(buffer, width) {
        try {
            const image = sharp(buffer);
            const resizedBuffer = await image
                .resize(width, null, {
                withoutEnlargement: true,
                fit: 'inside',
            })
                .jpeg({ quality: 70 })
                .toBuffer();
            const metadata = await sharp(resizedBuffer).metadata();
            return {
                buffer: resizedBuffer,
                width: metadata.width || width,
                height: metadata.height || 0,
                size: resizedBuffer.length,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to resize image: ${error.message}`);
        }
    }
    isImageFile(filename) {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
        const ext = path.extname(filename).toLowerCase();
        return imageExtensions.includes(ext);
    }
    async uploadAudio(file, folderPath = '') {
        let originalName = file.originalname;
        try {
            if (originalName.includes('á') || originalName.includes('â') || originalName.includes('ã')) {
                const buffer = Buffer.from(originalName, 'latin1');
                originalName = buffer.toString('utf8');
            }
        }
        catch (error) {
            console.log('Service encoding conversion error:', error);
        }
        console.log('UploadService - Processing filename:', {
            original: file.originalname,
            corrected: originalName
        });
        const allowedTypes = [
            'audio/mpeg',
            'audio/wav',
            'audio/ogg',
            'audio/mp4',
            'audio/aac',
            'audio/flac',
        ];
        if (!allowedTypes.includes(file.mimetype)) {
            throw new common_1.BadRequestException('Invalid file type. Only MP3, WAV, OGG, M4A, AAC, and FLAC audio files are allowed.');
        }
        const maxSize = 50 * 1024 * 1024;
        if (file.size > maxSize) {
            throw new common_1.BadRequestException('The audio file must not be greater than 51200 kilobytes.');
        }
        const sanitizedPath = this.sanitizeFolderPath(folderPath);
        const targetSubDir = sanitizedPath ? `audio/${sanitizedPath}` : 'audio';
        const filename = await this.fileStorageService.storeFile(file, false, targetSubDir);
        const urlPath = sanitizedPath
            ? `audio/${sanitizedPath}/${filename}`
            : `audio/${filename}`;
        const duration = this.getAudioDuration();
        const audioMetadata = this.audioMetadataRepository.create({
            filename: filename,
            original_name: originalName,
            url: `/uploads/${urlPath}`,
            path: sanitizedPath ? `${sanitizedPath}/${filename}` : filename,
            size: file.size,
            duration: duration,
            mime_type: file.mimetype,
            tags: [],
        });
        await this.audioMetadataRepository.save(audioMetadata);
        return {
            success: true,
            data: {
                filename: filename,
                original_name: originalName,
                url: `/uploads/${urlPath}`,
                size: file.size,
                duration: duration,
                path: sanitizedPath ? `${sanitizedPath}/${filename}` : filename,
            },
        };
    }
    async getAudioFiles(folderPath = '') {
        const audioDir = path.join(process.cwd(), 'uploads', 'audio');
        const targetPath = path.join(audioDir, folderPath);
        if (!targetPath.startsWith(audioDir)) {
            throw new common_1.BadRequestException('Invalid path');
        }
        if (!fs.existsSync(targetPath)) {
            throw new common_1.BadRequestException('Folder not found');
        }
        const items = fs.readdirSync(targetPath);
        const folders = [];
        const audios = [];
        for (const item of items) {
            const itemPath = path.join(targetPath, item);
            const stats = fs.statSync(itemPath);
            if (stats.isDirectory()) {
                folders.push({
                    name: item,
                    path: folderPath ? `${folderPath}/${item}` : item,
                    modified: stats.mtime.toISOString(),
                });
            }
            else if (this.isAudioFile(item)) {
                const audioMetadata = await this.audioMetadataRepository.findOne({
                    where: { filename: item },
                });
                if (audioMetadata) {
                    audios.push({
                        name: item,
                        original_name: audioMetadata.original_name,
                        url: audioMetadata.url,
                        path: audioMetadata.path,
                        size: audioMetadata.size,
                        duration: audioMetadata.duration,
                        modified: audioMetadata.updated_at.toISOString(),
                        created_at: audioMetadata.created_at.toISOString(),
                        tags: audioMetadata.tags || [],
                        description: audioMetadata.description,
                        alt_text: audioMetadata.alt_text,
                    });
                }
                else {
                    const urlPath = folderPath
                        ? `audio/${folderPath}/${item}`
                        : `audio/${item}`;
                    audios.push({
                        name: item,
                        original_name: item,
                        url: `/uploads/${urlPath}`,
                        path: folderPath ? `${folderPath}/${item}` : item,
                        size: stats.size,
                        duration: 0,
                        modified: stats.mtime.toISOString(),
                        created_at: stats.birthtime.toISOString(),
                        tags: [],
                        description: null,
                        alt_text: null,
                    });
                }
            }
        }
        return {
            success: true,
            data: {
                folders,
                audios,
                totalFolders: folders.length,
                totalAudios: audios.length,
                currentPath: folderPath,
            },
        };
    }
    async deleteAudio(filename) {
        const audioMetadata = await this.audioMetadataRepository.findOne({
            where: { filename },
        });
        if (!audioMetadata) {
            throw new common_1.BadRequestException('Audio not found in database');
        }
        const audioDir = path.join(process.cwd(), 'uploads', 'audio');
        const filePath = path.join(audioDir, audioMetadata.path);
        if (!filePath.startsWith(audioDir)) {
            throw new common_1.BadRequestException('Invalid file path');
        }
        if (fs.existsSync(filePath)) {
            try {
                fs.unlinkSync(filePath);
            }
            catch (error) {
                throw new common_1.BadRequestException(`Failed to delete file: ${error.message}`);
            }
        }
        await this.audioMetadataRepository.remove(audioMetadata);
        return {
            success: true,
            message: 'Audio file deleted successfully',
        };
    }
    async updateAudioMetadata(filename, metadata) {
        const audioMetadata = await this.audioMetadataRepository.findOne({
            where: { filename },
        });
        if (!audioMetadata) {
            throw new common_1.BadRequestException('Audio file not found');
        }
        if (metadata.original_name !== undefined) {
            audioMetadata.original_name = metadata.original_name;
        }
        if (metadata.tags !== undefined) {
            audioMetadata.tags = metadata.tags;
        }
        if (metadata.description !== undefined) {
            audioMetadata.description = metadata.description;
        }
        if (metadata.alt_text !== undefined) {
            audioMetadata.alt_text = metadata.alt_text;
        }
        await this.audioMetadataRepository.save(audioMetadata);
        return {
            success: true,
            message: 'Audio metadata updated successfully',
            data: {
                filename: audioMetadata.filename,
                original_name: audioMetadata.original_name,
                tags: audioMetadata.tags,
                description: audioMetadata.description,
                alt_text: audioMetadata.alt_text,
            },
        };
    }
    async searchAudioFiles(criteria) {
        const queryBuilder = this.audioMetadataRepository.createQueryBuilder('audio');
        if (criteria.tagSearch) {
            queryBuilder.andWhere('EXISTS (SELECT 1 FROM unnest(audio.tags) as tag WHERE tag ILIKE :tagSearch)', {
                tagSearch: `%${criteria.tagSearch}%`,
            });
        }
        if (criteria.description) {
            queryBuilder.andWhere('audio.description ILIKE :description', {
                description: `%${criteria.description}%`,
            });
        }
        if (criteria.path) {
            queryBuilder.andWhere('audio.path ILIKE :path', {
                path: `%${criteria.path}%`,
            });
        }
        queryBuilder.orderBy('audio.created_at', 'DESC');
        const audios = await queryBuilder.getMany();
        return {
            success: true,
            data: {
                total: audios.length,
                audios: audios.map((audio) => ({
                    name: audio.filename,
                    original_name: audio.original_name,
                    url: audio.url,
                    path: audio.path,
                    size: audio.size,
                    duration: audio.duration,
                    modified: audio.updated_at.toISOString(),
                    tags: audio.tags || [],
                    description: audio.description,
                })),
            },
        };
    }
    isAudioFile(filename) {
        const audioExtensions = ['.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac'];
        const ext = path.extname(filename).toLowerCase();
        return audioExtensions.includes(ext);
    }
    getAudioDuration() {
        return 0;
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(image_metadata_entity_1.ImageMetadata)),
    __param(2, (0, typeorm_1.InjectRepository)(audio_metadata_entity_1.AudioMetadata)),
    __metadata("design:paramtypes", [file_storage_service_1.FileStorageService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UploadService);
//# sourceMappingURL=upload.service.js.map