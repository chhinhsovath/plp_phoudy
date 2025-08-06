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
exports.ImageMetadata = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
let ImageMetadata = class ImageMetadata extends base_entity_1.BaseEntity {
    filename;
    original_name;
    file_path;
    url;
    size;
    mime_type;
    tags;
    description;
    alt_text;
    width;
    height;
};
exports.ImageMetadata = ImageMetadata;
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], ImageMetadata.prototype, "filename", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ImageMetadata.prototype, "original_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ImageMetadata.prototype, "file_path", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ImageMetadata.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint' }),
    __metadata("design:type", Number)
], ImageMetadata.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ImageMetadata.prototype, "mime_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', array: true, default: [] }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Array)
], ImageMetadata.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ImageMetadata.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ImageMetadata.prototype, "alt_text", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ImageMetadata.prototype, "width", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ImageMetadata.prototype, "height", void 0);
exports.ImageMetadata = ImageMetadata = __decorate([
    (0, typeorm_1.Entity)('image_metadata')
], ImageMetadata);
//# sourceMappingURL=image-metadata.entity.js.map