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
exports.SubSubjectDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class SubSubjectDto {
    id;
    subjectId;
    subjectNameEn;
    subjectNameKh;
    name;
    khmerName;
    description;
    status;
    path;
    created_at;
    updated_at;
}
exports.SubSubjectDto = SubSubjectDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sub subject ID' }),
    __metadata("design:type", Number)
], SubSubjectDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Subject ID', required: false }),
    __metadata("design:type", Number)
], SubSubjectDto.prototype, "subjectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Subject name in English', required: false }),
    __metadata("design:type", String)
], SubSubjectDto.prototype, "subjectNameEn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Subject name in Khmer', required: false }),
    __metadata("design:type", String)
], SubSubjectDto.prototype, "subjectNameKh", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sub subject name' }),
    __metadata("design:type", String)
], SubSubjectDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sub subject name in Khmer' }),
    __metadata("design:type", String)
], SubSubjectDto.prototype, "khmerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sub subject description' }),
    __metadata("design:type", String)
], SubSubjectDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sub subject status' }),
    __metadata("design:type", String)
], SubSubjectDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sub subject path' }),
    __metadata("design:type", String)
], SubSubjectDto.prototype, "path", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Creation date' }),
    __metadata("design:type", Date)
], SubSubjectDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Update date' }),
    __metadata("design:type", Date)
], SubSubjectDto.prototype, "updated_at", void 0);
//# sourceMappingURL=sub-subject.dto.js.map