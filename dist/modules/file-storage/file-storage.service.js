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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorageService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const fs = require("fs");
const path = require("path");
const uuid_1 = require("uuid");
let FileStorageService = class FileStorageService {
    configService;
    uploadDir;
    constructor(configService) {
        this.configService = configService;
        this.uploadDir = this.configService.get('UPLOAD_DIR', 'uploads');
        if (!fs.existsSync(this.uploadDir)) {
            fs.mkdirSync(this.uploadDir, { recursive: true });
        }
    }
    async storeFile(file, isImage = true, subDirectory) {
        if (!file) {
            throw new Error('No file provided');
        }
        if (isImage) {
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validImageTypes.includes(file.mimetype)) {
                throw new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.');
            }
        }
        else {
        }
        let targetDir = this.uploadDir;
        if (subDirectory) {
            targetDir = path.join(this.uploadDir, subDirectory);
            if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
            }
        }
        const fileName = file.filename || `${(0, uuid_1.v4)()}${path.extname(file.originalname)}`;
        const filePath = path.join(targetDir, fileName);
        return new Promise((resolve, reject) => {
            if (file.buffer) {
                fs.writeFile(filePath, file.buffer, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(fileName);
                    }
                });
            }
            else if (file.path) {
                fs.rename(file.path, filePath, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(fileName);
                    }
                });
            }
            else {
                reject(new Error('File has neither buffer nor path'));
            }
        });
    }
    async deleteFile(fileName) {
        const filePath = path.join(this.uploadDir, fileName);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
};
exports.FileStorageService = FileStorageService;
exports.FileStorageService = FileStorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FileStorageService);
//# sourceMappingURL=file-storage.service.js.map