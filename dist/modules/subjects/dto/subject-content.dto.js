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
exports.SubjectContentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class SubjectContentDto {
    id;
    subjectId;
    title;
    createdAt;
    updatedAt;
}
exports.SubjectContentDto = SubjectContentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Content ID' }),
    __metadata("design:type", Number)
], SubjectContentDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Subject ID' }),
    __metadata("design:type", Number)
], SubjectContentDto.prototype, "subjectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Content title' }),
    __metadata("design:type", String)
], SubjectContentDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Creation date' }),
    __metadata("design:type", String)
], SubjectContentDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last update date' }),
    __metadata("design:type", String)
], SubjectContentDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=subject-content.dto.js.map