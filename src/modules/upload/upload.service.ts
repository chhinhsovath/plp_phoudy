import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileStorageService } from '../file-storage/file-storage.service';
import { ImageMetadata } from '../../entities/image-metadata.entity';
import { AudioMetadata } from '../../entities/audio-metadata.entity';
import * as fs from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';

@Injectable()
export class UploadService {
  constructor(
    private readonly fileStorageService: FileStorageService,
    @InjectRepository(ImageMetadata)
    private readonly imageMetadataRepository: Repository<ImageMetadata>,
    @InjectRepository(AudioMetadata)
    private readonly audioMetadataRepository: Repository<AudioMetadata>,
  ) {}

  async uploadImage(file: Express.Multer.File, folderPath: string = '') {
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.',
      );
    }

    // Resize image to 250px width while maintaining aspect ratio
    const resizedImageInfo = await this.resizeImage(file.buffer, 250);

    // Create a new file object with resized buffer
    const resizedFile: Express.Multer.File = {
      ...file,
      buffer: resizedImageInfo.buffer,
      size: resizedImageInfo.size,
    };

    // Validate and sanitize folder path
    const sanitizedPath = this.sanitizeFolderPath(folderPath);
    const targetSubDir = sanitizedPath ? `images/${sanitizedPath}` : 'images';

    const filename = await this.fileStorageService.storeFile(
      resizedFile,
      true,
      targetSubDir,
    );

    const urlPath = sanitizedPath
      ? `images/${sanitizedPath}/${filename}`
      : `images/${filename}`;

    // Save image metadata to database with actual dimensions
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

  async getFileExplorer(folderPath: string = '') {
    const imagesDir = path.join(process.cwd(), 'uploads', 'images');
    const targetPath = path.join(imagesDir, folderPath);

    // Security check: ensure path is within uploads/images
    if (!targetPath.startsWith(imagesDir)) {
      throw new BadRequestException('Invalid path');
    }

    if (!fs.existsSync(targetPath)) {
      throw new BadRequestException('Folder not found');
    }

    const items = fs.readdirSync(targetPath);
    const folders: {
      name: string;
      path: string;
      type: string;
      created: Date;
      modified: Date;
    }[] = [];
    const images: {
      id?: number;
      filename: string;
      original_name: string;
      name: string; // Keep for backward compatibility
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
    }[] = [];

    // Get all image metadata from database for this path
    const imageMetadataList = await this.imageMetadataRepository.find({
      where: { file_path: folderPath },
    });

    // Create a map for quick lookup
    const metadataMap = new Map(
      imageMetadataList.map((meta) => [meta.filename, meta]),
    );

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
      } else if (this.isImageFile(item)) {
        const metadata = metadataMap.get(item);

        images.push({
          id: metadata?.id,
          filename: item,
          original_name: metadata?.original_name || item,
          name: item, // Keep for backward compatibility
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
      images: images.sort(
        (a, b) => b.modified.getTime() - a.modified.getTime(),
      ),
      totalFolders: folders.length,
      totalImages: images.length,
    };
  }

  createFolder(folderPath: string, folderName: string) {
    const imagesDir = path.join(process.cwd(), 'uploads', 'images');
    const targetPath = path.join(imagesDir, folderPath);
    const newFolderPath = path.join(targetPath, folderName);

    // Security check: ensure path is within uploads/images
    if (
      !targetPath.startsWith(imagesDir) ||
      !newFolderPath.startsWith(imagesDir)
    ) {
      throw new BadRequestException('Invalid path');
    }

    if (!fs.existsSync(targetPath)) {
      throw new BadRequestException('Parent folder not found');
    }

    if (fs.existsSync(newFolderPath)) {
      throw new BadRequestException('Folder already exists');
    }

    // Validate folder name
    if (!/^[a-zA-Z0-9_-]+$/.test(folderName)) {
      throw new BadRequestException(
        'Invalid folder name. Use only letters, numbers, hyphens, and underscores.',
      );
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

  deleteFolder(folderPath: string) {
    const imagesDir = path.join(process.cwd(), 'uploads', 'images');
    const targetPath = path.join(imagesDir, folderPath);

    // Security check: ensure path is within uploads/images
    if (!targetPath.startsWith(imagesDir)) {
      throw new BadRequestException('Invalid path');
    }

    if (!fs.existsSync(targetPath)) {
      throw new BadRequestException('Folder not found');
    }

    if (!fs.statSync(targetPath).isDirectory()) {
      throw new BadRequestException('Path is not a folder');
    }

    // Check if folder is empty
    const items = fs.readdirSync(targetPath);
    if (items.length > 0) {
      throw new BadRequestException('Folder is not empty');
    }

    fs.rmdirSync(targetPath);

    return {
      message: 'Folder deleted successfully',
      path: folderPath,
    };
  }

  private sanitizeFolderPath(folderPath: string): string {
    if (!folderPath) return '';

    // Remove leading/trailing slashes and normalize path separators
    const sanitized = folderPath.replace(/^\/+|\/+$/g, '').replace(/\\/g, '/');

    // Security check: prevent path traversal
    if (sanitized.includes('..') || sanitized.includes('./')) {
      throw new BadRequestException('Invalid folder path');
    }

    return sanitized;
  }

  renameFolder(oldPath: string, newName: string) {
    const imagesDir = path.join(process.cwd(), 'uploads', 'images');
    const oldFullPath = path.join(imagesDir, oldPath);

    // Get parent directory
    const parentDir = path.dirname(oldFullPath);
    const newFullPath = path.join(parentDir, newName);

    // Security checks
    if (
      !oldFullPath.startsWith(imagesDir) ||
      !newFullPath.startsWith(imagesDir)
    ) {
      throw new BadRequestException('Invalid path');
    }

    if (!fs.existsSync(oldFullPath)) {
      throw new BadRequestException('Folder not found');
    }

    if (!fs.statSync(oldFullPath).isDirectory()) {
      throw new BadRequestException('Path is not a folder');
    }

    if (fs.existsSync(newFullPath)) {
      throw new BadRequestException('A folder with this name already exists');
    }

    // Validate new folder name
    if (!/^[a-zA-Z0-9_-]+$/.test(newName)) {
      throw new BadRequestException(
        'Invalid folder name. Use only letters, numbers, hyphens, and underscores.',
      );
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

  async updateImageMetadata(
    filename: string,
    metadata: {
      tags?: string[];
      description?: string;
      altText?: string;
      originalName?: string;
    },
  ) {
    const imageMetadata = await this.imageMetadataRepository.findOne({
      where: { filename },
    });

    if (!imageMetadata) {
      throw new BadRequestException('Image not found in database');
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

  async searchImages(criteria: {
    tags?: string[];
    description?: string;
    path?: string;
    q?: string;
    tagSearch?: string;
  }) {
    const queryBuilder = this.imageMetadataRepository.createQueryBuilder('img');

    if (criteria.tags && criteria.tags.length > 0) {
      queryBuilder.andWhere('img.tags && :tags', { tags: criteria.tags });
    }

    if (criteria.description) {
      queryBuilder.andWhere(
        '(img.description ILIKE :description OR :descriptionTag = ANY(img.tags))',
        {
          description: `%${criteria.description}%`,
          descriptionTag: criteria.description,
        },
      );
    }

    if (criteria.path) {
      queryBuilder.andWhere('img.file_path ILIKE :path', {
        path: `%${criteria.path}%`,
      });
    }

    // General search (q parameter) - searches in description, tags, filename, and original_name
    if (criteria.q) {
      queryBuilder.andWhere(
        '(img.description ILIKE :q OR img.original_name ILIKE :q OR img.filename ILIKE :q OR :qTag = ANY(img.tags))',
        {
          q: `%${criteria.q}%`,
          qTag: criteria.q,
        },
      );
    }

    // Tag-only search with partial matching
    if (criteria.tagSearch) {
      queryBuilder.andWhere(
        'EXISTS (SELECT 1 FROM unnest(img.tags) as tag WHERE tag ILIKE :tagSearch)',
        {
          tagSearch: `%${criteria.tagSearch}%`,
        },
      );
    }

    queryBuilder.orderBy('img.created_at', 'DESC');

    const images = await queryBuilder.getMany();

    return {
      total: images.length,
      images: images,
    };
  }

  async deleteImage(filename: string) {
    // Find the image metadata in database
    const imageMetadata = await this.imageMetadataRepository.findOne({
      where: { filename },
    });

    if (!imageMetadata) {
      throw new BadRequestException('Image not found in database');
    }

    // Construct the full file path
    const imagesDir = path.join(process.cwd(), 'uploads', 'images');
    const filePath = path.join(imagesDir, imageMetadata.file_path, filename);

    // Security check: ensure path is within uploads/images
    if (!filePath.startsWith(imagesDir)) {
      throw new BadRequestException('Invalid file path');
    }

    // Check if file exists and delete it
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (error) {
        throw new BadRequestException(
          `Failed to delete file: ${error.message}`,
        );
      }
    }

    // Remove from database
    await this.imageMetadataRepository.remove(imageMetadata);

    return {
      message: 'Image deleted successfully',
      filename: filename,
      path: imageMetadata.file_path,
    };
  }

  private async resizeImage(
    buffer: Buffer,
    width: number,
  ): Promise<{
    buffer: Buffer;
    width: number;
    height: number;
    size: number;
  }> {
    try {
      const image = sharp(buffer);

      // Resize image maintaining aspect ratio
      const resizedBuffer = await image
        .resize(width, null, {
          withoutEnlargement: true, // Don't enlarge if image is smaller
          fit: 'inside', // Maintain aspect ratio
        })
        .jpeg({ quality: 70 }) // Convert to JPEG with optimized quality
        .toBuffer();

      // Get metadata of resized image
      const metadata = await sharp(resizedBuffer).metadata();

      return {
        buffer: resizedBuffer,
        width: metadata.width || width,
        height: metadata.height || 0,
        size: resizedBuffer.length,
      };
    } catch (error) {
      throw new BadRequestException(`Failed to resize image: ${error.message}`);
    }
  }

  private isImageFile(filename: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const ext = path.extname(filename).toLowerCase();
    return imageExtensions.includes(ext);
  }

  // Audio methods
  async uploadAudio(file: Express.Multer.File, folderPath: string = '') {
    // Fix encoding issues with Unicode filenames
    let originalName = file.originalname;
    
    try {
      // If the string contains garbled characters, try to decode it properly
      if (originalName.includes('á') || originalName.includes('â') || originalName.includes('ã')) {
        // Convert from latin1 to utf8
        const buffer = Buffer.from(originalName, 'latin1');
        originalName = buffer.toString('utf8');
      }
    } catch (error) {
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
      throw new BadRequestException(
        'Invalid file type. Only MP3, WAV, OGG, M4A, AAC, and FLAC audio files are allowed.',
      );
    }

    // Check file size (50MB limit)
    const maxSize = 50 * 1024 * 1024; // 50MB in bytes
    if (file.size > maxSize) {
      throw new BadRequestException(
        'The audio file must not be greater than 51200 kilobytes.',
      );
    }

    // Validate and sanitize folder path
    const sanitizedPath = this.sanitizeFolderPath(folderPath);
    const targetSubDir = sanitizedPath ? `audio/${sanitizedPath}` : 'audio';

    const filename = await this.fileStorageService.storeFile(
      file,
      false, // Not an image, it's an audio file
      targetSubDir,
    );

    const urlPath = sanitizedPath
      ? `audio/${sanitizedPath}/${filename}`
      : `audio/${filename}`;

    // Get audio duration (placeholder - would need ffprobe for actual duration)
    const duration = this.getAudioDuration();

    // Save audio metadata to database
    const audioMetadata = this.audioMetadataRepository.create({
      filename: filename,
      original_name: originalName, // Use corrected filename
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
        original_name: originalName, // Use corrected filename
        url: `/uploads/${urlPath}`,
        size: file.size,
        duration: duration,
        path: sanitizedPath ? `${sanitizedPath}/${filename}` : filename,
      },
    };
  }

  async getAudioFiles(folderPath: string = '') {
    const audioDir = path.join(process.cwd(), 'uploads', 'audio');
    const targetPath = path.join(audioDir, folderPath);

    // Security check: ensure path is within uploads/audio
    if (!targetPath.startsWith(audioDir)) {
      throw new BadRequestException('Invalid path');
    }

    if (!fs.existsSync(targetPath)) {
      throw new BadRequestException('Folder not found');
    }

    const items = fs.readdirSync(targetPath);
    const folders: {
      name: string;
      path: string;
      modified: string;
    }[] = [];
    const audios: any[] = [];

    for (const item of items) {
      const itemPath = path.join(targetPath, item);
      const stats = fs.statSync(itemPath);

      if (stats.isDirectory()) {
        folders.push({
          name: item,
          path: folderPath ? `${folderPath}/${item}` : item,
          modified: stats.mtime.toISOString(),
        });
      } else if (this.isAudioFile(item)) {
        // Get audio metadata from database
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
        } else {
          // File exists in filesystem but not in database - include it with basic info
          const urlPath = folderPath
            ? `audio/${folderPath}/${item}`
            : `audio/${item}`;

          audios.push({
            name: item,
            original_name: item,
            url: `/uploads/${urlPath}`,
            path: folderPath ? `${folderPath}/${item}` : item,
            size: stats.size,
            duration: 0, // Unknown duration for orphaned files
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

  async deleteAudio(filename: string) {
    // Find the audio metadata in database
    const audioMetadata = await this.audioMetadataRepository.findOne({
      where: { filename },
    });

    if (!audioMetadata) {
      throw new BadRequestException('Audio not found in database');
    }

    // Construct the full file path
    const audioDir = path.join(process.cwd(), 'uploads', 'audio');
    const filePath = path.join(audioDir, audioMetadata.path);

    // Security check: ensure path is within uploads/audio
    if (!filePath.startsWith(audioDir)) {
      throw new BadRequestException('Invalid file path');
    }

    // Check if file exists and delete it
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (error) {
        throw new BadRequestException(
          `Failed to delete file: ${error.message}`,
        );
      }
    }

    // Remove from database
    await this.audioMetadataRepository.remove(audioMetadata);

    return {
      success: true,
      message: 'Audio file deleted successfully',
    };
  }

  async updateAudioMetadata(
    filename: string,
    metadata: {
      original_name?: string;
      tags?: string[];
      description?: string;
      alt_text?: string;
    },
  ) {
    const audioMetadata = await this.audioMetadataRepository.findOne({
      where: { filename },
    });

    if (!audioMetadata) {
      throw new BadRequestException('Audio file not found');
    }

    // Update metadata
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

  async searchAudioFiles(criteria: {
    tagSearch?: string;
    description?: string;
    path?: string;
  }) {
    const queryBuilder =
      this.audioMetadataRepository.createQueryBuilder('audio');

    if (criteria.tagSearch) {
      queryBuilder.andWhere(
        'EXISTS (SELECT 1 FROM unnest(audio.tags) as tag WHERE tag ILIKE :tagSearch)',
        {
          tagSearch: `%${criteria.tagSearch}%`,
        },
      );
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

  private isAudioFile(filename: string): boolean {
    const audioExtensions = ['.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac'];
    const ext = path.extname(filename).toLowerCase();
    return audioExtensions.includes(ext);
  }

  private getAudioDuration(): number {
    // This is a placeholder implementation
    // In a real implementation, you would use a library like ffprobe or node-ffprobe
    // to get the actual duration of the audio file
    // For now, we'll return a default value
    return 0; // Duration in seconds
  }
}
