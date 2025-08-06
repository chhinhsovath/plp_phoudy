import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { FileStorageModule } from '../file-storage/file-storage.module';
import { ImageMetadata } from '../../entities/image-metadata.entity';
import { AudioMetadata } from '../../entities/audio-metadata.entity';

@Module({
  imports: [
    FileStorageModule,
    TypeOrmModule.forFeature([ImageMetadata, AudioMetadata]),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
