import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileStorageService {
  private readonly uploadDir: string;

  constructor(private configService: ConfigService) {
    // Get upload directory from config or use default
    this.uploadDir = this.configService.get<string>('UPLOAD_DIR', 'uploads');

    // Create upload directory if it doesn't exist
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  /**
   * Store a file in the upload directory
   * @param file The file to store
   * @param isImage Whether the file is an image
   * @param subDirectory Optional subdirectory within uploads
   * @returns The filename of the stored file
   */
  async storeFile(
    file: any,
    isImage = true,
    subDirectory?: string,
  ): Promise<string> {
    if (!file) {
      throw new Error('No file provided');
    }

    // Validate file type if it's an image
    if (isImage) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validImageTypes.includes(file.mimetype)) {
        throw new Error(
          'Invalid file type. Only JPEG, PNG, and GIF are allowed.',
        );
      }
    } else {
      // For non-image files (like audio), we'll skip validation here
      // as it's handled in the calling service
    }

    // Create subdirectory if specified
    let targetDir = this.uploadDir;
    if (subDirectory) {
      targetDir = path.join(this.uploadDir, subDirectory);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
    }

    // Use the filename provided by multer or generate unique one
    const fileName = file.filename || `${uuidv4()}${path.extname(file.originalname)}`;
    const filePath = path.join(targetDir, fileName);

    // Write file to disk
    return new Promise((resolve, reject) => {
      // Check if file has buffer (memory storage) or path (disk storage)
      if (file.buffer) {
        // File is in memory
        fs.writeFile(filePath, file.buffer, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(fileName);
          }
        });
      } else if (file.path) {
        // File is on disk, move it to target location
        fs.rename(file.path, filePath, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(fileName);
          }
        });
      } else {
        reject(new Error('File has neither buffer nor path'));
      }
    });
  }

  /**
   * Delete a file from the upload directory
   * @param fileName The name of the file to delete
   */
  async deleteFile(fileName: string): Promise<void> {
    const filePath = path.join(this.uploadDir, fileName);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}
