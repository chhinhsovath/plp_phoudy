import {
  Controller,
  Post,
  Get,
  Delete,
  Query,
  Body,
  UploadedFiles,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UploadService } from './upload.service';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';

// Multer configuration for preserving Unicode characters
const multerConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const tempPath = './uploads/temp';
      // Ensure temp directory exists
      if (!fs.existsSync(tempPath)) {
        fs.mkdirSync(tempPath, { recursive: true });
      }
      cb(null, tempPath);
    },
    filename: (req, file, cb) => {
      // Fix encoding issues with Unicode filenames
      let originalName = file.originalname;
      
      // Try to fix encoding issues - sometimes filenames come in as latin1 but should be utf8
      try {
        // If the string contains garbled characters, try to decode it properly
        if (originalName.includes('á') || originalName.includes('â') || originalName.includes('ã')) {
          // Convert from latin1 to utf8
          const buffer = Buffer.from(originalName, 'latin1');
          originalName = buffer.toString('utf8');
        }
      } catch (error) {
        console.log('Encoding conversion error:', error);
        // Use original if conversion fails
      }
      
      const timestamp = Date.now();
      const randomSuffix = Math.round(Math.random() * 1e9).toString(36);
      const ext = path.extname(originalName);
      const baseName = path.basename(originalName, ext);
      
      console.log('Processing filename:', {
        original: file.originalname,
        corrected: originalName,
        baseName: baseName
      });
      
      // Create safe filename while preserving original structure
      cb(null, `${baseName}_${timestamp}_${randomSuffix}${ext}`);
    },
  }),
  fileFilter: (
    req: any,
    file: Express.Multer.File,
    cb: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    // Ensure the original filename is preserved with proper encoding
    if (file.originalname) {
      // Log the original filename to debug encoding issues
      console.log('Original filename:', file.originalname);
      console.log(
        'Original filename bytes:',
        Buffer.from(file.originalname, 'utf8'),
      );
    }
    // Allow all file types for now, validation is done in the service
    cb(null, true);
  },
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  // Ensure proper encoding for Unicode characters
  preserveExtension: true,
};

@Controller('upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(AnyFilesInterceptor(multerConfig))
  async uploadImage(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('path') folderPath: string = '',
  ) {
    const file = files?.find((f) => f.fieldname === 'image');

    if (!file) {
      throw new BadRequestException('No image file provided');
    }

    const result = await this.uploadService.uploadImage(file, folderPath);
    return result;
  }

  @Get('files')
  async getFiles(@Query('path') path: string = '') {
    return await this.uploadService.getFileExplorer(path);
  }

  @Post('folder')
  createFolder(@Body('path') path: string = '', @Body('name') name: string) {
    if (!name) {
      throw new BadRequestException('Folder name is required');
    }
    return this.uploadService.createFolder(path, name);
  }

  @Delete('folder')
  deleteFolder(@Body('path') path: string) {
    if (!path) {
      throw new BadRequestException('Folder path is required');
    }
    return this.uploadService.deleteFolder(path);
  }

  @Post('folder/rename')
  renameFolder(
    @Body('oldPath') oldPath: string,
    @Body('newName') newName: string,
  ) {
    if (!oldPath || !newName) {
      throw new BadRequestException('Old path and new name are required');
    }
    return this.uploadService.renameFolder(oldPath, newName);
  }

  @Post('image/metadata')
  async updateImageMetadata(
    @Body('filename') filename: string,
    @Body('tags') tags: string[],
    @Body('description') description?: string,
    @Body('altText') altText?: string,
    @Body('originalName') originalName?: string,
  ) {
    if (!filename) {
      throw new BadRequestException('Filename is required');
    }
    return await this.uploadService.updateImageMetadata(filename, {
      tags,
      description,
      altText,
      originalName,
    });
  }

  @Get('images/search')
  async searchImages(
    @Query('tags') tags?: string,
    @Query('description') description?: string,
    @Query('path') path?: string,
    @Query('q') q?: string,
    @Query('tagSearch') tagSearch?: string,
  ) {
    const tagArray = tags ? tags.split(',').map((tag) => tag.trim()) : [];

    return await this.uploadService.searchImages({
      tags: tagArray,
      description,
      path,
      q,
      tagSearch,
    });
  }

  @Delete('image')
  async deleteImage(@Body('filename') filename: string) {
    if (!filename) {
      throw new BadRequestException('Filename is required');
    }
    return await this.uploadService.deleteImage(filename);
  }

  // Audio endpoints
  @Get('audio-files')
  async getAudioFiles(@Query('path') path: string = '') {
    return await this.uploadService.getAudioFiles(path);
  }

  @Post('audio')
  @UseInterceptors(FileInterceptor('audio', multerConfig))
  async uploadAudio(
    @UploadedFile() file: Express.Multer.File,
    @Body('path') folderPath: string = '',
  ) {
    if (!file) {
      throw new BadRequestException('No audio file provided');
    }

    const result = await this.uploadService.uploadAudio(file, folderPath);
    return result;
  }

  @Delete('audio')
  async deleteAudio(@Body('filename') filename: string) {
    if (!filename) {
      throw new BadRequestException('Filename is required');
    }
    return await this.uploadService.deleteAudio(filename);
  }

  @Post('audio/metadata')
  async updateAudioMetadata(
    @Body('filename') filename: string,
    @Body('original_name') originalName?: string,
    @Body('tags') tags?: string[],
    @Body('description') description?: string,
    @Body('alt_text') altText?: string,
  ) {
    if (!filename) {
      throw new BadRequestException('Filename is required');
    }
    return await this.uploadService.updateAudioMetadata(filename, {
      original_name: originalName,
      tags,
      description,
      alt_text: altText,
    });
  }

  @Get('audio/search')
  async searchAudioFiles(
    @Query('tagSearch') tagSearch?: string,
    @Query('description') description?: string,
    @Query('path') path?: string,
  ) {
    if (!tagSearch && !description && !path) {
      throw new BadRequestException(
        'At least one search parameter must be provided.',
      );
    }

    return await this.uploadService.searchAudioFiles({
      tagSearch,
      description,
      path,
    });
  }
}
