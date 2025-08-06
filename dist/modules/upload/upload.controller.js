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
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const upload_service_1 = require("./upload.service");
const multer_1 = require("multer");
const path = require("path");
const fs = require("fs");
const multerConfig = {
    storage: (0, multer_1.diskStorage)({
        destination: (req, file, cb) => {
            const tempPath = './uploads/temp';
            if (!fs.existsSync(tempPath)) {
                fs.mkdirSync(tempPath, { recursive: true });
            }
            cb(null, tempPath);
        },
        filename: (req, file, cb) => {
            let originalName = file.originalname;
            try {
                if (originalName.includes('á') || originalName.includes('â') || originalName.includes('ã')) {
                    const buffer = Buffer.from(originalName, 'latin1');
                    originalName = buffer.toString('utf8');
                }
            }
            catch (error) {
                console.log('Encoding conversion error:', error);
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
            cb(null, `${baseName}_${timestamp}_${randomSuffix}${ext}`);
        },
    }),
    fileFilter: (req, file, cb) => {
        if (file.originalname) {
            console.log('Original filename:', file.originalname);
            console.log('Original filename bytes:', Buffer.from(file.originalname, 'utf8'));
        }
        cb(null, true);
    },
    limits: {
        fileSize: 50 * 1024 * 1024,
    },
    preserveExtension: true,
};
let UploadController = class UploadController {
    uploadService;
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    async uploadImage(files, folderPath = '') {
        const file = files?.find((f) => f.fieldname === 'image');
        if (!file) {
            throw new common_1.BadRequestException('No image file provided');
        }
        const result = await this.uploadService.uploadImage(file, folderPath);
        return result;
    }
    async getFiles(path = '') {
        return await this.uploadService.getFileExplorer(path);
    }
    createFolder(path = '', name) {
        if (!name) {
            throw new common_1.BadRequestException('Folder name is required');
        }
        return this.uploadService.createFolder(path, name);
    }
    deleteFolder(path) {
        if (!path) {
            throw new common_1.BadRequestException('Folder path is required');
        }
        return this.uploadService.deleteFolder(path);
    }
    renameFolder(oldPath, newName) {
        if (!oldPath || !newName) {
            throw new common_1.BadRequestException('Old path and new name are required');
        }
        return this.uploadService.renameFolder(oldPath, newName);
    }
    async updateImageMetadata(filename, tags, description, altText, originalName) {
        if (!filename) {
            throw new common_1.BadRequestException('Filename is required');
        }
        return await this.uploadService.updateImageMetadata(filename, {
            tags,
            description,
            altText,
            originalName,
        });
    }
    async searchImages(tags, description, path, q, tagSearch) {
        const tagArray = tags ? tags.split(',').map((tag) => tag.trim()) : [];
        return await this.uploadService.searchImages({
            tags: tagArray,
            description,
            path,
            q,
            tagSearch,
        });
    }
    async deleteImage(filename) {
        if (!filename) {
            throw new common_1.BadRequestException('Filename is required');
        }
        return await this.uploadService.deleteImage(filename);
    }
    async getAudioFiles(path = '') {
        return await this.uploadService.getAudioFiles(path);
    }
    async uploadAudio(file, folderPath = '') {
        if (!file) {
            throw new common_1.BadRequestException('No audio file provided');
        }
        const result = await this.uploadService.uploadAudio(file, folderPath);
        return result;
    }
    async deleteAudio(filename) {
        if (!filename) {
            throw new common_1.BadRequestException('Filename is required');
        }
        return await this.uploadService.deleteAudio(filename);
    }
    async updateAudioMetadata(filename, originalName, tags, description, altText) {
        if (!filename) {
            throw new common_1.BadRequestException('Filename is required');
        }
        return await this.uploadService.updateAudioMetadata(filename, {
            original_name: originalName,
            tags,
            description,
            alt_text: altText,
        });
    }
    async searchAudioFiles(tagSearch, description, path) {
        if (!tagSearch && !description && !path) {
            throw new common_1.BadRequestException('At least one search parameter must be provided.');
        }
        return await this.uploadService.searchAudioFiles({
            tagSearch,
            description,
            path,
        });
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Post)('image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)(multerConfig)),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)('path')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Get)('files'),
    __param(0, (0, common_1.Query)('path')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "getFiles", null);
__decorate([
    (0, common_1.Post)('folder'),
    __param(0, (0, common_1.Body)('path')),
    __param(1, (0, common_1.Body)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "createFolder", null);
__decorate([
    (0, common_1.Delete)('folder'),
    __param(0, (0, common_1.Body)('path')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "deleteFolder", null);
__decorate([
    (0, common_1.Post)('folder/rename'),
    __param(0, (0, common_1.Body)('oldPath')),
    __param(1, (0, common_1.Body)('newName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "renameFolder", null);
__decorate([
    (0, common_1.Post)('image/metadata'),
    __param(0, (0, common_1.Body)('filename')),
    __param(1, (0, common_1.Body)('tags')),
    __param(2, (0, common_1.Body)('description')),
    __param(3, (0, common_1.Body)('altText')),
    __param(4, (0, common_1.Body)('originalName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, String, String, String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "updateImageMetadata", null);
__decorate([
    (0, common_1.Get)('images/search'),
    __param(0, (0, common_1.Query)('tags')),
    __param(1, (0, common_1.Query)('description')),
    __param(2, (0, common_1.Query)('path')),
    __param(3, (0, common_1.Query)('q')),
    __param(4, (0, common_1.Query)('tagSearch')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "searchImages", null);
__decorate([
    (0, common_1.Delete)('image'),
    __param(0, (0, common_1.Body)('filename')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "deleteImage", null);
__decorate([
    (0, common_1.Get)('audio-files'),
    __param(0, (0, common_1.Query)('path')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "getAudioFiles", null);
__decorate([
    (0, common_1.Post)('audio'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('audio', multerConfig)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('path')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadAudio", null);
__decorate([
    (0, common_1.Delete)('audio'),
    __param(0, (0, common_1.Body)('filename')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "deleteAudio", null);
__decorate([
    (0, common_1.Post)('audio/metadata'),
    __param(0, (0, common_1.Body)('filename')),
    __param(1, (0, common_1.Body)('original_name')),
    __param(2, (0, common_1.Body)('tags')),
    __param(3, (0, common_1.Body)('description')),
    __param(4, (0, common_1.Body)('alt_text')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Array, String, String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "updateAudioMetadata", null);
__decorate([
    (0, common_1.Get)('audio/search'),
    __param(0, (0, common_1.Query)('tagSearch')),
    __param(1, (0, common_1.Query)('description')),
    __param(2, (0, common_1.Query)('path')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "searchAudioFiles", null);
exports.UploadController = UploadController = __decorate([
    (0, common_1.Controller)('upload'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], UploadController);
//# sourceMappingURL=upload.controller.js.map