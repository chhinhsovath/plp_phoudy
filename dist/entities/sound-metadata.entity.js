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
exports.SoundMetadata = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
let SoundMetadata = class SoundMetadata extends base_entity_1.BaseEntity {
    filename;
    original_name;
    file_path;
    url;
    size;
    mime_type;
    tags;
    description;
    duration;
    bitrate;
    sample_rate;
};
exports.SoundMetadata = SoundMetadata;
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], SoundMetadata.prototype, "filename", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SoundMetadata.prototype, "original_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SoundMetadata.prototype, "file_path", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SoundMetadata.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint' }),
    __metadata("design:type", Number)
], SoundMetadata.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SoundMetadata.prototype, "mime_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', array: true, default: [] }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Array)
], SoundMetadata.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SoundMetadata.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'float' }),
    __metadata("design:type", Number)
], SoundMetadata.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], SoundMetadata.prototype, "bitrate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], SoundMetadata.prototype, "sample_rate", void 0);
exports.SoundMetadata = SoundMetadata = __decorate([
    (0, typeorm_1.Entity)('sound_metadata')
], SoundMetadata);
//# sourceMappingURL=sound-metadata.entity.js.map